document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-layout, .product-lower, .feature-icons, .reviews').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    const mainImgContainer = document.querySelector('.main-image');
    const mainImg = document.getElementById('mainImg');

    mainImgContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = mainImgContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        mainImg.style.transform = `scale(1.1) translate(${x * 30}px, ${y * 30}px)`;
    });

    mainImgContainer.addEventListener('mouseleave', () => {
        mainImg.style.transform = 'scale(1) translate(0, 0)';
    });

   
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
 
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = thumb.querySelector('img').src;
                mainImg.style.opacity = '1';
            }, 200);
        });
    });

    const cartBtn = document.querySelector('.add-cart-desktop');
    cartBtn.addEventListener('mousedown', () => cartBtn.style.transform = 'scale(0.95)');
    cartBtn.addEventListener('mouseup', () => cartBtn.style.transform = 'scale(1.02)');

    const menuToggle = document.getElementById('menuToggle');
    const navDropdown = document.getElementById('nav-dropdown');

   const closeMenu = () => {
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (navDropdown) navDropdown.classList.remove('open'); // NUOVO: Usa la classe CSS
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Aggiorna aria-expanded (questo fa ruotare la croce via CSS)
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            
            // Aggiunge o rimuove la classe per animare la tendina
            if (navDropdown) navDropdown.classList.toggle('open', !isOpen);
        });
    }

    document.addEventListener('click', (event) => {
        // Controlla se il menu ha la classe 'open' invece di '.hidden'
        if (navDropdown && navDropdown.classList.contains('open') && !menuToggle.contains(event.target) && !navDropdown.contains(event.target)) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    navDropdown?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    let cartTotal = 0;
    const cartBadge = document.getElementById('cart-badge');
    const qtySelect = document.getElementById('qty');

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
    
        const qty = parseInt(qtySelect.value) || 1;
        
        
        cartTotal += qty;
        
       
        cartBadge.textContent = cartTotal;
        cartBadge.classList.add('show');
        
        cartBadge.style.animation = 'none';
        cartBadge.offsetHeight; 
        cartBadge.style.animation = null;
    });
});

