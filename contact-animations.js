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
