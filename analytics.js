(() => {
  // One delegated listener survives menu toggling and covers nested CTA icons.
  if (window.sterlingAnalytics) return;
  const track = (name, params = {}) => {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, {
        send_to: 'G-3X62D0LDMX',
        page_path: location.pathname,
        transport_type: 'beacon',
        ...params
      });
    } catch { /* Analytics must never block a call, navigation or enquiry. */ }
  };
  window.sterlingAnalytics = {
    formHandoff(form) {
      const selected = form.elements.service.value;
      const service = selected === 'Garage Door' ? 'garage_door' : selected === 'Locksmith' ? 'locksmith' : 'unspecified';
      // Contact and Request Service use the same form. Count once, after validation.
      // This site opens a mailto draft; it cannot confirm the email was sent.
      track('request_service_submit', {
        form_id: 'service-form', form_context: 'contact_request_service',
        service_type: service, delivery_method: 'mailto', submission_status: 'email_handoff'
      });
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    const placement = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('#mobile-menu') ? 'mobile_menu' : link.closest('.mobile-actions') ? 'mobile_bar' : 'content';
    if (/^tel:/i.test(href)) {
      track('phone_click', { link_placement: placement });
      return;
    }
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    const service = url.pathname.startsWith('/garage-doors/') || url.pathname === '/garage-doors.html' ? 'garage_door' : url.pathname.startsWith('/locksmith/') || url.pathname === '/locksmith.html' ? 'locksmith' : null;
    if (service) track(service + '_cta_click', { service_type: service, link_path: url.pathname, link_placement: placement });
  });
})();
