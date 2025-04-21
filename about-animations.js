document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI UNTUK INTRO SECTION (TERMASUK FOTO PROFIL) =====
    const introLeft = document.querySelector('.intro-left');
    const introRight = document.querySelector('.intro-right');
    
    if (introLeft && introRight) {
        // Observer untuk elemen intro
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
        
        // Siapkan animasi untuk judul (dari kiri)
        introLeft.style.opacity = '0';
        introLeft.style.transform = 'translateX(-50px)';
        introObserver.observe(introLeft);
        
        // Siapkan animasi untuk deskripsi (dari kanan)
        introRight.style.opacity = '0';
        introRight.style.transform = 'translateX(50px)';
        introObserver.observe(introRight);
    }
    // ===== ANIMASI UNTUK GALLERY FOTO =====
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