// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Reset all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-sk_teal', 'text-sk_teal');
        btn.classList.add('border-transparent', 'text-gray-600');
    });
    
    // Show selected tab content
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    
    // Highlight selected tab button
    const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
    selectedBtn.classList.remove('border-transparent', 'text-gray-600');
    selectedBtn.classList.add('border-sk_teal', 'text-sk_teal');
    
    // Load data for the selected tab
    switch(tabName) {
        case 'activities':
            loadPricingOptions().then(() => loadActivities());
            break;
        case 'pricing':
            loadPricing();
            break;
        case 'team':
            loadTeam();
            break;
        case 'locations':
            loadLocations();
            break;
        case 'contact':
            loadContactSettings();
            break;
        case 'media':
            loadSiteImages();
            break;
        case 'settings':
            loadUsers();
            break;
    }
}
