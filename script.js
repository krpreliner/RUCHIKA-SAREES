/**
 * RUCHIKA SAREES - GSAP Ultra-Luxury Redesign
 * Core JavaScript & GSAP Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 1. Initial Hero Animations
    // ==========================================
    const heroTl = gsap.timeline();
    
    // Animate Hero Overlay out slightly (blur/fade effect)
    heroTl.to('.hero-overlay', {
        backgroundColor: 'rgba(0,0,0,0.3)',
        duration: 2,
        ease: 'power2.out'
    }, 0);

    // Fade up Hero Elements
    heroTl.fromTo('.hero-content .gsap-fade-up', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' },
        0.5
    );

    // ==========================================
    // 2. Scroll Parallax Backgrounds
    // ==========================================
    const parallaxElements = document.querySelectorAll('.gsap-parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const img = el.querySelector('img');
        
        if(img) {
            gsap.to(img, {
                yPercent: 20 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });

    // ==========================================
    // 3. Scroll Reveal Animations (Fade Up)
    // ==========================================
    const fadeUpElements = document.querySelectorAll('section .gsap-fade-up');
    
    fadeUpElements.forEach(el => {
        // Prepare element for animation
        gsap.set(el, { y: 40, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%', // trigger when element is 85% down the screen
            onEnter: () => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            },
            once: true // Only animate once
        });
    });

    // ==========================================
    // 4. Header Glassmorphism Scroll Effect
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
    // 5. Mobile Sidebar Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        if(mobileSidebar.classList.contains('active')) {
            // Close
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

});
