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
            generateMonthFilters();
            renderActivities();
        } else if (tabName === 'studie') {
            selectedBtn.classList.add('bg-sk_pink', 'text-white', 'shadow-lg');
        }
    }
}

// Store current filter
let currentMonthFilter = 'all';

// Generate month filter buttons dynamically based on available activities
function generateMonthFilters() {
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-2.mb-8');
    if (!filterContainer) return;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Get all future activities
    const futureActivities = DATA.activities.filter(activity => {
        const endDate = new Date(activity.end_date || activity.start_date);
        return endDate >= now;
    });
    
    // Get unique months that have activities
    const monthsWithActivities = new Set();
    futureActivities.forEach(activity => {
        const startDate = new Date(activity.start_date);
        const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
        monthsWithActivities.add(monthKey);
    });
    
    // Sort months chronologically
    const sortedMonths = Array.from(monthsWithActivities).sort();
    
    // Generate filter buttons
    let filtersHTML = `
        <button onclick="filterByMonth('all')" id="filter-all" class="month-filter-btn active px-4 py-2 rounded-full text-sm font-bold transition-all bg-sk_teal text-white">
            Alle Datums
        </button>
    `;
    
    sortedMonths.forEach(monthKey => {
        const [year, month] = monthKey.split('-');
        const date = new Date(year, parseInt(month) - 1, 1);
        const monthName = date.toLocaleDateString('nl-BE', { month: 'long' });
        const yearShort = year.slice(2);
        
        filtersHTML += `
            <button onclick="filterByMonth('${monthKey}')" id="filter-${monthKey}" class="month-filter-btn px-4 py-2 rounded-full text-sm font-bold transition-all bg-gray-100 text-gray-600 hover:bg-gray-200">
                ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} '${yearShort}
            </button>
        `;
    });
    
    filterContainer.innerHTML = filtersHTML;
}

// Filter activities by month
function filterByMonth(monthStr) {
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

// Render activities (kampen en vrije dagen) - Timeline view
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
    
    // Group by month for timeline
    const groupedByMonth = {};
    futureActivities.forEach(activity => {
        const startDate = new Date(activity.start_date);
        const monthKey = startDate.toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' });
        if (!groupedByMonth[monthKey]) {
            groupedByMonth[monthKey] = [];
        }
        groupedByMonth[monthKey].push(activity);
    });
    
    container.innerHTML = Object.entries(groupedByMonth).map(([month, activities]) => `
        <!-- Month Section -->
        <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 rounded-full bg-sk_teal"></div>
                <h3 class="text-2xl font-bold text-gray-800 capitalize">${month}</h3>
                <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div class="space-y-4 pl-6 border-l-2 border-gray-200">
                ${activities.map(activity => {
                    const startDate = new Date(activity.start_date);
                    const endDate = activity.end_date ? new Date(activity.end_date) : null;
                    
                    let dateStr;
                    if (endDate) {
                        const isSameMonth = startDate.getMonth() === endDate.getMonth();
                        if (isSameMonth) {
                            dateStr = `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString('nl-BE', {month: 'short'})}`;
                        } else {
                            dateStr = `${startDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'short'})} - ${endDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'short'})}`;
                        }
                    } else {
                        dateStr = startDate.toLocaleDateString('nl-BE', {day: 'numeric', month: 'long'});
                    }
                    
                    const isCamp = activity.type === 'CAMP';
                    const accentColor = isCamp ? 'sk_yellow' : 'sk_pink';
                    const badgeColor = isCamp ? 'bg-sk_yellow text-yellow-900' : 'bg-sk_pink text-white';
                    const badgeText = isCamp ? '🏕️ Kamp' : '📅 Vrije dag';
                    const statusValue = (activity.status || 'geopend').toLowerCase();
                    const hasStatus = isCamp;
                    const isVolzet = isCamp && statusValue === 'volzet';
                    const statusBadge = hasStatus ? `
                        <span class="px-3 py-1 rounded-lg text-xs font-bold ${isVolzet ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">${isVolzet ? 'Volzet' : 'Geopend'}</span>
                    ` : '';
                    const practicalInfoArg = activity.practical_info_url 
                        ? `'${activity.practical_info_url.replace(/'/g, "\\'")}'`
                        : "null";
                    
                    return `
                        <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-${accentColor} ml-[-2px]">
                            <div class="p-6">
                                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <span class="px-3 py-1 rounded-lg text-xs font-bold ${badgeColor}">${badgeText}</span>
                                            ${statusBadge}
                                            <span class="text-sm font-bold text-gray-500">${dateStr}</span>
                                        </div>
                                        <h4 class="text-xl font-bold text-gray-800 mb-2">${activity.title}</h4>
                                        ${activity.description ? `<p class="text-sm text-gray-600 mb-3">${activity.description}</p>` : ''}
                                    </div>
                                </div>
                                
                                <div class="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="9" y="2" width="6" height="4" rx="2"></rect>
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            <path d="M9 14h6"></path>
                                            <path d="M9 18h6"></path>
                                            <path d="M9 10h6"></path>
                                        </svg>
                                        <span>${activity.hours}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>
                                        </svg>
                                        <span class="font-bold text-${accentColor}">${activity.price}</span>
                                    </div>
                                </div>
                                
                                <div class="flex flex-wrap gap-3">
                                    <a href="${activity.google_form_url}" target="_blank" 
                                       class="inline-flex items-center justify-center gap-2 bg-sk_teal text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#3d94a5] transition-all shadow-md hover:shadow-lg hover:scale-105 ${isVolzet ? 'opacity-50 cursor-not-allowed pointer-events-none hover:shadow-md hover:scale-100' : ''}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="12" y1="18" x2="12" y2="12"></line>
                                            <line x1="9" y1="15" x2="15" y2="15"></line>
                                        </svg>
                                        Inschrijven
                                    </a>
                                    ${activity.practical_info_url ? `
                                        <button type="button"
                                            onclick="openPracticalInfo(${practicalInfoArg})"
                                            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border border-sk_yellow/60 text-yellow-900 bg-white hover:bg-sk_yellow/10 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sk_yellow/50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M8 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                                                <path d="M8 2v4h8"></path>
                                                <path d="M9 12h6"></path>
                                                <path d="M9 16h6"></path>
                                            </svg>
                                            Praktische info
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function openPracticalInfo(url) {
    if (!url) return;
    const popup = window.open(
        url,
        'practicalInfo',
        'width=900,height=700,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes'
    );
    if (popup) {
        popup.focus();
    } else {
        window.open(url, '_blank', 'noopener');
    }
}

// Practical Info Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('practical-info-modal');
    const openBtn = document.getElementById('practical-info-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const closeBottomBtn = document.getElementById('close-modal-bottom-btn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (closeBottomBtn) {
        closeBottomBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});

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
    
    // Generate filters and render activities when data is loaded
    generateMonthFilters();
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
