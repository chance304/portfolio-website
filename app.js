// Portfolio JavaScript functionality for Shobhit Tripathi

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupActiveNavigation();
        this.initTheme();
    }

    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle) {
            navToggle.addEventListener('click', () => this.toggleMenu());
        }

        if (navClose) {
            navClose.addEventListener('click', () => this.closeMenu());
        }

        // Close menu when clicking on nav links (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Smooth scrolling for navigation links - Fixed implementation
        this.setupSmoothScrolling();

        // Header background on scroll
        window.addEventListener('scroll', () => this.handleHeaderScroll());
    }

    setupSmoothScrolling() {
        // Get all navigation links and other anchor links
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        const heroButtons = document.querySelectorAll('.hero__buttons a[href^="#"]');
        const footerLinks = document.querySelectorAll('.footer__section a[href^="#"]');
        
        // Combine all anchor links
        const allAnchorLinks = [...navLinks, ...heroButtons, ...footerLinks];
        
        allAnchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 64;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMenu();
                    
                    // Update active navigation
                    this.updateActiveNav(targetId);
                }
            });
        });
    }

    updateActiveNav(activeId) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    toggleMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('show-menu');
        }
    }

    closeMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-toggle__icon');
        
        const currentTheme = body.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.body.setAttribute('data-color-scheme', theme);
        
        const themeIcon = document.querySelector('.theme-toggle__icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
            }
        }
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.about__item, .skill-category, .experience__item, .project-card, .certification-item');
        animateElements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Add staggered animations to hero elements
        const heroElements = document.querySelectorAll('.hero__greeting, .hero__name, .hero__subtitle, .hero__description, .hero__buttons');
        heroElements.forEach((el, index) => {
            el.classList.add('fade-in');
            if (index > 0) {
                el.classList.add(`delay-${Math.min(index, 3)}`);
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        const validation = this.validateForm(data);
        
        if (!validation.isValid) {
            this.showFormMessage(validation.message, 'error');
            return;
        }
        
        // Simulate form submission
        this.submitForm(data, form);
    }

    validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name || name.trim().length < 2) {
            return {
                isValid: false,
                message: 'Please enter a valid name (at least 2 characters).'
            };
        }
        
        if (!email || !this.isValidEmail(email)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address.'
            };
        }
        
        if (!subject || subject.trim().length < 5) {
            return {
                isValid: false,
                message: 'Please enter a subject (at least 5 characters).'
            };
        }
        
        if (!message || message.trim().length < 10) {
            return {
                isValid: false,
                message: 'Please enter a message (at least 10 characters).'
            };
        }
        
        return { isValid: true };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(data, form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    }

    showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.style.cssText = `
            padding: var(--space-12) var(--space-16);
            margin-top: var(--space-16);
            border-radius: var(--radius-base);
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-medium);
            ${type === 'success' ? `
                background-color: rgba(var(--color-success-rgb), 0.1);
                color: var(--color-success);
                border: 1px solid rgba(var(--color-success-rgb), 0.3);
            ` : `
                background-color: rgba(var(--color-error-rgb), 0.1);
                color: var(--color-error);
                border: 1px solid rgba(var(--color-error-rgb), 0.3);
            `}
        `;
        messageElement.textContent = message;
        
        // Insert after form
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Enhanced scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallax();
        this.setupCounters();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero__profile');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1; // Reduced parallax effect
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16));
    }

    setupCounters() {
        const counters = document.querySelectorAll('.about__item h3');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuart = t => 1 - (--t) * t * t * t;
        
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuart(frame / totalFrames);
            const currentNumber = (number * progress).toFixed(1);
            
            let displayText = currentNumber;
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';
            
            element.textContent = displayText;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = text; // Ensure final value is exact
            }
        }, frameDuration);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload important fonts if needed
        const criticalFonts = [
            // Add font URLs if using external fonts
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    new ScrollAnimations();
    new PerformanceOptimizer();
    
    // Add loading class removal
    document.body.classList.remove('loading');
    
    // Console message for developers
    console.log(`
🚀 Shobhit Tripathi Portfolio
━━━━━━━━━━━━━━━━━━━━━━━━━
Built with modern web technologies
• Responsive Design
• Dark/Light Theme
• Smooth Animations
• Optimized Performance

Connect with Shobhit:
• Website: www.shobhittripathi.com
• Location: Kathmandu, Nepal
• Role: IT Director at NS Engineering (ex-Deloitte)
    `);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Export for potential external use
window.PortfolioApp = {
    Portfolio,
    ScrollAnimations,
    PerformanceOptimizer
};