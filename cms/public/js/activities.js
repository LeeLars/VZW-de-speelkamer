// Store all activities for filtering
let allActivities = [];

// Load all activities
async function loadActivities() {
    try {
        allActivities = await apiRequest('/activities', { skipAuth: true });
        renderActivities(allActivities);
        setupActivityFilters();
    } catch (error) {
        showToast('Fout bij laden van activiteiten', 'error');
    }
}

// Setup filter event listeners
function setupActivityFilters() {
    const searchInput = document.getElementById('activity-search');
    const typeFilter = document.getElementById('activity-type-filter');
    const periodFilter = document.getElementById('activity-period-filter');
    
    if (searchInput) searchInput.addEventListener('input', filterActivities);
    if (typeFilter) typeFilter.addEventListener('change', filterActivities);
    if (periodFilter) periodFilter.addEventListener('change', filterActivities);
}

// Filter activities based on search and filters
function filterActivities() {
    const searchTerm = document.getElementById('activity-search')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('activity-type-filter')?.value || '';
    const periodFilter = document.getElementById('activity-period-filter')?.value || '';
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const filtered = allActivities.filter(activity => {
        // Search filter
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm) ||
                            activity.description?.toLowerCase().includes(searchTerm);
        
        // Type filter
        const matchesType = !typeFilter || activity.type === typeFilter;
        
        // Period filter
        let matchesPeriod = true;
        if (periodFilter === 'upcoming') {
            const endDate = new Date(activity.end_date || activity.start_date);
            matchesPeriod = endDate >= now;
        } else if (periodFilter === 'past') {
            const endDate = new Date(activity.end_date || activity.start_date);
            matchesPeriod = endDate < now;
        }
        
        return matchesSearch && matchesType && matchesPeriod;
    });
    
    renderActivities(filtered);
}

