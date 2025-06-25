document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // FAQ Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Countdown Timer for Special Offer
    function updateCountdown() {
        const now = new Date();
        const offerEnd = new Date();
        offerEnd.setDate(now.getDate() + 7); // Offer ends in 7 days
        
        const diff = offerEnd - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Smooth Scrolling for Anchor Links
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
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
    
    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.course-card, .mentor-card, .trending-card, .testimonial-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.course-card, .mentor-card, .trending-card, .testimonial-card, .blog-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});






document.getElementById('login').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!username || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  if (username.length < 4) {
    showError('Username must be at least 4 characters');
    return;
  }
  
  if (password.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }
  
  // Simulate login request (replace with actual API call)
  simulateLogin(username, password);
});

function simulateLogin(username, password) {
  // Show loading state
  const btn = document.querySelector('.btn11');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  btn.disabled = true;
  
  // Simulate API delay
  setTimeout(() => {
    // This is just a simulation - in a real app, you would check credentials with your backend
    if (username === 'demo' && password === 'password') {
      showSuccess('Login successful! Redirecting...');
      // Redirect after delay
      setTimeout(() => {
        window.location.href = 'dashboard.html'; // Change to your actual dashboard page
      }, 1500);
    } else {
      showError('Invalid username or password');
      btn.innerHTML = 'Login';
      btn.disabled = false;
    }
  }, 1500);
}
function showError(message) {
  // Remove any existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Create error element
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = '#e74c3c';
  errorElement.style.marginBottom = '15px';
  errorElement.style.textAlign = 'center';
  errorElement.style.fontWeight = '500';
  errorElement.textContent = message;
  
  // Insert before the form
  const form = document.getElementById('login');
  form.insertBefore(errorElement, form.firstChild);
  
  // Shake animation for error
  form.style.animation = 'shake 0.5s';
  setTimeout(() => {
    form.style.animation = '';
  }, 500);
}

function showSuccess(message) {
  // Create success element
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.style.color = '#2ecc71';
  successElement.style.marginBottom = '15px';
  successElement.style.textAlign = 'center';
  successElement.style.fontWeight = '500';
  successElement.textContent = message;
  
  // Insert before the form
  const form = document.getElementById('login');
  form.insertBefore(successElement, form.firstChild);
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Add focus effects
document.querySelectorAll('.form123-group input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentNode.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentNode.style.transform = 'scale(1)';
  });
});

