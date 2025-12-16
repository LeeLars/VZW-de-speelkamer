// Contact Page Settings (CMS)

async function loadContactSettings() {
    try {
        const contact = await apiRequest('/contact', { skipAuth: true });
        renderContactSettings(contact || {});
    } catch (error) {
        showToast('Fout bij laden van contactgegevens', 'error');
    }
}

function renderContactSettings(contact) {
    const container = document.getElementById('contact-settings');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 max-w-3xl">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Contactpagina</h2>
            <p class="text-sm text-gray-500 mb-6">Beheer de gegevens die zichtbaar zijn op de publieke contactpagina.</p>

            <form id="contact-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">E-mailadres</label>
                        <input type="email" id="contact-email" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.email || ''}">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">E-mailadres (2)</label>
                        <input type="email" id="contact-email2" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.email2 || ''}">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Telefoon</label>
                        <input type="tel" id="contact-phone" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.phone || ''}">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Telefoon (2)</label>
                        <input type="tel" id="contact-phone2" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.phone2 || ''}">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">GSM</label>
                        <input type="tel" id="contact-gsm" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.gsm || ''}">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">GSM (2)</label>
                        <input type="tel" id="contact-gsm2" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.gsm2 || ''}">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Adres</label>
                    <input type="text" id="contact-address" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.address || ''}">
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                    <input type="url" id="contact-facebook" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sk_teal focus:ring-2 focus:ring-sk_teal/20 outline-none" value="${contact.facebook || ''}">
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full sm:w-auto bg-sk_teal text-white font-bold px-6 py-3 rounded-xl hover:bg-[#3d94a5] transition">
                        Opslaan
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveContactSettings();
    });
}

async function saveContactSettings() {
    try {
        const payload = {
            email: document.getElementById('contact-email').value || '',
            email2: document.getElementById('contact-email2').value || '',
            phone: document.getElementById('contact-phone').value || '',
            phone2: document.getElementById('contact-phone2').value || '',
            gsm: document.getElementById('contact-gsm').value || '',
            gsm2: document.getElementById('contact-gsm2').value || '',
            address: document.getElementById('contact-address').value || '',
            facebook: document.getElementById('contact-facebook').value || ''
        };

        await apiRequest('/contact', {
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        showToast('Contactgegevens opgeslagen!');
        loadContactSettings();
    } catch (error) {
        showToast(error.message || 'Fout bij opslaan', 'error');
    }
}
