/* ============================================================
   UNIFIED MAIN.JS - One-Page Portfolio Website
   All JavaScript consolidated into a single file
   ============================================================ */

/* ===== CAPSULE NAVBAR + SMOOTH SCROLL + ACTIVE LINKS (onepage.js) ===== */
/**
 * onepage.js
 * Handles:
 * 1. Capsule navbar â€” mobile hamburger toggle
 * 2. Smooth scrolling for anchor links
 * 3. Active nav link highlighting via IntersectionObserver
 * 4. Navbar scroll effect (shadow on scroll)
 * 5. FAQ accordion toggle
 * 6. Blog filter buttons
 */

document.addEventListener('DOMContentLoaded', function () {
    const capsuleNav = document.getElementById('capsule-nav');
    const hamburger = document.querySelector('.capsule-nav__hamburger');
    const navLinks = document.querySelector('.capsule-nav__links');
    const allLinks = document.querySelectorAll('.capsule-nav__link');
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    // THEME TOGGLER (Dark / Light mode)
    const THEME_KEY = 'site-theme';

    function applyTheme(mode) {
        const icon = themeToggle ? themeToggle.querySelector('i') : null;

        if (mode === 'dark') {
            body.classList.add('dark-mode');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            }
        } else {
            body.classList.remove('dark-mode');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    // Inisialisasi tema dari localStorage atau prefers-color-scheme
    (function initTheme() {
        let saved = null;
        try {
            saved = localStorage.getItem(THEME_KEY);
        } catch (e) {
            saved = null;
        }

        if (saved === 'dark' || saved === 'light') {
            applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    })();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = body.classList.contains('dark-mode');
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (e) {
                // ignore storage errors
            }
        });
    }

    // â”€â”€â”€ 1. MOBILE HAMBURGER TOGGLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (
            navLinks &&
            navLinks.classList.contains('mobile-open') &&
            !capsuleNav.contains(e.target)
        ) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('mobile-open')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
    });

    // â”€â”€â”€ 2. SMOOTH SCROLLING FOR ANCHOR LINKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            }

            // Scroll to section
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update URL hash without jump
            history.pushState(null, null, targetId);
        });
    });

    // â”€â”€â”€ 3. ACTIVE NAV LINK ON SCROLL (IntersectionObserver) â”€â”€â”€â”€â”€
    const sections = document.querySelectorAll('.onepage-section');

    function setActiveLink(id) {
        allLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        observer.observe(section);
    });

    // â”€â”€â”€ 4. NAVBAR SCROLL SHADOW EFFECT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let lastScrollY = 0;
    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (capsuleNav) {
            if (currentScrollY > 50) {
                capsuleNav.classList.add('scrolled');
            } else {
                capsuleNav.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // â”€â”€â”€ 5. FAQ ACCORDION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    document.querySelectorAll('.faq-question').forEach(function (question) {
        question.addEventListener('click', function () {
            const item = this.parentNode;
            document.querySelectorAll('.faq-item.active').forEach(function (openItem) {
                if (openItem !== item) {
                    openItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // â”€â”€â”€ 6. FILTER BUTTONS (Blog section) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // â”€â”€â”€ 7. HANDLE INITIAL HASH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(function () {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});


/* ===== HERO TYPING ANIMATION + SKILL ICONS (animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI MENGETIK UNTUK TEKS "HELLO" =====
    // Temukan elemen h1 yang berisi teks "Hello"
    const heroText = document.querySelector('.hero-text h1');
    
    if (heroText) {
        // Cari elemen gradient-text pertama (Hello)
        const helloElement = heroText.querySelector('.gradient-text:first-of-type');
        
        if (helloElement) {
            // Simpan teks asli dan siapkan untuk animasi
            const originalText = helloElement.textContent.trim();
            
            // Buat elemen-elemen baru
            const typingContainer = document.createElement('span');
            typingContainer.className = 'typing-container';
            
            const typedText = document.createElement('span');
            typedText.className = 'typed-text';
            
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            
            // Susun elemen-elemen
            typingContainer.appendChild(typedText);
            typingContainer.appendChild(cursor);
            
            // Ganti konten dengan container animasi
            helloElement.innerHTML = '';
            helloElement.appendChild(typingContainer);
            
            // Tambahkan style untuk animasi
            const style = document.createElement('style');
            style.textContent = `
                .typing-container {
                    position: relative;
                    display: inline-block;
                }
                
                .typed-text {
                    background: linear-gradient(to right, #B16CEA, #FF5E69, #FF8A56, #FFA84B);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-fill-color: transparent;
                }
                
                .cursor {
                    position: absolute;
                    right: -4px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 2px;
                    height: 70%;
                    background-color: #333;
                    display: inline-block;
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @media (max-width: 768px) {
                    .gradient-text:first-of-type {
                        display: block;
                        margin-bottom: 5px;
                    }
                    
                    .hero-text h1 {
                        line-height: 1.4 !important;
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease forwards;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.8s ease forwards;
                }
                
                .animate-zoomIn {
                    animation: zoomIn 0.8s ease forwards;
                }
                
                .animate-fadeInRight {
                    animation: fadeInRight 0.8s ease forwards;
                }
                
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.8s ease forwards;
                }
                
                .skill-icon:hover {
                    transform: translateY(-5px);
                    transition: transform 0.3s ease;
                }
                
                /* Animasi untuk galeri foto di halaman About */
                .gallery-item {
                    transition: all 0.5s ease;
                }
                
                .gallery-item:hover {
                    transform: scale(1.03);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(style);
            
            // Fungsi untuk mengetik teks
            function typeText(text, index = 0) {
                if (index < text.length) {
                    typedText.textContent = text.substring(0, index + 1);
                    setTimeout(() => typeText(text, index + 1), 100);
                } else {
                    // Tunggu sebelum menghapus
                    setTimeout(eraseText, 2000);
                }
            }
            
            // Fungsi untuk menghapus teks
            function eraseText() {
                const text = typedText.textContent;
                if (text.length > 0) {
                    typedText.textContent = text.substring(0, text.length - 1);
                    setTimeout(eraseText, 100);
                } else {
                    // Tunggu sebelum mengetik lagi
                    setTimeout(() => typeText(originalText), 1000);
                }
            }
            
            // Mulai animasi
            setTimeout(() => typeText(originalText), 1000);
        }
    }
    
    // ===== ANIMASI UNTUK "WHAT I DO" SECTION DAN IKON SKILL =====
    // Temukan elemen yang perlu dianimasikan
    const whatIDoHeading = document.querySelector('.skills h2');
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    if (whatIDoHeading || skillIcons.length > 0) {
        // Buat Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        
        // Observer untuk "What I do" heading
        if (whatIDoHeading) {
            whatIDoHeading.style.opacity = '0';
            whatIDoHeading.style.transform = 'translateY(-20px)';
            whatIDoHeading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            const headingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Reset status animasi
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(-20px)';
                        
                        // Force reflow
                        void entry.target.offsetWidth;
                        
                        // Animasikan elemen
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 10);
                    }
                });
            }, observerOptions);
            
            headingObserver.observe(whatIDoHeading);
        }
        
        // Observer untuk ikon skill
        if (skillIcons.length > 0) {
            const iconsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const icon = entry.target;
                        const index = parseInt(icon.dataset.index || 0);
                        
                        // Reset status animasi
                        icon.style.opacity = '0';
                        icon.style.transform = 'translateY(30px)';
                        
                        // Animasikan dengan delay
                        setTimeout(() => {
                            icon.style.opacity = '1';
                            icon.style.transform = 'translateY(0)';
                        }, 100 * index);
                    }
                });
            }, observerOptions);
            
            skillIcons.forEach((icon, index) => {
                // Siapkan status awal
                icon.style.opacity = '0';
                icon.style.transform = 'translateY(30px)';
                icon.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                icon.dataset.index = index;
                
                // Mulai observasi
                iconsObserver.observe(icon);
            });
        }
    }
    
    // ===== ANIMASI UNTUK HALAMAN ABOUT =====
    // Cek jika berada di halaman About

});

