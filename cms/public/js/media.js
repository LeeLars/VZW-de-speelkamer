// Media Manager for hero/homepage images
const SITE_IMAGE_KEYS = {
    homeHeroMain: 'home_hero_main',
    homeHeroSecondary: 'home_hero_secondary',
    homeAbout: 'home_about_image',
    opvangHero: 'opvang_hero_image'
};

function formatSectionLabel(section) {
    const labels = {
        home_hero: 'Home Hero',
        home_gallery: 'Home Visuals',
        home_about: 'Home - Team blok',
        opvang_hero: 'Opvang Hero',
        opvang_gallery: 'Opvang Visuals'
    };
    return labels[section] || section;
}

function formatKeyLabel(imageKey) {
    const labels = {
        home_hero_main: 'Home Hero – Hoofdbeeld',
        home_hero_secondary: 'Home Hero – Tweede beeld',
        home_about_image: 'Home – Team afbeelding',
        opvang_hero_image: 'Opvang Hero',
    };
    return labels[imageKey] || imageKey;
}

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

    if (!images.length) {
        container.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
                Nog geen afbeeldingen toegevoegd.
            </div>`;
        return;
    }

    const grouped = images.reduce((acc, image) => {
        if (!acc[image.section]) acc[image.section] = [];
        acc[image.section].push(image);
        return acc;
    }, {});

    container.innerHTML = Object.entries(grouped).map(([section, sectionImages]) => `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">${formatSectionLabel(section)}</h3>
                    <p class="text-xs text-gray-500">Keys: ${sectionImages.map(img => img.image_key).join(', ')}</p>
                </div>
                <span class="text-sm text-gray-400">(${sectionImages.length})</span>
            </div>
            <div class="divide-y divide-gray-100">
                ${sectionImages.map(image => `
                    <div class="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                        <div class="w-full sm:w-48 h-40 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src="${image.image_url}" alt="${image.title || image.image_key}" class="w-full h-full object-cover" onerror="this.src='./images/placeholder.jpg';" />
                        </div>
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="text-xs px-2 py-1 rounded-full bg-gray-100 font-bold text-gray-600 uppercase tracking-wide">${image.section}</span>
                                <span class="text-xs px-2 py-1 rounded-full bg-sk_teal/10 text-sk_teal font-mono">${image.image_key}</span>
                            </div>
                            <h4 class="text-lg font-bold text-gray-800 mt-2">${image.title || formatKeyLabel(image.image_key)}</h4>
                            ${image.description ? `<p class="text-sm text-gray-600 mt-1">${image.description}</p>` : ''}
                            <div class="mt-3 text-xs text-gray-400">
                                <span>Prioriteit: ${image.priority}</span> • 
                                <span>Aangepast: ${new Date(image.updated_at || image.created_at).toLocaleDateString('nl-BE')}</span>
                            </div>
                            <div class="mt-4 flex flex-wrap gap-2">
                                <a href="${image.image_url}" target="_blank" class="text-sm font-bold text-sk_teal hover:underline">Bekijk</a>
                                <button onclick="showSiteImageModal(${image.id})" class="text-sm font-bold text-gray-600 hover:text-gray-900">Bewerken</button>
                                <button onclick="deleteSiteImage(${image.id})" class="text-sm font-bold text-red-500 hover:text-red-600">Verwijderen</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function showSiteImageModal(imageId = null) {
    const isEdit = Boolean(imageId);
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onclick="closeSiteImageModal(event)">
            <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${isEdit ? 'Afbeelding bewerken' : 'Nieuwe afbeelding'}</h3>
                        <p class="text-sm text-gray-500">Kies sekte en key. Keys worden gebruikt door de website.</p>
                    </div>
                    <button onclick="closeSiteImageModal()" class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form id="site-image-form" class="p-4 sm:p-6 space-y-4">
                    <input type="hidden" id="site-image-id" value="${imageId || ''}">

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Sectie *</label>
                            <select id="site-image-section" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                                <option value="">Kies een sectie</option>
                                <option value="home_hero">Home Hero</option>
                                <option value="home_gallery">Home Visuals</option>
                                <option value="home_about">Home Team blok</option>
                                <option value="opvang_hero">Opvang Hero</option>
                                <option value="opvang_gallery">Opvang Visuals</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Image key *</label>
                            <input type="text" id="site-image-key" required placeholder="bijv. home_hero_main"
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                            <p class="text-xs text-gray-400 mt-1">Gebruik vaste keys voor automatische koppeling op de website.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Titel</label>
                            <input type="text" id="site-image-title"
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Prioriteit</label>
                            <input type="number" id="site-image-priority" value="0"
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Beschrijving</label>
                        <textarea id="site-image-description" rows="2"
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20"></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Afbeelding URL *</label>
                            <input type="url" id="site-image-url" required placeholder="https://..."
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                            <p class="text-xs text-gray-400 mt-1">Plak je Cloudinary/url of gebruik de upload hieronder.</p>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Upload afbeelding</label>
                            <input type="file" id="site-image-file" accept="image/*"
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20">
                            <p class="text-xs text-gray-400 mt-1">Max 5MB, JPG/PNG/WebP.</p>
                        </div>
                    </div>

                    <div id="site-image-preview" class="hidden">
                        <p class="text-sm text-gray-500 mb-2">Preview</p>
                        <img id="site-image-preview-img" class="w-full max-h-64 object-cover rounded-2xl border-2 border-gray-100">
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition text-sm sm:text-base">
                            ${isEdit ? 'Opslaan' : 'Toevoegen'}
                        </button>
                        <button type="button" onclick="closeSiteImageModal()" class="sm:px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition text-sm sm:text-base">
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;

    const fileInput = document.getElementById('site-image-file');
    fileInput.addEventListener('change', handleSiteImageUpload);

    if (isEdit) {
        loadSiteImage(imageId);
    }

    document.getElementById('site-image-form').addEventListener('submit', handleSiteImageSubmit);
}

async function handleSiteImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Upload mislukt');

        const result = await response.json();
        document.getElementById('site-image-url').value = result.path;

        const preview = document.getElementById('site-image-preview');
        const previewImg = document.getElementById('site-image-preview-img');
        previewImg.src = result.path;
        preview.classList.remove('hidden');

        showToast('Afbeelding geüpload!', 'success');
    } catch (error) {
        console.error('Upload error:', error);
        showToast('Fout bij uploaden', 'error');
    }
}

async function loadSiteImage(imageId) {
    try {
        const image = await apiRequest(`/site-images/${imageId}`);
        document.getElementById('site-image-section').value = image.section;
        document.getElementById('site-image-key').value = image.image_key;
        document.getElementById('site-image-title').value = image.title || '';
        document.getElementById('site-image-description').value = image.description || '';
        document.getElementById('site-image-url').value = image.image_url || '';
        document.getElementById('site-image-priority').value = image.priority || 0;

        if (image.image_url) {
            const preview = document.getElementById('site-image-preview');
            const previewImg = document.getElementById('site-image-preview-img');
            previewImg.src = image.image_url;
            preview.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Load site image error:', error);
        showToast('Afbeelding niet gevonden', 'error');
        closeSiteImageModal();
    }
}

async function handleSiteImageSubmit(event) {
    event.preventDefault();
    const imageId = document.getElementById('site-image-id').value;

    const payload = {
        section: document.getElementById('site-image-section').value,
        image_key: document.getElementById('site-image-key').value,
        title: document.getElementById('site-image-title').value || '',
        description: document.getElementById('site-image-description').value || '',
        image_url: document.getElementById('site-image-url').value,
        priority: parseInt(document.getElementById('site-image-priority').value || '0', 10)
    };

    try {
        await apiRequest(imageId ? `/site-images/${imageId}` : '/site-images', {
            method: imageId ? 'PUT' : 'POST',
            body: JSON.stringify(payload)
        });

        showToast(imageId ? 'Afbeelding bijgewerkt!' : 'Afbeelding toegevoegd!');
        closeSiteImageModal();
        loadSiteImages();
    } catch (error) {
        showToast(error.message || 'Opslaan mislukt', 'error');
    }
}

function closeSiteImageModal(event) {
    if (!event || event.target === event.currentTarget) {
        document.getElementById('modal-container').innerHTML = '';
    }
}

async function deleteSiteImage(imageId) {
    if (!confirm('Weet je zeker dat je deze afbeelding wil verwijderen?')) return;
    try {
        await apiRequest(`/site-images/${imageId}`, { method: 'DELETE' });
        showToast('Afbeelding verwijderd');
        loadSiteImages();
    } catch (error) {
        showToast(error.message || 'Verwijderen mislukt', 'error');
    }
}
