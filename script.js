/**
 * Operating Systems - Portfolio & Tutorial Hub
 * Vanilla JavaScript: Navigation, dropdowns, mobile menu, tab-switching
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const pages = document.querySelectorAll('.page');

  // Mobile navigation toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  // Dropdown behavior
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        dropdown.classList.toggle('active');
        dropdowns.forEach((other) => {
          if (other !== dropdown) other.classList.remove('active');
        });
      }
    });
  });

  // Page switching
  function showPage(pageId, contentId = null) {
    pages.forEach((p) => p.classList.remove('page-active'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
      target.classList.add('page-active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'os' && contentId && typeof OS_CONTENT !== 'undefined') {
      loadOSContent(contentId);
    } else if (pageId === 'cs' && contentId && typeof ACTIVITIES_CONTENT !== 'undefined') {
      loadActivityContent(contentId);
    }
  }

  function loadOSContent(id) {
    const data = OS_CONTENT[id] || OS_CONTENT.win10;
    const titleEl = document.getElementById('os-title');
    const descEl = document.getElementById('os-description');
    const videoEl = document.getElementById('os-video');
    const stepsEl = document.getElementById('os-steps');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (videoEl) videoEl.src = `https://www.youtube.com/embed/${data.videoId}`;
    if (stepsEl) {
      stepsEl.innerHTML = data.steps.map((s) => `<li>${s}</li>`).join('');
    }
  }

  function loadActivityContent(id) {
    const data = ACTIVITIES_CONTENT[id] || ACTIVITIES_CONTENT.dhcp;
    const titleEl = document.getElementById('cs-title');
    const descBlock = document.getElementById('cs-description-block');
    const videoEl = document.getElementById('cs-video');
    const stepsEl = document.getElementById('cs-steps');

    if (titleEl) titleEl.textContent = data.title;
    if (descBlock) descBlock.innerHTML = `<p>${data.description}</p>`;
    if (videoEl) videoEl.src = `https://www.youtube.com/embed/${data.videoId}`;
    if (stepsEl) {
      stepsEl.innerHTML = data.steps.map((s) => `<li>${s}</li>`).join('');
    }
  }

  function handleNavClick(e) {
    const link = e.target.closest('a[data-page]');
    if (!link) return;

    const page = link.getAttribute('data-page');
    const id = link.getAttribute('data-id');

    if (page) {
      e.preventDefault();
      showPage(page, id);

      if (page === 'home') {
        history.replaceState(null, '', '#home');
      } else if (page === 'about') {
        history.replaceState(null, '', '#about');
      } else if (page === 'os' && id) {
        history.replaceState(null, '', `#os-${id}`);
      } else if (page === 'cs' && id) {
        history.replaceState(null, '', `#cs-${id}`);
      }
    }

    if (window.innerWidth <= 768) {
      navLinks?.classList.remove('active');
      navToggle?.classList.remove('active');
      dropdowns.forEach((d) => d.classList.remove('active'));
    }
  }

  document.querySelectorAll('a[data-page]').forEach((link) => {
    link.addEventListener('click', handleNavClick);
  });

  function parseHash() {
    const hash = window.location.hash.slice(1) || 'home';
    if (hash === 'home') {
      showPage('home');
      return;
    }
    if (hash === 'about') {
      showPage('about');
      return;
    }
    if (hash.startsWith('os-')) {
      const id = hash.replace('os-', '');
      showPage('os', id);
      return;
    }
    if (hash.startsWith('cs-')) {
      const id = hash.replace('cs-', '');
      showPage('cs', id);
      return;
    }
    showPage('home');
  }

  window.addEventListener('hashchange', parseHash);
  parseHash();

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth <= 768 &&
      navLinks?.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !navToggle?.contains(e.target)
    ) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      dropdowns.forEach((d) => d.classList.remove('active'));
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks?.classList.remove('active');
      navToggle?.classList.remove('active');
      dropdowns.forEach((d) => d.classList.remove('active'));
    }
  });
});
