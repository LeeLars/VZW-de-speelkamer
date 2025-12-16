function applyContactData(contact) {
    const emailEl = document.getElementById('contact-email');
    const email2El = document.getElementById('contact-email2');
    const phoneEl = document.getElementById('contact-phone');
    const phone2El = document.getElementById('contact-phone2');
    const gsmEl = document.getElementById('contact-gsm');
    const gsm2El = document.getElementById('contact-gsm2');
    const facebookEl = document.getElementById('contact-facebook');
    const addressEl = document.getElementById('contact-address');

    const email = contact?.email || '';
    const email2 = contact?.email2 || '';
    const phone = contact?.phone || '';
    const phone2 = contact?.phone2 || '';
    const gsm = contact?.gsm || '';
    const gsm2 = contact?.gsm2 || '';
    const facebook = contact?.facebook || '';
    const address = contact?.address || '';

    if (emailEl) {
        emailEl.textContent = email || emailEl.textContent;
        emailEl.href = email ? `mailto:${email}` : emailEl.href;
    }
    if (email2El) {
        email2El.textContent = email2;
        email2El.href = email2 ? `mailto:${email2}` : '#';
        email2El.classList.toggle('hidden', !email2);
    }

    if (phoneEl) {
        phoneEl.textContent = phone || phoneEl.textContent;
        phoneEl.href = phone ? `tel:${phone.replace(/\s/g, '')}` : phoneEl.href;
        phoneEl.classList.toggle('hidden', !phone);
    }
    if (phone2El) {
        phone2El.textContent = phone2;
        phone2El.href = phone2 ? `tel:${phone2.replace(/\s/g, '')}` : '#';
        phone2El.classList.toggle('hidden', !phone2);
    }

    if (gsmEl) {
        gsmEl.textContent = gsm || gsmEl.textContent;
        gsmEl.href = gsm ? `tel:${gsm.replace(/\s/g, '')}` : gsmEl.href;
        gsmEl.classList.toggle('hidden', !gsm);
    }
    if (gsm2El) {
        gsm2El.textContent = gsm2;
        gsm2El.href = gsm2 ? `tel:${gsm2.replace(/\s/g, '')}` : '#';
        gsm2El.classList.toggle('hidden', !gsm2);
    }

    if (facebookEl) {
        facebookEl.href = facebook || facebookEl.href;
        facebookEl.classList.toggle('hidden', !facebook);
    }

    if (addressEl) {
        addressEl.textContent = address || addressEl.textContent;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyContactData(DATA?.contact);
});

window.addEventListener('dataLoaded', (event) => {
    applyContactData(event?.detail?.contact || DATA?.contact);
});
