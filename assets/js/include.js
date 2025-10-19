document.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('[data-include]');
  const tasks = [...slots].map(async el => {
    try {
      const res = await fetch(el.getAttribute('data-include'), { cache: 'no-cache' });
      el.innerHTML = await res.text();
    } catch (e) {
      console.warn('Include failed:', el.getAttribute('data-include'), e);
    }
  });

  Promise.all(tasks).then(() => {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const nav = document.querySelector('#nav');
    if (nav) {
      nav.querySelectorAll('ul.links li').forEach(li => li.classList.remove('active'));
      const a = nav.querySelector(`a[href="${path}"]`);
      if (a) a.parentElement.classList.add('active');
    }
    if (window.jQuery) {
  // re-trigger the load event after partials are injected
  (function($){ $(window).trigger('load'); })(jQuery);
}
  });
});
