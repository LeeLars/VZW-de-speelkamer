// Documents management (CMS admin)
// Currently manages the site-wide "Huishoudelijk Reglement" document.

let currentReglement = { url: '', name: '' };

// Load the current reglement from the settings API and render the UI
async function loadDocuments() {
    try {
        const settings = await apiRequest('/settings', { skipAuth: true });
        currentReglement = {
            url: settings?.reglement_url || '',
            name: settings?.reglement_name || ''
        };
    } catch (error) {
        console.error('Load documents error:', error);
        currentReglement = { url: '', name: '' };
    }

    renderReglement();
    setupReglementUploader();
}

function renderReglement() {
    const currentBox = document.getElementById('reglement-current');
    const emptyBox = document.getElementById('reglement-empty');
    const nameEl = document.getElementById('reglement-current-name');
    const downloadLink = document.getElementById('reglement-download-link');

    if (!currentBox || !emptyBox) return;

    if (currentReglement.url) {
        const displayName = currentReglement.name
            || decodeURIComponent(currentReglement.url.split('/').pop() || 'document.pdf');
        if (nameEl) nameEl.textContent = displayName;
        if (downloadLink) downloadLink.href = currentReglement.url;
        currentBox.classList.remove('hidden');
        emptyBox.classList.add('hidden');
    } else {
        currentBox.classList.add('hidden');
        emptyBox.classList.remove('hidden');
    }
}

// Open the document in the preview modal (via the backend proxy so it renders inline)
function viewReglement() {
    if (!currentReglement.url) return;

    let safeUrl = '';
    try {
        const parsed = new URL(currentReglement.url);
        if (!['http:', 'https:'].includes(parsed.protocol)) return;
        safeUrl = parsed.toString();
    } catch {
        return;
    }

    const previewUrl = `${API_BASE_URL}/upload/document/preview?url=${encodeURIComponent(safeUrl)}`;
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
}

// Persist the current reglement url/name to the settings API
async function saveReglement() {
    await apiRequest('/settings', {
        method: 'PUT',
        body: JSON.stringify({
            reglement_url: currentReglement.url || null,
            reglement_name: currentReglement.name || null
        })
    });
}

function setupReglementUploader() {
    const fileInput = document.getElementById('reglement-file');
    const statusEl = document.getElementById('reglement-status');
    if (!fileInput || !statusEl) return;

    // Avoid attaching the listener twice when the tab is re-opened
    if (fileInput.dataset.bound === 'true') return;
    fileInput.dataset.bound = 'true';

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            statusEl.textContent = 'Document uploaden...';
            statusEl.classList.remove('hidden', 'text-green-600', 'text-red-600');
            statusEl.classList.add('text-gray-500');

            const formData = new FormData();
            formData.append('document', file);

            const response = await fetch(`${API_BASE_URL}/upload/document`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}` },
                body: formData
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: 'Upload mislukt' }));
                throw new Error(error.error || 'Upload mislukt');
            }

            const result = await response.json();
            currentReglement = { url: result.url, name: file.name };
            await saveReglement();

            renderReglement();
            statusEl.textContent = 'Document succesvol geüpload en opgeslagen!';
            statusEl.classList.remove('text-gray-500');
            statusEl.classList.add('text-green-600');
            showToast('Reglement succesvol geüpload!');
        } catch (error) {
            console.error('Reglement upload error:', error);
            statusEl.textContent = 'Upload mislukt, probeer opnieuw.';
            statusEl.classList.remove('text-gray-500', 'text-green-600');
            statusEl.classList.add('text-red-600');
            showToast(error.message || 'Fout bij uploaden', 'error');
        } finally {
            fileInput.value = '';
        }
    });
}

async function deleteReglement() {
    if (!currentReglement.url) return;
    if (!confirm('Weet je zeker dat je het huishoudelijk reglement wilt verwijderen? De link op de website verdwijnt daarna.')) {
        return;
    }

    try {
        // Best-effort remove the file from ImageKit (same logic as the activities uploader)
        const urlParts = currentReglement.url.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1) {
            const publicId = urlParts.slice(uploadIndex + 2).join('/');
            const encodedPublicId = publicId.replace(/\//g, '-');
            await fetch(`${API_BASE_URL}/upload/document/${encodedPublicId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getToken()}` }
            }).catch(() => {});
        }

        currentReglement = { url: '', name: '' };
        await saveReglement();

        renderReglement();
        showToast('Reglement verwijderd!');
    } catch (error) {
        console.error('Delete reglement error:', error);
        showToast(error.message || 'Fout bij verwijderen', 'error');
    }
}
