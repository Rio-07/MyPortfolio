// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        initializeAnimations();
    }, 3000);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '💡' : '🌙';
}

// Typing Animation
const typingText = document.getElementById('typing-text');
const phrases = ['Code. Create. Conquer.', 'Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Particles System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    const colors = ['var(--accent-color)', 'var(--secondary-color)', 'var(--tertiary-color)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('particles-container').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

function initParticles() {
    setInterval(createParticle, 300);
}

// Skill Progress Animation
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 500);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fade-in');
        } else {
            section.classList.add('slide-in-left');
        }
        observer.observe(section);
    });
    
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        observer.observe(card);
    });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        category.classList.add('fade-in');
        observer.observe(category);
    });
}

function initializeAnimations() {
    typeEffect();
    initParticles();
    initScrollAnimations();
    initHamburgerMenu();
    initSwipeGestures();
    initCustomCursor();
    initLiveClock();
}

// Live Clock
function initLiveClock() {
    const clockElement = document.getElementById('live-clock');
    
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', {
            hour12: false,
            timeZone: 'Asia/Kolkata'
        });
        const timezone = 'IST';
        clockElement.textContent = `${time} ${timezone}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Custom Cursor Trail
function initCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    });
}

// Hamburger Menu
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Swipe Gestures for Project Cards
function initSwipeGestures() {
    const projectGrid = document.getElementById('project-grid');
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    projectGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    projectGrid.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    });
    
    projectGrid.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                if (diffX > 0) {
                    card.style.transform = 'translateX(-10px)';
                } else {
                    card.style.transform = 'translateX(10px)';
                }
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                }, 200);
            });
        }
    });
}

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add loading animation to clicked link
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scroll-to-top');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active nav link highlighting and show/hide scroll button
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    // Mouse events for desktop
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(0) scale(1) rotateX(0)';
        }
    });
    
    // Touch events for mobile
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.project-link, .scroll-top-btn, .theme-btn').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body::before');
    const speed = scrolled * 0.5;
});

// Add smooth reveal animation for contact section
const contactSection = document.getElementById('contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    });
    contactObserver.observe(contactSection);
}

// Add CSS for contact animation
const contactStyle = document.createElement('style');
contactStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Touch-friendly improvements */
    .skill, .tech-skill {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    
    .project-grid {
        touch-action: pan-x;
        user-select: none;
    }
`;
document.head.appendChild(contactStyle);

// Optimize images for different screen sizes
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

// Initialize optimizations
window.addEventListener('DOMContentLoaded', optimizeImages);