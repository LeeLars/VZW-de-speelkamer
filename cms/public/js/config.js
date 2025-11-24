// API Configuration
// Automatically detect if running locally or in production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/api'
    : 'https://vzw-de-speelkamer-production.up.railway.app/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('cms_token');
}

// Set token in localStorage
function setToken(token) {
    localStorage.setItem('cms_token', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('cms_token');
}

// API request helper
async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white font-bold`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Format date for input field
function formatDateForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// ===== USER MANAGEMENT FUNCTIONS =====

// Load all users
async function loadUsers() {
    try {
        const users = await apiRequest('/auth/users');
        renderUsers(users);
    } catch (error) {
        showToast('Fout bij laden van gebruikers', 'error');
    }
}

// Render users list
function renderUsers(users) {
    const container = document.getElementById('users-list');
    
    if (!container) return;
    
    if (users.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">Geen gebruikers gevonden</p>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
                <p class="font-bold text-gray-800">${user.username}</p>
                <p class="text-xs text-gray-500">Aangemaakt: ${new Date(user.created_at).toLocaleDateString('nl-BE')}</p>
            </div>
            <button onclick="deleteUser('${user.id}', '${user.username}')" 
                class="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition">
                Verwijderen
            </button>
        </div>
    `).join('');
}

// Show add user modal
function showAddUserModal() {
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="closeUserModal(event)">
            <div class="bg-white rounded-2xl max-w-md w-full" onclick="event.stopPropagation()">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-2xl font-bold text-gray-800">Nieuwe Gebruiker Toevoegen</h3>
                </div>
                <form id="add-user-form" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Gebruikersnaam *</label>
                        <input type="text" id="new-username" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Wachtwoord *</label>
                        <input type="password" id="new-user-password" required minlength="8"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                        <p class="text-xs text-gray-500 mt-1">Minimaal 8 karakters</p>
                    </div>
                    <div id="add-user-message" class="hidden"></div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition">
                            Gebruiker Aanmaken
                        </button>
                        <button type="button" onclick="closeUserModal()" class="px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition">
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.getElementById('modal-container').innerHTML = modalHTML;
    
    // Handle form submission
    document.getElementById('add-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createUser();
    });
}

// Create new user
async function createUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-user-password').value;
    const messageEl = document.getElementById('add-user-message');
    
    try {
        await apiRequest('/auth/users', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        showToast('Gebruiker succesvol aangemaakt!');
        closeUserModal();
        loadUsers();
    } catch (error) {
        messageEl.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm';
        messageEl.textContent = error.message || 'Fout bij aanmaken van gebruiker';
        messageEl.classList.remove('hidden');
    }
}

// Delete user
async function deleteUser(userId, username) {
    if (!confirm(`Weet je zeker dat je gebruiker "${username}" wilt verwijderen?`)) {
        return;
    }
    
    try {
        await apiRequest(`/auth/users/${userId}`, {
            method: 'DELETE'
        });
        
        showToast('Gebruiker verwijderd!');
        loadUsers();
    } catch (error) {
        showToast(error.message || 'Fout bij verwijderen van gebruiker', 'error');
    }
}

// Close user modal
function closeUserModal(event) {
    if (!event || event.target === event.currentTarget) {
        document.getElementById('modal-container').innerHTML = '';
    }
}
