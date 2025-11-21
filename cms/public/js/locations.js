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

    container.innerHTML = locations.map(location => `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div class="h-48 bg-gradient-to-br from-sk_pink to-pink-300 relative overflow-hidden">
                ${location.image ? `
                    <img src="${location.image}" alt="${location.name}" class="w-full h-full object-cover">
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
                    ${location.email ? `
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span class="truncate">${location.email}</span>
                        </div>
                    ` : ''}
                </div>
                ${location.description ? `
                    <p class="text-sm text-gray-600 mb-4 line-clamp-2">${location.description}</p>
                ` : ''}
                <div class="flex gap-2">
                    <button onclick="editLocation('${location.id}')" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                        Bewerken
                    </button>
                    <button onclick="deleteLocation('${location.id}')" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition">
                        Verwijderen
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show location modal
function showLocationModal(locationId = null) {
    currentLocationId = locationId;
    const modal = document.getElementById('location-modal');
    const form = document.getElementById('location-form');
    const title = document.getElementById('location-modal-title');

    if (locationId) {
        title.textContent = 'Locatie Bewerken';
        loadLocationData(locationId);
    } else {
        title.textContent = 'Nieuwe Locatie';
        form.reset();
    }

    modal.classList.remove('hidden');
}

// Hide location modal
function hideLocationModal() {
    document.getElementById('location-modal').classList.add('hidden');
    document.getElementById('location-form').reset();
    currentLocationId = null;
}

// Load location data for editing
async function loadLocationData(locationId) {
    try {
        const location = await apiRequest(`/locations/${locationId}`);
        document.getElementById('location-name').value = location.name;
        document.getElementById('location-address').value = location.address;
        document.getElementById('location-description').value = location.description || '';
        document.getElementById('location-phone').value = location.phone || '';
        document.getElementById('location-email').value = location.email || '';
        document.getElementById('location-image').value = location.image || '';
    } catch (error) {
        showToast('Fout bij laden van locatie', 'error');
    }
}

// Edit location
function editLocation(locationId) {
    showLocationModal(locationId);
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
        showToast('Locatie verwijderd!', 'success');
        loadLocations();
    } catch (error) {
        showToast(error.message || 'Fout bij verwijderen', 'error');
    }
}

// Save location
document.getElementById('location-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const locationData = {
        name: document.getElementById('location-name').value,
        address: document.getElementById('location-address').value,
        description: document.getElementById('location-description').value,
        phone: document.getElementById('location-phone').value,
        email: document.getElementById('location-email').value,
        image: document.getElementById('location-image').value
    };

    try {
        if (currentLocationId) {
            await apiRequest(`/locations/${currentLocationId}`, {
                method: 'PUT',
                body: JSON.stringify(locationData)
            });
            showToast('Locatie bijgewerkt!', 'success');
        } else {
            await apiRequest('/locations', {
                method: 'POST',
                body: JSON.stringify(locationData)
            });
            showToast('Locatie toegevoegd!', 'success');
        }

        hideLocationModal();
        loadLocations();
    } catch (error) {
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
});
