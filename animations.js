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
    const isAboutPage = window.location.pathname.includes('about.html') || document.querySelector('.intro-gallery');
    const isMobile = window.innerWidth < 768;
    
    if (isAboutPage) {
        // Animasi untuk galeri intro - khusus desktop
        if (!isMobile) {
            const galleryItems = document.querySelectorAll('.gallery-item');
            const profileImage = document.querySelector('.gallery-item.profile img');
            
            if (galleryItems.length > 0) {
                const galleryObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const item = entry.target;
                            const index = Array.from(galleryItems).indexOf(item);
                            
                            // Reset status animasi
                            item.style.opacity = '0';
                            
                            // Pilih animasi berbeda berdasarkan posisi
                            if (item.classList.contains('profile')) {
                                item.style.transform = 'scale(0.8)';
                            } else if (index % 2 === 0) {
                                item.style.transform = 'translateX(-30px)';
                            } else {
                                item.style.transform = 'translateX(30px)';
                            }
                            
                            // Animasikan dengan delay
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'none';
                            }, 200 * index);
                        }
                    });
                }, { threshold: 0.2 });
                
                galleryItems.forEach(item => {
                    // Siapkan status awal
                    item.style.opacity = '0';
                    
                    if (item.classList.contains('profile')) {
                        item.style.transform = 'scale(0.8)';
                    } else {
                        const index = Array.from(galleryItems).indexOf(item);
                        if (index % 2 === 0) {
                            item.style.transform = 'translateX(-30px)';
                        } else {
                            item.style.transform = 'translateX(30px)';
                        }
                    }
                    
                    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    // Mulai observasi
                    galleryObserver.observe(item);
                });
            }
        } else {
            // Pada mobile, gunakan animasi yang lebih aman
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            if (galleryItems.length > 0) {
                const galleryObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const item = entry.target;
                            const index = Array.from(galleryItems).indexOf(item);
                            
                            // Animasikan dengan delay
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 150 * index);
                            
                            galleryObserver.unobserve(item);
                        }
                    });
                }, { threshold: 0.2 });
                
                galleryItems.forEach((item, index) => {
                    // Siapkan status awal - animasi slide up ringan untuk mobile
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)'; // Nilai lebih kecil untuk mobile
                    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    // Mulai observasi
                    galleryObserver.observe(item);
                });
            }
        }
        
        // Animasi untuk section Education dan Work berdasarkan device
        if (!isMobile) {
            // Desktop: Animasi geser dari sisi
            // Education (dari kanan)
            const educationSection = document.querySelector('.education');
            if (educationSection) {
                const educationObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animasikan seluruh section
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateX(0)';
                            }, 200);
                        }
                    });
                }, { threshold: 0.2 });
                
                // Siapkan animasi untuk education section
                educationSection.style.opacity = '0';
                educationSection.style.transform = 'translateX(50px)';
                educationSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                // Mulai observasi
                educationObserver.observe(educationSection);
            }
            
            // Work Experience (dari kiri)
            const workSection = document.querySelector('.work');
            if (workSection) {
                const workObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animasikan seluruh section
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateX(0)';
                            }, 200);
                        }
                    });
                }, { threshold: 0.2 });
                
                // Siapkan animasi untuk work section
                workSection.style.opacity = '0';
                workSection.style.transform = 'translateX(-50px)';
                workSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                // Mulai observasi
                workObserver.observe(workSection);
            }
        } else {
            // Mobile: Gunakan approach yang sama dengan desktop
            const educationSection = document.querySelector('.education');
            if (educationSection) {
                // Hapus animasi default
                educationSection.style.animation = 'none';
                
                // Class untuk animasi dari kanan
                const animateRightClass = 'animate-from-right-mobile';
                
                // Tambahkan style untuk animasi dari samping layar (nilai lebih kecil untuk mobile)
                if (!document.querySelector('#animation-styles-education-mobile')) {
                    const styleElement = document.createElement('style');
                    styleElement.id = 'animation-styles-education-mobile';
                    styleElement.innerHTML = `
                        @keyframes slideFromRightMobile {
                            from { opacity: 0; transform: translateX(70%); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        .animate-from-right-mobile {
                            animation: slideFromRightMobile 0.8s ease-out forwards;
                        }
                    `;
                    document.head.appendChild(styleElement);
                }
                
                const educationObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Hapus class animasi untuk reset
                            entry.target.classList.remove(animateRightClass);
                            
                            // Force reflow agar animasi bisa dijalankan lagi
                            void entry.target.offsetWidth;
                            
                            // Tambahkan class untuk trigger animasi
                            entry.target.classList.add(animateRightClass);
                        }
                    });
                }, { threshold: 0.15 });
                
                educationObserver.observe(educationSection);
            }
            
            const workSection = document.querySelector('.work');
            if (workSection) {
                // Hapus animasi default
                workSection.style.animation = 'none';
                
                // Class untuk animasi dari kiri
                const animateLeftClass = 'animate-from-left-mobile';
                
                // Tambahkan style untuk animasi dari samping layar (nilai lebih kecil untuk mobile)
                if (!document.querySelector('#animation-styles-work-mobile')) {
                    const styleElement = document.createElement('style');
                    styleElement.id = 'animation-styles-work-mobile';
                    styleElement.innerHTML = `
                        @keyframes slideFromLeftMobile {
                            from { opacity: 0; transform: translateX(-70%); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        .animate-from-left-mobile {
                            animation: slideFromLeftMobile 0.8s ease-out forwards;
                        }
                    `;
                    document.head.appendChild(styleElement);
                }
                
                const workObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Hapus class animasi untuk reset
                            entry.target.classList.remove(animateLeftClass);
                            
                            // Force reflow agar animasi bisa dijalankan lagi
                            void entry.target.offsetWidth;
                            
                            // Tambahkan class untuk trigger animasi
                            entry.target.classList.add(animateLeftClass);
                        }
                    });
                }, { threshold: 0.15 });
                
                workObserver.observe(workSection);
            }
        }
        
        // Animasi untuk bagian follow-me berdasarkan device
        const followImage = document.querySelector('.follow-image img');
        const followContent = document.querySelector('.follow-content');
        
        if (followImage) {
            const followObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!isMobile) {
                            // Desktop: animasi zoom
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'scale(1)';
                            }, 200);
                        } else {
                            // Mobile: animasi zoom ringan yang aman
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'scale(1)';
                            }, 200);
                        }
                        followObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Siapkan status awal
            followImage.style.opacity = '0';
            followImage.style.transform = isMobile ? 'scale(0.95)' : 'scale(0.9)'; // Nilai lebih kecil untuk mobile
            followImage.style.transition = 'opacity 1s ease, transform 1s ease';
            
            // Mulai observasi
            followObserver.observe(followImage);
        }
        
        if (followContent) {
            const contentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!isMobile) {
                            // Desktop: animasi geser dari samping
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateX(0)';
                            }, 500);
                        } else {
                            // Mobile: animasi geser dari bawah
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, 500);
                        }
                        contentObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Siapkan status awal
            followContent.style.opacity = '0';
            if (!isMobile) {
                followContent.style.transform = 'translateX(30px)';
            } else {
                followContent.style.transform = 'translateY(15px)'; // Geser ke atas untuk mobile
            }
            followContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Mulai observasi
            contentObserver.observe(followContent);
        }
    }
});