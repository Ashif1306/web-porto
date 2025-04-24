// Menunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen header
    const header = document.querySelector('header');
    const body = document.body;

    const headerHeight = header.offsetHeight;

    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    `;
    
    // Menyisipkan tombol menu mobile sebelum navigasi
    const nav = document.querySelector('nav');
    header.insertBefore(mobileMenuToggle, nav);

    const ctaButton = document.querySelector('.cta-button');
    let mobileCta = null;
    
    if (ctaButton) {

        mobileCta = document.createElement('div');
        mobileCta.className = 'mobile-cta';
        mobileCta.innerHTML = ctaButton.innerHTML;
    
        if (nav.querySelector('ul')) {
            nav.appendChild(mobileCta);
        }
    }
    

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open'); 
    });
    

    document.addEventListener('click', function(e) {
        if (
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)
        ) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    

    header.classList.add('fixed-header');

    body.style.paddingTop = headerHeight + 'px';

    window.addEventListener('resize', function() {

        const currentHeaderHeight = header.offsetHeight;
        body.style.paddingTop = currentHeaderHeight + 'px';

        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    const allLinks = document.querySelectorAll('nav ul li a, .cta-button a, a[href="contact.html"], .mobile-cta a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && !href.startsWith('#')) {
                e.preventDefault();

                if (nav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                }

                sessionStorage.setItem('pageTransition', 'true');
                sessionStorage.setItem('prevPage', window.location.pathname);

                document.body.classList.add('page-transition-out');

                setTimeout(function() {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    

    if (sessionStorage.getItem('pageTransition') === 'true') {

        sessionStorage.removeItem('pageTransition');

        document.body.classList.add('page-transition-in');

        setTimeout(function() {
            document.body.classList.remove('page-transition-in');
        }, 500);
    } else {

        document.body.classList.add('page-loaded');
        setTimeout(function() {
            document.body.classList.remove('page-loaded');
        }, 300);
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(navLink => {
        const linkPage = navLink.getAttribute('href');

        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            navLink.classList.add('active');
        }
    });
});