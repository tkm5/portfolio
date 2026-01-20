/**
 * Portfolio - Main JavaScript
 * Language toggle and theme toggle functionality
 */

(function() {
  'use strict';

  // =====================================================
  // Language Toggle
  // =====================================================

  const LANG_KEY = 'portfolio-lang';
  const DEFAULT_LANG = 'en';

  /**
   * Get current language from localStorage or default.
   * @returns {string} Current language code ('ja' or 'en')
   */
  function getCurrentLang() {
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  }

  /**
   * Set language and update all translatable elements.
   * @param {string} lang - Language code ('ja' or 'en')
   */
  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);

    // Update all elements with data-ja and data-en attributes
    const elements = document.querySelectorAll('[data-ja][data-en]');
    elements.forEach(function(el) {
      const text = el.getAttribute('data-' + lang);
      if (text) {
        el.textContent = text;
      }
    });

    // Update lang toggle button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = lang === 'ja' ? 'EN' : 'JP';
    }

    // Update html lang attribute
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
  }

  /**
   * Toggle between Japanese and English.
   */
  function toggleLanguage() {
    const currentLang = getCurrentLang();
    const newLang = currentLang === 'ja' ? 'en' : 'ja';
    setLanguage(newLang);
  }

  // =====================================================
  // Theme Toggle
  // =====================================================

  const THEME_KEY = 'portfolio-theme';

  /**
   * Get current theme from localStorage or system preference.
   * @returns {string} Current theme ('dark' or 'light')
   */
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }

  /**
   * Set theme and update UI.
   * @param {string} theme - Theme name ('dark' or 'light')
   */
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);

    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update theme toggle button icon
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? getSunIcon() : getMoonIcon();
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /**
   * Toggle between dark and light themes.
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  /**
   * Get sun icon SVG for dark mode button.
   * @returns {string} SVG markup
   */
  function getSunIcon() {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  }

  /**
   * Get moon icon SVG for light mode button.
   * @returns {string} SVG markup
   */
  function getMoonIcon() {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // =====================================================
  // Section Scroll Detection
  // =====================================================

  /**
   * Update active section in side navigation based on scroll position.
   */
  function updateActiveSection() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.side-nav-link');

    if (sections.length === 0 || navLinks.length === 0) {
      return;
    }

    const scrollPos = window.scrollY + 150;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /**
   * Throttle function to limit function calls.
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  function throttle(func, limit) {
    let inThrottle = false;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // =====================================================
  // Initialization
  // =====================================================

  /**
   * Initialize on DOM ready.
   */
  function init() {
    // Apply saved language
    setLanguage(getCurrentLang());

    // Apply saved theme
    setTheme(getCurrentTheme());

    // Add event listeners
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Add scroll listener for section detection
    var throttledUpdate = throttle(updateActiveSection, 100);
    window.addEventListener('scroll', throttledUpdate);

    // Initial update
    updateActiveSection();
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
