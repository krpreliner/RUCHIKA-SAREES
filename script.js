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

    // ==========================================
    // 7. WhatsApp Widget Toggle
    // ==========================================
    const waToggle = document.getElementById('waToggle');
    const waWidget = document.getElementById('waWidget');
    const waClose = document.getElementById('waClose');

    if (waToggle && waWidget && waClose) {
        waToggle.addEventListener('click', () => {
            waWidget.classList.add('active');
        });
        waClose.addEventListener('click', () => {
            waWidget.classList.remove('active');
        });
    }

    // ==========================================
    // 8. Shopping Cart Logic
    // ==========================================
    let cart = JSON.parse(localStorage.getItem('rs_cart')) || [];
    
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

    // Toggle Cart
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
    
    if(cartIcon) cartIcon.addEventListener('click', (e) => { e.preventDefault(); toggleCart(); });
    if(cartClose) cartClose.addEventListener('click', toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Render Cart
    function renderCart() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is currently empty.</div>';
            if(whatsappCheckoutBtn) whatsappCheckoutBtn.style.display = 'none';
        } else {
            if(whatsappCheckoutBtn) whatsappCheckoutBtn.style.display = 'flex';
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                totalItems += item.quantity;
                
                const itemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                            <div class="cart-item-actions">
                                <div style="display: flex; align-items: center;">
                                    <button class="qty-btn dec" data-index="${index}">-</button>
                                    <span class="cart-item-qty">${item.quantity}</span>
                                    <button class="qty-btn inc" data-index="${index}">+</button>
                                </div>
                                <button class="remove-item" data-index="${index}">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        if(cartBadge) cartBadge.innerText = totalItems;
        if(cartTotalPrice) cartTotalPrice.innerText = `₹${total.toLocaleString('en-IN')}`;
        
        // Save to local storage
        localStorage.setItem('rs_cart', JSON.stringify(cart));
        
        // Attach events to new buttons
        attachCartEvents();
    }

    // Attach events for increment, decrement, remove
    function attachCartEvents() {
        document.querySelectorAll('.qty-btn.inc').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity++;
                renderCart();
            });
        });
        document.querySelectorAll('.qty-btn.dec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                renderCart();
            });
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                renderCart();
            });
        });
    }

    // Add to Cart Logic
    document.querySelectorAll('.add-to-cart-float').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.luxury-product-card');
            const name = card.querySelector('.prod-name').innerText;
            const priceText = card.querySelector('.price-current').innerText.replace(/[^0-9]/g, '');
            const price = parseInt(priceText, 10);
            const image = card.querySelector('img').getAttribute('src');

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            
            renderCart();
            
            // Visual feedback
            const originalText = btn.innerText;
            btn.innerText = 'Added!';
            btn.style.background = 'var(--color-gold)';
            btn.style.color = 'var(--color-bg-primary)';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 1500);
            
            // Auto open cart
            if(!cartSidebar.classList.contains('active')) {
                toggleCart();
            }
        });
    });

    // ==========================================
    // 9. Checkout & UPI Verification Modal
    // ==========================================
    const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
    const checkoutClose = document.getElementById('checkoutClose');
    const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
    
    const checkoutScreen1 = document.getElementById('checkoutScreen1');
    const checkoutScreen2 = document.getElementById('checkoutScreen2');
    const checkoutScreen3 = document.getElementById('checkoutScreen3');
    
    const utrInput = document.getElementById('utrInput');
    const utrError = document.getElementById('utrError');
    const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
    
    const generatedOrderId = document.getElementById('generatedOrderId');
    const sendReceiptBtn = document.getElementById('sendReceiptBtn');

    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        checkoutModalOverlay.classList.remove('active');
        // Reset screens after closing
        setTimeout(() => {
            checkoutScreen1.classList.add('active');
            checkoutScreen2.classList.remove('active');
            checkoutScreen3.classList.remove('active');
            utrInput.value = '';
            utrError.style.display = 'none';
        }, 500);
    }

    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            
            // Calculate total
            let total = 0;
            cart.forEach(item => total += item.price * item.quantity);
            checkoutTotalAmount.innerText = `₹${total.toLocaleString('en-IN')}`;
            
            // Close cart sidebar and open modal
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            
            checkoutModal.classList.add('active');
            checkoutModalOverlay.classList.add('active');
        });
    }

    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckoutModal);
    if (checkoutModalOverlay) checkoutModalOverlay.addEventListener('click', closeCheckoutModal);

    // Verify UTR Logic
    if (verifyPaymentBtn) {
        verifyPaymentBtn.addEventListener('click', () => {
            const utr = utrInput.value.trim();
            const isValid = /^\d{12}$/.test(utr); // Must be exactly 12 digits
            
            if (!isValid) {
                utrError.style.display = 'block';
                utrInput.style.borderColor = '#ff4757';
                return;
            }
            
            utrError.style.display = 'none';
            utrInput.style.borderColor = 'var(--color-gold)';
            
            // Show Loading Screen
            checkoutScreen1.classList.remove('active');
            checkoutScreen2.classList.add('active');
            
            // Simulate Bank API Verification Delay (2.5 seconds)
            setTimeout(() => {
                checkoutScreen2.classList.remove('active');
                checkoutScreen3.classList.add('active');
                
                // Generate Order ID
                const orderId = '#RS-' + Math.floor(1000 + Math.random() * 9000);
                generatedOrderId.innerText = orderId;
                
                // Prepare final WhatsApp Receipt Text
                let message = `*NEW ORDER RECEIPT ${orderId}*\n\nHello Ruchika Sarees! I have successfully placed and paid for an order. Please verify my UTR.\n\n`;
                let finalTotal = 0;
                cart.forEach((item, index) => {
                    message += `${index + 1}. ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
                    finalTotal += item.price * item.quantity;
                });
                message += `\n*Total Paid:* ₹${finalTotal.toLocaleString('en-IN')}\n`;
                message += `*UTR Number:* ${utr}\n\n`;
                message += `Please process my delivery!`;
                
                // Update WhatsApp button link
                sendReceiptBtn.onclick = () => {
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/917903065185?text=${encodedMessage}`, '_blank');
                    
                    // Clear cart after sending receipt
                    cart = [];
                    renderCart();
                    closeCheckoutModal();
                };
                
            }, 2500);
        });
    }

    // Input validation real-time feedback
    if(utrInput) {
        utrInput.addEventListener('input', (e) => {
            // Only allow numbers
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            if (e.target.value.length === 12) {
                utrError.style.display = 'none';
                e.target.style.borderColor = 'var(--color-gold)';
            }
        });
    }
    // Initial render
    renderCart();

    // ==========================================
    // 10. Making Features Workable (Search, Wishlist, Account, Newsletter)
    // ==========================================

    // --- Toast Notification Helper ---
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    function showToast(msg) {
        if(!toastNotification) return;
        toastMessage.innerText = msg;
        toastNotification.classList.add('active');
        setTimeout(() => toastNotification.classList.remove('active'), 3000);
    }

    // --- Newsletter Form ---
    const nlForm = document.querySelector('.nl-form');
    if (nlForm) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Thank you! Check your inbox for your 10% off code.");
            nlForm.reset();
        });
    }

    // --- Account Modal Logic ---
    const accountIconBtn = document.getElementById('accountIconBtn');
    const accountModal = document.getElementById('accountModal');
    const accountClose = document.getElementById('accountClose');
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('loginScreen');
    const loggedInScreen = document.getElementById('loggedInScreen');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // We reuse checkoutModalOverlay for the account modal as well for simplicity
    const accountOverlay = document.getElementById('checkoutModalOverlay'); 

    let isLoggedIn = localStorage.getItem('rs_loggedIn') === 'true';

    function updateAccountUI() {
        if (isLoggedIn) {
            loginScreen.style.display = 'none';
            loggedInScreen.style.display = 'block';
        } else {
            loginScreen.style.display = 'block';
            loggedInScreen.style.display = 'none';
        }
    }

    function toggleAccountModal(e) {
        if(e) e.preventDefault();
        updateAccountUI();
        accountModal.classList.toggle('active');
        if(accountOverlay) {
            if(accountModal.classList.contains('active')) {
                accountOverlay.classList.add('active');
            } else {
                accountOverlay.classList.remove('active');
            }
        }
    }

    if (accountIconBtn) accountIconBtn.addEventListener('click', toggleAccountModal);
    if (accountClose) accountClose.addEventListener('click', toggleAccountModal);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            isLoggedIn = true;
            localStorage.setItem('rs_loggedIn', 'true');
            updateAccountUI();
            showToast("Successfully logged in!");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            localStorage.removeItem('rs_loggedIn');
            updateAccountUI();
            showToast("You have been logged out.");
            setTimeout(() => toggleAccountModal({preventDefault:()=>true}), 1000);
        });
    }

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const text = e.target.innerText.toLowerCase();
            let targetId = '';
            if (text.includes('fabric')) targetId = 'categories';
            if (text.includes('best sellers')) targetId = 'bestsellers';
            if (text.includes('new arrivals')) targetId = 'new-arrivals';
            
            if (targetId) {
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                e.preventDefault();
                showToast("Coming Soon!");
            }
        });
    });

    // --- Search Logic ---
    const searchIconBtn = document.getElementById('searchIconBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    function toggleSearch(e) {
        if(e) e.preventDefault();
        searchOverlay.classList.toggle('active');
        if(searchOverlay.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }

    if(searchIconBtn) searchIconBtn.addEventListener('click', toggleSearch);
    if(searchClose) searchClose.addEventListener('click', toggleSearch);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const allCards = document.querySelectorAll('.luxury-product-card');
            
            allCards.forEach(card => {
                const name = card.querySelector('.prod-name').innerText.toLowerCase();
                if (name.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // If they are searching, auto scroll them down slightly so they can see results filtering
            if (query.length > 2 && window.scrollY < 500) {
                document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Wishlist Logic ---
    let wishlist = JSON.parse(localStorage.getItem('rs_wishlist')) || [];
    const wishlistIconBtn = document.getElementById('wishlistIconBtn');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistClose = document.getElementById('wishlistClose');
    const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
    const wishlistBadge = document.getElementById('wishlistBadge');

    function toggleWishlist(e) {
        if(e) e.preventDefault();
        wishlistSidebar.classList.toggle('active');
        if(cartOverlay) cartOverlay.classList.toggle('active');
    }

    if(wishlistIconBtn) wishlistIconBtn.addEventListener('click', toggleWishlist);
    if(wishlistClose) wishlistClose.addEventListener('click', toggleWishlist);

    function renderWishlist() {
        if(!wishlistItemsContainer) return;
        
        wishlistItemsContainer.innerHTML = '';
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<div class="empty-cart-msg">Your wishlist is empty.</div>';
            if(wishlistBadge) wishlistBadge.style.display = 'none';
        } else {
            if(wishlistBadge) {
                wishlistBadge.style.display = 'flex';
                wishlistBadge.innerText = wishlist.length;
            }
            wishlist.forEach((item, index) => {
                const itemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                            <button class="remove-wishlist" data-index="${index}" style="background:none; border:none; color:var(--color-gold); cursor:pointer; font-size:0.8rem; text-align:left; margin-top:10px;">Remove</button>
                        </div>
                    </div>
                `;
                wishlistItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
            
            document.querySelectorAll('.remove-wishlist').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    wishlist.splice(idx, 1);
                    localStorage.setItem('rs_wishlist', JSON.stringify(wishlist));
                    renderWishlist();
                    updateWishlistHeartIcons();
                    showToast("Removed from Wishlist");
                });
            });
        }
    }

    // Inject heart icons into all product cards
    document.querySelectorAll('.luxury-product-card').forEach(card => {
        const prodImgContainer = card.querySelector('.prod-img');
        if(prodImgContainer) {
            const heartBtn = document.createElement('div');
            heartBtn.className = 'wishlist-btn-card';
            heartBtn.innerHTML = '<i class="fas fa-heart"></i>';
            prodImgContainer.appendChild(heartBtn);
            
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = card.querySelector('.prod-name').innerText;
                const priceText = card.querySelector('.price-current').innerText.replace(/[^0-9]/g, '');
                const price = parseInt(priceText, 10);
                const image = card.querySelector('img').getAttribute('src');
                
                const existingIdx = wishlist.findIndex(item => item.name === name);
                
                if (existingIdx >= 0) {
                    wishlist.splice(existingIdx, 1);
                    heartBtn.classList.remove('active');
                    showToast("Removed from Wishlist");
                } else {
                    wishlist.push({ name, price, image });
                    heartBtn.classList.add('active');
                    showToast("Added to Wishlist!");
                }
                
                localStorage.setItem('rs_wishlist', JSON.stringify(wishlist));
                renderWishlist();
            });
        }
    });

    function updateWishlistHeartIcons() {
        document.querySelectorAll('.luxury-product-card').forEach(card => {
            const name = card.querySelector('.prod-name').innerText;
            const heartBtn = card.querySelector('.wishlist-btn-card');
            if(heartBtn) {
                const isInWishlist = wishlist.some(item => item.name === name);
                if (isInWishlist) heartBtn.classList.add('active');
                else heartBtn.classList.remove('active');
            }
        });
    }

    // Init
    renderWishlist();
    updateWishlistHeartIcons();

});
