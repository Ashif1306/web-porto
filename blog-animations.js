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