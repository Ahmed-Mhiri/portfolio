document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. DYNAMIC HEADER (shadow on scroll)
       ========================================================== */
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    const onScroll = () => {
        if (window.scrollY > 50) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ==========================================================
       2. ACTIVE NAV LINK HIGHLIGHTING
       ========================================================== */
    if ('IntersectionObserver' in window && sections.length) {
        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${sectionId}`
                        );
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    /* ==========================================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
       (works together with CSS scroll-padding-top for the fixed header)
       ========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ==========================================================
       4. MOBILE MENU
       ========================================================== */
    const menuBtn     = document.getElementById('menuBtn');
    const closeBtn    = document.getElementById('closeBtn');
    const mobileMenu  = document.getElementById('mobileMenu');
    const backdrop    = document.getElementById('backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (isOpen) => {
        mobileMenu?.classList.toggle('translate-x-full', !isOpen);
        backdrop?.classList.toggle('hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        menuBtn?.setAttribute('aria-expanded', isOpen);
    };

    menuBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    backdrop?.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    /* ==========================================================
       5. TYPED.JS
       ========================================================== */
    if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Full-Stack Web Apps.',
                'Spring Boot Backends.',
                'Flutter Mobile Apps.',
                'Modern UI/UX Experiences.'
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 1800,
            startDelay: 400,
            loop: true,
            smartBackspace: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    /* ==========================================================
       6. FADE-IN ON SCROLL
       ========================================================== */
    const fadeElems = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && fadeElems.length) {
        const fadeInObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        fadeElems.forEach(el => fadeInObserver.observe(el));
    } else {
        fadeElems.forEach(el => el.classList.add('visible'));
    }

    /* ==========================================================
       7. SCROLL-TO-TOP BUTTON (show + click)
       ========================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn?.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================
       8. CONTACT FORM VALIDATION
       ========================================================== */
    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput    = document.getElementById('name');
        const emailInput   = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const showError = (input, message) => {
            const errorEl = document.getElementById(`${input.id}Error`);
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.style.display = 'block';
            }
            input.classList.add('border-red-500');
        };

        const hideError = (input) => {
            const errorEl = document.getElementById(`${input.id}Error`);
            if (errorEl) errorEl.style.display = 'none';
            input.classList.remove('border-red-500');
        };

        form.addEventListener('submit', (e) => {
            let isValid = true;

            [nameInput, emailInput, messageInput].forEach(hideError);

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name.');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter a message.');
                isValid = false;
            }

            if (!isValid) e.preventDefault();
        });

        [nameInput, emailInput, messageInput].forEach(input => {
            input?.addEventListener('input', () => hideError(input));
        });
    }

});