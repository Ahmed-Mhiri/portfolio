document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       0. SCROLL PROGRESS BAR
       ========================================================== */
    const scrollProgress = document.getElementById('scrollProgress');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    /* ==========================================================
       1. DYNAMIC HEADER
       ========================================================== */
    const header = document.getElementById('mainHeader');
    const onScroll = () => {
        header?.classList.toggle('header-scrolled', window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ==========================================================
       2. ACTIVE NAV LINK
       ========================================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { root: null, rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(s => observer.observe(s));
    }

    /* ==========================================================
       3. SMOOTH SCROLL
       ========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
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
        menuBtn?.setAttribute('aria-expanded', String(isOpen));
    };
    menuBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    backdrop?.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(l => l.addEventListener('click', () => toggleMenu(false)));

    /* ==========================================================
       5. TYPED.JS
       ========================================================== */
    if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Full-Stack Web Apps.',
                'Spring Boot Backends.',
                'Angular Interfaces.',
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
       7. TIMELINE LINE DRAWS ON SCROLL
       ========================================================== */
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine && 'IntersectionObserver' in window) {
        const lineObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineLine.classList.add('drawn');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        lineObserver.observe(timelineLine.parentElement);
    } else if (timelineLine) {
        timelineLine.classList.add('drawn');
    }

    /* ==========================================================
       8. STAT COUNTER ANIMATION
       ========================================================== */
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window && statNumbers.length) {
        const statObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => statObserver.observe(el));
    } else {
        statNumbers.forEach(el => {
            el.textContent = el.dataset.target + (el.dataset.suffix || '');
        });
    }

    /* ==========================================================
       9. SCROLL-TO-TOP
       ========================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn?.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================
       10. CONTACT FORM
       ========================================================== */
    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput    = document.getElementById('name');
        const emailInput   = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMsg   = document.getElementById('formSuccess');

        const showError = (input, message) => {
            const el = document.getElementById(`${input.id}Error`);
            if (el) { el.textContent = message; el.style.display = 'block'; }
            input.classList.add('border-red-500');
        };
        const hideError = (input) => {
            const el = document.getElementById(`${input.id}Error`);
            if (el) el.style.display = 'none';
            input.classList.remove('border-red-500');
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            [nameInput, emailInput, messageInput].forEach(hideError);
            successMsg?.classList.remove('show');

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
            if (!isValid) return;

            const subject = encodeURIComponent(`Portfolio contact from ${nameInput.value.trim()}`);
            const body = encodeURIComponent(
                `Name: ${nameInput.value.trim()}\n` +
                `Email: ${emailInput.value.trim()}\n\n` +
                `${messageInput.value.trim()}`
            );
            window.location.href = `mailto:ahmedmhiri2004@gmail.com?subject=${subject}&body=${body}`;

            successMsg?.classList.add('show');
        });

        [nameInput, emailInput, messageInput].forEach(input => {
            input?.addEventListener('input', () => hideError(input));
        });
    }

});