/* ===== ABOUT SECTION ANIMATIONS (about-animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMASI UNTUK INTRO SECTION (TERMASUK FOTO PROFIL) =====
    const introLeft = document.querySelector('.intro-left');
    const introRight = document.querySelector('.intro-right');
    
    if (introLeft && introRight) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        introLeft.style.opacity = '0';
        introLeft.style.transform = 'translateX(-50px)';
        introObserver.observe(introLeft);

        introRight.style.opacity = '0';
        introRight.style.transform = 'translateX(50px)';
        introObserver.observe(introRight);
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Observer untuk galeri foto
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Animate each gallery item with staggered delay
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 300 * index);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });
        
        // Add initial styles and start observing gallery items
        galleryItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(100px)'; // Start from right side
            galleryObserver.observe(item);
        });
    }

    // ===== ANIMASI UNTUK EDUCATION & WORK EXPERIENCE =====
    const educationItems = document.querySelectorAll('.education .timeline-item');
    const workItems = document.querySelectorAll('.work .timeline-item');
    
    // Observer for timeline items (education & work)
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Add initial styles and start observing education items
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        // Add staggered delay based on index
        setTimeout(() => {
            timelineObserver.observe(item);
        }, 150 * index);
    });
    
    // Add initial styles and start observing work items
    workItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        // Add staggered delay based on index
        setTimeout(() => {
            timelineObserver.observe(item);
        }, 150 * index);
    });

    // ===== ANIMASI UNTUK STATS =====
    const statItems = document.querySelectorAll('.stat-item');
    
    if (statItems.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Animate number counting
                        const countElement = entry.target.querySelector('h2');
                        if (countElement) {
                            const finalValue = parseInt(countElement.innerText);
                            animateCounter(countElement, 0, finalValue, 2000);
                        }
                    }, 300 * index);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });
        
        statItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            statObserver.observe(item);
        });
    }

    // ===== ANIMASI UNTUK SECTION TITLE =====
    const sectionTitle = document.querySelector('.section-title');
    
    if (sectionTitle) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-20px)';
        titleObserver.observe(sectionTitle);
    }

    // ===== ANIMASI UNTUK FOLLOW ME SECTION =====
    const followMe = document.querySelector('.follow-me-container');
    
    if (followMe) {
        const followObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });
        
        followMe.style.opacity = '0';
        followMe.style.transform = 'translateY(30px)';
        followObserver.observe(followMe);
    }

    // ===== ANIMASI UNTUK SETIAP SECTION =====
    // Fungsi untuk menambahkan animasi pada semua section ketika scroll
    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            root: null,
            rootMargin: '-50px',
            threshold: 0.1
        });
        
        sections.forEach((section) => {
            // Jangan tambahkan class ini pada intro karena sudah memiliki animasi sendiri
            if (!section.classList.contains('intro')) {
                section.classList.add('section-hidden');
                sectionObserver.observe(section);
            }
        });
    }
    
    // Panggil fungsi ini untuk memulai animasi section
    initSectionAnimations();

    // Function untuk menghapus class animate saat elemen keluar dari viewport
    function setupRemoveAnimationOnExit() {
        const animatedElements = document.querySelectorAll('.intro-left, .intro-right, .gallery-item, .timeline-item, .stat-item, .section-title, .follow-me-container');
        
        // Observer untuk menghapus class animate saat elemen keluar dari viewport
        const exitObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    // Hapus class animate saat elemen keluar dari viewport
                    entry.target.classList.remove('animate');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Amati semua elemen yang memiliki animasi
        animatedElements.forEach(element => {
            exitObserver.observe(element);
        });
    }
    
    // Panggil fungsi untuk setup reset animasi
    setupRemoveAnimationOnExit();
    
    // Fungsi untuk memperbaiki masalah tata letak mobile
    function fixMobileLayout() {
        // Cek jika ini adalah perangkat mobile
        if (window.innerWidth <= 768) {
            // Perbaiki tata letak intro section
            const introSection = document.querySelector('.intro');
            if (introSection) {
                // Memastikan padding yang konsisten
                introSection.style.paddingLeft = '15px';
                introSection.style.paddingRight = '15px';
            }
            
            // Perbaiki semua paragraf agar tidak melebihi lebar
            const paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.maxWidth = '100%';
                p.style.overflowWrap = 'break-word';
                p.style.wordWrap = 'break-word';
            });
            
            // Perbaiki judul
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                heading.style.maxWidth = '100%';
                heading.style.overflowWrap = 'break-word';
                heading.style.wordWrap = 'break-word';
            });
        }
    }
    
    // Panggil fungsi perbaikan layout saat halaman dimuat
    fixMobileLayout();
    
    // Panggil ulang saat resize window
    window.addEventListener('resize', fixMobileLayout);
    
    // Add necessary CSS for animations
    addAnimationStyles();

    // Helper function to animate counting
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Handle elements with spans (e.g. "100<span>+</span>")
            if (element.innerHTML.includes('<span>')) {
                element.innerHTML = value + element.innerHTML.substring(element.innerHTML.indexOf('<span>'));
            } else {
                element.innerText = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add CSS styles for animations
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Reset animation classes */
            .animate {
                animation: none !important;
            }
            
            /* Intro section animations */
            .intro-left, .intro-right {
                transition: opacity 0.8s ease, transform 0.8s ease;
                max-width: 100%; /* Membatasi lebar maksimum */
                word-wrap: break-word; /* Memastikan teks tidak melebar */
                overflow-wrap: break-word; /* Alternatif untuk browser lain */
            }
            
            .intro-left.animate, .intro-right.animate {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            /* Section animations */
            .section-hidden {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Gallery animation */
            .gallery-item {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .gallery-item.animate {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            /* Timeline animations */
            .timeline-item {
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .timeline-item.animate {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            /* Stats animation */
            .stat-item {
                transition: opacity 0.7s ease, transform 0.7s ease;
            }
            
            .stat-item.animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Section title animation */
            .section-title {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .section-title.animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Follow me section animation */
            .follow-me-container {
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .follow-me-container.animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Enhanced hover effect for gallery items */
            .gallery-item:hover {
                transform: scale(1.05) !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 1;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .gallery-item:hover {
                    transform: scale(1.03) !important;
                }
                
                /* Adjust timeline animations for mobile */
                .education .timeline-item, 
                .work .timeline-item {
                    transform: translateY(20px);
                }
                
                .education .timeline-item.animate, 
                .work .timeline-item.animate {
                    transform: translateY(0) !important;
                }
                
                /* Fix for mobile overflow issues */
                body, html {
                    overflow-x: hidden; /* Prevent horizontal scroll */
                    width: 100%;
                    max-width: 100%;
                }
                
                .intro-content, .intro-left, .intro-right, p {
                    max-width: 100%;
                    box-sizing: border-box;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
                
                h1, h2, h3 {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 100%;
                }
                
                /* Memperbaiki lebar konten */
                .intro {
                    padding-left: 15px;
                    padding-right: 15px;
                    box-sizing: border-box;
                }
                
                .intro-content {
                    width: 100%;
                    padding: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// File: about-sliding-underline-revised.js
// Animasi garis bawah judul "About" yang bergerak bolak-balik sebatas teks

document.addEventListener('DOMContentLoaded', function() {
    // Temukan elemen judul "About"
    const aboutTitle = document.querySelector('.section-title h2');
    
    // Jika elemen ditemukan
    if (aboutTitle) {
        // Dapatkan elemen parent untuk posisi relatif
        const titleContainer = aboutTitle.closest('.section-title');
        
        // Ukur lebar teks untuk batasan pergerakan
        const textWidth = aboutTitle.offsetWidth;
        
        // Buat container untuk menjadi batas area garis bergerak
        const underlineContainer = document.createElement('div');
        underlineContainer.className = 'underline-container';
        
        // Hapus pseudo-element asli dengan menambahkan kelas baru
        titleContainer.classList.add('custom-underline');
        
        // Tempatkan container di bawah judul, dengan lebar tepat seperti teks
        underlineContainer.style.width = textWidth + 'px';
        titleContainer.appendChild(underlineContainer);
        
        // Buat elemen garis baru untuk dianimasikan
        const underline = document.createElement('div');
        underline.className = 'sliding-underline';
        
        // Tambahkan garis ke dalam container
        underlineContainer.appendChild(underline);
        
        // Tambahkan CSS untuk animasi
        const style = document.createElement('style');
        style.textContent = `
            /* Hilangkan garis asli */
            .custom-underline h2::after {
                display: none !important;
            }
            
            /* Container dengan posisi relatif */
            .section-title {
                position: relative;
            }
            
            /* Container untuk batas gerak garis (sebatas teks) */
            .underline-container {
                position: absolute;
                height: 3px;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: transparent;
                overflow: hidden;
            }
            
            /* Garis yang bergerak */
            .sliding-underline {
                position: absolute;
                width: 70px;
                height: 3px;
                background: #FF5E69;
                bottom: 0;
                left: 0;
                
                /* Mulai animasi */
                animation: slideUnderline 4s ease-in-out infinite;
            }
            
            /* Animasi garis bergeser dari kiri ke kanan dan kembali */
            @keyframes slideUnderline {
                0%, 100% {
                    left: 0;
                }
                
                50% {
                    left: calc(100% - 70px);
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Tambahkan observer untuk reset animasi saat scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset dan mulai animasi
                    underline.style.animation = 'none';
                    void underline.offsetWidth; // Force reflow
                    underline.style.animation = 'slideUnderline 4s ease-in-out infinite';
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(titleContainer);
    }
});

/* ===== PORTFOLIO ANIMATIONS (portfolio-animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI PORTFOLIO INTERAKTIF =====
    
    // Setup observer untuk ketika elemen memasuki viewport
    const createSectionObserver = (threshold = 0.2) => {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Jika elemen memiliki badge atau anak elemen lain untuk animasi bertahap
                    const children = entry.target.querySelectorAll('.animate-child');
                    if (children.length > 0) {
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('child-in-view');
                            }, 150 * (index + 1));
                        });
                    }
                    
                    // Animasikan overlay
                    const overlay = entry.target.querySelector('.project-overlay');
                    if (overlay) {
                        setTimeout(() => {
                            overlay.classList.add('overlay-in-view');
                        }, 300);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: threshold
        });
    };
    
    // Header animation (judul portfolio)
    const headerObserver = createSectionObserver(0.5);
    const headerSection = document.querySelector('.projects-header');
    
    if (headerSection) {
        const title = headerSection.querySelector('h1');
        const paragraph = headerSection.querySelector('p');
        
        if (title) {
            // Buat efek huruf per huruf
            const words = title.textContent.split(' ');
            let newHTML = '';
            
            words.forEach(word => {
                if (word.includes('Projects')) {
                    // Untuk kata "Projects" (kata yang di-highlight)
                    const chars = word.split('');
                    let highlightHTML = '<span class="highlight">';
                    chars.forEach(char => {
                        highlightHTML += `<span class="char-animate">${char}</span>`;
                    });
                    highlightHTML += '</span>';
                    newHTML += highlightHTML + ' ';
                } else {
                    // Untuk kata-kata lainnya
                    const chars = word.split('');
                    let wordHTML = '';
                    chars.forEach(char => {
                        wordHTML += `<span class="char-animate">${char}</span>`;
                    });
                    newHTML += wordHTML + ' ';
                }
            });
            
            title.innerHTML = newHTML;
            title.classList.add('title-ready');
        }
        
        if (paragraph) {
            paragraph.classList.add('text-appear');
        }
        
        headerSection.classList.add('header-section');
        headerObserver.observe(headerSection);
    }
    
    // Project Grid Animation dengan efek lebih interaktif
    const projectObserver = createSectionObserver(0.1);
    const projectCards = document.querySelectorAll('.project-card');
    
    // Create modal container for image zoom
    const imageModal = document.createElement('div');
    imageModal.className = 'image-zoom-modal';
    const modalImg = document.createElement('img');
    const modalClose = document.createElement('span');
    modalClose.className = 'modal-close';
    modalClose.innerHTML = '&times;';
    imageModal.appendChild(modalImg);
    imageModal.appendChild(modalClose);
    document.body.appendChild(imageModal);
    
    // Close modal when clicking close button or outside the image
    modalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
        setTimeout(() => {
            modalImg.src = '';
        }, 300);
    });
    
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            setTimeout(() => {
                modalImg.src = '';
            }, 300);
        }
    });
    
    projectCards.forEach((card, index) => {
        // Tambahkan kelas animasi masuk acak
        const animClasses = ['flip-in', 'zoom-bounce', 'slide-rotate', 'fade-bounce'];
        const randomAnim = animClasses[index % animClasses.length];
        card.classList.add(randomAnim);
        
        // Tambahkan delay berdasarkan index
        card.style.transitionDelay = `${index * 0.15}s`;
        
        // Tangkap gambar project untuk animasi khusus
        const projectImage = card.querySelector('.project-image');
        const img = projectImage ? projectImage.querySelector('img') : null;
        
        if (img) {
            // Buat efek mask/reveal untuk gambar
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-reveal-wrapper';
            
            // Buat lapisan untuk efek reveal
            const revealMask = document.createElement('div');
            revealMask.className = 'reveal-mask';
            
            // Buat efek highlight border
            const highlightBorder = document.createElement('div');
            highlightBorder.className = 'highlight-border';
            
            // Buat element untuk animasi border bergerak
            const runningBorder = document.createElement('div');
            runningBorder.className = 'running-border';
            
            // Susun ulang struktur DOM untuk efek
            img.parentNode.insertBefore(imageWrapper, img);
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(revealMask);
            imageWrapper.appendChild(highlightBorder);
            imageWrapper.appendChild(runningBorder);
            
            // Add click event for image zoom
            imageWrapper.addEventListener('click', (e) => {
                // Get source image
                const imgSrc = img.src;
                
                // Set source in modal
                modalImg.src = imgSrc;
                
                // Show modal with animation
                imageModal.classList.add('active');
                
                // Add running border animation to zoomed image
                modalImg.classList.add('with-running-border');
                
                // Prevent event from bubbling to card
                e.stopPropagation();
            });
        }
        
        // Setup interaksi hover yang lebih dinamis
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
            
            // Activate shine effect
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            this.appendChild(shine);
            
            setTimeout(() => {
                shine.style.opacity = '1';
                shine.style.transform = 'translateY(0) scale(2)';
                
                setTimeout(() => {
                    shine.remove();
                }, 700);
            }, 10);
            
            // Efek ripple saat hover
            if (!this.querySelector('.ripple-effect')) {
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.style.transform = 'scale(1.5)';
                    ripple.style.opacity = '0';
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 500);
                }, 10);
            }
            
            // Activate running border
            const runningBorder = this.querySelector('.running-border');
            if (runningBorder) {
                runningBorder.classList.add('active');
            }
            
            // Efek overlay muncul dengan lebih menarik
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.classList.add('overlay-visible');
                
                // Animate buttons in overlay
                const buttons = overlay.querySelectorAll('.btn-small');
                buttons.forEach((btn, idx) => {
                    btn.style.transitionDelay = `${0.1 + (idx * 0.1)}s`;
                    btn.classList.add('btn-appear');
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
            
            // Deactivate running border
            const runningBorder = this.querySelector('.running-border');
            if (runningBorder) {
                runningBorder.classList.remove('active');
            }
            
            // Reset overlay
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.classList.remove('overlay-visible');
                
                // Reset button animations
                const buttons = overlay.querySelectorAll('.btn-small');
                buttons.forEach(btn => {
                    btn.style.transitionDelay = '0s';
                    btn.classList.remove('btn-appear');
                });
            }
        });
        
        // Advanced mouse tracking untuk efek lebih dinamis
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return; // Skip untuk mobile
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // posisi x dalam elemen
            const y = e.clientY - rect.top; // posisi y dalam elemen
            
            // Hitung posisi relatif (0-1)
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Efek 3D dengan gradient lighting
            this.style.background = `
                radial-gradient(
                    800px circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.06),
                    transparent 40%
                )
            `;
            
            // Hitung rotasi berdasarkan posisi kursor
            const rotateX = (yPercent - 0.5) * -10; // -5 to 5 degrees
            const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degrees
            
            // Terapkan transformasi 3D yang lebih dinamis
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
                scale(1.03)
            `;
            
            // Dynamic shadow based on cursor position
            const shadowX = (xPercent - 0.5) * 20;
            const shadowY = (yPercent - 0.5) * 20;
            this.style.boxShadow = `
                ${-shadowX}px ${-shadowY}px 20px rgba(0, 0, 0, 0.1),
                0 10px 20px rgba(0, 0, 0, 0.1)
            `;
            
            // Efek parallax untuk gambar
            const imageWrapper = this.querySelector('.image-reveal-wrapper');
            if (imageWrapper) {
                imageWrapper.style.transform = `
                    translate(${(xPercent - 0.5) * -15}px, ${(yPercent - 0.5) * -15}px)
                `;
            }
            
            // Border light effect
            const highlightBorder = this.querySelector('.highlight-border');
            if (highlightBorder) {
                highlightBorder.style.opacity = '1';
                highlightBorder.style.background = `
                    radial-gradient(
                        600px circle at ${x}px ${y}px,
                        rgba(255, 255, 255, 0.4),
                        transparent 40%
                    )
                `;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all dynamic effects
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.background = '';
            
            const imageWrapper = this.querySelector('.image-reveal-wrapper');
            if (imageWrapper) {
                imageWrapper.style.transform = '';
            }
            
            const highlightBorder = this.querySelector('.highlight-border');
            if (highlightBorder) {
                highlightBorder.style.opacity = '0';
            }
        });
        
        projectObserver.observe(card);
    });
    
    // Case Study Sections (Client Challenge, Flowchart, Statistica)
    const caseStudySections = document.querySelectorAll('.client-challenge, .flowchart, .statistica');
    const caseStudyObserver = createSectionObserver(0.2);
    
    caseStudySections.forEach((section, index) => {
        // Tambahkan kelas khusus
        section.classList.add('case-study-section');
        
        // Alternating animations
        if (index % 2 === 0) {
            section.classList.add('from-left');
        } else {
            section.classList.add('from-right');
        }
        
        // Tambahkan efek scroll parallax
        const image = section.querySelector('img');
        if (image) {
            image.classList.add('parallax-image');
        }
        
        caseStudyObserver.observe(section);
    });
    
    // More Projects Section
    const moreProjectsSection = document.querySelector('.more-projects');
    if (moreProjectsSection) {
        const moreProjectsObserver = createSectionObserver(0.2);
        const moreProjectsTitle = moreProjectsSection.querySelector('h2');
        const moreProjectItems = moreProjectsSection.querySelectorAll('.more-project-item');
        
        if (moreProjectsTitle) {
            moreProjectsTitle.classList.add('title-scale');
            moreProjectsObserver.observe(moreProjectsTitle);
        }
        
        moreProjectItems.forEach((item, index) => {
            item.classList.add('project-item-zoom');
            item.style.transitionDelay = `${index * 0.2}s`;
            
            // Efek hover yang keren untuk item-item tambahan
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth <= 768) return; // Skip untuk mobile
                
                this.classList.add('hover');
                // Tambahkan efek zoom pada gambar
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.15)';
                }
                
                // Munculkan overlay
                const overlay = this.querySelector('.more-project-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
                // Reset zoom pada gambar
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
                
                // Sembunyikan overlay
                const overlay = this.querySelector('.more-project-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(20px)';
                }
            });
            
            // Efek 3D tilt
            item.addEventListener('mousemove', function(e) {
                if (window.innerWidth <= 768) return; // Skip untuk mobile
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / centerX;
                const moveY = (y - centerY) / centerY;
                
                this.style.transform = `perspective(1000px) rotateX(${moveY * -8}deg) rotateY(${moveX * 8}deg) scale(1.05)`;
                this.style.boxShadow = `${moveX * -15}px ${moveY * -15}px 30px rgba(0, 0, 0, 0.2)`;
                
                // Gambar bergerak berlawanan arah untuk efek depth
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = `scale(1.15) translate(${moveX * -15}px, ${moveY * -15}px)`;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
            
            moreProjectsObserver.observe(item);
        });
    }
    
    // Scroll Parallax Effect untuk semua gambar utama
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) return; // Skip untuk mobile untuk performa
        
        const parallaxImages = document.querySelectorAll('.parallax-image');
        parallaxImages.forEach(image => {
            const speed = 0.05;
            const rect = image.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const offset = rect.top + scrollPosition;
            const parallaxOffset = (scrollPosition - offset) * speed;
            
            image.style.transform = `translateY(${parallaxOffset}px)`;
        });
    });
    
    // Tambahkan CSS untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        /* Animasi untuk header section */
        .header-section {
            opacity: 0;
            transition: opacity 1s ease;
        }
        
        .header-section.in-view {
            opacity: 1;
        }
        
        .title-ready .char-animate {
            opacity: 0;
            transform: translateY(-20px);
            display: inline-block;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .header-section.in-view .char-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Anim per karakter dengan delay berjenjang */
        .header-section.in-view .char-animate:nth-child(1) { transition-delay: 0.05s; }
        .header-section.in-view .char-animate:nth-child(2) { transition-delay: 0.1s; }
        .header-section.in-view .char-animate:nth-child(3) { transition-delay: 0.15s; }
        .header-section.in-view .char-animate:nth-child(4) { transition-delay: 0.2s; }
        .header-section.in-view .char-animate:nth-child(5) { transition-delay: 0.25s; }
        .header-section.in-view .char-animate:nth-child(6) { transition-delay: 0.3s; }
        .header-section.in-view .char-animate:nth-child(7) { transition-delay: 0.35s; }
        .header-section.in-view .char-animate:nth-child(8) { transition-delay: 0.4s; }
        .header-section.in-view .char-animate:nth-child(9) { transition-delay: 0.45s; }
        .header-section.in-view .char-animate:nth-child(10) { transition-delay: 0.5s; }
        
        /* Animasi teks deskripsi */
        .text-appear {
            opacity: 0;
            transform: translateX(30px);
            transition: opacity 1s ease, transform 1s ease;
            transition-delay: 0.6s;
        }
        
        .header-section.in-view .text-appear {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Animasi project card */
        /* Animasi paragraf pada intro section */
        .projects-header p {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1.2s ease, transform 1.2s ease;
            transition-delay: 0.8s;
        }
        
        .projects-header.in-view p {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Image Zoom Modal */
        .image-zoom-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .image-zoom-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .image-zoom-modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            transform: scale(0.9);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            position: relative;
        }
        
        .image-zoom-modal.active img {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            transition: background-color 0.3s ease, transform 0.3s ease;
        }
        
        .modal-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        /* Running Border Animation */
        .running-border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 3;
        }
        
        .running-border.active {
            opacity: 1;
        }
        
        .running-border::before,
        .running-border::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .running-border::before {
            border-top: 2px solid var(--primary-color, #B16CEA);
            border-left: 2px solid var(--primary-color, #B16CEA);
            animation: borderTopLeft 2s infinite linear;
        }
        
        .running-border::after {
            border-bottom: 2px solid var(--secondary-color, #FF5E69);
            border-right: 2px solid var(--secondary-color, #FF5E69);
            animation: borderBottomRight 2s infinite linear;
        }
        
        /* Running border for zoomed image */
        .with-running-border {
            position: relative;
        }
        
        .with-running-border::before,
        .with-running-border::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        }
        
        .with-running-border::before {
            border-top: 3px solid var(--primary-color, #B16CEA);
            border-left: 3px solid var(--primary-color, #B16CEA);
            animation: borderTopLeft 3s infinite linear;
        }
        
        .with-running-border::after {
            border-bottom: 3px solid var(--secondary-color, #FF5E69);
            border-right: 3px solid var(--secondary-color, #FF5E69);
            animation: borderBottomRight 3s infinite linear;
        }
        
        @keyframes borderTopLeft {
            0% {
                transform: translate(-100%, -100%);
            }
            25% {
                transform: translate(0, -100%);
            }
            50% {
                transform: translate(0, 0);
            }
            75% {
                transform: translate(-100%, 0);
            }
            100% {
                transform: translate(-100%, -100%);
            }
        }
        
        @keyframes borderBottomRight {
            0% {
                transform: translate(100%, 100%);
            }
            25% {
                transform: translate(0, 100%);
            }
            50% {
                transform: translate(0, 0);
            }
            75% {
                transform: translate(100%, 0);
            }
            100% {
                transform: translate(100%, 100%);
            }
        }
        
        /* Make image-reveal-wrapper clickable */
        .image-reveal-wrapper {
            cursor: pointer;
        }
        
        /* Pulse effect for indicating clickable */
        .image-reveal-wrapper::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            z-index: 4;
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .image-reveal-wrapper:hover::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            animation: pulseEffect 1.5s infinite ease-out;
        }
        
        @keyframes pulseEffect {
            0% {
                transform: translate(-50%, -50%) scale(0.3);
                opacity: 0.7;
            }
            70% {
                opacity: 0;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0;
            }
        }
        
        /* Variasi animasi masuk */
        .project-card.flip-in {
            transform: perspective(1000px) rotateY(90deg);
        }
        
        .project-card.zoom-bounce {
            transform: scale(0.6);
        }
        
        .project-card.slide-rotate {
            transform: translateX(-100px) rotate(-5deg);
        }
        
        .project-card.fade-bounce {
            transform: translateY(50px);
        }
        
        /* State aktif (in-view) */
        .project-card.in-view {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0) scale(1);
        }
        
        .project-card.hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Image reveal effect */
        .image-reveal-wrapper {
            position: relative;
            overflow: hidden;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .image-reveal-wrapper img {
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .reveal-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, var(--primary-color, #B16CEA), var(--quaternary-color, #FFA84B));
            transform: translateX(-100%);
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 1;
        }
        
        .project-card.in-view .reveal-mask {
            transform: translateX(100%);
        }
        
        .highlight-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 2;
        }
        
        /* Card shine effect */
        .card-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0) 70%);
            opacity: 0;
            transform: translateY(100%) scale(0.5);
            transition: all 0.7s ease;
            pointer-events: none;
            z-index: 3;
        }
        
        /* Ripple effect */
        .ripple-effect {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
            transition: transform 0.5s ease, opacity 0.5s ease;
            pointer-events: none;
            z-index: 2;
        }
        
        /* Button appear animation in overlay */
        .project-overlay {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        
        .overlay-visible {
            transform: translateY(0) !important;
            opacity: 1 !important;
        }
        
        .btn-small {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease;
        }
        
        .btn-appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Case study section animations */
        .case-study-section {
            opacity: 0;
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .case-study-section.from-left {
            transform: translateX(-50px);
        }
        
        .case-study-section.from-right {
            transform: translateX(50px);
        }
        
        .case-study-section.in-view {
            opacity: 1;
            transform: translateX(0);
        }
        
        .parallax-image {
            transition: transform 0.3s ease-out;
            will-change: transform;
        }
        
        /* More Projects animations */
        .title-scale {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .title-scale.in-view {
            opacity: 1;
            transform: scale(1);
        }
        
        .project-item-zoom {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            perspective: 1000px;
            transform-style: preserve-3d;
        }
        
        .project-item-zoom.in-view {
            opacity: 1;
            transform: scale(1);
        }
        
        .project-item-zoom.hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .project-item-zoom img {
            transition: transform 0.5s ease;
        }
        
        .more-project-overlay {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .project-card.from-left,
            .project-card.from-right,
            .case-study-section.from-left,
            .case-study-section.from-right {
                transform: translateY(30px);
            }
            
            .project-card.in-view,
            .case-study-section.in-view {
                transform: translateY(0);
            }
            
            /* Simpler animation for mobile */
            .project-card:hover,
            .project-item-zoom:hover {
                transform: translateY(-5px) !important;
            }
            
            /* Pastikan overlay muncul di tap pertama pada mobile */
            .project-card:active .more-project-overlay,
            .project-item-zoom:active .more-project-overlay {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Sentuhan akhir untuk interaktivitas */
        .highlight {
            display: inline-block;
            position: relative;
        }
        
        .highlight::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, var(--primary-color, #B16CEA), var(--secondary-color, #FF5E69));
            transition: width 1s ease;
        }
        
        .header-section.in-view .highlight::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});

/* ===== SERVICE ANIMATIONS (service-animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI UNTUK JUDUL SERVICES =====
    const servicesHeader = document.querySelector('.services-header h1');
    
    if (servicesHeader) {
        // Pisahkan teks "Our" dan "Services" dengan span
        const headerText = servicesHeader.innerHTML;
        const highlightSpan = headerText.includes('<span') ? 
            headerText.match(/<span.*?<\/span>/)[0] : '';
        
        const regularText = headerText.replace(highlightSpan, '').trim();
        
        // Buat letters array dari teks reguler
        const regularLetters = regularText.split('').map(char => 
            `<span class="header-letter">${char}</span>`).join('');
        
        // Update header content
        servicesHeader.innerHTML = regularLetters + ' ' + highlightSpan;
        
        // Animasi per huruf dengan delay bertingkat
        const letters = servicesHeader.querySelectorAll('.header-letter');
        letters.forEach((letter, index) => {
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(-50px) rotateX(90deg)';
            letter.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            letter.style.display = 'inline-block';
            
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) rotateX(0)';
            }, 100 * index);
        });
        
        // Animasi untuk highlight span (Services)
        const highlightElement = servicesHeader.querySelector('span.highlight');
        if (highlightElement) {
            highlightElement.style.opacity = '0';
            highlightElement.style.transform = 'translateX(30px) scale(0.8)';
            highlightElement.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            
            setTimeout(() => {
                highlightElement.style.opacity = '1';
                highlightElement.style.transform = 'translateX(0) scale(1)';
                
                // Tambahkan efek glow setelah animasi
                setTimeout(() => {
                    highlightElement.classList.add('text-glow');
                }, 1500);
            }, letters.length * 100 + 200);
        }
    }
    
    // ===== ANIMASI UNTUK SERVICE ITEMS =====
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length > 0) {
        // Create observer for service items
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const serviceItem = entry.target;
                    const isReverse = serviceItem.classList.contains('reverse');
                    
                    // Tambahkan class untuk animasi
                    serviceItem.classList.add('animate-service');
                    
                    // Dapatkan elemen-elemen yang akan dianimasikan
                    const content = serviceItem.querySelector('.service-content');
                    const image = serviceItem.querySelector('.service-image');
                    const title = content ? content.querySelector('h2') : null;
                    const paragraph = content ? content.querySelector('p') : null;
                    const button = content ? content.querySelector('.btn') : null;
                    
                    // Reset dan siapkan animasi
                    if (title) {
                        title.style.opacity = '0';
                        title.style.transform = isReverse ? 'translateX(-70px)' : 'translateX(70px)';
                        title.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
                    }
                    
                    if (paragraph) {
                        paragraph.style.opacity = '0';
                        paragraph.style.transform = isReverse ? 'translateX(-50px)' : 'translateX(50px)';
                        paragraph.style.transition = 'opacity 1.8s ease, transform 1.8s ease';
                    }
                    
                    if (image) {
                        image.style.opacity = '0';
                        image.style.transform = isReverse ? 'translateX(80px) rotateY(-10deg)' : 'translateX(-80px) rotateY(10deg)';
                        image.style.transition = 'opacity 2s ease, transform 2s ease';
                        image.style.transformOrigin = isReverse ? 'left center' : 'right center';
                    }
                    
                    if (button) {
                        button.style.opacity = '0';
                        button.style.transform = 'translateY(30px)';
                        button.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                    }
                    
                    // Jalankan animasi dengan timing bertahap
                    if (title) {
                        setTimeout(() => {
                            title.style.opacity = '1';
                            title.style.transform = 'translateX(0)';
                        }, 300);
                    }
                    
                    if (paragraph) {
                        setTimeout(() => {
                            paragraph.style.opacity = '1';
                            paragraph.style.transform = 'translateX(0)';
                        }, 800);
                    }
                    
                    if (image) {
                        setTimeout(() => {
                            image.style.opacity = '1';
                            image.style.transform = 'translateX(0) rotateY(0)';
                            
                            // Tambahkan highlight glow setelah image muncul
                            setTimeout(() => {
                                image.classList.add('image-highlight');
                                setTimeout(() => {
                                    image.classList.remove('image-highlight');
                                }, 1000);
                            }, 1000);
                        }, 500);
                    }
                    
                    if (button) {
                        setTimeout(() => {
                            button.style.opacity = '1';
                            button.style.transform = 'translateY(0)';
                            
                            // Tambahkan efek bounce setelah muncul
                            setTimeout(() => {
                                button.classList.add('button-pulse');
                                setTimeout(() => {
                                    button.classList.remove('button-pulse');
                                }, 1000);
                            }, 1000);
                        }, 1200);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '-50px',
            threshold: 0.2
        });
        
        // Observe semua service items
        serviceItems.forEach(item => {
            serviceObserver.observe(item);
        });
    }
    
    // ===== HOVER ANIMASI UNTUK SERVICE IMAGES =====
    const serviceImages = document.querySelectorAll('.service-image');
    
    serviceImages.forEach(image => {
        // Tambahkan overlay untuk efek hover
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        image.appendChild(overlay);
        
        // Tambahkan eventListeners
        image.addEventListener('mouseenter', function() {
            // 3D rotation effect yang lebih dramatis
            this.style.transition = 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 1.2s ease';
            this.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(5deg) scale(1.05)';
            this.style.boxShadow = '0 25px 30px rgba(0, 0, 0, 0.2), 0 0 30px rgba(177, 108, 234, 0.3)';
            
            // Get the img element inside
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                img.style.transform = 'scale(1.12)';
            }
            
            // Animate overlay
            overlay.style.opacity = '0.2';
        });
        
        image.addEventListener('mouseleave', function() {
            // Reset to original state dengan transisi yang lebih lembut
            this.style.transition = 'transform 1s ease, box-shadow 1s ease';
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 1s ease';
                img.style.transform = 'scale(1)';
            }
            
            // Reset overlay
            overlay.style.opacity = '0';
        });
        
        // Track mouse movement for parallax effect
        image.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10; // max Â±10 degrees
            const rotateX = ((centerY - y) / centerY) * 5; // max Â±5 degrees
            
            // Apply the rotation
            this.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
            
            // Move img slightly for parallax effect
            const img = this.querySelector('img');
            if (img) {
                const moveX = ((x - centerX) / centerX) * 10; // max Â±10px
                const moveY = ((y - centerY) / centerY) * 10; // max Â±10px
                img.style.transform = `scale(1.12) translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
    
    // ===== ANIMASI UNTUK BUTTONS PADA HOVER =====
    const hireButtons = document.querySelectorAll('.service-content .btn');
    
    hireButtons.forEach(button => {
        // Buat span untuk animasi shine effect
        const shine = document.createElement('span');
        shine.className = 'btn-shine';
        button.appendChild(shine);
        
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 15px 25px rgba(177, 108, 234, 0.4)';
            
            // Activate shine effect
            shine.style.opacity = '1';
            shine.style.left = '100%';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.6s ease';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Reset shine effect
            setTimeout(() => {
                shine.style.opacity = '0';
                shine.style.left = '-100%';
            }, 200);
        });
    });
    
    // ===== PAGE DIVIDER ANIMATION =====
    const pageDivider = document.querySelector('.page-divider');
    
    if (pageDivider) {
        // Initial style
        pageDivider.style.width = '0';
        pageDivider.style.margin = '20px auto 40px';
        pageDivider.style.transition = 'width 2.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Create observer
        const dividerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the divider width from 0 to 100%
                    setTimeout(() => {
                        pageDivider.style.width = '100%';
                        
                        // Add a highlight effect after the line expands
                        setTimeout(() => {
                            pageDivider.classList.add('divider-highlight');
                            setTimeout(() => {
                                pageDivider.classList.remove('divider-highlight');
                            }, 1000);
                        }, 2500);
                    }, 300);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        
        dividerObserver.observe(pageDivider);
    }
    
    // ===== EFEK PARALLAX SCROLL =====
    window.addEventListener('scroll', function() {
        // Dapatkan posisi scroll halaman
        const scrollY = window.scrollY;
        
        // Animasi parallax untuk service images
        serviceImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const speed = 0.05;
                const yPos = (rect.top - window.innerHeight / 2) * speed;
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // ===== FUNGSI UNTUK MEMPERBAIKI MASALAH TATA LETAK MOBILE =====
    function fixMobileLayout() {
        if (window.innerWidth <= 768) {
            // Sesuaikan animasi untuk mobile
            serviceItems.forEach(item => {
                const content = item.querySelector('.service-content');
                const image = item.querySelector('.service-image');
                
                if (content) {
                    content.style.width = '100%';
                    content.style.textAlign = 'center';
                }
                
                if (image) {
                    image.style.width = '90%';
                    
                    // Hapus listener mousemove untuk mobile
                    image.removeEventListener('mousemove', function(){});
                }
            });
        }
    }
    
    // Panggil fungsi layout saat halaman dimuat
    fixMobileLayout();
    
    // Panggil ulang saat ukuran window berubah
    window.addEventListener('resize', fixMobileLayout);
    
    // ===== CSS FOR ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        /* Header letter animation */
        .header-letter {
            display: inline-block;
            backface-visibility: hidden;
            perspective: 1000px;
        }
        
        /* Text glow effect */
        .text-glow {
            animation: textGlow 2s infinite alternate;
        }
        
        @keyframes textGlow {
            0% { text-shadow: 0 0 5px rgba(255, 94, 105, 0.3); }
            100% { text-shadow: 0 0 15px rgba(255, 94, 105, 0.7), 0 0 30px rgba(255, 94, 105, 0.4); }
        }
        
        /* Service item animation */
        .animate-service {
            position: relative;
        }
        
        /* Service image styling */
        .service-image {
            position: relative;
            transition: transform 1s ease, box-shadow 1s ease;
            overflow: hidden;
            transform-style: preserve-3d;
        }
        
        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(177, 108, 234, 0.5), rgba(255, 94, 105, 0.5));
            opacity: 0;
            transition: opacity 1s ease;
            z-index: 1;
            pointer-events: none;
        }
        
        .service-image img {
            transition: transform 1s ease;
        }
        
        /* Image highlight effect */
        .image-highlight {
            animation: imageHighlight 1.5s;
        }
        
        @keyframes imageHighlight {
            0% { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
            50% { box-shadow: 0 0 40px rgba(177, 108, 234, 0.6), 0 0 20px rgba(255, 94, 105, 0.4); }
            100% { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
        }
        
        /* Button animation */
        .btn-gradient {
            position: relative;
            overflow: hidden;
        }
        
        .btn-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, 
                rgba(255, 255, 255, 0) 0%, 
                rgba(255, 255, 255, 0.6) 50%, 
                rgba(255, 255, 255, 0) 100%);
            opacity: 0;
            transform: skewX(-25deg);
            transition: left 1s ease, opacity 0.5s ease;
            pointer-events: none;
        }
        
        .button-pulse {
            animation: buttonPulse 1s;
        }
        
        @keyframes buttonPulse {
            0% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
            50% { transform: scale(1.1); box-shadow: 0 15px 25px rgba(177, 108, 234, 0.4); }
            100% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
        }
        
        /* Divider highlight effect */
        .divider-highlight {
            animation: dividerHighlight 1s;
        }
        
        @keyframes dividerHighlight {
            0% { background-color: #ddd; }
            50% { background-color: rgba(255, 94, 105, 0.8); box-shadow: 0 0 20px rgba(255, 94, 105, 0.6); }
            100% { background-color: #ddd; }
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .service-item {
                flex-direction: column;
                align-items: center;
                padding: 30px 5%;
            }
            
            .service-content, .service-image {
                width: 100%;
                text-align: center;
                margin-bottom: 20px;
            }
            
            /* Adjust image hover effect for touch devices */
            .service-image:hover {
                transform: none !important;
            }
            
            .service-image img:hover {
                transform: scale(1.05) !important;
            }
        }
    `;
    
    document.head.appendChild(style);
});

/* ===== BLOG ANIMATIONS (blog-animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== VIEWPORT-BASED ANIMATION FOR FEATURED ARTICLES =====
    const articleCards = document.querySelectorAll('.article-card');
    
    // Create observer for article cards entrance animation when they enter viewport
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add entrance animation with staggered delay
                entry.target.classList.add('article-animate');
                entry.target.style.animationDelay = `${index * 0.15}s`;
                
                // Stop observing after animation
                articleObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '-30px', // Trigger when element is 30px inside viewport
        threshold: 0.1       // Trigger when 10% of element is visible
    });
    
    // Start observing article cards
    articleCards.forEach(card => {
        articleObserver.observe(card);
        
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            // Add class for hover styles
            this.classList.add('article-hover');
            
            // Enhanced image zoom
            const image = this.querySelector('.article-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('article-hover');
            
            // Reset image zoom
            const image = this.querySelector('.article-image img');
            if (image) {
                image.style.transform = '';
            }
        });
    });
    
    // ===== VIEWPORT-BASED ANIMATION FOR BLOG LIST =====
    const blogItems = document.querySelectorAll('.blog-item');
    
    // Create observer for blog list items entrance animation when they enter viewport
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add entrance animation with staggered delay
                entry.target.classList.add('blog-animate');
                entry.target.style.animationDelay = `${index * 0.12}s`;
                
                // Stop observing after animation
                blogObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '-30px', // Trigger when element is 30px inside viewport
        threshold: 0.1       // Trigger when 10% of element is visible
    });
    
    // Start observing blog items
    blogItems.forEach(item => {
        blogObserver.observe(item);
        
        // Add hover effect enhancement
        item.addEventListener('mouseenter', function() {
            this.classList.add('blog-hover');
            
            // Enhanced image zoom
            const image = this.querySelector('.blog-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('blog-hover');
            
            // Reset image zoom
            const image = this.querySelector('.blog-image img');
            if (image) {
                image.style.transform = '';
            }
        });
    });
    
    // ===== VIEWPORT-BASED ANIMATION FOR FILTER BUTTONS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterContainer = document.querySelector('.filter-categories');
    
    // Create observer for filter buttons section
    const filterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all filter buttons with staggered delay when container enters viewport
                filterButtons.forEach((button, index) => {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(15px)';
                    button.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease';
                    
                    setTimeout(() => {
                        button.style.opacity = '1';
                        button.style.transform = 'translateY(0)';
                    }, 100 + (index * 70));
                });
                
                // Stop observing after animation
                filterObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '-20px',
        threshold: 0.1
    });
    
    // Start observing filter container
    if (filterContainer) {
        filterObserver.observe(filterContainer);
    }
    
    // Add click effect for filter buttons
    filterButtons.forEach((button) => {
        // Add click animation
        button.addEventListener('click', function() {
            // Add ripple effect on click
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Animate blog items on filter change
            blogItems.forEach((item, i) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 200 + (i * 80));
            });
        });
    });
    
    // ===== VIEWPORT-BASED ANIMATION FOR CTA SECTION =====
    const ctaSection = document.querySelector('.cta');
    
    if (ctaSection) {
        const ctaText = ctaSection.querySelector('h2');
        const ctaLink = ctaSection.querySelector('.cta-link');
        
        // Initial state
        if (ctaText) {
            ctaText.style.opacity = '0';
            ctaText.style.transform = 'translateY(20px)';
            ctaText.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        }
        
        if (ctaLink) {
            ctaLink.style.opacity = '0';
            ctaLink.style.transform = 'translateX(-15px)';
            ctaLink.style.transition = 'all 0.6s ease';
        }
        
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate CTA title
                    if (ctaText) {
                        ctaText.style.opacity = '1';
                        ctaText.style.transform = 'translateY(0)';
                    }
                    
                    // Animate CTA link with slight delay
                    if (ctaLink) {
                        setTimeout(() => {
                            ctaLink.style.opacity = '1';
                            ctaLink.style.transform = 'translateX(0)';
                        }, 400);
                    }
                    
                    // Stop observing after animation
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '-50px', 
            threshold: 0.2
        });
        
        // Start observing
        ctaObserver.observe(ctaSection);
    }
    
    // ===== MARQUEE-STYLE CONTINUOUS BANNER ANIMATION =====
    const skillsBanner = document.querySelector('.skills-banner');
    
    if (skillsBanner) {
        // Simpan konten asli banner
        const originalContent = skillsBanner.innerHTML;
        
        // Buat wrapper baru untuk konten
        const marqueeWrapper = document.createElement('div');
        marqueeWrapper.className = 'marquee-wrapper';
        
        // Buat konten yang akan digerakkan
        const marqueeContent = document.createElement('div');
        marqueeContent.className = 'marquee-content';
        
        // Bersihkan banner
        skillsBanner.innerHTML = '';
        
        // Tambahkan konten original beberapa kali untuk memastikan kontinuitas
        // Ini akan membuat elemen cukup lebar untuk menutupi seluruh lebar viewport
        // dan animasi akan terlihat mulus tanpa reset
        for (let i = 0; i < 10; i++) {
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'marquee-items';
            itemsContainer.innerHTML = originalContent;
            marqueeContent.appendChild(itemsContainer);
        }
        
        // Susun elemen-elemen
        marqueeWrapper.appendChild(marqueeContent);
        skillsBanner.appendChild(marqueeWrapper);
        
        // Tunggu elemen selesai di-render untuk menghitung durasi
        setTimeout(() => {
            // Ukur lebar konten untuk menentukan durasi animasi
            const contentWidth = marqueeContent.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            // Durasi berdasarkan lebar konten dengan dasar 20 detik
            // Semakin panjang konten, semakin lama durasi animasi
            const duration = Math.max(contentWidth / viewportWidth * 20, 40);
            
            // Terapkan animasi kontinu
            marqueeContent.style.animation = `marqueeMove ${duration}s linear infinite`;
            marqueeContent.style.transform = 'translateX(0)';
            
            // Simpan nilai awal transformasi
            let currentPosition = 0;
            
            // Fungsi untuk memulai animasi
            function startAnimation() {
                // Mulai dari posisi saat ini, bukan dari awal
                marqueeContent.style.animation = 'none';
                marqueeContent.style.transform = `translateX(${currentPosition}px)`;
                
                // Force reflow
                void marqueeContent.offsetWidth;
                
                // Hitung durasi yang tersisa berdasarkan posisi
                const totalDistance = contentWidth;
                const remainingDistance = totalDistance + currentPosition; // currentPosition selalu negatif
                const remainingDuration = duration * (remainingDistance / totalDistance);
                
                // Mulai animasi dari posisi saat ini
                marqueeContent.style.animation = `marqueeMove ${remainingDuration}s linear infinite`;
                marqueeContent.style.animationPlayState = 'running';
            }
            
            // Fungsi untuk berhenti dan menyimpan posisi
            function pauseAnimation() {
                const computedStyle = window.getComputedStyle(marqueeContent);
                const transform = computedStyle.getPropertyValue('transform');
                const matrix = new DOMMatrix(transform);
                currentPosition = matrix.m41; // Nilai translateX
                
                marqueeContent.style.animationPlayState = 'paused';
            }
            
            // Tambahkan event listener untuk pause saat tab tidak aktif
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    pauseAnimation();
                } else {
                    startAnimation();
                }
            });
            
            // Tambahkan event listener untuk resize window
            window.addEventListener('resize', function() {
                pauseAnimation();
                startAnimation();
            });
        }, 500);
    }
    
    // ===== ADDING SCROLL PROGRESS BAR TO ARTICLE POPUP =====
    const popup = document.getElementById('artikel-popup');
    if (popup) {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'article-progress-bar';
        
        // Add progress bar to the body element instead of popup content
        // This will position it at the very top of the window when popup is open
        document.body.appendChild(progressBar);
        
        // Hide progress bar initially
        progressBar.style.display = 'none';
        
        // Handle popup opening (show progress bar)
        const openPopup = function() {
            progressBar.style.display = 'block';
            progressBar.style.width = '0%';
        };
        
        // Handle popup closing (hide progress bar)
        const closePopup = function() {
            progressBar.style.display = 'none';
        };
        
        // Update progress bar on scroll
        const popupContent = popup.querySelector('.artikel-popup-content');
        if (popupContent) {
            popupContent.addEventListener('scroll', function() {
                const scrollTop = this.scrollTop;
                const scrollHeight = this.scrollHeight;
                const clientHeight = this.clientHeight;
                
                // Calculate scroll percentage
                const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
                
                // Update progress bar width
                progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
                
                // Add class when complete
                if (scrollPercentage >= 98) {
                    progressBar.classList.add('complete');
                } else {
                    progressBar.classList.remove('complete');
                }
            });
        }
        
        // Add event listeners to all article cards and blog items
        const allArticleItems = document.querySelectorAll('.article-card, .blog-item');
        allArticleItems.forEach(item => {
            item.addEventListener('click', openPopup);
        });
        
        // Add event listener to close button and overlay
        const closeButton = popup.querySelector('.artikel-popup-close');
        const overlay = popup.querySelector('.artikel-popup-overlay');
        
        if (closeButton) {
            closeButton.addEventListener('click', closePopup);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closePopup);
        }
        
        // Add event listener for escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
        
        // Enhanced popup open animation
        const enhancePopup = function() {
            // Get the existing close button
            if (closeButton) {
                closeButton.innerHTML = '<span class="close-icon">&times;</span>';
                closeButton.addEventListener('mouseenter', function() {
                    this.classList.add('pulse');
                });
                closeButton.addEventListener('mouseleave', function() {
                    this.classList.remove('pulse');
                });
            }
        };
        
        // Apply enhancements
        enhancePopup();
    }
    
    // ===== ADD CSS STYLES FOR ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        /* Article Card Animation - Viewport Based */
        .article-card {
            opacity: 0;
            transform: translateY(30px);
            transition: transform 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
            will-change: transform, opacity;
        }
        
        .article-animate {
            animation: cardSlideUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        @keyframes cardSlideUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .article-hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
        }
        
        /* Blog Items Animation - Viewport Based */
        .blog-item {
            opacity: 0;
            transform: translateY(30px);
            transition: transform 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
            will-change: transform, opacity;
        }
        
        .blog-animate {
            animation: blogSlideIn 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        
        @keyframes blogSlideIn {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .blog-hover {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
        }
        
        /* Filter Button Animation */
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
        
        /* Marquee-Style Continuous Banner Animation */
        .skills-banner {
            width: 100%;
            overflow: hidden;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--tertiary-color), var(--quaternary-color));
            color: white;
            padding: 15px 0;
            position: relative;
        }
        
        .marquee-wrapper {
            overflow: hidden;
            width: 100%;
            position: relative;
        }
        
        .marquee-content {
            display: flex;
            position: relative;
            will-change: transform;
        }
        
        .marquee-items {
            display: flex;
            flex-shrink: 0;
            align-items: center;
        }
        
        .skill-item {
            display: inline-flex;
            align-items: center;
            padding: 0 25px;
            white-space: nowrap;
            flex-shrink: 0;
        }
        
        .skill-item i {
            margin-right: 10px;
        }
        
        @keyframes marqueeMove {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-100%);
            }
        }
        
        /* Article Progress Bar Styles */
        .article-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 5px;
            width: 0%;
            background: linear-gradient(to right, var(--primary-color, #B16CEA), var(--secondary-color, #FF5E69));
            z-index: 9999; /* Ensure it's above everything */
            transition: width 0.2s ease-out;
            border-radius: 0 2px 2px 0;
            display: none; /* Hidden by default */
        }
        
        .article-progress-bar.complete {
            background: linear-gradient(to right, #28a745, #20c997);
        }
        
        /* Enhanced Close Button */
        .artikel-popup-close {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .artikel-popup-close.pulse {
            animation: pulse-effect 1s infinite;
        }
        
        @keyframes pulse-effect {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 94, 105, 0.7);
            }
            70% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(255, 94, 105, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 94, 105, 0);
            }
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .article-card, .blog-item {
                transform: translateY(20px); /* Smaller translation for mobile */
            }
            
            .article-hover, .blog-hover {
                transform: translateY(-3px); /* Smaller hover effect for mobile */
            }
            
            .artikel-popup-content {
                width: 95%;
                max-height: 85vh;
                padding: 25px 15px;
            }
            
            .article-progress-bar {
                height: 3px; /* Slightly smaller progress bar on mobile */
            }
            
            /* Ensure skill items are visible on mobile */
            .skill-item {
                padding: 0 15px; /* Smaller padding on mobile */
            }
            
            /* Slower animation for better readability on mobile */
            .skills-track {
                animation-duration: 30s !important; 
            }
        }
    `;
    
    document.head.appendChild(style);
});

/* ===== CONTACT ANIMATIONS (contact-animations.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI UNTUK JUDUL CONTACT ME =====
    const contactHeader = document.querySelector('.contact-info h1');
    if (contactHeader) {
        // Split text into individual letters for animated appearance
        const headerText = contactHeader.innerHTML;
        const splitRegex = /(<span.*?<\/span>)/g;
        const parts = headerText.split(splitRegex);
        
        let newHTML = '';
        parts.forEach(part => {
            if (part.match(splitRegex)) {
                // Keep span elements intact
                newHTML += part;
            } else {
                // Animate individual letters of regular text
                const letters = part.split('');
                letters.forEach(letter => {
                    if (letter === ' ') {
                        newHTML += ' ';
                    } else {
                        newHTML += `<span class="animated-letter">${letter}</span>`;
                    }
                });
            }
        });
        
        contactHeader.innerHTML = newHTML;
        
        // Animate letters with staggered delay
        const animatedLetters = contactHeader.querySelectorAll('.animated-letter');
        animatedLetters.forEach((letter, index) => {
            letter.style.display = 'inline-block';
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(-20px)';
            letter.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        // Animate highlight spans
        const highlightSpans = contactHeader.querySelectorAll('.highlight-pink, .highlight-orange');
        highlightSpans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'scale(0.8)';
            span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'scale(1)';
                
                // Add glow effect after appearing
                setTimeout(() => {
                    span.classList.add('text-glow');
                }, 500);
            }, 500 + (index * 200));
        });
    }
    
    // ===== ANIMASI UNTUK CONTACT INFO TEXT =====
    const contactParagraph = document.querySelector('.contact-info > p');
    if (contactParagraph) {
        contactParagraph.style.opacity = '0';
        contactParagraph.style.transform = 'translateY(20px)';
        contactParagraph.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            contactParagraph.style.opacity = '1';
            contactParagraph.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // ===== ANIMASI UNTUK CONTACT ICONS =====
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const icon = item.querySelector('.contact-icon');
        const text = item.querySelector('p');
        
        if (icon) {
            icon.style.opacity = '0';
            icon.style.transform = 'translateX(-20px)';
            icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        if (text) {
            text.style.opacity = '0';
            text.style.transform = 'translateX(20px)';
            text.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        setTimeout(() => {
            if (icon) {
                icon.style.opacity = '1';
                icon.style.transform = 'translateX(0)';
            }
            
            setTimeout(() => {
                if (text) {
                    text.style.opacity = '1';
                    text.style.transform = 'translateX(0)';
                }
            }, 200);
        }, 1000 + (index * 300));
    });
    
    // ===== ANIMASI UNTUK FORM =====
    const formGroups = document.querySelectorAll('.form-group');
    const submitButton = document.querySelector('.contact-form button');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px)';
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
    
    if (submitButton) {
        submitButton.style.opacity = '0';
        submitButton.style.transform = 'translateY(30px)';
        submitButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            submitButton.style.opacity = '1';
            submitButton.style.transform = 'translateY(0)';
        }, 1000 + (formGroups.length * 200));
    }
    
    // ===== ANIMASI INTERAKTIF UNTUK FORM INPUTS =====
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // Initial style
        input.style.transition = 'all 0.3s ease';
        
        // Focus animation
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 10px rgba(177, 108, 234, 0.3)';
            this.style.transform = 'translateY(-3px)';
            this.style.borderColor = 'var(--primary-color, #B16CEA)';
            
            // Get the label
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--primary-color, #B16CEA)';
                label.style.transition = 'color 0.3s ease';
            }
        });
        
        // Blur animation
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
            
            if (this.value === '') {
                this.style.borderColor = 'var(--input-border, #eee)';
            }
            
            // Reset label color
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--dark-color, #333)';
            }
        });
        
        // Special animation for textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                }
            });
        }
    });
    
    // ===== BUTTON ANIMATION =====
    if (submitButton) {
        // Add ripple effect element
        submitButton.style.position = 'relative';
        submitButton.style.overflow = 'hidden';
        
        submitButton.addEventListener('click', function(e) {
            // Prevent default only for demo - remove this line for actual form submission
            // e.preventDefault();
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Get position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Position and animate ripple
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover animation
        submitButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(177, 108, 234, 0.3)';
        });
        
        submitButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    }
    
    // ===== FAQ SECTION ANIMATION =====
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        const faqTitle = faqContainer.querySelector('h2');
        const faqDescription = faqContainer.querySelector('> p');
        const faqButton = faqContainer.querySelector('.contact-button-container .btn');
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        
        // Animate FAQ title
        if (faqTitle) {
            faqTitle.style.opacity = '0';
            faqTitle.style.transform = 'translateY(30px)';
            faqTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Create intersection observer for FAQ section
            const faqObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Title animation
                        faqTitle.style.opacity = '1';
                        faqTitle.style.transform = 'translateY(0)';
                        
                        // Description animation
                        if (faqDescription) {
                            setTimeout(() => {
                                faqDescription.style.opacity = '1';
                                faqDescription.style.transform = 'translateY(0)';
                            }, 300);
                        }
                        
                        // Button animation
                        if (faqButton) {
                            setTimeout(() => {
                                faqButton.style.opacity = '1';
                                faqButton.style.transform = 'translateY(0)';
                            }, 500);
                        }
                        
                        // FAQ items animation
                        faqItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 700 + (index * 150));
                        });
                        
                        // Stop observing after animation
                        faqObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            faqObserver.observe(faqContainer);
        }
        
        // Style FAQ elements for animation
        if (faqDescription) {
            faqDescription.style.opacity = '0';
            faqDescription.style.transform = 'translateY(30px)';
            faqDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (faqButton) {
            faqButton.style.opacity = '0';
            faqButton.style.transform = 'translateY(30px)';
            faqButton.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        faqItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // FAQ toggle interaction enhancement
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            const answer = item.querySelector('.faq-answer');
            
            if (question && toggle && answer) {
                // Add ripple effect to question
                question.addEventListener('click', function(e) {
                    // Toggle active state
                    item.classList.toggle('active');
                    
                    // Animate toggle icon
                    toggle.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                    
                    // Animate answer with smooth height transition
                    if (item.classList.contains('active')) {
                        // Get the natural height of the answer
                        answer.style.display = 'block';
                        const height = answer.scrollHeight;
                        answer.style.overflow = 'hidden';
                        answer.style.height = '0';
                        answer.style.transition = 'height 0.4s ease';
                        answer.style.display = 'block';
                        
                        // Delayed height transition for smooth animation
                        setTimeout(() => {
                            answer.style.height = height + 'px';
                        }, 10);
                        
                        // After animation completes
                        setTimeout(() => {
                            answer.style.height = '';
                            answer.style.overflow = '';
                        }, 400);
                    } else {
                        // Animate closing
                        answer.style.height = answer.scrollHeight + 'px';
                        answer.style.overflow = 'hidden';
                        answer.style.transition = 'height 0.4s ease';
                        
                        // Force reflow
                        answer.offsetHeight;
                        
                        // Animate to 0 height
                        answer.style.height = '0';
                        
                        // Hide after animation
                        setTimeout(() => {
                            answer.style.display = 'none';
                            answer.style.height = '';
                            answer.style.overflow = '';
                        }, 400);
                    }
                    
                    // Add ripple effect on click
                    const ripple = document.createElement('span');
                    ripple.classList.add('faq-ripple');
                    this.appendChild(ripple);
                    
                    const rect = this.getBoundingClientRect();
                    ripple.style.left = (e.clientX - rect.left) + 'px';
                    ripple.style.top = (e.clientY - rect.top) + 'px';
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
                
                // Hover effects for better interactivity
                question.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(177, 108, 234, 0.05)';
                });
                
                question.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                });
            }
        });
    }
    
    // ===== ADD CSS STYLES =====
    const style = document.createElement('style');
    style.textContent = `
        /* Text glow effect */
        .text-glow {
            animation: textGlow 2s infinite alternate;
        }
        
        @keyframes textGlow {
            0% { text-shadow: 0 0 5px rgba(255, 94, 105, 0.3); }
            100% { text-shadow: 0 0 15px rgba(255, 94, 105, 0.7), 0 0 30px rgba(255, 94, 105, 0.4); }
        }
        
        /* Ripple effect */
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* FAQ ripple effect */
        .faq-ripple {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(177, 108, 234, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: faqRipple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes faqRipple {
            to {
                transform: scale(40);
                opacity: 0;
            }
        }
        
        /* Enhanced FAQ toggle animation */
        .faq-toggle i {
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        
        .faq-item.active .faq-toggle i {
            transform: rotate(180deg);
        }
        
        .faq-question {
            position: relative;
            overflow: hidden;
            transition: background-color 0.3s ease;
            border-radius: 5px;
            padding: 20px !important;
            margin: -20px 0 !important;
        }
        
        /* Custom enhancements for mobile */
        @media (max-width: 768px) {
            .animated-letter {
                display: inline-block !important;
            }
            
            .contact-item {
                transform: none !important;
            }
            
            .contact-icon, .contact-item p {
                transform: none !important;
            }
            
            .form-group {
                transform: translateY(0) !important;
            }
            
            /* Adjust animations for touch devices */
            input:focus, textarea:focus {
                transform: translateY(0) !important;
            }
            
            .ripple {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // ===== SCROLL ANIMATIONS =====
    // Create a general function for scroll animations
    function createScrollAnimation(elements, options = {}) {
        if (!elements || elements.length === 0) return;
        
        const defaultOptions = {
            threshold: 0.2,
            rootMargin: '0px',
            translateY: 30,
            delay: 0,
            stagger: 150
        };
        
        const opts = {...defaultOptions, ...options};
        
        // Prepare elements
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = `translateY(${opts.translateY}px)`;
            el.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
        });
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, opts.delay + (index * opts.stagger));
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: opts.threshold,
            rootMargin: opts.rootMargin
        });
        
        // Start observing
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Apply scroll animations to page elements
    window.addEventListener('load', () => {
        // Animate page divider with scroll
        const pageDivider = document.querySelector('.page-divider');
        if (pageDivider) {
            pageDivider.style.width = '0';
            pageDivider.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const dividerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            pageDivider.style.width = '100%';
                        }, 300);
                        
                        dividerObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.5});
            
            dividerObserver.observe(pageDivider);
        }
    });
    
    // ===== FORM VALIDATION ENHANCEMENT =====
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let hasError = false;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    hasError = true;
                    
                    // Show error
                    input.style.borderColor = 'var(--secondary-color, #FF5E69)';
                    input.style.backgroundColor = 'rgba(255, 94, 105, 0.05)';
                    input.style.animation = 'inputShake 0.5s cubic-bezier(.36,.07,.19,.97) both';
                    
                    // Add the inputShake animation if not already in the style
                    if (!document.querySelector('style').textContent.includes('@keyframes inputShake')) {
                        const shakeStyle = document.createElement('style');
                        shakeStyle.textContent = `
                            @keyframes inputShake {
                                0%, 100% { transform: translateX(0); }
                                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                                20%, 40%, 60%, 80% { transform: translateX(5px); }
                            }
                        `;
                        document.head.appendChild(shakeStyle);
                    }
                    
                    // Reset animation and background after delay
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                    
                    // Get the label
                    const label = input.previousElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.style.color = 'var(--secondary-color, #FF5E69)';
                    }
                }
            });
            
            // Prevent submission if there are errors
            if (hasError) {
                e.preventDefault();
            } else {
                // Success animation if needed
                submitButton.classList.add('submit-success');
                
                // If you don't want to actually submit the form for demo purposes
                // Uncomment the line below
                // e.preventDefault();
            }
        });
        
        // Live validation as user types
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.style.borderColor = 'var(--primary-color, #B16CEA)';
                    this.style.backgroundColor = '';
                    
                    // Reset label color
                    const label = this.previousElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.style.color = 'var(--dark-color, #333)';
                    }
                }
            });
        });
    }
});


