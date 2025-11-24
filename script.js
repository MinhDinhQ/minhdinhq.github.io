// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Slideshow scroll animation - each section slides in from the side
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-active');
        }
    });
}, observerOptions);

// Observe all sections with alternating slide directions
document.querySelectorAll('.section').forEach((section, index) => {
    // Alternate between sliding from left and right
    if (index % 2 === 0) {
        section.classList.add('slide-from-left');
    } else {
        section.classList.add('slide-from-right');
    }
    observer.observe(section);
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Initialize EmailJS
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'MBMtKtiP2dRQLbdbG'; // Get from https://dashboard.emailjs.com/admin/account
const EMAILJS_SERVICE_ID = 'service_6585aze'; // Get from https://dashboard.emailjs.com/admin
const EMAILJS_TEMPLATE_ID = 'template_3uobpz7'; // Get from https://dashboard.emailjs.com/admin/templates

// Initialize EmailJS with your public key
(function() {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        alert('⚠️ Please configure EmailJS first!\n\nSee the instructions in the console or check the setup guide.');
        console.error('EmailJS not configured. Please update the credentials in script.js');
        return;
    }

    // Get submit button and disable it
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);

            // Show success message
            alert('✅ Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        })
        .catch((error) => {
            console.error('FAILED...', error);

            // Show detailed error message
            let errorMsg = '❌ Oops! Something went wrong.\n\n';

            if (error.text) {
                errorMsg += 'Error: ' + error.text + '\n\n';
            }

            if (error.status === 400) {
                errorMsg += 'Template or Service ID might be incorrect.\nPlease check your EmailJS configuration.';
            } else if (error.status === 412) {
                errorMsg += 'Template variables might not match.\nMake sure your template uses: {{from_name}}, {{reply_to}}, {{subject}}, {{message}}';
            } else {
                errorMsg += 'Please try again or email me directly at Minhdinhquan1@gmail.com';
            }

            alert(errorMsg);
            console.error('Full error details:', JSON.stringify(error, null, 2));
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Dynamic year in footer
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// Add cursor pointer effect for interactive elements
document.querySelectorAll('a, button, .project-card').forEach(element => {
    element.style.cursor = 'pointer';
});

// Prevent default link behavior for placeholder links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#' && !link.closest('.nav-menu')) {
            e.preventDefault();
            console.log('This is a placeholder link. Update with your actual URL.');
        }
    });
});

// Console welcome message
console.log('%c Welcome to my portfolio! ', 'background: linear-gradient(135deg, #ffffff, #d0d0d0); color: black; font-size: 20px; padding: 10px;');
console.log('%c Feel free to explore the code and reach out if you have any questions! ', 'color: #ffffff; font-size: 14px;');

// GSAP Advanced Animations
gsap.registerPlugin(ScrollTrigger);

// Create a master timeline for hero section
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

// Hero section - Advanced sequential animations
heroTl
    .from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        rotationX: -90,
        transformOrigin: 'top center',
        ease: 'back.out(1.4)',
    })
    .from('.highlight', {
        duration: 0.8,
        scale: 0,
        rotation: 360,
        ease: 'elastic.out(1, 0.5)',
    }, '-=0.4')
    .from('.hero-subtitle', {
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-description', {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
    }, '-=0.8')
    .from('.hero-buttons .btn', {
        duration: 0.8,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: {
            each: 0.15,
            from: 'start',
        },
        ease: 'back.out(2)',
    }, '-=0.5')
    .from('.social-links a', {
        duration: 0.6,
        scale: 0,
        rotation: 720,
        opacity: 0,
        stagger: {
            each: 0.1,
            from: 'center',
        },
        ease: 'back.out(2)',
    }, '-=0.4');

// Skill cards animation - Advanced 3D flip effect
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
    },
    duration: 1.2,
    rotationY: 180,
    rotationX: 45,
    z: -200,
    opacity: 0,
    scale: 0.5,
    transformOrigin: 'center center',
    stagger: {
        each: 0.2,
        from: 'random',
        grid: 'auto',
    },
    ease: 'back.out(1.7)'
});

// Timeline items animation - Advanced cascade with bounce
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
    },
    duration: 1,
    x: -150,
    rotationZ: -15,
    opacity: 0,
    scale: 0.8,
    stagger: {
        each: 0.25,
        from: 'start',
    },
    ease: 'elastic.out(1, 0.6)'
});

// Project cards animation - Advanced morphing entrance
const projectTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
    }
});

projectTl
    .from('.project-card', {
        duration: 1.2,
        y: 100,
        rotationX: 90,
        rotationZ: 10,
        opacity: 0,
        scale: 0.3,
        transformOrigin: 'bottom center',
        stagger: {
            each: 0.2,
            from: 'edges',
        },
        ease: 'back.out(1.4)',
    })
    .from('.project-image img', {
        duration: 0.8,
        scale: 1.5,
        rotation: 15,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
    }, '-=0.8')
    .from('.project-info h3', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
    }, '-=0.6')
    .from('.project-tags', {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(2)',
    }, '-=0.4');

// Contact section animation - Advanced split entrance
const contactTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
    }
});

contactTl
    .from('.contact-details', {
        duration: 1.2,
        x: -150,
        rotationY: -90,
        opacity: 0,
        transformOrigin: 'right center',
        ease: 'power4.out',
    })
    .from('.contact-item', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: {
            each: 0.15,
            from: 'start',
        },
        ease: 'back.out(1.5)',
    }, '-=0.6')
    .from('.contact-form', {
        duration: 1.2,
        x: 150,
        rotationY: 90,
        opacity: 0,
        transformOrigin: 'left center',
        ease: 'power4.out',
    }, '-=1.2')
    .from('.form-group', {
        duration: 0.7,
        y: 30,
        opacity: 0,
        stagger: {
            each: 0.1,
            from: 'start',
        },
        ease: 'power2.out',
    }, '-=0.8')
    .from('.contact-form button', {
        duration: 0.6,
        scale: 0,
        rotation: 180,
        opacity: 0,
        ease: 'back.out(2)',
    }, '-=0.3');
