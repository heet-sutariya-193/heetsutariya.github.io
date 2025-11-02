// Loading animation
window.addEventListener('load', function() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active navigation
    updateActiveNav();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Active navigation function
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
            
            // Animate skill bars when they become visible
            if (entry.target.classList.contains('about-text')) {
                animateSkillBars();
            }
            
            // Animate stats when they become visible
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
// Initialize EmailJS with your Public Key
emailjs.init("AB1Zaf_gg0qpVfzUu");

// Form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = {
        from_name: this.querySelector('input[name="name"]').value,
        from_email: this.querySelector('input[name="email"]').value,
        subject: this.querySelector('input[name="subject"]').value,
        message: this.querySelector('textarea[name="message"]').value,
        to_name: "Heet",
        reply_to: this.querySelector('input[name="email"]').value
    };
    
    // Send email using EmailJS
    emailjs.send("service_pioltrq", "template_94vjptk", formData)
        .then(function(response) {
            showNotification(`Thank you ${formData.from_name}! I'll reply to you soon.`, 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            showNotification('Sorry, there was an error. Please email me directly at heetsutariya193@gmail.com', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Enhanced notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent)' : '#ff4444'};
        color: var(--primary);
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add typing effect to hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page loads
window.addEventListener('DOMContentLoaded', function() {
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const originalText = heroText.textContent;
        typeWriter(heroText, originalText);
    }
});

// Animate skill bars
function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    skillProgresses.forEach(progress => {
        const level = progress.getAttribute('data-level');
        progress.style.width = `${level}%`;
    });
}

// Animate stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Add particle effect background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(0, 243, 255, 0.5);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Theme toggle functionality (bonus feature)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 1px solid rgba(0, 243, 255, 0.3);
        color: var(--accent);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
createThemeToggle();

// Add CSS for animations
// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(0);
        }
        75% {
            transform: translateY(-20px) translateX(-10px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
    }
`;
document.head.appendChild(style);

