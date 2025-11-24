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

// Render activities (kampen en vrije dagen)
function renderActivities() {
    const container = document.getElementById('activities-container');
    if (!container) return;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const futureActivities = DATA.activities
        .filter(activity => {
            const endDate = new Date(activity.end_date || activity.start_date);
            return endDate >= now;
        })
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    
    if (futureActivities.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="bg-gray-50 rounded-2xl p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto mb-4 text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <p class="text-gray-500 font-medium">Geen aankomende activiteiten op dit moment.</p>
                    <p class="text-gray-400 text-sm mt-2">Check later terug voor nieuwe kampen en vrije dagen!</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = futureActivities.map(activity => {
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
        const bgColor = isCamp ? 'bg-sk_yellow/10' : 'bg-sk_pink/10';
        const badgeColor = isCamp ? 'bg-sk_yellow text-yellow-900' : 'bg-sk_pink text-white';
        const badgeText = isCamp ? 'Kamp' : 'Vrije dag';
        
        return `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="${bgColor} px-5 py-4">
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-gray-800">${dateStr}</span>
                        <span class="px-3 py-1 rounded-lg text-xs font-bold uppercase ${badgeColor}">${badgeText}</span>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">${activity.title}</h3>
                    
                    ${activity.description ? `<p class="text-sm text-gray-600 mb-4">${activity.description}</p>` : ''}
                    
                    <div class="space-y-2 mb-5 text-sm text-gray-600">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>${activity.hours}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>
                            <span class="font-bold">${activity.price}</span>
                        </div>
                    </div>
                    
                    <a href="${activity.google_form_url}" target="_blank" class="block w-full text-center bg-sk_teal text-white py-3 rounded-xl text-sm font-bold hover:bg-[#3d94a5] transition-colors shadow-md hover:shadow-lg">
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
