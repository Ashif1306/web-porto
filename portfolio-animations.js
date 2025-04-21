// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio page
    const isPortfolioPage = window.location.pathname.includes('portfolio.html') || 
                            window.location.pathname.includes('portofolio.html');
    
    if (!isPortfolioPage) return;
    
    // Add a CSS class for initial state and animated state
    const style = document.createElement('style');
    style.textContent = `
        .slide-left {
            opacity: 0;
            transform: translateX(-70px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-right {
            opacity: 0;
            transform: translateX(70px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-down {
            opacity: 0;
            transform: translateY(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scale-in {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .rotate-in {
            opacity: 0;
            transform: rotate(-5deg) scale(0.9);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-visible {
            opacity: 1;
            transform: translate(0, 0) rotate(0) scale(1);
        }
        
        .project-card {
            transition: transform 0.4s ease, box-shadow 0.4s ease !important;
        }
        
        .project-card:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Scroll down indicator */
        .scroll-indicator {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 94, 105, 0.9);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 100;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            cursor: pointer;
        }
        
        .scroll-indicator.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-indicator i {
            color: white;
            font-size: 18px;
        }
        
        .scroll-indicator.at-bottom i {
            transform: rotate(180deg);
        }
        
        /* Progress bar */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #B16CEA, #FF5E69, #FF8A56, #FFA84B);
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    document.body.appendChild(scrollIndicator);
    
    // Add scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Get all sections to animate
    const sections = [
        document.querySelector('.projects-intro'),
        document.querySelector('.project-grid'),
        document.querySelector('.client-challenge'),
        document.querySelector('.flowchart'),
        document.querySelector('.statistica'),
        document.querySelector('.more-projects')
    ];
    
    // Create an object to track animation states
    const animationStates = {};
    
    // Setup animations for elements
    function setupAnimations() {
        sections.forEach((section, sectionIndex) => {
            if (!section) return;
            
            let sectionElements = [];
            
            // Prepare different animations for elements inside each section
            if (section.classList.contains('projects-intro')) {
                // Projects intro header
                const heading = section.querySelector('h1');
                const paragraph = section.querySelector('p');
                
                if (heading) {
                    heading.classList.add('slide-down');
                    sectionElements.push(heading);
                }
                if (paragraph) {
                    paragraph.classList.add('slide-up');
                    sectionElements.push(paragraph);
                }
            } 
            else if (section.classList.contains('project-grid')) {
                // Project cards with staggered animation
                const cards = section.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    // Alternate between left and right slide
                    if (index % 2 === 0) {
                        card.classList.add('slide-left');
                    } else {
                        card.classList.add('slide-right');
                    }
                    card.style.transitionDelay = `${0.1 * index}s`;
                    sectionElements.push(card);
                });
            }
            else if (section.classList.contains('client-challenge')) {
                // Client challenge section
                const title = section.querySelector('h2');
                const description = section.querySelector('p');
                const image = section.querySelector('.case-image');
                
                if (title) {
                    title.classList.add('slide-left');
                    sectionElements.push(title);
                }
                if (description) {
                    description.classList.add('slide-up');
                    sectionElements.push(description);
                }
                if (image) {
                    image.classList.add('rotate-in');
                    sectionElements.push(image);
                }
            }
            else if (section.classList.contains('flowchart')) {
                // Flowchart section
                const title = section.querySelector('h2');
                const description = section.querySelector('p');
                const image = section.querySelector('.flowchart-image');
                
                if (title) {
                    title.classList.add('slide-right');
                    sectionElements.push(title);
                }
                if (description) {
                    description.classList.add('slide-left');
                    sectionElements.push(description);
                }
                if (image) {
                    image.classList.add('scale-in');
                    sectionElements.push(image);
                }
            }
            else if (section.classList.contains('statistica')) {
                // Digital Marketing section
                const title = section.querySelector('h2');
                const description = section.querySelector('p');
                const image = section.querySelector('.statistica-image');
                
                if (title) {
                    title.classList.add('slide-down');
                    sectionElements.push(title);
                }
                if (description) {
                    description.classList.add('slide-up');
                    sectionElements.push(description);
                }
                if (image) {
                    image.classList.add('rotate-in');
                    sectionElements.push(image);
                }
            }
            else if (section.classList.contains('more-projects')) {
                // More projects section
                const title = section.querySelector('h2');
                const items = section.querySelectorAll('.more-project-item');
                
                if (title) {
                    title.classList.add('slide-down');
                    sectionElements.push(title);
                }
                
                items.forEach((item, index) => {
                    if (index % 2 === 0) {
                        item.classList.add('slide-left');
                    } else {
                        item.classList.add('slide-right');
                    }
                    item.style.transitionDelay = `${0.1 * index}s`;
                    sectionElements.push(item);
                });
            }
            
            // Add all section elements to animation states
            sectionElements.forEach(element => {
                const id = `element-${Math.random().toString(36).substr(2, 9)}`;
                element.dataset.animationId = id;
                animationStates[id] = {
                    element: element,
                    animated: false,
                    visible: false
                };
            });
        });
    }
    
    // Initialize animations
    setupAnimations();
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to update scroll progress
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        const progress = (scrolled / documentHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
    
    // Function to reset animation of an element
    function resetAnimation(element) {
        element.classList.remove('animate-visible');
        const animId = element.dataset.animationId;
        if (animId && animationStates[animId]) {
            animationStates[animId].animated = false;
            animationStates[animId].visible = false;
        }
    }
    
    // Function to handle scroll events
    function handleScroll() {
        // Update scroll progress
        updateScrollProgress();
        
        // Show/hide scroll indicator
        if (window.scrollY > 300) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
        
        // Change indicator direction at bottom of page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            scrollIndicator.classList.add('at-bottom');
        } else {
            scrollIndicator.classList.remove('at-bottom');
        }
        
        // Check all elements for animation
        for (const id in animationStates) {
            const state = animationStates[id];
            const element = state.element;
            const isVisible = isElementInViewport(element);
            
            // If element just became visible
            if (isVisible && !state.visible) {
                state.visible = true;
                element.classList.add('animate-visible');
            }
            
            // If element just became hidden
            if (!isVisible && state.visible) {
                state.visible = false;
                element.classList.remove('animate-visible');
            }
        }
    }
    
    // Handle scroll indicator click
    scrollIndicator.addEventListener('click', function() {
        if (this.classList.contains('at-bottom')) {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Find next section to scroll to
            const currentScrollPosition = window.scrollY;
            let nextSectionTop = document.body.scrollHeight;
            
            for (let i = 0; i < sections.length; i++) {
                if (!sections[i]) continue;
                const sectionTop = sections[i].getBoundingClientRect().top + window.scrollY;
                if (sectionTop > currentScrollPosition + 100) {
                    nextSectionTop = sectionTop;
                    break;
                }
            }
            
            window.scrollTo({
                top: nextSectionTop,
                behavior: 'smooth'
            });
        }
    });
    
    // Initial check for elements in viewport
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Create observers for each animatable element
    function createObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-10% 0px -10% 0px'
        };
        
        for (const id in animationStates) {
            const state = animationStates[id];
            const element = state.element;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element has entered the viewport
                        state.visible = true;
                        element.classList.add('animate-visible');
                    } else {
                        // Element has left the viewport
                        state.visible = false;
                        element.classList.remove('animate-visible');
                    }
                });
            }, observerOptions);
            
            observer.observe(element);
        }
    }
    
    // Initialize observers
    createObservers();
});