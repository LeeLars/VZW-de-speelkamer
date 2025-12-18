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
            <div class="cookie-banner-container">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </div>
                    <div class="cookie-banner-text">
                        <span>We gebruiken cookies voor analytics. </span>
                        <a href="./privacy/" class="cookie-banner-link">Meer info</a>
                    </div>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Weigeren</button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept">OK</button>
                </div>
            </div>
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.id = 'cookie-consent-styles';
        styles.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 1rem;
                left: 1rem;
                right: auto;
                z-index: 9999;
                font-family: 'ABeeZee', sans-serif;
            }

            .cookie-banner-container {
                background: white;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                padding: 0.875rem 1rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideUp 0.3s ease-out;
                border: 1px solid rgba(0, 0, 0, 0.05);
                max-width: 420px;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .cookie-banner-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }

            .cookie-banner-icon {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #B8D7A3 0%, #4AB1C4 100%);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .cookie-banner-text {
                font-size: 0.8125rem;
                color: #6b7280;
                line-height: 1.4;
            }

            .cookie-banner-link {
                color: #4AB1C4;
                text-decoration: none;
                font-weight: 500;
            }

            .cookie-banner-link:hover {
                text-decoration: underline;
            }

            .cookie-banner-buttons {
                display: flex;
                gap: 0.5rem;
                flex-shrink: 0;
            }

            .cookie-btn {
                padding: 0.4rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
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
                background: #4AB1C4;
                color: white;
            }

            .cookie-btn-accept:hover {
                background: #3a9db0;
            }

            @media (max-width: 480px) {
                #cookie-consent-banner {
                    left: 0.75rem;
                    right: 0.75rem;
                    bottom: 0.75rem;
                }

                .cookie-banner-container {
                    flex-wrap: wrap;
                    max-width: none;
                }

                .cookie-banner-content {
                    width: 100%;
                }

                .cookie-banner-buttons {
                    width: 100%;
                    justify-content: flex-end;
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
