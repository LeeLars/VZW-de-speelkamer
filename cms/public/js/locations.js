// Locations Management

let currentLocationId = null;

// Load all locations
async function loadLocations() {
    try {
        const locations = await apiRequest('/locations');
        renderLocations(locations);
    } catch (error) {
        showToast('Fout bij laden van locaties', 'error');
    }
}

// Render locations list
function renderLocations(locations) {
    const container = document.getElementById('locations-list');
    if (!container) return;

    if (locations.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500">Nog geen locaties toegevoegd</p>
            </div>
        `;
        return;
    }

    container.innerHTML = locations.map(location => {
        const imageUrl = getImageUrl(location.image_url, './images/location-placeholder.jpg');
        const hasImage = location.image_url && !location.image_url.includes('placeholder');
        
        console.log('🖼️ Rendering location:', location.name, 'image_url:', location.image_url, 'imageUrl:', imageUrl, 'hasImage:', hasImage);
        
        return `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div class="h-48 bg-gradient-to-br from-sk_pink to-pink-300 relative overflow-hidden">
                ${hasImage ? `
                    <img src="${imageUrl}" alt="${location.name}" class="w-full h-full object-cover" onerror="console.error('❌ Failed to load image:', '${imageUrl}'); this.style.display='none';">
                ` : `
                    <div class="w-full h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                `}
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 mb-2">${location.name}</h3>
                <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0 mt-0.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${location.address}</span>
                    </div>
                    ${location.phone ? `
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>${location.phone}</span>
                        </div>
                    ` : ''}
                    ${location.phone2 ? `
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>${location.phone2}</span>
                        </div>
                    ` : ''}
                    ${location.email ? `
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span class="truncate">${location.email}</span>
                        </div>
                    ` : ''}
                    ${location.email2 ? `
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span class="truncate">${location.email2}</span>
                        </div>
                    ` : ''}
                </div>
                ${location.description ? `
                    <p class="text-sm text-gray-600 mb-4 line-clamp-2">${location.description}</p>
                ` : ''}
                <div class="flex gap-2">
                    <button onclick="editLocation('${location.id}')" class="flex-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium">
                        Bewerken
                    </button>
                    <button onclick="deleteLocation('${location.id}')" class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">
                        Verwijderen
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Show location modal
function showLocationModal(locationId = null) {
    const isEdit = locationId !== null;
    
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onclick="closeLocationModal(event)">
            <div class="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="p-4 sm:p-6 border-b border-gray-200">
                    <h2 class="text-lg sm:text-2xl font-bold text-gray-800">${isEdit ? 'Locatie Bewerken' : 'Nieuwe Locatie'}</h2>
                </div>
                <form id="location-form" class="p-4 sm:p-6 space-y-3 sm:space-y-4" enctype="multipart/form-data">
                    <input type="hidden" id="location-id" value="${locationId || ''}">
                    
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Naam *</label>
                        <input type="text" id="location-name" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Adres *</label>
                        <input type="text" id="location-address" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Beschrijving</label>
                        <textarea id="location-description" rows="3"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none"></textarea>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Telefoon</label>
                            <input type="tel" id="location-phone"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Telefoon (2)</label>
                            <input type="tel" id="location-phone2"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input type="email" id="location-email"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Email (2)</label>
                            <input type="email" id="location-email2"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Afbeelding</label>
                        <input type="file" id="location-image-file" accept="image/*"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        <p class="text-xs text-gray-500 mt-1">Max 5MB. Formaten: JPG, PNG, GIF, WebP</p>
                        ${isEdit ? '<p class="text-xs text-gray-500 mt-1">Laat leeg om huidige foto te behouden</p>' : ''}
                    </div>

                    <div id="location-image-preview" class="hidden mt-3">
                        <label class="block text-sm font-bold text-gray-700 mb-2">Preview</label>
                        <img id="location-preview-img" class="w-32 h-32 object-cover rounded-lg border-2 border-gray-200">
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition text-sm sm:text-base">
                            ${isEdit ? 'Opslaan' : 'Aanmaken'}
                        </button>
                        <button type="button" onclick="closeLocationModal()" class="sm:px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition text-sm sm:text-base">
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;

    // Image preview
    document.getElementById('location-image-file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('location-preview-img').src = e.target.result;
                document.getElementById('location-image-preview').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Load location data if editing
    if (isEdit) {
        loadLocationData(locationId);
    }

    // Handle form submission
    document.getElementById('location-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveLocation(isEdit);
    });
}

// Close location modal
function closeLocationModal(event) {
    if (!event || event.target === event.currentTarget) {
        document.getElementById('modal-container').innerHTML = '';
    }
}

// Load location data for editing
async function loadLocationData(locationId) {
    try {
        const location = await apiRequest(`/locations/${locationId}`);
        
        document.getElementById('location-name').value = location.name;
        document.getElementById('location-address').value = location.address;
        document.getElementById('location-description').value = location.description || '';
        document.getElementById('location-phone').value = location.phone || '';
        document.getElementById('location-phone2').value = location.phone2 || '';
        document.getElementById('location-email').value = location.email || '';
        document.getElementById('location-email2').value = location.email2 || '';
        
        if (location.image_url) {
            const previewUrl = getImageUrl(location.image_url, './images/location-placeholder.jpg');
            document.getElementById('location-preview-img').src = previewUrl;
            document.getElementById('location-image-preview').classList.remove('hidden');
        }
    } catch (error) {
        showToast('Fout bij laden van locatie', 'error');
        closeLocationModal();
    }
}

// Edit location
function editLocation(locationId) {
    showLocationModal(locationId);
}

// Save location (create or update)
async function saveLocation(isEdit) {
    const locationId = document.getElementById('location-id').value;
    
    try {
        // Upload image first if selected
        let image_url = isEdit ? document.getElementById('location-preview-img')?.src || null : null;
        const imageFile = document.getElementById('location-image-file').files[0];
        
        console.log('📸 Location save - isEdit:', isEdit, 'imageFile:', imageFile, 'current image_url:', image_url);
        
        if (imageFile) {
            console.log('📤 Uploading new image:', imageFile.name);
            const uploadFormData = new FormData();
            uploadFormData.append('image', imageFile);
            
            const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: uploadFormData
            });
            
            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                console.error('❌ Upload failed:', errorText);
                throw new Error('Fout bij uploaden van afbeelding');
            }
            
            const uploadResult = await uploadResponse.json();
            image_url = uploadResult.path;
            console.log('✅ Image uploaded successfully:', image_url);
        } else {
            console.log('ℹ️ No new image selected, keeping existing:', image_url);
        }
        
        // Save location data
        const locationData = {
            name: document.getElementById('location-name').value,
            address: document.getElementById('location-address').value,
            description: document.getElementById('location-description').value,
            phone: document.getElementById('location-phone').value,
            phone2: document.getElementById('location-phone2').value,
            email: document.getElementById('location-email').value,
            email2: document.getElementById('location-email2').value,
            image_url
        };
        
        console.log('💾 Saving location data:', locationData);
        
        const url = isEdit 
            ? `${API_BASE_URL}/locations/${locationId}`
            : `${API_BASE_URL}/locations`;
        
        const response = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationData)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ Save failed:', error);
            throw new Error(error.error || 'Request failed');
        }

        const result = await response.json();
        console.log('✅ Location saved successfully:', result);

        showToast(isEdit ? 'Locatie bijgewerkt!' : 'Locatie toegevoegd!');
        closeLocationModal();
        loadLocations();
    } catch (error) {
        console.error('❌ Error in saveLocation:', error);
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
}

// Delete location
async function deleteLocation(locationId) {
    if (!confirm('Weet je zeker dat je deze locatie wilt verwijderen?')) {
        return;
    }

    try {
        await apiRequest(`/locations/${locationId}`, {
            method: 'DELETE'
        });
        showToast('Locatie verwijderd!');
        loadLocations();
    } catch (error) {
        showToast(error.message || 'Fout bij verwijderen', 'error');
    }
}
