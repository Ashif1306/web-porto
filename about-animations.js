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

    // Add necessary CSS for animations
    addAnimationStyles();

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
            }
        `;
        document.head.appendChild(style);
    }
});