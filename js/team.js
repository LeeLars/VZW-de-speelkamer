// Team Page JavaScript

// Helper function to get proper image URL
function getImageUrl(imagePath) {
    if (!imagePath) return './images/team.jpg'; // Default fallback
    
    // If it's already a full URL (Cloudinary or other), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // Otherwise, use local path
    return imagePath;
}

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
        
        return `
            <div class="group bg-white rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <!-- Image -->
                <div class="relative overflow-hidden h-72">
                    <div class="absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-20"></div>
                    <img src="${getImageUrl(member.image_url || member.imageUrl)}" alt="${member.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 class="text-2xl font-bold text-white mb-1">${member.name}</h3>
                        <p class="text-white/90 font-medium">${member.role}</p>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-6 space-y-3">
                    ${member.bio ? `<p class="text-gray-600 text-sm leading-relaxed">${member.bio}</p>` : ''}
                    
                    ${member.phone || member.email ? `
                        <div class="pt-3 border-t border-gray-100 space-y-2">
                            ${member.phone ? `
                                <a href="tel:${member.phone.replace(/\s/g, '')}" class="flex items-center gap-2 text-sm text-gray-700 hover:text-sk_teal transition-colors group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sk_teal flex-shrink-0">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span class="group-hover:underline">${member.phone}</span>
                                </a>
                            ` : ''}
                            ${member.email ? `
                                <a href="mailto:${member.email}" class="flex items-center gap-2 text-sm text-gray-700 hover:text-sk_teal transition-colors group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sk_teal flex-shrink-0">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <span class="group-hover:underline break-all">${member.email}</span>
                                </a>
                            ` : ''}
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
