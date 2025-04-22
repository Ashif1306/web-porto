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
            
            // Susun ulang struktur DOM untuk efek
            img.parentNode.insertBefore(imageWrapper, img);
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(revealMask);
            imageWrapper.appendChild(highlightBorder);
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
        
        /* Advanced Project Card animations */
        .project-card {
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            backface-visibility: hidden;
            transform-style: preserve-3d;
            position: relative;
            overflow: hidden;
            background-color: white;
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