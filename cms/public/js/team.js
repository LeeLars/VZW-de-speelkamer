// Load all team members
async function loadTeam() {
    try {
        const team = await apiRequest('/team', { skipAuth: true });
        renderTeam(team);
    } catch (error) {
        showToast('Fout bij laden van team', 'error');
    }
}

// Render team list
function renderTeam(team) {
    const container = document.getElementById('team-list');
    
    if (team.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-xl">
                <p class="text-gray-500">Geen teamleden gevonden</p>
            </div>
        `;
        return;
    }

    container.innerHTML = team.map(member => {
        const imageUrl = getImageUrl(member.image_url, './images/team.jpg');
        
        return `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${imageUrl}" alt="${member.name}" 
                    class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800">${member.name}</h3>
                <p class="text-sm text-sk_teal font-medium">${member.role}</p>
                ${member.bio ? `<p class="text-sm text-gray-600 mt-2 line-clamp-2">${member.bio}</p>` : ''}
                <div class="flex gap-2 mt-4">
                    <button onclick="editTeamMember('${member.id}')" 
                        class="flex-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium">
                        Bewerken
                    </button>
                    <button onclick="deleteTeamMember('${member.id}')" 
                        class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">
                        Verwijderen
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Show team member modal (create/edit)
function showTeamModal(memberId = null) {
    const isEdit = memberId !== null;
    
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onclick="closeModal(event)">
            <div class="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="p-4 sm:p-6 border-b border-gray-200">
                    <h2 class="text-lg sm:text-2xl font-bold text-gray-800">${isEdit ? 'Teamlid Bewerken' : 'Nieuw Teamlid'}</h2>
                </div>
                <form id="team-form" class="p-4 sm:p-6 space-y-3 sm:space-y-4" enctype="multipart/form-data">
                    <input type="hidden" id="team-id" value="${memberId || ''}">
                    
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Naam *</label>
                        <input type="text" id="team-name" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Rol *</label>
                        <input type="text" id="team-role" required placeholder="Bijv. Algemeen Coördinator"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                        <textarea id="team-bio" rows="3"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Foto</label>
                        <input type="file" id="team-image" accept="image/*"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        <p class="text-xs text-gray-500 mt-1">Max 5MB. Formaten: JPG, PNG, GIF, WebP</p>
                        ${isEdit ? '<p class="text-xs text-gray-500 mt-1">Laat leeg om huidige foto te behouden</p>' : ''}
                    </div>

                    <div id="image-preview" class="hidden">
                        <img id="preview-img" class="w-32 h-32 object-cover rounded-lg border-2 border-gray-200">
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

    // Image preview
    document.getElementById('team-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-img').src = e.target.result;
                document.getElementById('image-preview').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Load team member data if editing
    if (isEdit) {
        loadTeamMemberData(memberId);
    }

    // Handle form submission
    document.getElementById('team-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveTeamMember(isEdit);
    });
}

// Load team member data for editing
async function loadTeamMemberData(memberId) {
    try {
        const member = await apiRequest(`/team/${memberId}`, { skipAuth: true });
        
        document.getElementById('team-name').value = member.name;
        document.getElementById('team-role').value = member.role;
        document.getElementById('team-bio').value = member.bio || '';
        
        if (member.image_url) {
            const previewUrl = getImageUrl(member.image_url, './images/team.jpg');
            document.getElementById('preview-img').src = previewUrl;
            document.getElementById('image-preview').classList.remove('hidden');
        }
    } catch (error) {
        showToast('Fout bij laden van teamlid', 'error');
        closeModal();
    }
}

// Save team member (create or update)
async function saveTeamMember(isEdit) {
    const memberId = document.getElementById('team-id').value;
    const id = isEdit ? memberId : 't' + Date.now();
    
    try {
        // Upload image first if selected
        let image_url = isEdit ? document.getElementById('preview-img')?.src || './images/team.jpg' : './images/team.jpg';
        const imageFile = document.getElementById('team-image').files[0];
        
        if (imageFile) {
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
                throw new Error('Fout bij uploaden van afbeelding');
            }
            
            const uploadResult = await uploadResponse.json();
            image_url = uploadResult.path;
        }
        
        // Save team member data
        const memberData = {
            id,
            name: document.getElementById('team-name').value,
            role: document.getElementById('team-role').value,
            bio: document.getElementById('team-bio').value || '',
            image_url
        };
        
        const url = isEdit 
            ? `${API_BASE_URL}/team/${memberId}`
            : `${API_BASE_URL}/team`;
        
        const response = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Request failed');
        }

        showToast(isEdit ? 'Teamlid bijgewerkt!' : 'Teamlid aangemaakt!');
        closeModal();
        loadTeam();
    } catch (error) {
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
}

// Edit team member
function editTeamMember(memberId) {
    showTeamModal(memberId);
}

// Delete team member
async function deleteTeamMember(memberId) {
    if (!confirm('Weet je zeker dat je dit teamlid wilt verwijderen?')) {
        return;
    }

    try {
        await apiRequest(`/team/${memberId}`, {
            method: 'DELETE'
        });
        showToast('Teamlid verwijderd!');
        loadTeam();
    } catch (error) {
        showToast(error.message || 'Fout bij verwijderen', 'error');
    }
}
