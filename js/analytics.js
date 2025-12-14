// Lightweight GA4 loader with graceful no-op if no ID is set
(function () {
  // Allow setting via global or meta tag fallback
  var GA_ID = window.GA_MEASUREMENT_ID || null;
  try {
    if (!GA_ID) {
      // Try meta tag fallback: <meta name="ga-id" content="G-XXXXXXX">
      var meta = document.querySelector('meta[name="ga-id"]');
      if (meta && meta.content) GA_ID = meta.content.trim();
    }
  } catch (e) {}

  if (!GA_ID) {
    // No ID: do nothing, but expose stub for later
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    return;
  }

  // Inject GA4 tag
  var gtagScript = document.createElement('script');
  gtagScript.setAttribute('async', '');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    // Respect privacy: anonymize IP, disable ad personalization by default
    'anonymize_ip': true,
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false
  });

  // Example events: page_view (auto via GA), and CTA clicks
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target) return;
    // Track buttons with data-analytics label or key CTAs
    var label = target.getAttribute && target.getAttribute('data-analytics');
    if (label) {
      gtag('event', 'cta_click', { label: label });
    } else if (target.matches && (target.matches('.btn-primary') || target.matches('.cta-header'))) {
      gtag('event', 'cta_click', { label: target.className });
    }
  });
})();
