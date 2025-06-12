document.addEventListener('DOMContentLoaded', () => {

    // --- DYNAMIC HEADER & ACTIVE LINK LOGIC ---
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    const onScroll = () => {
        // Dynamic Header Style
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    // Run on page load
    onScroll();
    // Run on scroll events
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- ACTIVE LINK HIGHLIGHTING ON SCROLL ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // 40% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Ensure the link's href matches the section ID
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- MOBILE MENU LOGIC ---
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (isOpen) => {
        mobileMenu.classList.toggle('translate-x-full', !isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        menuBtn.setAttribute('aria-expanded', isOpen);
    };

    menuBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    backdrop.addEventListener('click', () => toggleMenu(false));
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // --- TYPED.JS INITIALIZATION ---
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'interactive web applications.',
                'elegant user interfaces.',
                'full-stack solutions.',
                'performant frontend code.'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => fadeInObserver.observe(elem));

    // --- SCROLL TO TOP BUTTON LOGIC ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    // --- CONTACT FORM VALIDATION ---
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const showError = (input, message) => {
        const errorEl = document.getElementById(`${input.id}Error`);
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    };

    const hideError = (input) => {
        document.getElementById(`${input.id}Error`).style.display = 'none';
    };

    form.addEventListener('submit', (e) => {
        let isValid = true;
        hideError(nameInput); hideError(emailInput); hideError(messageInput);
        if (nameInput.value.trim() === '') { showError(nameInput, 'Please enter your name.'); isValid = false; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) { showError(emailInput, 'Please enter a valid email address.'); isValid = false; }
        if (messageInput.value.trim() === '') { showError(messageInput, 'Please enter a message.'); isValid = false; }
        if (!isValid) { e.preventDefault(); }
    });

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => hideError(input));
    });
});