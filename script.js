/* ===========================
   LOGO INTRO + NAVBAR REVEAL
=========================== */
(function () {
  const intro  = document.getElementById('logo-intro');
  const navbar = document.getElementById('mainNav');
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.querySelector('.navbar-toggler');

  const syncNavHeight = () => {
    if (!navbar) return;
    const navContainer = navbar.querySelector('.container');
    const navHeight = navContainer ? navContainer.offsetHeight : navbar.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
  };

  syncNavHeight();
  window.addEventListener('load', syncNavHeight);
  window.addEventListener('resize', syncNavHeight);

  if (navMenu) {
    navMenu.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('menu-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    });

    navMenu.addEventListener('hidden.bs.collapse', () => {
      navbar.classList.remove('menu-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Step 1: After 2.5 seconds, fade out the intro overlay
  setTimeout(() => {
    intro.classList.add('fade-out');

    // Step 2: Once fade-out transition ends (~0.6s), show navbar
    setTimeout(() => {
      intro.style.display = 'none';
      navbar.classList.add('visible');
      syncNavHeight();
    }, 650);

  }, 2500);
})();

/* ===========================
   SCROLL-REVEAL (IntersectionObserver)
=========================== */
(function () {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();

/* ===========================
   CONTACT FORM HANDLER
=========================== */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic HTML5 validation check
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Simulate submission (replace with actual fetch/API call)
    success.style.display = 'block';
    form.reset();
    form.classList.remove('was-validated');

    setTimeout(() => { success.style.display = 'none'; }, 5000);
  });
})();

/* ===========================
   SMOOTH ACTIVE NAV LINKS
=========================== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--orange)';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  window.addEventListener('load', highlightNav);
  window.addEventListener('resize', highlightNav);
})();

/* ===========================
   CLOSE MOBILE MENU ON LINK CLICK
=========================== */
(function () {
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapseEl = document.getElementById('navMenu');
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();

/* ===========================
   WHATSAPP STICKY ICON VISIBILITY
=========================== */
(function () {
  const whatsappSticky = document.querySelector('.whatsapp-sticky');
  if (!whatsappSticky) return;

  const toggleVisibility = () => {
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 96;
    if (window.scrollY > navHeight) {
      whatsappSticky.classList.add('visible');
    } else {
      whatsappSticky.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility(); // Check on load
})();
