document.addEventListener('DOMContentLoaded', function() {
    // ===== EFEK HOVER INTERAKTIF =====
    // Buat element untuk efek hover (tidak menggantikan kursor asli)
    const hoverEffect = document.createElement('div');
    hoverEffect.className = 'hover-effect';
    hoverEffect.style.display = 'none'; // Sembunyikan awalnya
    document.body.appendChild(hoverEffect);
    
    // Aktifkan efek hover hanya untuk elemen yang ingin diinteraksi
    const interactiveElements = document.querySelectorAll('.project-card, .more-project-item, h2, .highlight');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            hoverEffect.style.display = 'block';
            hoverEffect.classList.add('hover-active');
        });
        
        element.addEventListener('mouseleave', function() {
            hoverEffect.classList.remove('hover-active');
            setTimeout(() => {
                if (!hoverEffect.classList.contains('hover-active')) {
                    hoverEffect.style.display = 'none';
                }
            }, 300);
        });
    });
    
    // ===== ANIMASI JUDUL DENGAN GESER =====
    const projectsHeader = document.querySelector('.projects-header h1');
    
    if (projectsHeader) {
        // Split text menjadi kata-kata untuk animasi split
        const words = projectsHeader.textContent.split(' ');
        let newHTML = '';
        
        words.forEach((word, index) => {
            // Cek jika kata mengandung kata "Projects"
            if (word.includes('Projects')) {
                newHTML += `<span class="slide-word highlight" style="--word-index: ${index};">${word}</span> `;
            } else {
                newHTML += `<span class="slide-word" style="--word-index: ${index};">${word}</span> `;
            }
        });
        
        projectsHeader.innerHTML = newHTML;
        
        // Tambahkan animasi slide dengan timing berbeda
        const slideWords = projectsHeader.querySelectorAll('.slide-word');
        slideWords.forEach((word, index) => {
            word.style.display = 'inline-block';
            word.style.opacity = '0';
            word.style.transform = 'translateX(-100px)';
            word.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateX(0)';
            }, 200 * index);
        });
        
        // Tambahkan eventListener untuk efek hover interaktif pada kata "Projects"
        const highlightWord = projectsHeader.querySelector('.highlight');
        if (highlightWord) {
            highlightWord.addEventListener('mouseover', function() {
                this.style.transition = 'transform 0.3s ease, text-shadow 0.3s ease';
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.textShadow = '0 0 15px rgba(255,94,105,0.6)';
            });
            
            highlightWord.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.textShadow = 'none';
            });
        }
        
        // Animasi untuk paragraf
        const headerParagraph = document.querySelector('.projects-header p');
        if (headerParagraph) {
            headerParagraph.style.opacity = '0';
            headerParagraph.style.transform = 'translateX(100px)';
            headerParagraph.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                headerParagraph.style.opacity = '1';
                headerParagraph.style.transform = 'translateX(0)';
            }, slideWords.length * 200 + 100);
            
            // Tambahkan efek parallax saat scroll
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                if (scrollPosition < 500) { // Hanya aktif di area atas
                    headerParagraph.style.transform = `translateX(${scrollPosition * 0.1}px)`;
                }
            });
        }
    }
    
    // ===== ANIMASI PROJECT GRID SEDERHANA =====
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
            // Setup initial state - fade in left/right sederhana
            const fromLeft = index % 2 === 0;
            card.style.opacity = '0';
            card.style.transform = `translateX(${fromLeft ? '-50px' : '50px'})`;
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Observe untuk animasi entrance
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            // Animasi fade in simple
                            card.style.opacity = '1';
                            card.style.transform = 'translateX(0)';
                            
                            cardObserver.unobserve(card);
                        }, 200 * index);
                    }
                });
            }, { threshold: 0.1 });
            
            cardObserver.observe(card);
        });
    }
    
    // ===== ANIMASI CASE STUDY INTERAKTIF =====
    const caseStudies = document.querySelectorAll('.client-challenge, .flowchart, .statistica');
    
    if (caseStudies.length > 0) {
        caseStudies.forEach((study, index) => {
            // Setup animations untuk title
            const studyTitle = study.querySelector('h2');
            if (studyTitle) {
                studyTitle.style.opacity = '0';
                studyTitle.style.transform = 'translateX(-100px)';
                studyTitle.style.transition = 'opacity 1s ease, transform 1s ease';
                
                // Interactive title on hover
                studyTitle.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px) scale(1.05)';
                    this.style.color = '#FF5E69';
                });
                
                studyTitle.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0) scale(1)';
                    this.style.color = '';
                });
            }
            
            // Setup animations untuk paragraf
            const studyDesc = study.querySelector('p');
            if (studyDesc) {
                studyDesc.style.opacity = '0';
                studyDesc.style.transform = 'translateX(100px)';
                studyDesc.style.transition = 'opacity 1s ease, transform 1s ease';
            }
            
            // Setup animations untuk image container
            const studyImage = study.querySelector('.case-image, .flowchart-image, .statistica-image');
            if (studyImage) {
                studyImage.style.opacity = '0';
                studyImage.style.transform = 'translateY(100px)';
                studyImage.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                
                // Add mouse movement tracking
                studyImage.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    
                    // Calculate distance from center in percentage
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const moveX = (mouseX - centerX) / centerX;
                    const moveY = (mouseY - centerY) / centerY;
                    
                    // Apply translate transform to the image
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transition = 'transform 0.1s ease-out';
                        img.style.transform = `translate(${moveX * 15}px, ${moveY * 15}px)`;
                    }
                    
                    // Apply subtle shadow for 3D effect
                    this.style.boxShadow = `${-moveX * 20}px ${-moveY * 20}px 30px rgba(0,0,0,0.05)`;
                });
                
                studyImage.addEventListener('mouseleave', function() {
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transition = 'transform 0.5s ease';
                        img.style.transform = 'translate(0, 0)';
                    }
                    
                    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                });
            }
            
            // Intersection observer for triggering animations
            const studyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (studyTitle) {
                            setTimeout(() => {
                                studyTitle.style.opacity = '1';
                                studyTitle.style.transform = 'translateX(0)';
                            }, 200);
                        }
                        
                        if (studyDesc) {
                            setTimeout(() => {
                                studyDesc.style.opacity = '1';
                                studyDesc.style.transform = 'translateX(0)';
                            }, 400);
                        }
                        
                        if (studyImage) {
                            setTimeout(() => {
                                studyImage.style.opacity = '1';
                                studyImage.style.transform = 'translateY(0)';
                                
                                // Add subtle slide-in animation for image
                                const img = studyImage.querySelector('img');
                                if (img) {
                                    img.style.transition = 'transform 1.5s ease';
                                    img.style.transform = 'scale(1)';
                                }
                            }, 600);
                        }
                        
                        studyObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            studyObserver.observe(study);
        });
    }
    
    // ===== ANIMASI MORE PROJECTS =====
    const moreProjectsSection = document.querySelector('.more-projects');
    const moreProjectHeading = moreProjectsSection ? moreProjectsSection.querySelector('h2') : null;
    const moreProjectItems = document.querySelectorAll('.more-project-item');
    
    if (moreProjectHeading) {
        moreProjectHeading.style.opacity = '0';
        moreProjectHeading.style.transform = 'translateX(-50px)';
        moreProjectHeading.style.transition = 'opacity 1s ease, transform 1s ease';
        
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    moreProjectHeading.style.opacity = '1';
                    moreProjectHeading.style.transform = 'translateX(0)';
                    
                    // Add interactive effect on hover
                    moreProjectHeading.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateX(10px)';
                    });
                    
                    moreProjectHeading.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateX(0)';
                    });
                    
                    headingObserver.unobserve(moreProjectHeading);
                }
            });
        }, { threshold: 0.5 });
        
        headingObserver.observe(moreProjectHeading);
    }
    
    if (moreProjectItems.length > 0) {
        moreProjectItems.forEach((item, index) => {
            // Initial state
            item.style.opacity = '0';
            item.style.transform = index === 0 ? 'translateX(-100px)' : 'translateX(100px)';
            item.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            
            // Add interactive hover effect
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '2';
                
                // Zoom image on hover
                const img = this.querySelector('img');
                if (img) {
                    img.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    img.style.transform = 'scale(1.1)';
                }
                
                // Show overlay buttons with slide-up
                const overlay = this.querySelector('.more-project-overlay');
                if (overlay) {
                    overlay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
                
                // Reset image zoom
                const img = this.querySelector('img');
                if (img) {
                    img.style.transition = 'transform 0.3s ease';
                    img.style.transform = 'scale(1)';
                }
                
                // Hide overlay buttons
                const overlay = this.querySelector('.more-project-overlay');
                if (overlay) {
                    overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(20px)';
                }
            });
            
            // Interactive 3D tracking on mouse move
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // Calculate angle of rotation based on mouse position
                const rotateY = ((mouseX - rect.width / 2) / rect.width) * 10;
                const rotateX = (-(mouseY - rect.height / 2) / rect.height) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                
                // Move image inside
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = `scale(1.1) translate(${rotateY * -2}px, ${rotateX * -2}px)`;
                }
            });
            
            // Observe for entrance animation
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 300 * index);
                        
                        // Setup overlay buttons
                        const overlay = item.querySelector('.more-project-overlay');
                        if (overlay) {
                            overlay.style.opacity = '0';
                            overlay.style.transform = 'translateY(20px)';
                        }
                        
                        itemObserver.unobserve(item);
                    }
                });
            }, { threshold: 0.2 });
            
            itemObserver.observe(item);
        });
    }
    
    // ===== ANIMASI PARALLAX SCROLL =====
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for sections
        const sections = document.querySelectorAll('.client-challenge, .flowchart, .statistica');
        sections.forEach((section, index) => {
            const speed = index % 2 === 0 ? 0.05 : -0.05;
            const rect = section.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = (window.innerHeight / 2 - rect.top) * speed;
                section.style.transform = `translateX(${distance}px)`;
            }
        });
        
        // Move more projects in opposite directions
        const moreProjects = document.querySelectorAll('.more-project-item');
        if (moreProjects.length > 0) {
            const moreProjectsRect = moreProjectsSection.getBoundingClientRect();
            
            if (moreProjectsRect.top < window.innerHeight && moreProjectsRect.bottom > 0) {
                moreProjects.forEach((item, index) => {
                    const speed = index === 0 ? 0.03 : -0.03;
                    const distance = (window.innerHeight / 2 - moreProjectsRect.top) * speed;
                    item.style.transform = `translateX(${distance}px)`;
                });
            }
        }
    });
    
    // ===== MEMPERBAIKI TATA LETAK MOBILE =====
    function adjustMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable 3D effects for mobile
            document.body.classList.add('mobile-device');
            hoverEffect.style.display = 'none';
            
            // Adjust animations for mobile
            const allInteractiveElements = document.querySelectorAll('.project-card, .more-project-item, .case-image, .flowchart-image, .statistica-image');
            allInteractiveElements.forEach(el => {
                // Remove mousemove event listeners for mobile
                el.onmousemove = null;
                
                // Simplify hover effects
                el.onmouseenter = null;
                el.onmouseleave = null;
            });
        } else {
            document.body.classList.remove('mobile-device');
        }
    }
    
    // Call on load and resize
    adjustMobileLayout();
    window.addEventListener('resize', adjustMobileLayout);
    
    // ===== CSS FOR ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        /* Hover Effect Element */
        .hover-effect {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(177, 108, 234, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: difference;
        }
        
        /* Interactive elements cursor */
        .project-card, 
        .more-project-item, 
        h2, 
        .highlight,
        .btn-small {
            cursor: pointer;
        }
        
        /* Slide Words Animation */
        .slide-word {
            display: inline-block;
            position: relative;
            transition: transform 0.3s ease, text-shadow 0.3s ease;
        }
        
        .slide-word.highlight:hover {
            color: #FF5E69;
        }
        
        /* Card Entrance Animation */
        .card-entrance {
            animation: cardEntrance 1s forwards;
        }
        
        @keyframes cardEntrance {
            from { transform: translateX(0) scale(0.8); opacity: 0; }
            to { transform: translateX(0) scale(1); opacity: 1; }
        }
        
        /* Card Bounce Effect */
        .card-bounce {
            animation: cardBounce 1.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes cardBounce {
            0% { transform: translateY(0); }
            20% { transform: translateY(10px); }
            40% { transform: translateY(-5px); }
            60% { transform: translateY(3px); }
            80% { transform: translateY(-2px); }
            100% { transform: translateY(0); }
        }
        
        /* Card Flash Effect */
        .card-flash {
            animation: cardFlash 0.7s forwards;
        }
        
        @keyframes cardFlash {
            0% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); }
            20% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 94, 105, 0.6); }
            100% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); }
        }
        
        /* Project Cards */
        .project-card {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            transform-origin: center center;
        }
        
        .project-card .project-image {
            overflow: hidden;
            transform: translateZ(20px);
        }
        
        .project-card .project-image img {
            transition: transform 0.3s ease;
        }
        
        .project-card .project-info {
            transform: translateZ(10px);
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        /* More Projects */
        .more-project-item {
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
        }
        
        .more-project-overlay {
            position: absolute;
            bottom: 20px;
            left: 20px;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        /* Gradient Buttons */
        .btn-small.gradient-1, .btn-small.gradient-2 {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .btn-small.gradient-1:hover, .btn-small.gradient-2:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        
        /* Fix for mobile devices */
        .mobile-device {
            cursor: auto;
        }
        
        .mobile-device .project-card,
        .mobile-device .more-project-item {
            transform: none !important;
        }
        
        @media (max-width: 768px) {
            .hover-effect {
                display: none !important;
            }
            
            .project-card:hover,
            .more-project-item:hover {
                transform: translateY(-5px) !important;
            }
            
            .project-card .project-image:hover img,
            .more-project-item:hover img {
                transform: scale(1.05) !important;
            }
        }
    `;
    
    document.head.appendChild(style);
});