/**
 * RUCHIKA SAREES - V7 High-Converting E-Commerce
 * GSAP + Lenis Integration
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Lenis Smooth Scrolling Setup
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Integration with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 2. Floating Navbar Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. Mobile Sidebar Toggle
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    function toggleSidebar() {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        
        if(mobileSidebar.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
    if(closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if(sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);
    
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar();
        });
    });

    // ==========================================
    // 4. Global Reveal Animations (Fade Up)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up');
    
    revealElements.forEach((el) => {
        // Reduced the y translate distance so it feels snappier for an e-commerce store
        gsap.set(el, { y: 30, opacity: 0 });
        ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8, // Faster for e-commerce
                    ease: "power2.out",
                    overwrite: "auto"
                });
            },
            once: true
        });
    });

    // ==========================================
    // 5. Hero & Promo Parallax Effects
    // ==========================================
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        gsap.to(heroBg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    const promoBg = document.querySelector('.promo-bg img');
    if(promoBg) {
        gsap.to(promoBg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: '.promo-banner',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

});
