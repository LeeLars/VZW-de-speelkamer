// Load all activities
async function loadActivities() {
    try {
        const activities = await apiRequest('/activities', { skipAuth: true });
        renderActivities(activities);
    } catch (error) {
        showToast('Fout bij laden van activiteiten', 'error');
    }
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
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="text-lg font-bold text-gray-800">${activity.title}</h3>
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${
                            activity.type === 'CAMP' ? 'bg-sk_yellow text-yellow-900' : 'bg-sk_pink text-white'
                        }">
                            ${activity.type === 'CAMP' ? 'Kamp' : 'Vrije Dag'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600">${formatDate(activity.start_date)}${
                        activity.end_date ? ' - ' + formatDate(activity.end_date) : ''
                    }</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="editActivity('${activity.id}')" 
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button onclick="deleteActivity('${activity.id}')" 
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="text-gray-500">Uren:</span>
                    <span class="font-medium ml-2">${activity.hours}</span>
                </div>
                <div>
                    <span class="text-gray-500">Prijs:</span>
                    <span class="font-medium ml-2">${activity.price}</span>
                </div>
            </div>
            ${activity.description ? `<p class="text-sm text-gray-600 mt-3">${activity.description}</p>` : ''}
            <a href="${activity.google_form_url}" target="_blank" 
                class="text-sm text-sk_teal hover:underline mt-2 inline-block">
                Google Form Link →
            </a>
        </div>
    `).join('');
}

// Show activity modal (create/edit)
function showActivityModal(activityId = null) {
    const isEdit = activityId !== null;
    
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800">${isEdit ? 'Activiteit Bewerken' : 'Nieuwe Activiteit'}</h2>
                </div>
                <form id="activity-form" class="p-6 space-y-4">
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
                            <input type="text" id="activity-price" required placeholder="€115 (week)"
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

                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition">
                            ${isEdit ? 'Opslaan' : 'Aanmaken'}
                        </button>
                        <button type="button" onclick="closeModal()" class="px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition">
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
    } catch (error) {
        showToast('Fout bij laden van activiteit', 'error');
        closeModal();
    }
}

// Save activity (create or update)
async function saveActivity(isEdit) {
    const activityId = document.getElementById('activity-id').value;
    const id = isEdit ? activityId : 'act' + Date.now();
    
    const data = {
        id,
        title: document.getElementById('activity-title').value,
        type: document.getElementById('activity-type').value,
        start_date: document.getElementById('activity-start-date').value,
        end_date: document.getElementById('activity-end-date').value || null,
        hours: document.getElementById('activity-hours').value,
        price: document.getElementById('activity-price').value,
        google_form_url: document.getElementById('activity-form-url').value,
        description: document.getElementById('activity-description').value || null
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
