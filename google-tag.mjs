export const googleTag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3X62D0LDMX"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3X62D0LDMX', {
  page_location: location.origin + location.pathname,
  page_referrer: document.referrer.split('?')[0].split('#')[0]
});
</script>
<script defer src="/analytics.js"></script>`;
