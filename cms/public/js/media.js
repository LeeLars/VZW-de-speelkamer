// Media Manager (replace-only)
const MANAGED_SITE_IMAGES = [
    { section: 'home_hero', image_key: 'home_hero_main', label: 'Home Hero – Hoofdbeeld' },
    { section: 'home_hero', image_key: 'home_hero_secondary', label: 'Home Hero – Tweede beeld' },
    { section: 'home_about', image_key: 'home_about_image', label: 'Home – Team afbeelding' },
    { section: 'opvang_hero', image_key: 'opvang_hero_image', label: 'Opvang – Hero afbeelding' }
];

async function loadSiteImages() {
    try {
        const images = await apiRequest('/site-images');
        renderSiteImages(images);
    } catch (error) {
        console.error('Site images load error:', error);
        showToast('Fout bij laden van afbeeldingen', 'error');
    }
}

function renderSiteImages(images) {
    const container = document.getElementById('site-images-list');
    if (!container) return;

    const byKey = (images || []).reduce((acc, image) => {
        acc[image.image_key] = image;
        return acc;
    }, {});

    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

    container.innerHTML = MANAGED_SITE_IMAGES.map(item => {
        const record = byKey[item.image_key];
        const imageUrl = record?.image_url || './images/placeholder.jpg';
        const updatedAt = record?.updated_at || record?.created_at;
        const updatedLabel = updatedAt ? new Date(updatedAt).toLocaleDateString('nl-BE') : '—';
        return `
            <button type="button"
                class="group text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4"
                onclick="replaceSiteImage('${item.image_key}')">
                <div class="w-full h-40 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src="${imageUrl}" alt="${item.label}" class="w-full h-full object-cover" onerror="this.src='./images/placeholder.jpg';" />
                </div>
                <div class="mt-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-xs px-2 py-1 rounded-full bg-gray-100 font-bold text-gray-600 uppercase tracking-wide">${item.section}</span>
                        <span class="text-xs px-2 py-1 rounded-full bg-sk_teal/10 text-sk_teal font-mono">${item.image_key}</span>
                    </div>
                    <h4 class="text-base font-bold text-gray-800 mt-2">${item.label}</h4>
                    <p class="text-xs text-gray-500 mt-1">Laatst aangepast: ${updatedLabel}</p>
                    <p class="text-sm font-bold text-sk_teal mt-3">Klik om te vervangen</p>
                </div>
            </button>
        `;
    }).join('');
}

function getManagedImageConfig(imageKey) {
    return MANAGED_SITE_IMAGES.find(i => i.image_key === imageKey);
}

async function uploadImageFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        body: formData
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || 'Upload mislukt');
    }

    return data;
}

async function replaceSiteImage(imageKey) {
    const config = getManagedImageConfig(imageKey);
    if (!config) {
        showToast('Onbekende image key', 'error');
        return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
        const file = input.files && input.files[0];
        if (!file) return;

        try {
            showToast('Uploaden...', 'success');

            const uploadResult = await uploadImageFile(file);
            const imageUrl = uploadResult.path || uploadResult.url;
            if (!imageUrl) {
                throw new Error('Upload response mist image URL');
            }

            await apiRequest(`/site-images/by-key/${encodeURIComponent(imageKey)}`, {
                method: 'PUT',
                body: JSON.stringify({ section: config.section, image_url: imageUrl })
            });

            showToast('Afbeelding vervangen!');
            loadSiteImages();
        } catch (error) {
            console.error('Replace image error:', error);
            showToast(error.message || 'Vervangen mislukt', 'error');
        }
    };

    input.click();
}