// Render activities list
function renderActivities(activities) {
    const container = document.getElementById('activities-list');
    
    if (activities.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 bg-white rounded-xl">
                <p class="text-gray-500">Geen activiteiten gevonden</p>
            </div>
        `;
        return;
    }

    container.innerHTML = activities.map(activity => `
        <div class="activity-card bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
            <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        <h3 class="text-base sm:text-lg font-bold text-gray-800 break-words">${activity.title}</h3>
                        <span class="px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            activity.type === 'CAMP' ? 'bg-sk_yellow text-yellow-900' : 'bg-sk_pink text-white'
                        }">
                            ${activity.type === 'CAMP' ? 'Kamp' : 'Vrije Dag'}
                        </span>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-600">${formatDate(activity.start_date)}${
                        activity.end_date ? ' - ' + formatDate(activity.end_date) : ''
                    }</p>
                </div>
                <div class="flex gap-2 shrink-0">
                    <button onclick="duplicateActivity('${activity.id}')" 
                        class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Dupliceren">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    <button onclick="editActivity('${activity.id}')" 
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Bewerken">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button onclick="deleteActivity('${activity.id}')" 
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Verwijderen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                    <span class="text-gray-500">Uren:</span>
                    <span class="font-medium ml-2">${activity.hours}</span>
                </div>
                <div>
                    <span class="text-gray-500">Prijs:</span>
                    <span class="font-medium ml-2 break-words">${activity.price}</span>
                </div>
            </div>
            ${activity.description ? `<p class="text-xs sm:text-sm text-gray-600 mt-3 break-words">${activity.description}</p>` : ''}
            <a href="${activity.google_form_url}" target="_blank" 
                class="text-xs sm:text-sm text-sk_teal hover:underline mt-2 inline-block break-all">
                Google Form Link →
            </a>
        </div>
    `).join('');
}

// Show activity modal (create/edit)
function showActivityModal(activityId = null) {
    const isEdit = activityId !== null;
    
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onclick="closeModal(event)">
            <div class="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="p-4 sm:p-6 border-b border-gray-200">
                    <h2 class="text-lg sm:text-2xl font-bold text-gray-800">${isEdit ? 'Activiteit Bewerken' : 'Nieuwe Activiteit'}</h2>
                </div>
                <form id="activity-form" class="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <input type="hidden" id="activity-id" value="${activityId || ''}">
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Titel *</label>
                            <input type="text" id="activity-title" required
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                            <select id="activity-type" required
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                                <option value="CAMP">Kamp</option>
                                <option value="FREE_DAY">Vrije Dag</option>
                                <option value="STUDY_DAY">Studiedag</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Startdatum *</label>
                            <input type="date" id="activity-start-date" required
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Einddatum</label>
                            <input type="date" id="activity-end-date"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Uren *</label>
                            <input type="text" id="activity-hours" required placeholder="09:00 - 16:00"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Prijs *</label>
                            <input type="text" id="activity-price" required placeholder="Bijv. €12,00 per dag"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Google Form URL *</label>
                        <input type="url" id="activity-form-url" required placeholder="https://forms.gle/..."
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Beschrijving</label>
                        <textarea id="activity-description" rows="3"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Praktische info (bestand)</label>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <input type="url" id="activity-practical-info" placeholder="https://voorbeeld.com/bestand.pdf"
                                class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                            <label class="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-sk_yellow/20 text-yellow-900 font-bold cursor-pointer hover:bg-sk_yellow/30 transition">
                                <input type="file" id="activity-practical-info-file" class="absolute inset-0 opacity-0 cursor-pointer">
                                Bestand uploaden
                            </label>
                        </div>
                        <p id="activity-practical-info-status" class="text-xs text-gray-500 mt-2 hidden"></p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition text-sm sm:text-base">
                            ${isEdit ? 'Opslaan' : 'Aanmaken'}
                        </button>
                        <button type="button" onclick="closeModal()" class="sm:px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition text-sm sm:text-base">
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;

    // Load activity data if editing
    if (isEdit) {
        loadActivityData(activityId);
    }

    // Handle form submission
    document.getElementById('activity-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveActivity(isEdit);
    });

    setupPracticalInfoUploader();
}

// Load activity data for editing
async function loadActivityData(activityId) {
    try {
        const activity = await apiRequest(`/activities/${activityId}`, { skipAuth: true });
        
        document.getElementById('activity-title').value = activity.title;
        document.getElementById('activity-type').value = activity.type;
        document.getElementById('activity-start-date').value = formatDateForInput(activity.start_date);
        document.getElementById('activity-end-date').value = formatDateForInput(activity.end_date);
        document.getElementById('activity-hours').value = activity.hours;
        document.getElementById('activity-price').value = activity.price;
        document.getElementById('activity-form-url').value = activity.google_form_url;
        document.getElementById('activity-description').value = activity.description || '';
        document.getElementById('activity-practical-info').value = activity.practical_info_url || '';
        updatePracticalInfoStatus(activity.practical_info_url);
    } catch (error) {
        showToast('Fout bij laden van activiteit', 'error');
        closeModal();
    }
}

// Save activity (create or update)
async function saveActivity(isEdit) {
    const activityId = document.getElementById('activity-id').value;
    const priceValue = document.getElementById('activity-price').value;
    
    const data = {
        title: document.getElementById('activity-title').value,
        type: document.getElementById('activity-type').value,
        start_date: document.getElementById('activity-start-date').value,
        end_date: document.getElementById('activity-end-date').value || null,
        hours: document.getElementById('activity-hours').value,
        price: priceValue,
        google_form_url: document.getElementById('activity-form-url').value,
        description: document.getElementById('activity-description').value || null,
        practical_info_url: document.getElementById('activity-practical-info').value || null
    };

    try {
        if (isEdit) {
            await apiRequest(`/activities/${activityId}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            showToast('Activiteit bijgewerkt!');
        } else {
            await apiRequest('/activities', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            showToast('Activiteit aangemaakt!');
        }
        
        closeModal();
        loadActivities();
    } catch (error) {
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
}

// Edit activity
function editActivity(activityId) {
    showActivityModal(activityId);
}

// Duplicate activity
async function duplicateActivity(activityId) {
    try {
        const activity = allActivities.find(a => a.id === activityId);
        if (!activity) {
            showToast('Activiteit niet gevonden', 'error');
            return;
        }
        
        // Create a copy with modified title
        const duplicate = {
            title: `${activity.title} (kopie)`,
            type: activity.type,
            start_date: activity.start_date,
            end_date: activity.end_date,
            hours: activity.hours,
            price: activity.price,
            google_form_url: activity.google_form_url,
            description: activity.description,
            practical_info_url: activity.practical_info_url
        };
        
        await apiRequest('/activities', {
            method: 'POST',
            body: JSON.stringify(duplicate)
        });
        
        showToast('Activiteit gedupliceerd!');
        loadActivities();
    } catch (error) {
        showToast(error.message || 'Fout bij dupliceren', 'error');
    }
}

// Delete activity
async function deleteActivity(activityId) {
    if (!confirm('Weet je zeker dat je deze activiteit wilt verwijderen?')) {
        return;
    }

    try {
        await apiRequest(`/activities/${activityId}`, {
            method: 'DELETE'
        });
        showToast('Activiteit verwijderd!');
        loadActivities();
    } catch (error) {
        showToast(error.message || 'Fout bij verwijderen', 'error');
    }
}

// Close modal
function closeModal(event) {
    if (!event || event.target === event.currentTarget) {
        document.getElementById('modal-container').innerHTML = '';
    }
}
