document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMASI UNTUK JUDUL SERVICES =====
    const servicesHeader = document.querySelector('.services-header h1');
    
    if (servicesHeader) {
        // Observer untuk judul
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-right');
                } else {
                    entry.target.classList.remove('animate-slide-right');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });
        
        // Mulai observasi pada judul
        headerObserver.observe(servicesHeader);
    }

    // ===== ANIMASI UNTUK SERVICE ITEMS =====
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length > 0) {
        // Observer untuk service items
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Animasi untuk service item
                    entry.target.classList.add('animate-slide-left');
                    
                    // Tambahkan animasi untuk komponen service
                    const title = entry.target.querySelector('.service-title');
                    const image = entry.target.querySelector('.service-image');
                    const description = entry.target.querySelector('.service-description');
                    const button = entry.target.querySelector('.btn');
                    
                    if (title) {
                        setTimeout(() => {
                            title.classList.add('animate-slide-right');
                        }, 200);
                    }
                    
                    if (image) {
                        setTimeout(() => {
                            image.classList.add('animate-slide-left');
                        }, 400);
                    }
                    
                    if (description) {
                        setTimeout(() => {
                            description.classList.add('animate-slide-right');
                        }, 600);
                    }
                    
                    if (button) {
                        setTimeout(() => {
                            button.classList.add('animate-slide-up');
                        }, 800);
                    }
                } else {
                    // Reset animasi saat keluar dari viewport
                    entry.target.classList.remove('animate-slide-left');
                    
                    const title = entry.target.querySelector('.service-title');
                    const image = entry.target.querySelector('.service-image');
                    const description = entry.target.querySelector('.service-description');
                    const button = entry.target.querySelector('.btn');
                    
                    if (title) title.classList.remove('animate-slide-right');
                    if (image) image.classList.remove('animate-slide-left');
                    if (description) description.classList.remove('animate-slide-right');
                    if (button) button.classList.remove('animate-slide-up');
                }
            });
        }, {
            root: null,
            rootMargin: '-50px',
            threshold: 0.1
        });
        
        // Amati semua service item
        serviceItems.forEach(item => {
            serviceObserver.observe(item);
        });
    }

    // ===== ANIMASI UNTUK HIRE ME BUTTONS =====
    const hireButtons = document.querySelectorAll('.service-content .btn');
    
    if (hireButtons.length > 0) {
        // Observer untuk tombol
        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Animasi slide up untuk tombol
                    entry.target.classList.add('animate-slide-up');
                } else {
                    entry.target.classList.remove('animate-slide-up');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        
        // Amati semua tombol
        hireButtons.forEach(button => {
            buttonObserver.observe(button);
        });
    }

    // ===== FUNGSI UNTUK MEMPERBAIKI MASALAH TATA LETAK MOBILE =====
    function fixMobileLayout() {
        if (window.innerWidth <= 768) {
            // Perbaiki padding dan margin untuk konten
            const serviceSections = document.querySelectorAll('.service-item');
            serviceSections.forEach(section => {
                section.style.padding = '20px 5%';
                
                // Perbaiki konten dan gambar
                const content = section.querySelector('.service-content');
                const image = section.querySelector('.service-image');
                
                if (content) {
                    content.style.width = '100%';
                    content.style.padding = '0';
                    content.style.marginBottom = '20px';
                    content.style.textAlign = 'center';
                }
                
                if (image) {
                    image.style.width = '100%';
                }
            });
        }
    }

    // Panggil fungsi perbaikan layout saat halaman dimuat
    fixMobileLayout();
    
    // Panggil ulang saat resize window
    window.addEventListener('resize', fixMobileLayout);
    
    // ===== CSS UNTUK ANIMASI =====
    // Buat elemen style
    const style = document.createElement('style');
    style.textContent = `
        /* Animasi Slide dari Kiri */
        @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        /* Animasi Slide dari Kanan */
        @keyframes slideRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        /* Animasi Slide dari Bawah */
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Styling untuk elemen sebelum animasi */
        .services-header h1 {
            opacity: 0;
        }
        
        .service-item {
            opacity: 0;
        }
        
        .service-content, .service-image {
            opacity: 0;
        }
        
        /* Classes untuk animasi */
        .animate-slide-left {
            animation: slideLeft 0.8s ease forwards;
        }
        
        .animate-slide-right {
            animation: slideRight 0.8s ease forwards;
        }
        
        .animate-slide-up {
            animation: slideUp 0.8s ease forwards;
        }
        
        /* Transisi hover yang lebih halus */
        .service-image {
            overflow: hidden;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        
        .service-image:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .service-image img {
            transition: transform 0.5s ease;
        }
        
        .service-image:hover img {
            transform: scale(1.05);
        }
        
        /* Responsivitas */
        @media (max-width: 768px) {
            .services-header h1 {
                font-size: 2.2rem;
                text-align: center;
            }
            
            .service-content h2 {
                font-size: 1.8rem;
                margin-bottom: 15px;
            }
            
            .service-content p {
                font-size: 0.95rem;
                margin-bottom: 20px;
            }
            
            .service-image {
                margin: 0 auto;
            }
            
            /* Animasi lebih cepat pada mobile */
            .animate-slide-left,
            .animate-slide-right,
            .animate-slide-up {
                animation-duration: 0.6s;
            }
        }
    `;
    
    document.head.appendChild(style);
});