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
    const featuredContainer = document.getElementById('team-featured');
    const gridContainer = document.getElementById('team-grid');
    if (!featuredContainer || !gridContainer) return;
    
    const colors = ['sk_teal', 'sk_pink', 'sk_yellow', 'sk_mint'];
    
    const createCard = (member, index, variant = 'default') => {
        const color = colors[index % colors.length];
        const colorClasses = {
            sk_teal: 'text-sk_teal bg-sk_teal/10',
            sk_pink: 'text-sk_pink bg-sk_pink/10',
            sk_yellow: 'text-yellow-700 bg-sk_yellow/10',
            sk_mint: 'text-green-800 bg-sk_mint/10'
        };
        const accent = colorClasses[color] || colorClasses.sk_teal;
        const baseCardClasses = variant === 'featured'
            ? 'lg:flex-row gap-10 text-left lg:text-left'
            : 'text-center';
        
        return `
            <div class="group bg-white rounded-[2.5rem] shadow-xl border border-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div class="flex flex-col ${variant === 'featured' ? 'lg:flex-row lg:items-center lg:gap-10' : ''} h-full p-6 sm:p-8 ${variant === 'featured' ? '' : 'text-center'}">
                    <!-- Image + Basic Info -->
                    <div class="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
                        <div class="flex-shrink-0 flex flex-col items-center lg:items-start">
                            <div class="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg bg-gray-100">
                                <img src="${getImageUrl(member.image_url || member.imageUrl)}" alt="${member.name}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            ${(member.phone || member.email) ? `
                                <div class="mt-4 flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                                    ${member.phone ? `
                                        <a href="tel:${member.phone.replace(/\s/g, '')}" class="flex items-center gap-2 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact">
                                            <span class="w-8 h-8 rounded-xl bg-sk_teal/10 text-sk_teal flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                            </span>
                                            <span class="font-medium text-sm group-hover:underline hidden sm:inline">${member.phone}</span>
                                        </a>
                                    ` : ''}
                                    ${member.email ? `
                                        <a href="mailto:${member.email}" class="flex items-center gap-2 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact">
                                            <span class="w-8 h-8 rounded-xl bg-sk_teal/10 text-sk_teal flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                            </span>
                                            <span class="font-medium text-sm group-hover:underline hidden sm:inline">${member.email.split('@')[0]}</span>
                                        </a>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex-1 space-y-4">
                            <div class="space-y-1">
                                <h3 class="text-2xl font-bold text-gray-900">${member.name}</h3>
                                ${member.role ? `<p class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${accent}">${member.role}</p>` : ''}
                            </div>
                            
                            ${member.intro ? `
                                <div class="relative overflow-hidden">
                                    <p class="text-gray-700 text-base leading-relaxed font-medium transition-all duration-300" style="max-height: ${member.showFullIntro ? 'none' : '5rem'}; overflow: hidden;">
                                        ${member.intro}
                                    </p>
                                    ${member.intro.length > 150 && !member.showFullIntro ? `
                                        <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent flex items-end justify-center pt-6">
                                            <button onclick="this.closest('[data-member]').querySelector('p').style.maxHeight = 'none'; this.parentNode.style.display = 'none'; const memberId = this.closest('[data-member]').dataset.member; const members = JSON.parse(localStorage.getItem('expandedMembers') || '[]'); if (!members.includes(memberId)) { members.push(memberId); localStorage.setItem('expandedMembers', JSON.stringify(members)); }" 
                                                    class="text-sm font-medium text-sk_teal hover:text-sk_teal-dark flex items-center gap-1">
                                                Lees meer
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const featured = DATA.team.slice(0, 2);
    const rest = DATA.team.slice(2);

    featuredContainer.innerHTML = featured.map((member, index) => createCard(member, index, 'featured')).join('') || `
        <div class="col-span-full text-gray-500 italic">Nog geen kernteam geselecteerd.</div>
    `;

    gridContainer.innerHTML = rest.map((member, index) => createCard(member, index + featured.length, 'grid')).join('') || `
        <div class="col-span-full text-gray-500 italic">Voeg meer teamleden toe om deze sectie te vullen.</div>
    `;
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
