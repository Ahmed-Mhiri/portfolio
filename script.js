// Typed text effect for hero section
const typedText = document.getElementById('typed-text');
const words = ['responsive websites.', 'user-friendly apps.', 'modern UI designs.', 'fast performant code.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 1500;
const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('backdrop');

    function openMenu() {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Disable background scroll
    }

    function closeMenu() {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      backdrop.classList.add('hidden');
      document.body.style.overflow = ''; // Enable scroll
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMenu();
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });

    // Clicking on backdrop closes the menu and blocks clicks behind
    backdrop.addEventListener('click', () => {
      closeMenu();
    });

    // Also close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
        closeMenu();
      }
    });

    // Prevent clicks inside menu from closing it
    mobileMenu.addEventListener('click', e => {
      e.stopPropagation();
    });



function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
    typedText.textContent = currentWord.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, deletingSpeed);
    }
  } else {
    charIndex++;
    typedText.textContent = currentWord.substring(0, charIndex);
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
    } else {
      setTimeout(type, typingSpeed);
    }
  }
}

type();

// Fade-in elements on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Contact form validation and message
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const nameInput = form.name;
const emailInput = form.email;
const messageInput = form.message;

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.classList.remove('hidden');
    valid = false;
  } else {
    nameError.classList.add('hidden');
  }

  if (!validateEmail(emailInput.value.trim())) {
    emailError.classList.remove('hidden');
    valid = false;
  } else {
    emailError.classList.add('hidden');
  }

  if (!messageInput.value.trim()) {
    messageError.classList.remove('hidden');
    valid = false;
  } else {
    messageError.classList.add('hidden');
  }

  if (valid) {
    // simulate sending message
    formMessage.classList.remove('hidden');
    form.reset();

    setTimeout(() => {
      formMessage.classList.add('hidden');
    }, 4000);
  }
});

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
