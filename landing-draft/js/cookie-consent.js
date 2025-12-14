// Cookie Consent Banner für DSGVO-Konformität
function initCookieConsent() {
  // Prüfe ob bereits Consent gegeben wurde
  const consentGiven = localStorage.getItem('ki-schweiz-cookie-consent');
  
  if (consentGiven === 'accepted') {
    return;
  }
  
  // Erstelle Cookie Banner HTML
  const cookieBanner = document.createElement('div');
  cookieBanner.id = 'cookie-consent-banner';
  cookieBanner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(15,15,18,0.95) 0%, rgba(30,30,40,0.95) 100%);
    border-top: 2px solid rgba(0,255,136,0.3);
    padding: 1.5rem;
    z-index: 9999;
    backdrop-filter: blur(10px);
  `;
  
  cookieBanner.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center;">
      <div>
        <h3 style="color: #00FF88; margin: 0 0 0.5rem 0; font-size: 1.1rem;">🍪 Cookies & Datenschutz</h3>
        <p style="color: #CCCCCC; margin: 0; font-size: 0.95rem; line-height: 1.5;">
          Wir verwenden Cookies für Analytics und Nutzertracking. Ohne deine Zustimmung werden keine Tracking-Cookies gesetzt. 
          <a href="pages/datenschutz.html" style="color: #00FFFF; text-decoration: none;">Mehr erfahren</a>
        </p>
      </div>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button id="cookie-accept" class="btn btn-primary" style="padding: 0.75rem 2rem; white-space: nowrap;">Akzeptieren</button>
        <button id="cookie-reject" class="btn btn-ghost" style="padding: 0.75rem 2rem; white-space: nowrap;">Ablehnen</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(cookieBanner);
  
  // Event Listeners
  document.getElementById('cookie-accept').addEventListener('click', () => {
    acceptCookies();
  });
  
  document.getElementById('cookie-reject').addEventListener('click', () => {
    rejectCookies();
  });
}

function acceptCookies() {
  localStorage.setItem('ki-schweiz-cookie-consent', 'accepted');
  localStorage.setItem('ki-schweiz-cookie-consent-date', new Date().toISOString());
  
  // Entferne Banner
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => banner.remove(), 300);
  }
  
  // Aktiviere Analytics
  enableAnalytics();
  
  // Log acceptance
  console.log('Cookies akzeptiert');
}

function rejectCookies() {
  localStorage.setItem('ki-schweiz-cookie-consent', 'rejected');
  localStorage.setItem('ki-schweiz-cookie-consent-date', new Date().toISOString());
  
  // Entferne Banner
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => banner.remove(), 300);
  }
  
  // Deaktiviere Analytics wenn möglich
  disableAnalytics();
  
  // Log rejection
  console.log('Cookies abgelehnt');
}

function enableAnalytics() {
  // Analytics ist bereits per Default aktiv via gtag Script
  // Hier können zusätzliche Tracking aktiviert werden
  window.gtag = window.gtag || function(){};
}

function disableAnalytics() {
  // Deaktiviere Google Analytics
  window['ga-disable-G-0000000000'] = true;
  
  // Lösche Analytics Cookies
  document.cookie = '_ga=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = '_gat=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = '_gid=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// CSS für Animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  
  #cookie-consent-banner {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    #cookie-consent-banner {
      padding: 1rem;
    }
    
    #cookie-consent-banner > div {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    #cookie-consent-banner p {
      font-size: 0.9rem;
    }
  }
`;
document.head.appendChild(style);

// Initialisiere beim DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
});
