// Opvang Page JavaScript

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Reset all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-sk_teal', 'text-white', 'bg-sk_yellow', 'text-yellow-900', 'bg-sk_pink', 'shadow-lg');
        btn.classList.add('text-gray-500', 'hover:bg-gray-50');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`content-${tabName}`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Style selected button
    const selectedBtn = document.getElementById(`tab-btn-${tabName}`);
    if (selectedBtn) {
        selectedBtn.classList.remove('text-gray-500', 'hover:bg-gray-50');
        
        if (tabName === 'school') {
            selectedBtn.classList.add('bg-sk_teal', 'text-white', 'shadow-lg');
        } else if (tabName === 'kampen') {
            selectedBtn.classList.add('bg-sk_yellow', 'text-yellow-900', 'shadow-lg');
            renderActivities();
        } else if (tabName === 'studie') {
            selectedBtn.classList.add('bg-sk_pink', 'text-white', 'shadow-lg');
        }
    }
}

// Store current filter
let currentMonthFilter = 'all';

// Filter activities by month
window.filterByMonth = function(monthStr) {
    currentMonthFilter = monthStr;
    
    // Update button styles
    document.querySelectorAll('.month-filter-btn').forEach(btn => {
        btn.classList.remove('bg-sk_teal', 'text-white', 'active');
        btn.classList.add('bg-gray-100', 'text-gray-600');
    });
    
    const activeBtn = document.getElementById(`filter-${monthStr}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-gray-100', 'text-gray-600');
        activeBtn.classList.add('bg-sk_teal', 'text-white', 'active');
    }
    
    renderActivities();
}

// Build dynamic month filters
function buildMonthFilters() {
    const filtersContainer = document.getElementById('month-filters');
    if (!filtersContainer) return;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Get unique months from future activities
    const monthsSet = new Set();
    DATA.activities
        .filter(activity => {
            const endDate = new Date(activity.end_date || activity.start_date);
            return endDate >= now;
        })
        .forEach(activity => {
            const startDate = new Date(activity.start_date);
            const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
            const monthLabel = startDate.toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' });
            monthsSet.add(JSON.stringify({ key: monthKey, label: monthLabel, sort: startDate.getTime() }));
        });
    
    // Sort months chronologically
    const months = Array.from(monthsSet)
        .map(str => JSON.parse(str))
        .sort((a, b) => a.sort - b.sort);
    
    // Build filter buttons (keep "Alle Datums" button and add dynamic months)
    const allButton = filtersContainer.querySelector('#filter-all');
    filtersContainer.innerHTML = '';
    filtersContainer.appendChild(allButton);
    
    months.forEach(month => {
        const button = document.createElement('button');
        button.onclick = () => filterByMonth(month.key);
        button.id = `filter-${month.key}`;
        button.className = 'month-filter-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-white text-gray-700 border-2 border-gray-200 hover:border-sk_teal hover:text-sk_teal';
        button.textContent = month.label;
        filtersContainer.appendChild(button);
    });
}

// Render activities (kampen en vrije dagen) - Clean card grid
function renderActivities() {
    const container = document.getElementById('activities-container');
    const emptyState = document.getElementById('activities-empty');
    if (!container) return;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    let futureActivities = DATA.activities
        .filter(activity => {
            const endDate = new Date(activity.end_date || activity.start_date);
            return endDate >= now;
        })
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    
    // Apply month filter
    if (currentMonthFilter !== 'all') {
        futureActivities = futureActivities.filter(activity => {
            const startDate = new Date(activity.start_date);
            const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
            return monthKey === currentMonthFilter;
        });
    }
    
    if (futureActivities.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    container.innerHTML = futureActivities.map(activity => {
        const startDate = new Date(activity.start_date);
        const endDate = activity.end_date ? new Date(activity.end_date) : null;
        
        // Format date
        let dateStr;
        if (endDate) {
            const isSameMonth = startDate.getMonth() === endDate.getMonth();
            if (isSameMonth) {
                dateStr = `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString('nl-BE', {month: 'long'})} ${startDate.getFullYear()}`;
            } else {
                dateStr = `${startDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'short'})} - ${endDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'short', year: 'numeric'})}`;
            }
        } else {
            dateStr = startDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'long', year: 'numeric'});
        }
        
        const isCamp = activity.type === 'CAMP';
        const bgGradient = isCamp ? 'from-sk_yellow/20 to-yellow-50' : 'from-sk_pink/20 to-pink-50';
        const badgeColor = isCamp ? 'bg-sk_yellow text-yellow-900' : 'bg-sk_pink text-white';
        const badgeText = isCamp ? '🏕️ Kamp' : '📅 Vrije dag';
        const accentColor = isCamp ? 'sk_yellow' : 'sk_pink';
        
        return `
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <!-- Header with gradient -->
                <div class="bg-gradient-to-br ${bgGradient} px-6 py-5">
                    <div class="flex items-center justify-between mb-2">
                        <span class="px-3 py-1.5 rounded-full text-xs font-bold ${badgeColor} shadow-sm">${badgeText}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 group-hover:text-sk_teal transition-colors">${activity.title}</h3>
                </div>
                
                <!-- Content -->
                <div class="p-6">
                    <!-- Date -->
                    <div class="flex items-center gap-2 mb-4 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-${accentColor}">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span class="font-bold text-sm">${dateStr}</span>
                    </div>
                    
                    ${activity.description ? `<p class="text-sm text-gray-600 mb-4 line-clamp-2">${activity.description}</p>` : ''}
                    
                    <!-- Details -->
                    <div class="flex flex-wrap gap-4 mb-5 text-sm text-gray-600">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${activity.hours}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>
                            </svg>
                            <span class="font-bold">${activity.price}</span>
                        </div>
                    </div>
                    
                    <!-- CTA Button -->
                    <a href="${activity.google_form_url}" target="_blank" 
                       class="block w-full text-center bg-sk_teal text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#3d94a5] transition-all shadow-md hover:shadow-lg group-hover:scale-105">
                        📝 Inschrijven via Google Forms
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL to switch to specific tab
    const hash = window.location.hash.slice(1);
    
    // Map hash names to tab names
    const hashToTab = {
        'voor-naschools': 'school',
        'kampen': 'kampen',
        'studie': 'studie'
    };
    
    const tabName = hashToTab[hash] || 'school';
    switchTab(tabName);
    
    // Scroll to tabs section if hash is present
    if (hash && hashToTab[hash]) {
        setTimeout(() => {
            const tabsSection = document.querySelector('.tabs-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
    
    // Update hash when tab is clicked
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.id.replace('tab-btn-', '');
            const tabToHash = {
                'school': 'voor-naschools',
                'kampen': 'kampen',
                'studie': 'studie'
            };
            window.location.hash = tabToHash[tab];
        });
    });
    
    // Listen for hash changes (when clicking mega menu links)
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.slice(1);
        const newTabName = hashToHash[newHash];
        if (newTabName) {
            switchTab(newTabName);
            setTimeout(() => {
                const tabsSection = document.querySelector('.tabs-section');
                if (tabsSection) {
                    tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    });
});

// Re-render when API data is loaded
window.addEventListener('dataLoaded', function(event) {
    console.log('📊 Opvang: Data loaded event received', event.detail);
    console.log('📅 Activities from API:', DATA.activities);
    
    // Build dynamic month filters
    buildMonthFilters();
    
    // Always render activities when data is loaded
    renderActivities();
    
    // Then switch to correct tab
    const hash = window.location.hash.slice(1);
    const hashToTab = {
        'voor-naschools': 'school',
        'kampen': 'kampen',
        'studie': 'studie'
    };
    const tabName = hashToTab[hash] || 'school';
    switchTab(tabName);
});
