// Team Page JavaScript

// Render team members
function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return;
    
    const colors = ['sk_teal', 'sk_pink', 'sk_yellow', 'sk_mint'];
    
    container.innerHTML = DATA.team.map((member, index) => {
        const color = colors[index % colors.length];
        const colorClasses = {
            sk_teal: 'from-sk_teal to-[#3d94a5]',
            sk_pink: 'from-sk_pink to-[#e67d7f]',
            sk_yellow: 'from-sk_yellow to-[#ead95f]',
            sk_mint: 'from-sk_mint to-[#a3c78e]'
        };
        
        // Get location names
        const locationNames = member.locationIds
            .map(id => {
                const location = DATA.locations.find(loc => loc.id === id);
                return location ? location.name : '';
            })
            .filter(name => name)
            .join(', ');
        
        return `
            <div class="group bg-white rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <!-- Image -->
                <div class="relative overflow-hidden h-72">
                    <div class="absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-20"></div>
                    <img src="${member.imageUrl}" alt="${member.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 class="text-2xl font-bold text-white mb-1">${member.name}</h3>
                        <p class="text-white/90 font-medium">${member.role}</p>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-6">
                    ${member.bio ? `<p class="text-gray-600 text-sm mb-4 leading-relaxed">${member.bio}</p>` : ''}
                    
                    ${locationNames ? `
                        <div class="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400 flex-shrink-0 mt-0.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div>
                                <p class="text-xs text-gray-500 font-bold mb-1">Actief op:</p>
                                <p class="text-sm text-gray-700 font-medium">${locationNames}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderTeam();
});

// Re-render when API data is loaded
window.addEventListener('dataLoaded', function(event) {
    console.log('👥 Team: Data loaded event received', event.detail);
    renderTeam();
});
