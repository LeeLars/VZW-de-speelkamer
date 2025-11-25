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
                <div class="p-6">
                    ${member.bio ? `<p class="text-gray-600 text-sm leading-relaxed">${member.bio}</p>` : ''}
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
