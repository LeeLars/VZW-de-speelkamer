// VZW De Speelkamer - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Set active navigation link
    updateActiveNav();
    renderFooterLocations();
    hydrateSiteImages();
});

function renderFooterLocations() {
    const container = document.getElementById('footer-locations-list');
    if (!container) return;

    const locations = (window.DATA && Array.isArray(window.DATA.locations)) ? window.DATA.locations : [];
    if (!locations.length) {
        container.innerHTML = '<li class="text-gray-500 text-sm">Locaties laden...</li>';
        return;
    }

    container.innerHTML = locations.map(location => {
        const name = location?.name || '';
        const address = location?.address || '';
        const label = address ? `${name} – ${address}` : name;
        return `
            <li>
                <a href="../locaties/" class="text-gray-600 hover:text-sk_teal text-sm transition-colors">${label}</a>
            </li>
        `;
    }).join('');
}

// Update active navigation state
function updateActiveNav() {
    const currentPath = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let linkSlug;
        if (href.startsWith('../')) {
            linkSlug = href.split('/')[2];
        } else {
            linkSlug = href.replace(/^\//, '');
        }
        const isActive = linkSlug === currentPath;
        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Format date to Dutch locale
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-BE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Format date range
function formatDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (end) {
        return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('nl-BE', {month: 'short'})}`;
    }
    return start.toLocaleDateString('nl-BE', {day: 'numeric', month: 'short'});
}

// Check if activity is in the future
function isFutureActivity(activity) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const endDate = new Date(activity.endDate || activity.startDate);
    return endDate >= now;
}

// Filter and sort activities
function getFutureActivities() {
    return DATA.activities
        .filter(isFutureActivity)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

// Get location by ID
function getLocationById(id) {
    return DATA.locations.find(loc => loc.id === id);
}

// Get team member by ID
function getTeamMemberById(id) {
    return DATA.team.find(member => member.id === id);
}

// Show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="flex justify-center items-center py-12"><div class="loading"></div></div>';
    }
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p class="text-red-800">${message}</p>
            </div>
        `;
    }
}

// Initialize page
window.addEventListener('load', () => {
    updateActiveNav();
    console.log('VZW De Speelkamer website loaded successfully! 🎉');
});

window.addEventListener('dataLoaded', () => {
    renderFooterLocations();
});

// ===== Site images helpers =====
function getSiteImageByKey(key) {
    if (!key) return null;
    return (DATA.siteImages || []).find(image => image.image_key === key);
}

function getSiteImageUrl(key, fallback) {
    const image = getSiteImageByKey(key);
    return image && image.image_url ? image.image_url : fallback;
}

function hydrateSiteImages() {
    const elements = document.querySelectorAll('[data-site-image]');
    elements.forEach(el => {
        const key = el.getAttribute('data-site-image');
        if (!key) return;
        const fallback = el.getAttribute('data-site-image-fallback') || (el.tagName === 'IMG' ? el.getAttribute('src') : null);
        const url = getSiteImageUrl(key, fallback);
        if (!url) return;

        if (el.tagName === 'IMG') {
            if (el.getAttribute('src') !== url) {
                el.setAttribute('src', url);
            }
        } else {
            el.style.backgroundImage = `url('${url}')`;
        }
    });
}

window.addEventListener('dataLoaded', hydrateSiteImages);
