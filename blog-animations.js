document.addEventListener('DOMContentLoaded', function() {
    // ===== PERBAIKAN UNTUK JUDUL BLOG UTAMA =====
    const blogHero = document.querySelector('.blog-hero-content h1');
    
    if (blogHero) {
        // Ganti judul menjadi tanpa &amp;
        blogHero.innerHTML = 'Blogs dan articles <br> for <span class="highlight-pink">business</span> <span class="highlight-orange">growth</span></br>';
        
        // Tunggu 50ms untuk memastikan perubahan sudah diterapkan
        setTimeout(() => {
            // Ambil kembali referensi karena DOM mungkin sudah berubah
            const updatedBlogHero = document.querySelector('.blog-hero-content h1');
            if (!updatedBlogHero) return;
            
            // Dapatkan teks asli yang sudah diperbaiki dan pecah menjadi bagian-bagian
            const parts = updatedBlogHero.innerHTML.split(/(<span.*?<\/span>)/g); // Pisahkan teks biasa dan spans
            
            let newHTML = '';
            
            // Proses setiap bagian
            parts.forEach(part => {
                if (part.includes('<span')) {
                    // Pertahankan span yang sudah ada (highlight-pink dan highlight-orange)
                    newHTML += part;
                } else {
                    // Animasikan teks biasa dengan memecahnya per huruf (hati-hati dengan tag <br>)
                    const brParts = part.split(/(<br>|<br\/>|<br \/>)/g);
                    brParts.forEach(brPart => {
                        if (brPart === '<br>' || brPart === '<br/>' || brPart === '<br />') {
                            newHTML += brPart;
                        } else {
                            const letters = brPart.split('');
                            letters.forEach(letter => {
                                if (letter === ' ') {
                                    newHTML += ' ';
                                } else {
                                    newHTML += `<span class="hero-letter">${letter}</span>`;
                                }
                            });
                        }
                    });
                }
            });
            
            // Update konten HTML
            updatedBlogHero.innerHTML = newHTML;
            
            // Animasikan huruf-huruf dengan delay
            const heroLetters = updatedBlogHero.querySelectorAll('.hero-letter');
            heroLetters.forEach((letter, index) => {
                letter.style.display = 'inline-block';
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(20px)';
                letter.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, 30 * index);
            });
            
            // Animasikan spans dengan delay tambahan
            const highlightSpans = updatedBlogHero.querySelectorAll('.highlight-pink, .highlight-orange');
            highlightSpans.forEach(span => {
                span.style.opacity = '0';
                span.style.transform = 'scale(0.8)';
                span.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'scale(1)';
                    
                    // Tambahkan efek glow setelah muncul
                    setTimeout(() => {
                        span.classList.add('text-glow');
                    }, 600);
                }, heroLetters.length * 30 + 300);
            });
        }, 50);
    }
    
    // ===== ANIMASI UNTUK FEATURED ARTICLE CARDS =====
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach((card, index) => {
        // Siapkan awal animasi
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease';
        
        // Persiapkan observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * index);
                    
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        observer.observe(card);
        
        // Animasi hover yang lebih menarik
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Animasi gambar zoom in
            const img = this.querySelector('.article-image img');
            if (img) {
                img.style.transform = 'scale(1.08)';
                img.style.transition = 'transform 0.5s ease';
            }
            
            // Animasi kategori
            const categories = this.querySelectorAll('.category');
            categories.forEach((cat, i) => {
                cat.style.transform = 'translateY(-3px)';
                cat.style.transition = 'transform 0.3s ease';
                cat.style.transitionDelay = `${i * 0.05}s`;
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset animasi gambar
            const img = this.querySelector('.article-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            // Reset animasi kategori
            const categories = this.querySelectorAll('.category');
            categories.forEach(cat => {
                cat.style.transform = 'translateY(0)';
                cat.style.transitionDelay = '0s';
            });
        });
    });
    
    // ===== ANIMASI UNTUK SKILLS BANNER =====
    const skillsItems = document.querySelectorAll('.skill-item');
    
    if (skillsItems.length > 0) {
        // Buat animasi bergerak otomatis
        const skillsBanner = document.querySelector('.skills-banner');
        
        if (skillsBanner) {
            // Duplikasi item untuk infinite scroll effect
            const skillsContent = skillsBanner.innerHTML;
            skillsBanner.innerHTML = skillsContent + skillsContent;
            
            // Animasi bergerak
            skillsBanner.style.width = '200%';
            skillsBanner.style.animation = 'scrollSkills 30s linear infinite';
            
            // Tambahkan hover pause
            skillsBanner.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            skillsBanner.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
        
        // Tambahkan animasi hover pada skill items
        skillsItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
                
                // Tambahkan efek highlight pada icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                
                // Reset efek pada icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ===== ANIMASI UNTUK RECENT INSIGHTS SECTION =====
    const insightsTitle = document.querySelector('.recent-insights h2');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogItems = document.querySelectorAll('.blog-item');
    
    // Animasi title dengan highlight span
    if (insightsTitle) {
        const titleText = insightsTitle.innerHTML;
        const hasSpan = titleText.includes('<span');
        
        if (hasSpan) {
            const span = insightsTitle.querySelector('span');
            if (span) {
                span.style.opacity = '0';
                span.style.transform = 'translateX(20px)';
                span.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                const titleObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                span.style.opacity = '1';
                                span.style.transform = 'translateX(0)';
                                
                                // Tambahkan efek glow setelah muncul
                                setTimeout(() => {
                                    span.classList.add('highlight-glow');
                                }, 800);
                            }, 300);
                            
                            titleObserver.unobserve(insightsTitle);
                        }
                    });
                }, {
                    threshold: 0.5
                });
                
                titleObserver.observe(insightsTitle);
            }
        }
    }
    
    // Animasi filter buttons
    filterButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(15px)';
        btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
        
        // Efek klik yang lebih interaktif
        btn.addEventListener('click', function() {
            // Reset semua button
            filterButtons.forEach(b => {
                b.classList.remove('active');
            });
            
            // Aktifkan button yang diklik
            this.classList.add('active');
            
            // Tambahkan efek ripple
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            this.appendChild(ripple);
            
            // Animasi ripple
            ripple.style.animation = 'rippleEffect 0.6s linear forwards';
            
            // Hapus ripple setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Filter logic can be added here
        });
    });
    
    // Animasi blog items
    blogItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease';
        
        const blogObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 200 + (index * 150));
                    
                    blogObserver.unobserve(item);
                }
            });
        }, {
            threshold: 0.1
        });
        
        blogObserver.observe(item);
        
        // Animasi hover yang lebih menarik
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Zoom efek pada gambar
            const img = this.querySelector('.blog-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.5s ease';
            }
            
            // Efek pada kategori
            const categories = this.querySelectorAll('.category');
            categories.forEach((cat, i) => {
                cat.style.transform = 'translateY(-3px)';
                cat.style.transition = 'transform 0.3s ease';
                cat.style.transitionDelay = `${i * 0.05}s`;
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset efek pada gambar
            const img = this.querySelector('.blog-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            // Reset efek pada kategori
            const categories = this.querySelectorAll('.category');
            categories.forEach(cat => {
                cat.style.transform = 'translateY(0)';
                cat.style.transitionDelay = '0s';
            });
        });
    });
    
    // ===== ANIMASI UNTUK CTA SECTION =====
    const ctaSection = document.querySelector('.cta');
    const ctaTitle = ctaSection ? ctaSection.querySelector('h2') : null;
    const ctaLink = ctaSection ? ctaSection.querySelector('.cta-link') : null;
    
    if (ctaTitle && ctaLink) {
        ctaTitle.style.opacity = '0';
        ctaTitle.style.transform = 'translateY(30px)';
        ctaTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        
        ctaLink.style.opacity = '0';
        ctaLink.style.transform = 'translateY(20px)';
        ctaLink.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate title first
                    setTimeout(() => {
                        ctaTitle.style.opacity = '1';
                        ctaTitle.style.transform = 'translateY(0)';
                        
                        // Then animate link
                        setTimeout(() => {
                            ctaLink.style.opacity = '1';
                            ctaLink.style.transform = 'translateY(0)';
                            
                            // Add pulse effect to arrow
                            const arrow = ctaLink.querySelector('i');
                            if (arrow) {
                                setTimeout(() => {
                                    arrow.classList.add('arrow-pulse');
                                }, 500);
                            }
                        }, 400);
                    }, 300);
                    
                    ctaObserver.unobserve(ctaSection);
                }
            });
        }, {
            threshold: 0.5
        });
        
        ctaObserver.observe(ctaSection);
        
        // Enhanced hover animation for CTA link
        ctaLink.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('i');
            if (arrow) {
                arrow.style.transform = 'translateX(10px)';
                arrow.style.transition = 'transform 0.3s ease';
            }
            
            // Animate the underline
            const underline = this.querySelector('::after') || this;
            underline.style.setProperty('--underline-width', '100%');
        });
        
        ctaLink.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('i');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
            
            // Reset underline animation
            const underline = this.querySelector('::after') || this;
            underline.style.setProperty('--underline-width', '0%');
        });
    }
    
    // ===== CSS STYLES FOR ANIMATIONS =====
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Hero title animation */
        .hero-letter {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
        }
        
        /* Text glow effect */
        .text-glow {
            animation: textGlow 2s infinite alternate;
        }
        
        @keyframes textGlow {
            0% { text-shadow: 0 0 5px rgba(255, 94, 105, 0.3); }
            100% { text-shadow: 0 0 15px rgba(255, 94, 105, 0.7), 0 0 30px rgba(255, 94, 105, 0.4); }
        }
        
        /* Status Bar untuk Artikel Popup */
        .scroll-status-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 1003;
        }
        
        .scroll-progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(to right, var(--primary-color, #B16CEA), var(--secondary-color, #FF5E69));
            transition: width 0.2s ease;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        
        /* Skills banner scroll animation */
        @keyframes scrollSkills {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        /* Highlight glow effect */
        .highlight-glow {
            animation: highlightGlow 2s infinite alternate;
        }
        
        @keyframes highlightGlow {
            0% { text-shadow: 0 0 5px rgba(255, 138, 86, 0.3); }
            100% { text-shadow: 0 0 10px rgba(255, 138, 86, 0.7); }
        }
        
        /* Button ripple effect */
        .btn-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 20px;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        /* Arrow pulse animation */
        .arrow-pulse {
            animation: arrowPulse 1.5s infinite alternate;
        }
        
        @keyframes arrowPulse {
            0% { transform: translateX(0); }
            100% { transform: translateX(8px); }
        }
        
        /* Filter button styles */
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .filter-btn.active {
            position: relative;
            overflow: hidden;
        }
        
        /* Article popup animations */
        .artikel-popup.active .artikel-popup-overlay {
            animation: fadeIn 0.4s forwards;
        }
        
        .artikel-popup.active .artikel-popup-content {
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        @keyframes popIn {
            0% { transform: translate(-50%, -55%) scale(0.9); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .skills-banner {
                width: 300% !important;
            }
            
            @keyframes scrollSkills {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
            }
        }
    `;
    
    document.head.appendChild(styleElement);
    
    // ===== INTEGRASIKAN DENGAN POPUP ARTIKEL YANG SUDAH ADA =====
    // Tambahkan animasi untuk popup artikel dari article.js
    const popup = document.getElementById('artikel-popup');
    
    if (popup) {
        const popupContent = popup.querySelector('.artikel-popup-content');
        const popupClose = popup.querySelector('.artikel-popup-close');
        
        // Buat elemen status bar
        const statusBar = document.createElement('div');
        statusBar.className = 'scroll-status-bar';
        
        // Buat elemen progress di dalam status bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        
        // Tambahkan status bar ke popup, di bagian atas
        statusBar.appendChild(progressBar);
        if (popupContent) {
            popupContent.parentNode.insertBefore(statusBar, popupContent);
        }
        
        // Fungsi untuk mengupdate progress bar saat scrolling
        function updateScrollProgress() {
            if (!popup.classList.contains('active')) return;
            
            const totalHeight = popupContent.scrollHeight - popupContent.clientHeight;
            const progress = (popupContent.scrollTop / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Tambahkan event listener untuk scrolling di popup content
        if (popupContent) {
            popupContent.addEventListener('scroll', updateScrollProgress);
        }
        
        // Enhance close button animation
        if (popupClose) {
            popupClose.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(90deg)';
                this.style.backgroundColor = 'var(--highlight-pink)';
                this.style.color = 'white';
                this.style.transition = 'all 0.3s ease';
            });
            
            popupClose.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0)';
                this.style.backgroundColor = '#f1f1f1';
                this.style.color = '#333';
            });
        }
        
        // Enhanced animations for popup content when opening
        function enhancePopupAnimation() {
            if (popupContent) {
                // Animate title with stagger
                const title = popupContent.querySelector('.artikel-popup-title');
                if (title) {
                    const titleText = title.textContent;
                    const titleChars = titleText.split('');
                    
                    let newTitleHTML = '';
                    titleChars.forEach(char => {
                        if (char === ' ') {
                            newTitleHTML += ' ';
                        } else {
                            newTitleHTML += `<span class="title-char">${char}</span>`;
                        }
                    });
                    
                    title.innerHTML = newTitleHTML;
                    
                    const titleCharsSpans = title.querySelectorAll('.title-char');
                    titleCharsSpans.forEach((span, index) => {
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(10px)';
                        span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        span.style.display = 'inline-block';
                        
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, 100 + (index * 15)); // Staggered timing
                    });
                }
                
                // Animate categories
                const categories = popupContent.querySelectorAll('.category');
                categories.forEach((category, index) => {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(10px)';
                    category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });
                
                // Animate image
                const image = popupContent.querySelector('.artikel-popup-image img');
                if (image) {
                    image.style.opacity = '0';
                    image.style.transform = 'scale(0.95)';
                    image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        image.style.opacity = '1';
                        image.style.transform = 'scale(1)';
                    }, 400);
                }
                
                // Animate paragraphs
                const paragraphs = popupContent.querySelectorAll('.artikel-popup-text p');
                paragraphs.forEach((p, index) => {
                    p.style.opacity = '0';
                    p.style.transform = 'translateY(20px)';
                    p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    }, 600 + (index * 100));
                });
                
                // Animate headings
                const headings = popupContent.querySelectorAll('.artikel-popup-text h3');
                headings.forEach((h, index) => {
                    h.style.opacity = '0';
                    h.style.transform = 'translateX(-15px)';
                    h.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                    
                    setTimeout(() => {
                        h.style.opacity = '1';
                        h.style.transform = 'translateX(0)';
                    }, 500 + (index * 120));
                });
            }
        }
        
        // Monitor for when popup becomes active
        const popupObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (popup.classList.contains('active')) {
                        enhancePopupAnimation();
                        // Reset scroll position dan update progress bar saat popup dibuka
                        if (popupContent) {
                            popupContent.scrollTop = 0;
                            updateScrollProgress();
                        }
                    }
                }
            });
        });
        
        popupObserver.observe(popup, { attributes: true });
    }
    
    // ===== SCROLLING ANIMATIONS =====
    // Smooth scroll to top when page loads
    window.addEventListener('load', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll-triggered animations for sections
    function animateSections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Skip hero section
            if (section.classList.contains('blog-hero')) return;
            
            // Setup initial state
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 1s ease, transform 1s ease';
            
            // Create observer
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                        
                        sectionObserver.unobserve(section);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            sectionObserver.observe(section);
        });
    }
    
    // Call section animations
    animateSections();
    
});

document.addEventListener('DOMContentLoaded', function() {
    const blogHero = document.querySelector('.blog-hero-content h1');
    const isMobile = window.innerWidth <= 768; // Cek apakah layar adalah perangkat mobile

    if (blogHero) {
        blogHero.innerHTML = 'Blogs dan articles <br> for <span class="highlight-pink">business</span> <span class="highlight-orange">growth</span></br>';
        
        setTimeout(() => {
            const updatedBlogHero = document.querySelector('.blog-hero-content h1');
            if (!updatedBlogHero) return;

            const parts = updatedBlogHero.innerHTML.split(/(<span.*?<\/span>)/g);

            let newHTML = '';
            parts.forEach(part => {
                if (part.includes('<span')) {
                    newHTML += part;
                } else {
                    const brParts = part.split(/(<br>|<br\/>|<br \/>)/g);
                    brParts.forEach(brPart => {
                        if (brPart === '<br>' || brPart === '<br/>' || brPart === '<br />') {
                            newHTML += brPart;
                        } else {
                            const letters = brPart.split('');
                            letters.forEach(letter => {
                                if (letter === ' ') {
                                    newHTML += ' ';
                                } else {
                                    newHTML += `<span class="hero-letter">${letter}</span>`;
                                }
                            });
                        }
                    });
                }
            });

            updatedBlogHero.innerHTML = newHTML;

            const heroLetters = updatedBlogHero.querySelectorAll('.hero-letter');
            heroLetters.forEach((letter, index) => {
                letter.style.display = 'inline-block';
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(20px)';
                letter.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, isMobile ? 0 : 30 * index); // Animasi lebih cepat untuk perangkat mobile
            });

            const highlightSpans = updatedBlogHero.querySelectorAll('.highlight-pink, .highlight-orange');
            highlightSpans.forEach(span => {
                span.style.opacity = '0';
                span.style.transform = 'scale(0.8)';
                span.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'scale(1)';
                    
                    setTimeout(() => {
                        span.classList.add('text-glow');
                    }, 600);
                }, heroLetters.length * 30 + 300);
            });
        }, 50);
    }

    // Animasi artikel dengan IntersectionObserver (sama seperti kode sebelumnya)
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * index);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px' });

        observer.observe(card);
    });
});
