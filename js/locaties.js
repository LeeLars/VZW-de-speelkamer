// Locaties Page JavaScript

// Helper function to get proper image URL
function getImageUrl(imagePath) {
    if (!imagePath) return './images/Opvang001.jpg'; // Default fallback
    
    // If it's already a full URL (Cloudinary or other), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // Otherwise, use local path
    return imagePath;
}

// Render locations
function renderLocations() {
    const container = document.getElementById('locations-container');
    if (!container) return;
    
    console.log('🏢 Rendering locations:', DATA.locations);
    
    const colors = ['sk_teal', 'sk_pink', 'sk_yellow'];
    
    container.innerHTML = DATA.locations.map((location, index) => {
        const imageUrl = getImageUrl(location.image_url);
        console.log('📍 Location:', location.name, 'image_url:', location.image_url, 'processed:', imageUrl);
        
        const color = colors[index % colors.length];
        const colorClasses = {
            sk_teal: {
                bg: 'bg-sk_teal',
                bgLight: 'bg-sk_teal/10',
                text: 'text-sk_teal',
                border: 'border-sk_teal'
            },
            sk_pink: {
                bg: 'bg-sk_pink',
                bgLight: 'bg-sk_pink/10',
                text: 'text-pink-700',
                border: 'border-sk_pink'
            },
            sk_yellow: {
                bg: 'bg-sk_yellow',
                bgLight: 'bg-sk_yellow/10',
                text: 'text-yellow-700',
                border: 'border-sk_yellow'
            }
        };
        
        const colorClass = colorClasses[color];
        const isEven = index % 2 === 0;
        
        return `
            <div class="bg-white rounded-[3rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div class="flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}">
                    <!-- Image -->
                    <div class="lg:w-1/2 relative overflow-hidden">
                        <div class="absolute inset-0 ${colorClass.bgLight} opacity-50"></div>
                        <img src="${imageUrl}" alt="${location.name}" class="w-full h-80 lg:h-full object-cover hover:scale-110 transition-transform duration-700" onerror="console.error('❌ Failed to load image:', '${imageUrl}'); this.src='./images/Opvang001.jpg';" />
                        <div class="absolute top-6 ${isEven ? 'left-6' : 'right-6'}">
                            <div class="${colorClass.bg} text-white px-6 py-3 rounded-full font-bold shadow-lg">
                                Locatie ${index + 1}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div class="mb-6">
                            <div class="w-14 h-14 ${colorClass.bgLight} rounded-2xl flex items-center justify-center ${colorClass.text} mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">${location.name}</h2>
                            <p class="text-gray-600 leading-relaxed text-lg mb-6">
                                ${location.description}
                            </p>
                        </div>
                        
                        <div class="space-y-4">
                            <!-- Address -->
                            <div class="flex items-start gap-4 ${colorClass.bgLight} rounded-2xl p-4">
                                <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] ${colorClass.bg} rounded-xl flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-bold text-gray-800 text-sm mb-1">Adres</p>
                                    <p class="text-gray-700">${location.address}</p>
                                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}" target="_blank" class="inline-flex items-center gap-1 ${colorClass.text} text-sm font-bold mt-2 hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Contact Info -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                ${location.phone ? `
                                    <div class="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                        <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs text-gray-500 font-bold">Telefoon</p>
                                            <a href="tel:${location.phone.replace(/\s/g, '')}" class="text-gray-800 font-bold hover:${colorClass.text} text-sm block">${location.phone}</a>
                                        </div>
                                    </div>
                                ` : ''}

                                ${location.phone2 ? `
                                    <div class="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                        <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs text-gray-500 font-bold">Telefoon (2)</p>
                                            <a href="tel:${location.phone2.replace(/\s/g, '')}" class="text-gray-800 font-bold hover:${colorClass.text} text-sm block">${location.phone2}</a>
                                        </div>
                                    </div>
                                ` : ''}

                                ${location.email ? `
                                    <div class="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                        <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs text-gray-500 font-bold">Email</p>
                                            <a href="mailto:${location.email}" class="text-gray-800 font-bold hover:${colorClass.text} text-xs break-all block">${location.email}</a>
                                        </div>
                                    </div>
                                ` : ''}

                                ${location.email2 ? `
                                    <div class="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                        <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs text-gray-500 font-bold">Email (2)</p>
                                            <a href="mailto:${location.email2}" class="text-gray-800 font-bold hover:${colorClass.text} text-xs break-all block">${location.email2}</a>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderLocations();
});

// Re-render when API data is loaded
window.addEventListener('dataLoaded', function(event) {
    console.log('📍 Locaties: Data loaded event received', event.detail);
    renderLocations();
});
