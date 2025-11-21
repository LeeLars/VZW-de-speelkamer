// Load all pricing
async function loadPricing() {
    try {
        const pricing = await apiRequest('/pricing', { skipAuth: true });
        renderPricing(pricing);
    } catch (error) {
        showToast('Fout bij laden van tarieven', 'error');
    }
}

// Render pricing list
function renderPricing(pricing) {
    const container = document.getElementById('pricing-list');
    
    const categoryNames = {
        'standard_rate': 'Standaard Tarief',
        'noon_rate': 'Middagtoezicht',
        'wednesday_afternoon': 'Woensdagnamiddag',
        'full_day': 'Volle Dag',
        'half_day': 'Halve Dag',
        'study_rate': 'Studiebegeleiding'
    };

    container.innerHTML = pricing.map(item => `
        <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">${categoryNames[item.category] || item.category}</h3>
                    <p class="text-sm text-gray-600 mt-1">${item.description || ''}</p>
                </div>
                <button onclick="editPricing('${item.category}')" 
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
            </div>
            <div class="text-3xl font-bold text-sk_teal">
                €${item.rate.toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Edit pricing
function editPricing(category) {
    const modalHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
            <div class="bg-white rounded-2xl max-w-md w-full" onclick="event.stopPropagation()">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800">Tarief Bewerken</h2>
                </div>
                <form id="pricing-form" class="p-6 space-y-4">
                    <input type="hidden" id="pricing-category" value="${category}">
                    
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Tarief (€) *</label>
                        <input type="number" id="pricing-rate" step="0.01" min="0" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Beschrijving</label>
                        <textarea id="pricing-description" rows="2"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none"></textarea>
                    </div>

                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition">
                            Opslaan
                        </button>
                        <button type="button" onclick="closeModal()" class="px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition">
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;

    // Load pricing data
    loadPricingData(category);

    // Handle form submission
    document.getElementById('pricing-form').addEventListener('submit', (e) => {
        e.preventDefault();
        savePricing();
    });
}

// Load pricing data
async function loadPricingData(category) {
    try {
        const pricing = await apiRequest(`/pricing/${category}`, { skipAuth: true });
        document.getElementById('pricing-rate').value = pricing.rate;
        document.getElementById('pricing-description').value = pricing.description || '';
    } catch (error) {
        showToast('Fout bij laden van tarief', 'error');
        closeModal();
    }
}

// Save pricing
async function savePricing() {
    const category = document.getElementById('pricing-category').value;
    const data = {
        rate: parseFloat(document.getElementById('pricing-rate').value),
        description: document.getElementById('pricing-description').value || null
    };

    try {
        await apiRequest(`/pricing/${category}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        showToast('Tarief bijgewerkt!');
        closeModal();
        loadPricing();
    } catch (error) {
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
}
