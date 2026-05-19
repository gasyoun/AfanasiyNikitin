// Shared dark/light theme toggle for static atlas pages.
(function(){
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  if (!document.querySelector('link[href*="tabler-icons"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'lib/tabler-icons.min.css';
    document.head.appendChild(link);
  }

  function updateTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    }
  }

  updateTheme(localStorage.getItem('theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      updateTheme(current === 'dark' ? 'light' : 'dark');
    });
    toggle.addEventListener('mouseenter', () => { toggle.style.transform = 'scale(1.1)'; });
    toggle.addEventListener('mouseleave', () => { toggle.style.transform = 'scale(1.0)'; });
  }

  window.ATLAS_THEME = { updateTheme };
})();
