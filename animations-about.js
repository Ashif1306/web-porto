document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the About page
    const isAboutPage = window.location.pathname.includes('about.html');
    
    if (!isAboutPage) return;

    // Create a style element for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        /* Fade and Slide Animations */
        .slide-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .slide-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .slide-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .slide-down {
            opacity: 0;
            transform: translateY(-30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .scale-in {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-visible {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }

        /* Gallery Item Hover Effect */
        .gallery-item {
            transition: all 0.5s ease;
        }

        .gallery-item:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(animationStyle);

    // Function to check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Animate Intro Section
    const introTitle = document.querySelector('.section-title h2');
    const introContent = document.querySelector('.intro-content');
    
    if (introTitle) {
        introTitle.classList.add('slide-down');
    }

    if (introContent) {
        const introLeft = introContent.querySelector('.intro-left');
        const introRight = introContent.querySelector('.intro-right');

        if (introLeft) introLeft.classList.add('slide-left');
        if (introRight) introRight.classList.add('slide-right');
    }

    // Animate Gallery Items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'slide-left' : 'slide-right');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate Stats Section
    const statsItems = document.querySelectorAll('.stat-item');
    statsItems.forEach((item, index) => {
        item.classList.add('slide-up');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate Skills Banner
    const skillsBanner = document.querySelector('.skills-banner');
    if (skillsBanner) {
        skillsBanner.classList.add('slide-up');
    }

    // Animate Education and Work Sections
    const educationSection = document.querySelector('.education');
    const workSection = document.querySelector('.work');

    if (educationSection) educationSection.classList.add('slide-right');
    if (workSection) workSection.classList.add('slide-left');

    // Animate Follow Me Section
    const followImage = document.querySelector('.follow-image');
    const followContent = document.querySelector('.follow-content');

    if (followImage) followImage.classList.add('scale-in');
    if (followContent) followContent.classList.add('slide-up');

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .slide-down, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});