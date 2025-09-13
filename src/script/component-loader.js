document.addEventListener('DOMContentLoaded', async () => {
  const includeEls = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(includeEls.map(async (el) => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.error('Failed to load component:', url, e);
    }
  }));
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
});
