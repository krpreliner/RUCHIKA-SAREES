/**
 * RUCHIKA SAREES - Luxury E-Commerce Redesign
 * Core JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. Mobile Sidebar Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // Close sidebar on link click
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

    // ==========================================
    // 3. Intersection Observer (Fade Up Animations)
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
                // Unobserve after animating for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 4. Parallax Banner
    // ==========================================
    const parallaxWindow = document.querySelector('.parallax-window');
    window.addEventListener('scroll', () => {
        if (parallaxWindow && window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const elementTop = parallaxWindow.parentElement.offsetTop;
            const elementHeight = parallaxWindow.parentElement.offsetHeight;
            
            // Only animate if in view
            if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
                const distance = scrolled - elementTop;
                parallaxWindow.style.transform = `translateY(${distance * 0.4}px)`;
            }
        }
    });

    // ==========================================
    // 5. New Arrivals Carousel
    // ==========================================
    const track = document.querySelector('.carousel-track-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 6. Testimonial Carousel
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (testimonialCards.length > 0 && dots.length > 0) {
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

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetCarousel();
            });
        });

        startCarousel();
    }
});
