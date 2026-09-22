document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close menu on nav link click
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }

    // 2. Smooth Scrolling
    const header = document.querySelector('header') || document.querySelector('.navbar');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's not just "#" but an actual target
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 10; // offset a bit for early trigger
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // 4. Navbar Scroll Effect
    function handleNavbarScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // 5. Scroll Reveal Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    fadeElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Contact Form Handler
    const contactForm = document.querySelector('.contact-form') || document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form elements (assumes inputs have name attributes or specific IDs)
            const nameInput = contactForm.querySelector('[name="name"]') || contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('[name="email"]') || contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('[name="message"]') || contactForm.querySelector('#message');
            
            const name = nameInput ? nameInput.value : 'Someone';
            const email = emailInput ? emailInput.value : '';
            const message = messageInput ? messageInput.value : '';
            
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const bodyText = encodeURIComponent(`${message}\n\n- From: ${email}`);
            
            const mailtoUrl = `mailto:ghozyalfienno@gmail.com?subject=${subject}&body=${bodyText}`;
            
            // Open default mail client
            window.location.href = mailtoUrl;
            
            // Optional success feedback
            contactForm.reset();
            
            // Check if there's a status message container
            let statusMessage = document.querySelector('.form-status');
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.className = 'form-status';
                contactForm.appendChild(statusMessage);
            }
            
            statusMessage.textContent = 'Message prepared! Check your email client.';
            statusMessage.style.display = 'block';
            statusMessage.style.color = 'green';
            statusMessage.style.marginTop = '10px';
            
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        });
    }

    // 8. Typing Effect (Optional Enhancement)
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text') || "Student & Web Developer";
        typingElement.textContent = ''; // clear initially
        
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = textToType.substring(0, charIndex);
            typingElement.textContent = currentText;
            
            let typingSpeed = 100;
            
            if (!isDeleting && charIndex < textToType.length) {
                // Typing
                charIndex++;
            } else if (!isDeleting && charIndex === textToType.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                typingSpeed = 50;
            } else if (isDeleting && charIndex === 0) {
                // Pause before restarting
                isDeleting = false;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(typeEffect, 1000);
    }
});
