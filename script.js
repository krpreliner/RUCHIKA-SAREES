/**
 * RUCHIKA SAREES - Premium E-Commerce 
 * Luxury Animation & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Luxury Loader & Initial Animations
    // ==========================================
    const loader = document.getElementById('loader');
    
    // Simulate loading time (could be hooked to window.onload in production)
    setTimeout(() => {
        removeLoader();
    }, 1500);

    function removeLoader() {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1200); // Wait for the 1.2s transform to finish
    }

    // ==========================================
    // 2. Floating Navbar Scroll Effect
    // ==========================================
    const headerWrapper = document.getElementById('headerWrapper');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerWrapper.classList.add('scrolled');
        } else {
            headerWrapper.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. Mobile Menu & Bottom Nav
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const bottomNavMenuBtn = document.getElementById('bottomNavMenuBtn');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    // Clicking profile icon on bottom nav toggles menu for now
    if(bottomNavMenuBtn) {
        bottomNavMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Bottom Nav Active State
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==========================================
    // 4. Parallax Hero Effect
    // ==========================================
    const parallaxVideo = document.getElementById('parallaxVideo');
    
    window.addEventListener('scroll', () => {
        if(window.innerWidth > 768) { // Disable parallax on mobile for performance
            const scrolled = window.scrollY;
            if(scrolled < window.innerHeight) {
                // Move the video down at 40% of the scroll speed
                parallaxVideo.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        }
    });

    // ==========================================
    // 5. Testimonial Carousel
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % testimonialCards.length;
        goToSlide(next);
    }

    function startCarousel() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetCarousel() {
        clearInterval(slideInterval);
        startCarousel();
    }

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetCarousel();
        });
    });

    // Start auto-sliding if testimonials exist
    if(testimonialCards.length > 0) {
        startCarousel();
    }

    // ==========================================
    // 6. Advanced Scroll Animations (Intersection Observer)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated to prevent re-triggering
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe elements with fade-up and scale-in classes
    const animatedElements = document.querySelectorAll('.fade-up, .scale-in');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 7. Form Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            
            // Simulate API Call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
                btn.style.background = '#25D366'; // WhatsApp Green for success
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
