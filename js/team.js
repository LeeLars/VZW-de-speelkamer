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
                    <!-- Image + Basic Info + Intro -->
                    <div class="flex ${variant === 'featured' ? 'flex-col lg:flex-row lg:items-center gap-6' : 'flex-col items-center'} gap-4">
                        <div class="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg bg-gray-100">
                            <img src="${getImageUrl(member.image_url || member.imageUrl)}" alt="${member.name}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div class="${variant === 'featured' ? 'space-y-3 text-left' : 'space-y-1'}">
                            <h3 class="text-2xl font-bold text-gray-900">${member.name}</h3>
                            ${member.role ? `<p class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${accent}">${member.role}</p>` : ''}
                            ${member.intro ? `
                            <div class="intro-section">
                                <p class="intro-text mt-2 text-gray-700 text-base leading-relaxed font-medium line-clamp-5 overflow-hidden max-h-[5rem] transition-all duration-300">${member.intro}</p>
                                <button class="intro-toggle mt-2 text-sk_teal hover:text-sk_teal/80 text-sm font-medium transition-colors" data-expanded="false">
                                    Meer info
                                </button>
                            </div>
                        ` : ''}
                        </div>
                    </div>
                    
                    ${(member.phone || member.email) ? `
                        <div class="mt-auto pt-6 border-t border-dashed border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ${variant === 'featured' ? 'text-left' : 'text-left sm:text-center'}">
                            ${member.phone ? `
                                <a href="tel:${member.phone.replace(/\s/g, '')}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact ${variant === 'featured' ? '' : 'justify-center'}">
                                    <span class="w-10 h-10 rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </span>
                                    <span class="font-semibold group-hover:underline">${member.phone}</span>
                                </a>
                            ` : ''}
                            ${member.email ? `
                                <a href="mailto:${member.email}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact ${variant === 'featured' ? '' : 'justify-center'}">
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
    };

    const featured = DATA.team.slice(0, 2);
    const rest = DATA.team.slice(2);

    featuredContainer.innerHTML = featured.map((member, index) => createCard(member, index, 'featured')).join('') || `
        <div class="col-span-full text-gray-500 italic">Nog geen kernteam geselecteerd.</div>
    `;

    gridContainer.innerHTML = rest.map((member, index) => createCard(member, index + featured.length, 'grid')).join('') || `
        <div class="col-span-full text-gray-500 italic">Voeg meer teamleden toe om deze sectie te vullen.</div>
    `;

    // Add event listeners for intro toggles
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('intro-toggle')) {
            const button = e.target;
            const introText = button.previousElementSibling;
            const isExpanded = button.dataset.expanded === 'true';
            
            if (isExpanded) {
                introText.classList.add('max-h-[5rem]', 'line-clamp-5', 'overflow-hidden');
                introText.classList.remove('max-h-none');
                button.textContent = 'Meer info';
                button.dataset.expanded = 'false';
            } else {
                introText.classList.remove('max-h-[5rem]', 'line-clamp-5', 'overflow-hidden');
                introText.classList.add('max-h-none');
                button.textContent = 'Minder info';
                button.dataset.expanded = 'true';
            }
        }
    });
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
