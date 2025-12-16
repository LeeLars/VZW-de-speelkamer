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
            <div class="group bg-white rounded-[2.5rem] shadow-xl border border-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full team-member">
                <div class="flex flex-col h-full p-6 sm:p-8 text-center">
                    <div class="flex flex-col items-center gap-4">
                        <div class="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg bg-gray-100">
                            <img src="${getImageUrl(member.image_url || member.imageUrl)}" alt="${member.name}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div class="space-y-1 min-w-0 w-full">
                            <h3 class="text-2xl font-bold text-gray-900">${member.name}</h3>
                            ${member.role ? `<p class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${accent}">${member.role}</p>` : ''}
                            ${member.intro ? `<p data-intro class="mt-4 text-gray-700 text-base leading-relaxed font-medium overflow-hidden transition-[max-height] duration-300 w-full max-w-full break-words [overflow-wrap:anywhere]" style="max-height: 5rem">${member.intro}</p>` : ''}
                            ${member.intro ? `<button class="text-sk_teal text-sm font-semibold mt-2 toggle-intro">Meer info</button>` : ''}
                        </div>
                    </div>

                    ${(member.phone || member.phone2 || member.email || member.email2) ? `
                        <div class="mt-auto pt-6 border-t border-dashed border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left sm:text-center">
                            ${member.phone ? `
                                    <a href="tel:${member.phone.replace(/\s/g, '')}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact min-w-0 justify-center sm:justify-start">
                                        <span class="w-10 h-10 rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </span>
                                        <span class="font-semibold group-hover:underline min-w-0 break-words [overflow-wrap:anywhere]">${member.phone}</span>
                                    </a>
                                ` : ''}
                                ${member.phone2 ? `
                                    <a href="tel:${member.phone2.replace(/\s/g, '')}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact min-w-0 justify-center sm:justify-start">
                                        <span class="w-10 h-10 rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </span>
                                        <span class="font-semibold group-hover:underline min-w-0 break-words [overflow-wrap:anywhere]">${member.phone2}</span>
                                    </a>
                                ` : ''}
                                ${member.email ? `
                                    <a href="mailto:${member.email}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact min-w-0 justify-center sm:justify-start">
                                        <span class="w-10 h-10 aspect-square rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </span>
                                        <span class="font-semibold min-w-0 w-full max-w-full break-words [overflow-wrap:anywhere] group-hover:underline">${member.email}</span>
                                    </a>
                                ` : ''}
                                ${member.email2 ? `
                                    <a href="mailto:${member.email2}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-sk_teal transition-colors group/contact min-w-0 justify-center sm:justify-start">
                                        <span class="w-10 h-10 aspect-square rounded-2xl bg-sk_teal/10 text-sk_teal flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </span>
                                        <span class="font-semibold min-w-0 w-full max-w-full break-words [overflow-wrap:anywhere] group-hover:underline">${member.email2}</span>
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
}

function initIntroToggles() {
    document.querySelectorAll('.team-member').forEach((card) => {
        const intro = card.querySelector('p[data-intro]');
        const button = card.querySelector('.toggle-intro');
        if (!intro || !button) return;

        intro.style.maxHeight = '5rem';
        button.textContent = 'Meer info';
        button.dataset.expanded = 'false';

        requestAnimationFrame(() => {
            const collapsedPx = 5 * 16;
            const isOverflowing = intro.scrollHeight > collapsedPx + 1;
            button.classList.toggle('hidden', !isOverflowing);
        });

        if (!button.dataset.bound) {
            button.addEventListener('click', (e) => {
                const btn = e.currentTarget;
                const c = btn.closest('.team-member');
                const p = c?.querySelector('p[data-intro]');
                if (!p) return;

                const expanded = btn.dataset.expanded === 'true';
                if (expanded) {
                    p.style.maxHeight = '5rem';
                    btn.textContent = 'Meer info';
                    btn.dataset.expanded = 'false';
                } else {
                    p.style.maxHeight = `${p.scrollHeight}px`;
                    btn.textContent = 'Minder info';
                    btn.dataset.expanded = 'true';
                }
            });
            button.dataset.bound = 'true';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderTeam();
    initIntroToggles();
});

// Re-render when API data is loaded
window.addEventListener('dataLoaded', function(event) {
    console.log('👥 Team: Data loaded event received', event.detail);
    renderTeam();
    initIntroToggles();
});
