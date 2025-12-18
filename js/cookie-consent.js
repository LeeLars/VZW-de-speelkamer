// Cookie Consent Banner for VZW De Speelkamer
// GDPR-compliant cookie consent management

(function() {
    'use strict';

    const CONSENT_KEY = 'vzw_speelkamer_cookie_consent';
    const CONSENT_VERSION = '1.0';

    // Check if consent was already given
    function getConsent() {
        try {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data.version === CONSENT_VERSION) {
                    return data.consent;
                }
            }
        } catch (e) {
            console.warn('Could not read cookie consent:', e);
        }
        return null;
    }

    // Save consent choice
    function saveConsent(consent) {
        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify({
                consent: consent,
                version: CONSENT_VERSION,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            console.warn('Could not save cookie consent:', e);
        }
    }

    // Load analytics script (Umami)
    function loadAnalytics() {
        if (document.getElementById('umami-script')) return;
        
        const script = document.createElement('script');
        script.id = 'umami-script';
        script.defer = true;
        script.src = 'https://cloud.umami.is/script.js';
        script.setAttribute('data-website-id', '287d30bc-2b64-4a9e-b0e6-3d7a274d9643');
        document.head.appendChild(script);
    }

    // Remove analytics if declined
    function removeAnalytics() {
        const script = document.getElementById('umami-script');
        if (script) {
            script.remove();
        }
    }

    // Create and show the cookie banner
    function showBanner() {
        if (document.getElementById('cookie-consent-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-banner-overlay"></div>
            <div class="cookie-banner-container">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </div>
                    <div class="cookie-banner-text">
                        <h3>Cookies & Privacy</h3>
                        <p>Wij gebruiken cookies om onze website te verbeteren. We gebruiken <strong>Umami Analytics</strong>, een privacy-vriendelijke tool die geen persoonlijke gegevens verzamelt.</p>
                        <a href="./privacy/" class="cookie-banner-link">Lees ons privacybeleid</a>
                    </div>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Weigeren</button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accepteren</button>
                </div>
            </div>
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.id = 'cookie-consent-styles';
        styles.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                font-family: 'ABeeZee', sans-serif;
            }

            .cookie-banner-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(2px);
            }

            .cookie-banner-container {
                position: relative;
                max-width: 600px;
                margin: 0 auto 1.5rem;
                background: white;
                border-radius: 1.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                padding: 1.5rem;
                margin-left: 1rem;
                margin-right: 1rem;
                animation: slideUp 0.4s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .cookie-banner-content {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.25rem;
            }

            .cookie-banner-icon {
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #B8D7A3 0%, #4AB1C4 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .cookie-banner-text h3 {
                font-size: 1.125rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0 0 0.5rem 0;
            }

            .cookie-banner-text p {
                font-size: 0.875rem;
                color: #6b7280;
                margin: 0 0 0.5rem 0;
                line-height: 1.5;
            }

            .cookie-banner-link {
                font-size: 0.875rem;
                color: #4AB1C4;
                text-decoration: none;
                font-weight: 500;
            }

            .cookie-banner-link:hover {
                text-decoration: underline;
            }

            .cookie-banner-buttons {
                display: flex;
                gap: 0.75rem;
                justify-content: flex-end;
            }

            .cookie-btn {
                padding: 0.625rem 1.25rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                font-family: inherit;
            }

            .cookie-btn-decline {
                background: #f3f4f6;
                color: #6b7280;
            }

            .cookie-btn-decline:hover {
                background: #e5e7eb;
                color: #374151;
            }

            .cookie-btn-accept {
                background: linear-gradient(135deg, #4AB1C4 0%, #3a9db0 100%);
                color: white;
                box-shadow: 0 4px 14px -3px rgba(74, 177, 196, 0.4);
            }

            .cookie-btn-accept:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px -3px rgba(74, 177, 196, 0.5);
            }

            @media (max-width: 480px) {
                .cookie-banner-container {
                    margin: 0 0.75rem 1rem;
                    padding: 1.25rem;
                }

                .cookie-banner-content {
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .cookie-banner-icon {
                    width: 40px;
                    height: 40px;
                }

                .cookie-banner-buttons {
                    flex-direction: column-reverse;
                }

                .cookie-btn {
                    width: 100%;
                    text-align: center;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(banner);

        // Fix privacy link path based on current page location
        const privacyLink = banner.querySelector('.cookie-banner-link');
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('/index.html') && !path.includes('/home/') && !path.includes('/contact/') && !path.includes('/team/') && !path.includes('/locaties/') && !path.includes('/opvang/') && !path.includes('/sitemap/') && !path.includes('/privacy/')) {
            privacyLink.href = './privacy/';
        } else {
            privacyLink.href = '../privacy/';
        }

        // Event listeners
        document.getElementById('cookie-accept').addEventListener('click', function() {
            saveConsent(true);
            loadAnalytics();
            hideBanner();
        });

        document.getElementById('cookie-decline').addEventListener('click', function() {
            saveConsent(false);
            removeAnalytics();
            hideBanner();
        });
    }

    // Hide the banner
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                banner.remove();
                const styles = document.getElementById('cookie-consent-styles');
                if (styles) styles.remove();
            }, 300);

            // Add fadeOut animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize on DOM ready
    function init() {
        const consent = getConsent();
        
        if (consent === null) {
            // No consent given yet, show banner
            showBanner();
        } else if (consent === true) {
            // User accepted, load analytics
            loadAnalytics();
        }
        // If consent === false, do nothing (user declined)
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
