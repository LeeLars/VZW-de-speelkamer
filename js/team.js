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
            <div class="group bg-white rounded-[2.5rem] shadow-xl border border-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div class="flex flex-col h-full p-6 sm:p-8 text-center">
                    <!-- Image + Basic Info -->
                    <div class="flex flex-col items-center gap-4">
                        <div class="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg">
                            <div class="absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-30 mix-blend-multiply"></div>
                            <img src="${getImageUrl(member.image_url || member.imageUrl)}" alt="${member.name}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-2xl font-bold text-gray-900">${member.name}</h3>
                            ${member.role ? `<p class="text-sk_teal font-semibold text-sm uppercase tracking-wide">${member.role}</p>` : ''}
                        </div>
                    </div>
                    
                    <!-- Intro -->
                    ${member.intro ? `<p class="mt-4 text-gray-700 text-base leading-relaxed font-medium">${member.intro}</p>` : ''}
                    
                    ${(member.phone || member.email) ? `
                        <div class="mt-auto pt-6 border-t border-dashed border-gray-200 flex flex-col gap-3 text-left sm:text-center">
                            ${member.phone ? `
                                <a href="tel:${member.phone.replace(/\s/g, '')}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact justify-center">
                                    <span class="w-10 h-10 rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </span>
                                    <span class="font-semibold group-hover:underline">${member.phone}</span>
                                </a>
                            ` : ''}
                            ${member.email ? `
                                <a href="mailto:${member.email}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact justify-center">
                                    <span class="w-10 h-10 aspect-square rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </span>
                                    <span class="font-semibold break-all group-hover:underline">${member.email}</span>
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
