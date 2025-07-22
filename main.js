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

document.getElementById('signupForm56').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Validate inputs
  if (!username || !email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (username.length < 4) {
    showMessage('Username must be at least 4 characters', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  if (password.length < 8) {
    showMessage('Password must be at least 8 characters', 'error');
    return;
  }
  
  // If all validations pass
  processSignup(username, email, password);
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Process signup (simulated)
function processSignup(username, email, password) {
  const btn = document.querySelector('.btn44');
  
  // Save original button text
  const originalText = btn.textContent;
  
  // Show loading state
  btn.innerHTML = '<span class="spinner"></span> Processing...';
  btn.disabled = true;
// Simulate API call
  setTimeout(() => {
    // In a real app, you would send data to your backend here
    console.log('Signup data:', { username, email, password });
    
    // Show success message
    showMessage('Account created successfully! Redirecting...', 'success');
    
    // Reset button after delay
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      
      // Redirect to login page (simulated)
      // window.location.href = 'login.html';
    }, 2000);
  }, 1500);
}

// Show message to user
function showMessage(message, type) {
  // Remove any existing messages
  const existingMsg = document.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  // Create message element
  const msgElement = document.createElement('div');
  msgElement.className = `form-message ${type}`;
  msgElement.textContent = message;
  
  // Style based on type
  if (type === 'error') {
    msgElement.style.color = '#d63031';
    msgElement.style.backgroundColor = '#ffecec';
  } else {
    msgElement.style.color = '#00b894';
    msgElement.style.backgroundColor = '#e8f8f5';
  }
  
  // Add styles
  msgElement.style.padding = '12px';
  msgElement.style.borderRadius = '8px';
  msgElement.style.marginBottom = '20px';
  msgElement.style.textAlign = 'center';
  msgElement.style.fontWeight = '500';
  msgElement.style.transition = 'all 0.3s ease';
  
  // Insert message
  const form = document.getElementById('signupForm56');
  form.insertBefore(msgElement, form.firstChild);
  
  // Add shake effect for errors
  if (type === 'error') {
    form.style.animation = 'shake 0.5s';
    setTimeout(() => {
      form.style.animation = '';
    }, 500);
  }
}






  
  
// Password strength indicator
document.getElementById('password').addEventListener('input', function(e) {
  const password = e.target.value;
  const strengthBar = document.querySelector('.strength-bar');
  
  // Create strength bar if it doesn't exist
  if (!strengthBar) {
    const strengthContainer = document.createElement('div');
    strengthContainer.className = 'password-strength';
    strengthContainer.innerHTML = '<div class="strength-bar"></div>';
    e.target.parentNode.appendChild(strengthContainer);
  }
  
  // Calculate strength
  let strength = 0;
  if (password.length > 0) strength += 20;
  if (password.length >= 8) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;
  
  // Update strength bar
  const bar = document.querySelector('.strength-bar');
  bar.style.width = `${strength}%`;
  
  // Change color based on strength
  if (strength < 40) {
    bar.style.backgroundColor = '#e74c3c';
  } else if (strength < 70) {
    bar.style.backgroundColor = '#f39c12';
  } else {
    bar.style.backgroundColor = '#2ecc71';
  }
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Add focus effects
document.querySelectorAll('.form-group44 input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});



function goToResources() {
  // Replace 'resources.html' with the actual path to your resources page
  window.location.href = 'resources.html';
}

function takeCourse() {
  // Replace 'course.html' with the actual path to your course page
  window.location.href = 'home.html';
}

function downloadCertificate() {
  // Replace 'path/to/your/certificate.pdf' with the actual path to your certificate file
  var certificateURL = 'path/to/your/certificate.pdf';

  // Create a temporary link element
  var link = document.createElement('a');

  // Set the href attribute to the certificate URL
  link.href = certificateURL;

  // Set the download attribute to suggest a filename for the downloaded file
  link.download = 'certificate.pdf'; // You can customize the filename here

  // Append the link to the document body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
}
