/* ===== ARTICLE POPUP (article.js) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Data artikel (bisa diganti dengan data asli nanti)
    const artikelData = [
        {
            id: 'artikel-1',
            judul: 'Analisis SCAMPER Bisnis Pertanian',
            gambar: 'img/scamper blog).png',
            kategori: ['UMKM', 'Agriculture'],
            penulis: 'Muh Ashif',
            konten: `
                <p>SCAMPER adalah metode kreatif yang digunakan untuk merangsang ide-ide baru dan inovasi dengan memodifikasi atau mengadaptasi hal-hal yang sudah ada. Metode ini pertama kali diperkenalkan oleh Bob Eberle dan merupakan akronim dari tujuh teknik yang berbeda untuk berpikir kreatif.</p>
                
                <h3>Penerapan Metode SCAMPER dalam Bisnis Pertanian</h3>
                
                <p>S = Subtitute

<br>Bagian ini menekankan pada apa yang dapat kita ubah atau gantikan pada entah itu produk, masalah, atau proses untuk memperbaikinya.</br></p>
                
                <p>C = Combine

Bagian ini menekankan pada bagaimana menggabungkan dua atau lebih bagian dari produk, proses, atau masalah kita untuk mendapatkan proses, produk, atau masalah yang berbeda untuk meningkatkan kesatuan atau sinergi baru.</p>
                <p>A = Adapt

<br>Dalam tahap menyesuaikan ini, kita akan mneerapkan suatu konsep ke dalam ide baru yang mungkin bisa mneghasilkan sesuatu yang baru juga.</br></p>
                <p>M = Magnify/Modify/Minify

Bagian modifikasi ini mendorong kita untuk memikirkan cara kreatif mnegubah ide yang sedang dipertimbangkan dengan memodifikasi dimensi atau atribut, ukuran, bentuk, warna, atau membuatnya lebih besar, lebih cepat dan kuat.</p>
                <p>P = Put to Another Use

<br>Bagian ini mendorong kita untuk melihat area lain dimana produk atau topic dapat digunakan serta memaksa untuk memikirkan kembali mengapa produk atau suatu cara itu ada, penggunaannya, dan ruang lingkup aplikasi sehingga kita dapat menemukan ide tentang dimana lagi produk atau cara itu dapat digunakan. Tahap ini mengganti sebuah kegunaan merupakan salah satu bentuk kreativitas yang bisa dicoba.</br></p>
                <p>E = Eliminate/Elaborate

Eliminate atau penghapusan adalah aspek dari metode SCAMPER di mana Sahabat Wirausaha diminta untuk menghapus elemen-elemen yang tidak perlu atau tahapan yang redundan untuk meningkatkan efisiensi dan fokus pada nilai inti produk. </p>
                <p>R = Rearrange/Reverse

<br>Reverse atau pembalikan adalah tahap dalam metode SCAMPER di mana Sahabat Wirausaha diharapkan untuk mempertimbangkan kembali urutan atau pendekatan dalam proses produk untuk menyederhanakan atau meningkatkan efisiensi.</br></p>
                <h3>Kesimpulan</h3>
                <p>Analisis menggunakan metode SCAMPER dapat membantu individu atau tim untuk berpikir lebih inovatif dalam menyelesaikan masalah, merancang produk, atau memperbaiki proses yang ada. Dengan memanfaatkan berbagai pendekatan dalam SCAMPER, seseorang dapat menemukan solusi yang lebih efektif, efisien, dan kreatif. Metode ini sangat berguna dalam pengembangan produk, desain, serta dalam meningkatkan proses atau layanan yang sudah ada.</p>
            `
        },
        {
            id: 'artikel-2',
            judul: 'Desain Produk',
            gambar: 'img/Desain Produk Blog.png',
            kategori: ['Popular', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Desain iklan produk sebuah hal yang penting dalam menarik perhatian konsumen di tengah informasi yang semakin maju. Sebuah iklan yang dirancang dengan baik tidak hanya mampu menyampaikan pesan secara efektif, tetapi juga menciptakan daya tarik emosional yang membuat produk lebih diingat dan diinginkan. Periklanan, menurut Kriyantono, adalah jenis komunikasi impersonal yang bertujuan untuk membujuk konsumen agar membeli barang dengan membayar biaya kepada media sebagai imbalan atas pesan-pesan yang menarik dari sponsor yang jelas.</p>
                
                <h3>Konsep Dasar Desain Produk</h3>
                
                <p>Desain produk adalah suatu proses yang melibatkan perencanaan, pengembangan, dan pembuatan produk dengan tujuan untuk memenuhi kebutuhan dan keinginan pengguna. Proses ini tidak hanya mencakup aspek estetika dan fungsionalitas, tetapi juga mempertimbangkan faktor ergonomis, keberlanjutan, dan inovasi. Dalam dunia yang semakin kompetitif, desain produk menjadi salah satu faktor kunci yang membedakan suatu produk di pasar. Produk yang dirancang dengan baik tidak hanya menarik secara visual, tetapi juga mampu memberikan pengalaman pengguna yang optimal serta memenuhi standar kualitas yang tinggi. Artikel ini akan mengupas lebih dalam tentang pentingnya desain produk, tahapan-tahapan dalam proses desain, serta peran inovasi dalam menciptakan produk yang dapat bertahan dan berkembang di pasar.</p>
                
                <p>Dalam era persaingan bisnis yang semakin ketat, pemasaran telah menjadi salah satu hal terpentinguntuk menarik perhatian calon konsumen dan memperluas pangsa pasar. Salah satu alat pemasaran yang paling efektif adalah periklanan. Iklan yang dirancang dengan baik dan tepat dapat mempengaruhi keputusan konsumen untuk membeli produk atau layanan yang dipromosikan. Oleh karena itu, perencanaan iklan yang tepat sangat penting untuk memastikan keberhasilan sebuah kampanye pemasaran.(Cahyadi, 2023).</p>
            `
        },
        {
            id: 'artikel-3',
            judul: 'Business Model Canvas (BMC)',
            gambar: 'img/bmc.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Business Model Canvas (BMC) adalah alat manajemen strategis yang digunakan untuk merancang, mendefinisikan, dan mengkomunikasikan model bisnis secara visual. Konsep ini diperkenalkan oleh Alexander Osterwalder dalam bukunya "Business Model Generation" pada tahun 2005. BMC menyajikan kerangka kerja yang ringkas dan mudah dipahami, memungkinkan pengusaha untuk menggambarkan ide dan strategi bisnis mereka dalam satu halaman.</p>
                
                <h3>Elemen-elemen dalam Business Model Canvas</h3>
                
                <p>BMC terdiri dari sembilan elemen kunci yang saling terkait, yaitu:

<br>1. Customer Segments (Segmen Pelanggan): Menentukan siapa pelanggan potensial dan mengelompokkan mereka berdasarkan karakteristik tertentu.</br>

2. Value Propositions (Proposisi Nilai): Menjelaskan nilai unik yang ditawarkan kepada pelanggan, termasuk solusi atas masalah yang mereka hadapi.

<br>3. Channels (Saluran): Menyediakan informasi tentang bagaimana produk atau layanan disampaikan kepada pelanggan, termasuk saluran distribusi dan komunikasi.</br>

4. Customer Relationships (Hubungan Pelanggan): Menggambarkan jenis hubungan yang dibangun dengan pelanggan, seperti dukungan pribadi, layanan mandiri, atau komunitas.

<br>5. Revenue Streams (Aliran Pendapatan): Mengidentifikasi cara bisnis menghasilkan uang dari setiap segmen pelanggan, termasuk metode pembayaran dan model harga.</br>

6. Key Resources (Sumber Daya Utama): Menentukan aset penting yang diperlukan untuk menjalankan model bisnis, seperti sumber daya fisik, intelektual, manusia, dan finansial.

<br>7. Key Activities (Aktivitas Utama): Menggambarkan aktivitas penting yang harus dilakukan untuk menjalankan model bisnis, termasuk produksi, pemasaran, dan pengembangan produk.</br>

8. Key Partnerships (Kemitraan Utama): Menjelaskan hubungan dengan pihak ketiga yang membantu dalam mencapai tujuan bisnis, seperti pemasok atau mitra strategis.

<br>9. Cost Structure (Struktur Biaya): Mengidentifikasi semua biaya yang terlibat dalam menjalankan model bisnis, termasuk biaya tetap dan variabel.</br></p>
                
                <h3>Manfaat Business Model Canvas</h3>
                
                <p>- Visualisasi: BMC memungkinkan pemilik bisnis untuk melihat gambaran keseluruhan dari model bisnis mereka secara jelas dan ringkas.

<br>- Fleksibilitas: Mudah untuk diubah dan disesuaikan seiring dengan perkembangan bisnis.</br>

- Kolaborasi: Memfasilitasi diskusi dan kolaborasi antar tim dalam merancang strategi bisnis.

<br>- Fokus: Membantu pemilik bisnis untuk fokus pada elemen-elemen kunci yang mempengaruhi kesuksesan usaha mereka.</br></p>
            `
        },
        {
            id: 'artikel-4',
            judul: 'UTS Digital Marketing',
            gambar: 'img/uts.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Digital Marketing adalah sebuah proses yang memasarkan atau mengiklankan merek,produk,maupun jasa. Proses ini biasanya dilakukan melalui media digital dan membutuhkan jaringan internet dalam kegiatannya. Seorang digital juga harus bisa menyusun strategi pemasaran yang tepat dan berkumunikasi dengan pihak lain agar target pemasaran dapat tercapai sesuai dengan target. Digital marketing sangat dibutuhkan saat ini mengigat kemajuan teknologi yang semakin cepat serta era yang semakin serba digital.</p>
                
                <h3>Pengalaman saat evaluasi :</h3>
                
                <p>Pada hari senin tanggal 30 September 2004 saat pukul 14:00 lewat kami melakukan evaluasi mata kuliah Digital Marketing. Perasaan saya waktu bapak masuk ruangan agak panik sedikit yang mungkin disebabkan juga dari layout ruangan yang jarang saya temukan. Tata letak kursi dan meja-meja di ruangan tersebut seperti ada yang ingin melaksanakan rapat ditambah suhu ruangan yang saya rasakan itu panas dingin. Tapi pada saat bapak menjelaskan bahwa ini hanyalah evaluasi dari pembelajaran digital marketing bukan seperti ujian pada biasanya saya merasa tenang. Seperti biasa, setelah dibagikan lembar kertas saya langsung mengisi nama,nim,prodi,dll. Saat itu juga, bapak langsung menjelaskan mekanisme pengerjaan evaluasi serta soal-soal yang pada awalnya harusnya 4 soal tetapi berhubung karena soal ke-4 tersebut belum di ajarkan oleh pak Alam jadinya 3 soal saja. Dalam hati saya berkata Alhamdulillah cuma 3 soal. Pada saat mengerjakan soal pertama saya memulai dengan mendefinisikan dulu kemudian menggambar element-element yang mungkin terkait dengan hal yang sudah didefinisikan. Perasaan saya ketika mengerjakan soal tersebut adalah senang karena kita diberikan kebebasan untuk  mengerjakan soal evaluasi yang dalam hal ini pemahaman kita terkait materi dapat kita gambarkan dan imajinasikan sesuai dengan keinginan kita sendiri. Setelah itu, saya melanjutkan dengan memikirkan berbagai pendekatan untuk menyelesaikan soal tersebut, tanpa merasa terbebani oleh banar atau tidaknya. Hal ini membuat proses pengerjaan menjadi lebih menyenangkan dan kreatif, karena saya bisa mengeksplorasi berbagai cara yang mungkin dilakukan untuk dapat menyelesaikan soal yang diberikan.</p>
            `
        },
        {
            id: 'artikel-5',
            judul: 'Apa itu Iklan!! adalah Terbaik & Terburuk.. Simak penjelasan berikut!!',
            gambar: 'img/iklan.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Iklan merupakan sebuah bentuk memperkenalkan atau mempromosikan produk dan jasa yang dapat disaksikan banyak orang. Tujuannya itu untuk memengaruhi pembeli agar dapat membeli produk yang ditawarkan tersebut. Iklan biasanya ditemukan diberbagai media seperti radio, televisi, media online, dan reklame. Ciri-Ciri iklan yaitu menggunakan kata-kata singkat dalam penyampaian informasi dan juga kata-kata sugestif agar dapat mempengaruhi konsumen.</p>
                <h3>Iklan Terbaik:</h3>
                <p><br>1. Nike â€“ "Just Do It" Iklan Nike dengan slogan "Just Do It" adalah salah satu kampanye iklan paling ikonik yang berhasil mengubah cara orang melihat olahraga dan kehidupan. Dengan pesan yang kuat tentang keberanian, tekad, dan semangat juang, iklan ini tidak hanya mempromosikan produk, tetapi juga menginspirasi individu untuk mengejar impian mereka. Nike berhasil menciptakan iklan yang relevan, emosional, dan mudah diingat, yang terus resonan dengan konsumen hingga saat ini.</br></p>
                <p>2. Coca-Cola â€“ "Share a Coke" Kampanye "Share a Coke" dari Coca-Cola adalah contoh sempurna bagaimana personalisasi dapat membuat iklan menjadi lebih efektif. Coca-Cola mengganti logo mereka dengan nama-nama populer di kaleng dan botol minuman, yang menciptakan iklan yang sangat personal dan mengundang konsumen untuk berbagi pengalaman mereka. Kampanye ini berhasil meningkatkan penjualan dan menciptakan keterlibatan yang tinggi antara merek dan konsumen.</p>
                <p><br>3. Apple â€“ "1984" Iklan "1984" dari Apple, yang disutradarai oleh Ridley Scott, adalah salah satu iklan paling revolusioner dalam sejarah pemasaran. Dengan visual yang menggugah dan pesan yang kuat tentang kebebasan dan inovasi, iklan ini menandai peluncuran komputer Macintosh dan mengukuhkan Apple sebagai pemimpin dalam teknologi yang memecah batasan. Iklan ini mendapat pengakuan luas dan menjadi simbol dari visi kreatif Apple.</br></p>
                <h3>Iklan Terburuk:</h3>
                <p>1. Pepsi â€“ "Live for Now" Iklan Pepsi yang dibintangi oleh Kendall Jenner, yang dirilis pada 2017, mendapat reaksi keras dari publik. Dalam iklan tersebut, Jenner tampak mengatasi ketegangan sosial dengan memberikan Pepsi kepada seorang petugas polisi dalam sebuah protes. Iklan ini dianggap meremehkan masalah sosial yang serius dan berusaha menggunakan isu sensitif untuk tujuan komersial. Reaksi negatif terhadap iklan ini sangat besar, hingga akhirnya Pepsi menarik iklan tersebut dan meminta maaf.</p>
                <p>2. Calvin Klein â€“ Iklan yang Kontroversial Calvin Klein pernah meluncurkan kampanye iklan yang sangat kontroversial yang melibatkan anak-anak dan remaja yang tampaknya terlalu seksual untuk usia mereka. Meskipun merek ini dikenal dengan pendekatan desain yang berani, beberapa iklan mereka terlalu provokatif dan menimbulkan kecaman publik. Salah satu iklan yang paling banyak dibicarakan adalah kampanye yang menampilkan model remaja dalam pose yang dianggap terlalu dewasa untuk usia mereka, yang akhirnya membuat merek tersebut dituntut di beberapa negara.</p>             
                <p>3. Gap â€“ "Manifest Destiny" Kampanye iklan Gap pada 2017 yang mengandung unsur "Manifest Destiny" dianggap sangat tidak sensitif. Iklan ini menampilkan gambar-gambar yang mengarah pada kolonialisasi dan pengambilalihan tanah, yang sangat tidak cocok untuk konteks sejarah Amerika Serikat. Gap gagal memahami konotasi yang lebih dalam dari gambar dan pesan yang mereka coba sampaikan, sehingga kampanye ini mendapat kritik tajam dan dipandang sebagai sebuah kegagalan besar.</p>
                <h3>Faktor-Faktor Penentu Keberhasilan atau Kegagalan Iklan:</h3>
                <br>1. Pesan yang Relevan dan Emosional: Iklan terbaik mampu menyampaikan pesan yang menyentuh emosi audiens dan relevan dengan kehidupan mereka. Misalnya, Nike dengan "Just Do It" menginspirasi audiens untuk tidak hanya berolahraga tetapi juga mengejar mimpi mereka. Di sisi lain, iklan yang tidak sensitif atau yang mencoba memanfaatkan isu-isu sosial untuk tujuan komersial cenderung gagal.</br>
                <br>2. Pemilihan Waktu dan Konteks: Waktu peluncuran iklan sangat penting. Iklan yang keluar pada waktu yang salah, atau yang tidak memperhitungkan konteks sosial dan budaya, dapat dengan mudah dianggap ofensif atau tidak pantas. Contoh terbaik adalah kampanye Pepsi yang meremehkan protes sosial dengan cara yang tidak bijak.</br>
                <br>3. Kreativitas dan Inovasi: Iklan yang berani, kreatif, dan inovatif cenderung lebih mudah diterima. Namun, jika kreativitas tersebut tidak dipadukan dengan pemahaman yang tepat tentang audiens atau budaya, maka kampanye tersebut bisa jadi kontroversial. Apple dengan iklan "1984" dan Coca-Cola dengan "Share a Coke" adalah contoh bagaimana inovasi dapat menciptakan iklan yang memorable.</br>
                <br>4. Resonansi dengan Audiens: Iklan terbaik mampu membangun hubungan yang kuat dengan audiens. Iklan yang tidak relevan dengan audiens atau bahkan tampaknya mengeksploitasi mereka untuk tujuan pemasaran bisa menimbulkan rasa tidak puas. Iklan yang gagal menyentuh audiens cenderung berakhir dengan kegagalan.</br>
                <h3>Kesimpulan</h3>
                <p>Iklan yang efektif dan sukses adalah yang dapat menciptakan hubungan yang kuat dengan audiens, menyampaikan pesan yang relevan dan emosional, serta menggunakan kreativitas secara cerdas. Sebaliknya, iklan yang buruk sering kali gagal memahami audiens, terjebak dalam kontroversi yang tidak perlu, atau mencoba mengkomodifikasi isu-isu sensitif untuk tujuan komersial. Dalam dunia pemasaran yang kompetitif, merek perlu memastikan bahwa mereka tidak hanya menjual produk, tetapi juga berkomunikasi dengan audiens mereka secara bijaksana dan efektif.</p>
            `
        },
        {
            id: 'artikel-6',
            judul: 'Policy conflict - Ekonomi Makro',
            gambar: 'img/policy konflik.png',
            kategori: ['UMKM', 'Ekonomi'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Kebijakan yang dirancang untuk mendorong pertumbuhan ekonomi dan mengurangi pengangguran seringkali dapat berdampak negatif pada stabilitas harga dan neraca pembayaran. Sebaliknya, kebijakan yang bertujuan untuk mengurangi inflasi dan mencapai surplus neraca pembayaran dapat menyebabkan penurunan pertumbuhan ekonomi dan peningkatan pengangguran.</p>
                <p>Dalam upaya mendorong pertumbuhan ekonomi, pemerintah sering menggunakan kebijakan fiskal dan moneter seperti pengurangan pajak, peningkatan belanja pemerintah, atau penurunan suku bunga untuk meningkatkan belanja dan investasi. Namun, ini dapat menyebabkan inflasi dan defisit neraca pembayaran karena mendorong lebih banyak konsumsi produk impor. Di sisi lain, kebijakan yang bertujuan untuk mengendalikan inflasi dan mencapai surplus neraca pembayaran, seperti menaikkan pajak, mengurangi belanja pemerintah, atau menaikkan suku bunga, dapat menekan pertumbuhan ekonomi dan meningkatkan pengangguran.</p>              
                <p>Dalam jangka panjang, para ekonom klasik percaya bahwa perekonomian akan kembali ke output lapangan kerja penuh, dan kebijakan sisi permintaan untuk merangsang ekonomi dapat menjadi tidak efektif. Mereka berpendapat bahwa penawaran agregat jangka panjang sebenarnya vertikal, yang berarti perubahan dalam permintaan agregat tidak memengaruhi output jangka panjang</p>
            `
        },
        {
            id: 'artikel-7',
            judul: 'Makro equelibrium',
            gambar: 'img/makro equeblirium.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Keseimbangan makroekonomi ditentukan oleh interaksi penawaran agregat dan permintaan agregat, yang mencapai titik perpotongan di mana PDB riil dan tingkat harga stabil. Perubahan pada faktor-faktor yang mempengaruhi permintaan atau penawaran agregat dapat mempengaruhi inflasi, PDB riil, dan tingkat lapangan kerja. Pergeseran permintaan agregat ke kanan, misalnya, dapat meningkatkan inflasi dan PDB riil dalam jangka pendek, tetapi dalam jangka panjang, perekonomian kembali ke tingkat output yang sama namun dengan tingkat harga yang lebih tinggi.</p>
                <p>Pergeseran penawaran agregat dapat memengaruhi tingkat harga dan PDB riil dalam jangka pendek maupun jangka panjang. Penurunan tingkat harga membantu mengendalikan inflasi sambil meningkatkan PDB riil. Kebijakan yang meningkatkan pasokan agregat, seperti pendidikan, pelatihan, dan investasi dalam infrastruktur, bermanfaat bagi perekonomian karena tidak memiliki trade-off dan membantu mendorong pertumbuhan ekonomi jangka panjang.Namun, kebijakan sisi permintaan yang tidak tepat dapat menyebabkan pergeseran penawaran agregat, mengurangi kapasitas produktif ekonomi dalam jangka panjang.</p>
            `
        }
    ];

    // Buat struktur HTML untuk pop-up artikel
    const popupHTML = `
    <div id="artikel-popup" class="artikel-popup">
        <div class="artikel-popup-overlay"></div>
        <div class="artikel-popup-content">
            <button class="artikel-popup-close">&times;</button>
            <div class="artikel-popup-header">
                <div class="artikel-popup-categories"></div>
                <h2 class="artikel-popup-title"></h2>
                <div class="artikel-popup-author"></div>
            </div>
            <div class="artikel-popup-image">
                <img src="" alt="">
            </div>
            <div class="artikel-popup-text"></div>
        </div>
    </div>
    `;

    // Sisipkan struktur HTML pop-up ke dalam body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Dapatkan elemen-elemen pop-up
    const popup = document.getElementById('artikel-popup');
    const popupOverlay = document.querySelector('.artikel-popup-overlay');
    const popupClose = document.querySelector('.artikel-popup-close');
    const popupTitle = document.querySelector('.artikel-popup-title');
    const popupCategories = document.querySelector('.artikel-popup-categories');
    const popupAuthor = document.querySelector('.artikel-popup-author');
    const popupImage = document.querySelector('.artikel-popup-image img');
    const popupText = document.querySelector('.artikel-popup-text');

    // Tambahkan event listener ke semua artikel (featured articles)
    const featuredArticles = document.querySelectorAll('.article-card');
    featuredArticles.forEach((article, index) => {
        article.addEventListener('click', () => {
            openPopup(artikelData[index]);
        });
    });

    // Tambahkan event listener ke semua artikel (blog list)
    const blogArticles = document.querySelectorAll('.blog-item');
    blogArticles.forEach((article, index) => {
        article.addEventListener('click', () => {
            openPopup(artikelData[index + 2]); // +2 karena featured articles sudah menggunakan 2 data pertama
        });
    });

    // Fungsi untuk membuka pop-up artikel
    function openPopup(artikel) {
        // Isi konten pop-up dengan data artikel
        popupTitle.textContent = artikel.judul;
        popupImage.src = artikel.gambar;
        popupImage.alt = artikel.judul;
        popupText.innerHTML = artikel.konten;
        popupAuthor.innerHTML = `<p>By ${artikel.penulis}</p>`;

        // Buat kategori artikel
        popupCategories.innerHTML = '';
        artikel.kategori.forEach(kat => {
            let categoryClass = 'dark';
            if (kat === 'Agriculture') categoryClass = 'green';
            else if (kat === 'Web Design') categoryClass = 'blue';
            else if (kat === 'Ekonomi') categoryClass = 'purple';

            const categorySpan = document.createElement('span');
            categorySpan.className = `category ${categoryClass}`;
            categorySpan.textContent = kat;
            popupCategories.appendChild(categorySpan);
        });

        // Tampilkan pop-up dengan animasi
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling halaman di belakang pop-up
    }

    // Fungsi untuk menutup pop-up artikel
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Kembalikan scrolling halaman
    }

    // Event listener untuk tombol tutup dan overlay
    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);

    // Event listener untuk tombol escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});

/* ===== DOT TRAIL ANIMATION (dot-trail-animation.js) ===== */
/**
 * File: dot-trail-animation.js
 * 
 * Membuat animasi titik bergerak dengan efek trail yang mengelilingi
 * tulisan "Contact Me" dan membentuk border capsule
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fungsi untuk menambahkan animasi titik dengan trail
  function addDotTrailAnimation() {
    // Cari elemen heading Contact Me
    const contactHeader = document.querySelector('.contact-info h1');
    
    if (contactHeader) {
      // Tambahkan kelas untuk styling
      contactHeader.classList.add('dot-trail-container');
      
      // Buat elemen untuk titik yang bergerak
      const movingDot = document.createElement('div');
      movingDot.className = 'moving-dot-trail';
      
      // Buat elemen untuk jejak/trail
      const dotTrail = document.createElement('div');
      dotTrail.className = 'dot-trail';
      
      // Tambahkan elemen-elemen ke dalam DOM
      contactHeader.appendChild(dotTrail);
      contactHeader.appendChild(movingDot);
      
      // Tambahkan CSS untuk animasi
      const style = document.createElement('style');
      style.textContent = `
        /* Container untuk animasi */
        .dot-trail-container {
          position: relative;
          display: inline-block;
          padding: 15px 30px;
          margin-bottom: 20px;
          border-radius: 50px;
          z-index: 1;
        }
        
        /* Titik yang bergerak */
        .moving-dot-trail {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #B16CEA, #FF5E69);
          box-shadow: 0 0 10px 2px rgba(255, 94, 105, 0.7);
          z-index: 3;
          animation: moveTrail 6s linear infinite;
          transform-origin: center center;
        }
        
        /* Efek trail/jejak */
        .dot-trail {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          z-index: 2;
          overflow: visible;
        }
        
        .dot-trail::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 50px;
          border: 3px dashed transparent;
          background: 
            linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B) border-box;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: formTrail 6s linear infinite;
          opacity: 0;
        }
        
        /* Animasi titik bergerak dengan jalur yang lebih halus */
        @keyframes moveTrail {
          0% {
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
          }
          12.5% {
            top: 10%;
            left: 90%;
            transform: translate(-50%, -50%);
          }
          25% {
            top: 50%;
            left: 100%;
            transform: translate(-50%, -50%);
          }
          37.5% {
            top: 90%;
            left: 90%;
            transform: translate(-50%, -50%);
          }
          50% {
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          62.5% {
            top: 90%;
            left: 10%;
            transform: translate(-50%, -50%);
          }
          75% {
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%);
          }
          87.5% {
            top: 10%; 
            left: 10%;
            transform: translate(-50%, -50%);
          }
          100% {
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        
        /* Animasi trail terbentuk secara bertahap */
        @keyframes formTrail {
          0% {
            clip-path: polygon(50% 0%, 51% 0%, 51% 0%, 50% 0%);
            opacity: 1;
          }
          12.5% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 10%, 50% 0%);
            opacity: 1;
          }
          25% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 50%, 50% 0%);
            opacity: 1;
          }
          37.5% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 90%, 70% 90%, 50% 0%);
            opacity: 1;
          }
          50% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%);
            opacity: 1;
          }
          62.5% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 90%, 50% 0%);
            opacity: 1;
          }
          75% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 0%);
            opacity: 1;
          }
          87.5% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10%, 30% 0%, 50% 0%);
            opacity: 1;
          }
          100% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%);
            opacity: 1;
            
            /* Pastikan border tetap terlihat setelah animasi selesai */
            border-image-slice: 1;
          }
        }
        
        /* Animasi ulang dengan efek pulsa setelah trail terbentuk penuh */
        .dot-trail-container:hover .dot-trail::before {
          animation: pulseTrail 2s infinite alternate;
          clip-path: none;
        }
        
        @keyframes pulseTrail {
          0% {
            box-shadow: 0 0 5px rgba(255, 94, 105, 0);
            border-color: transparent;
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 94, 105, 0.5);
            border-color: transparent;
          }
        }
        
        /* Pastikan teks tetap terlihat */
        .dot-trail-container span,
        .dot-trail-container .highlight-pink,
        .dot-trail-container .highlight-orange {
          position: relative;
          z-index: 1;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .dot-trail-container {
            padding: 10px 20px;
          }
          
          .moving-dot-trail {
            width: 8px;
            height: 8px;
          }
          
          .dot-trail::before {
            border-width: 2px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Panggil fungsi
  addDotTrailAnimation();
});
