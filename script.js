(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('#nav-links');
  const themeButton = document.querySelector('.theme-toggle');
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      navLinks.classList.toggle('open', !isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const getSavedTheme = () => {
    try { return localStorage.getItem('nexora-theme'); }
    catch (error) { return null; }
  };

  const applyTheme = theme => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(theme === 'light'));
      themeButton.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  };

  const initialTheme = getSavedTheme() || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(initialTheme);

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = document.documentElement.classList.contains('theme-light') ? 'dark' : 'light';
      applyTheme(nextTheme);
      try { localStorage.setItem('nexora-theme', nextTheme); } catch (error) { /* Keep theme for this page. */ }
    });
  }
})();
