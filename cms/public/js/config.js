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
