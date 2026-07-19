/**
 * RUCHIKA SAREES - V5 Ultra-Rebuild (GSAP + Lenis)
 * 14 Custom Sections Architecture
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Lenis Smooth Scrolling Setup
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
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
    
    // Using simple scroll listener instead of GSAP for the header for immediate response
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
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
        
        // Disable Lenis scrolling when sidebar is open
        if(mobileSidebar.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
    if(closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if(sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Close on link click
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
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            },
            once: true
        });
    });

    // ==========================================
    // 5. Parallax Image Effects
    // ==========================================
    // Slow zoom in on images that have the class .parallax-img
    const parallaxImages = document.querySelectorAll('.parallax-img img');
    parallaxImages.forEach(img => {
        gsap.to(img, {
            yPercent: 15, // Move down slightly as you scroll down
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // The Massive Designer Picks Parallax (Section 8)
    const dpParallax = document.querySelector('.dp-parallax img');
    if(dpParallax) {
        gsap.to(dpParallax, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: '.designer-picks',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Hero Section Parallax (Section 2)
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        gsap.to(heroBg, {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // ==========================================
    // 6. Shop by Occasion - Horizontal Scroll (Desktop)
    // ==========================================
    const occasionTrack = document.querySelector('.occasion-track');
    const occasionContainer = document.querySelector('.shop-occasion');
    
    // We only apply this horizontal scroll pinning on Desktop (min-width: 1024px)
    // If it's complex, we can use a simpler drag-to-scroll. 
    // Here we implement mouse drag to scroll for native feel.
    
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.querySelector('.occasion-scroll-container');
    
    if(slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

});
