// API Configuration
// Default to same-origin so CMS + API work reliably regardless of the hostname the CMS is served from.
// Local dev can still use the backend at :3001.
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/api'
    : `${window.location.origin}/api`;

// Helper function to get proper image URL (supports both Cloudinary and local paths)
function getImageUrl(imagePath, fallback = './images/placeholder.jpg') {
    if (!imagePath) return fallback;
    
    // If it's already a full URL (Cloudinary), return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // If it's a relative path starting with ./, keep it as-is (for default images)
    if (imagePath.startsWith('./images/')) {
        return imagePath;
    }
    
    // If it's an old local upload path, convert to absolute URL
    if (imagePath.includes('/uploads/')) {
        const filename = imagePath.split('/').pop();
        return `${API_BASE_URL.replace('/api', '')}/uploads/${filename}`;
    }
    
    // Fallback
    return imagePath || fallback;
}

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

    if (!options.skipAuth) {
        if (!token) {
            throw new Error('No token provided');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401 && !options.skipAuth) {
            removeToken();
            document.getElementById('login-screen')?.classList.remove('hidden');
            document.getElementById('cms-interface')?.classList.add('hidden');
        }

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

// Toggle password visibility
function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    
    if (input.type === 'password') {
        input.type = 'text';
        // Eye with slash (hidden)
        icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        input.type = 'password';
        // Eye (visible)
        icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
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
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onclick="closeUserModal(event)">
            <div class="bg-white rounded-xl sm:rounded-2xl max-w-md w-full" onclick="event.stopPropagation()">
                <div class="p-4 sm:p-6 border-b border-gray-200">
                    <h3 class="text-lg sm:text-2xl font-bold text-gray-800">Nieuwe Gebruiker Toevoegen</h3>
                </div>
                <form id="add-user-form" class="p-4 sm:p-6 space-y-3 sm:space-y-4" novalidate>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Gebruikersnaam</label>
                        <input type="text" id="new-username"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Wachtwoord</label>
                        <div class="relative">
                            <input type="password" id="new-user-password"
                                class="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                            <button type="button" onclick="togglePasswordVisibility('new-user-password', 'toggle-new-user-icon')" 
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition">
                                <svg id="toggle-new-user-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Minimaal 8 karakters</p>
                    </div>
                    <div id="add-user-message" class="hidden"></div>
                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition text-sm sm:text-base">
                            Gebruiker Aanmaken
                        </button>
                        <button type="button" onclick="closeUserModal()" class="sm:px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition text-sm sm:text-base">
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
