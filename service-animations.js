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
            
            const rotateY = ((x - centerX) / centerX) * 10; // max ±10 degrees
            const rotateX = ((centerY - y) / centerY) * 5; // max ±5 degrees
            
            // Apply the rotation
            this.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
            
            // Move img slightly for parallax effect
            const img = this.querySelector('img');
            if (img) {
                const moveX = ((x - centerX) / centerX) * 10; // max ±10px
                const moveY = ((y - centerY) / centerY) * 10; // max ±10px
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