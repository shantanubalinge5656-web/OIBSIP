/* ==========================================================================
   SHANTANU BALINGE - PERSONAL PORTFOLIO JAVASCRIPT
   OASIS Infobyte Web Development Level 1 Task 2
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Typewriter Animation for Hero Section
       -------------------------------------------------------------------------- */
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "Aspiring Full-Stack Developer",
        "Information Technology Student",
        "Web Developer Intern",
        "Creative Problem Solver"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = 500;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();

    /* --------------------------------------------------------------------------
       2. Theme Toggle (Dark Mode / Light Mode with LocalStorage)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    /* --------------------------------------------------------------------------
       3. Mobile Navigation Toggle
       -------------------------------------------------------------------------- */
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerIcon = mobileToggleBtn?.querySelector('.hamburger-icon');
    const closeIcon = mobileToggleBtn?.querySelector('.close-icon');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        
        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.style.display = isOpen ? 'none' : 'block';
            closeIcon.style.display = isOpen ? 'block' : 'none';
        }
    }

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* --------------------------------------------------------------------------
       4. Header Scroll & Active Link Indicator
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky Header class
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Highlight Active Navigation Link based on scroll position
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    /* --------------------------------------------------------------------------
       5. Project Filtering Logic
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       6. Contact Form Real-time Validation & Submission
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('invalid');
            }

            if (isValid) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                contactForm.reset();

                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all required fields correctly.';
            }
        });
    }

    /* --------------------------------------------------------------------------
       7. Back to Top Click Handler
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --------------------------------------------------------------------------
       8. Resume Download Simulation
       -------------------------------------------------------------------------- */
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Shantanu Balinge's Resume download triggered! (Placeholder link for portfolio submission)");
        });
    }
});
