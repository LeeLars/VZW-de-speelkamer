// Login functionality
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    try {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            skipAuth: true
        });

        setToken(data.token);
        document.getElementById('user-name').textContent = data.user.username;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('cms-interface').classList.remove('hidden');
        
        // Load initial data
        loadActivities();
        
    } catch (error) {
        errorDiv.textContent = error.message || 'Login mislukt';
        errorDiv.classList.remove('hidden');
    }
});

// Logout functionality
function logout() {
    removeToken();
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('cms-interface').classList.add('hidden');
    document.getElementById('login-form').reset();
}

// Check if user is already logged in
async function checkAuth() {
    const token = getToken();
    if (!token) return;

    try {
        const data = await apiRequest('/auth/verify');
        document.getElementById('user-name').textContent = data.user.username;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('cms-interface').classList.remove('hidden');
        loadActivities();
    } catch (error) {
        removeToken();
    }
}

// Change password
document.getElementById('change-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const messageDiv = document.getElementById('password-message');

    try {
        await apiRequest('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });

        messageDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm';
        messageDiv.textContent = 'Wachtwoord succesvol gewijzigd!';
        messageDiv.classList.remove('hidden');
        
        document.getElementById('change-password-form').reset();
        
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 3000);
    } catch (error) {
        messageDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm';
        messageDiv.textContent = error.message || 'Wachtwoord wijzigen mislukt';
        messageDiv.classList.remove('hidden');
    }
});

// Initialize auth check on page load
checkAuth();
