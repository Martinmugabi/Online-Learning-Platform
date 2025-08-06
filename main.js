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
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Header scroll effect
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
    
   
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple email validation
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Course card hover effect enhancement
    const courseCards = document.querySelectorAll('.course-card, .mentor-card, .trending-card, .blog-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
    
    // Initialize accordion to show first item by default
    if (accordionBtns.length > 0) {
        accordionBtns[0].classList.add('active');
        accordionBtns[0].nextElementSibling.style.maxHeight = accordionBtns[0].nextElementSibling.scrollHeight + 'px';
    }
});

// ... (previous code remains the same until the countdown timer)

    // Countdown Timer for Special Offer with Registration
    let offerEndTime;
    const offerDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    function initializeCountdown() {
        const savedEndTime = localStorage.getItem('learnlyOfferEndTime');
        
        if (savedEndTime) {
            offerEndTime = new Date(parseInt(savedEndTime));
            // Check if offer period has already ended
            if (offerEndTime < new Date()) {
                resetOffer();
                return;
            }
        } else {
            // First visit - set end time
            offerEndTime = new Date(Date.now() + offerDuration);
            localStorage.setItem('learnlyOfferEndTime', offerEndTime.getTime());
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const now = new Date();
        const diff = offerEndTime - now;
        
        // If time is up
        if (diff <= 0) {
            resetOffer();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    function resetOffer() {
        document.querySelector('.offer-timer').innerHTML = `
            <div class="timer-item">
                <span>00</span>
                <small>Days</small>
            </div>
            <div class="timer-item">
                <span>00</span>
                <small>Hours</small>
            </div>
            <div class="timer-item">
                <span>00</span>
                <small>Minutes</small>
            </div>
            <div class="timer-item">
                <span>00</span>
                <small>Seconds</small>
            </div>
        `;
        document.querySelector('.special-offer .btn').textContent = 'Offer Expired';
        document.querySelector('.special-offer .btn').style.backgroundColor = '#999';
        document.querySelector('.special-offer .btn').style.cursor = 'not-allowed';
    }

    // Registration Modal
    function createRegistrationModal() {
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Register for Limited Time Offer</h2>
                <form id="registrationForm">
                    <div class="form-group">
                        <input type="text" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" placeholder="Phone Number">
                    </div>
                    <button type="submit" class="btn btn-primary">Complete Registration</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Form submission
        const registrationForm = modal.querySelector('#registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the data to your server
                // For this example, we'll just show a success message
                modal.querySelector('.modal-content').innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Registration Successful!</h3>
                        <p>Thank you for registering. Your 3 months of free access starts now!</p>
                        <button class="btn btn-primary close-success">Continue</button>
                    </div>
                `;
                
                // Initialize the countdown if not already running
                if (!localStorage.getItem('learnlyOfferEndTime')) {
                    initializeCountdown();
                }
                
                // Close success message
                modal.querySelector('.close-success').addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            });
        }
        
        return modal;
    }
    

    // Initialize registration modal
    let registrationModal;
    const registerBtn = document.querySelector('.special-offer .btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Check if offer has expired
            const savedEndTime = localStorage.getItem('learnlyOfferEndTime');
            if (savedEndTime && new Date(parseInt(savedEndTime)) < new Date()) {
                alert('This offer has expired.');
                return;
            }
            
            if (!registrationModal) {
                registrationModal = createRegistrationModal();
            }
            registrationModal.style.display = 'flex';
        });
    }

    // Initialize countdown if timer exists on page
    if (document.querySelector('.offer-timer')) {
        initializeCountdown();
    }

    // Contact Form Submission with Feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call in production)
        setTimeout(() => {
            // Hide loading state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showFormFeedback('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        }, 1500); // Simulate network delay
    });
}

// Function to show form feedback messages
function showFormFeedback(message, type = 'success') {
    // Remove any existing messages
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.innerHTML = `
        <p>${message}</p>
        <button class="close-feedback">&times;</button>
    `;
    
    // Insert before the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(feedback, form);
    
    // Auto-hide after 5 seconds
    const autoHide = setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 300);
    }, 5000);
    
    // Close button functionality
    feedback.querySelector('.close-feedback').addEventListener('click', () => {
        clearTimeout(autoHide);
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 300);
    });
}


// Course Enrollment System
document.addEventListener('DOMContentLoaded', function() {
    // Sample course data (replace with your actual courses)
    const courses = [
        { id: 1, title: "Web Development Bootcamp", originalPrice: 299, discountPrice: 239.20 },
        { id: 2, title: "Advanced JavaScript", originalPrice: 199, discountPrice: 159.20 },
        { id: 3, title: "UI/UX Design Fundamentals", originalPrice: 179, discountPrice: 143.20 },
        { id: 4, title: "Data Science with Python", originalPrice: 249, discountPrice: 199.20 },
        { id: 5, title: "Digital Marketing Masterclass", originalPrice: 159, discountPrice: 127.20 },
        { id: 6, title: "Graphic Design Essentials", originalPrice: 149, discountPrice: 119.20 }
    ];

    // DOM Elements
    const enrollNowBtn = document.getElementById('enrollNowBtn');
    const enrollmentModal = document.getElementById('enrollmentModal');
    const closeModalBtn = enrollmentModal?.querySelector('.close-modal');
    const courseList = document.querySelector('.course-list');
    const enrollmentForm = document.getElementById('enrollmentForm');

    // Open modal when Enroll Now button is clicked
    if (enrollNowBtn) {
        enrollNowBtn.addEventListener('click', function() {
            enrollmentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            enrollmentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside modal
    if (enrollmentModal) {
        enrollmentModal.addEventListener('click', function(e) {
            if (e.target === enrollmentModal) {
                enrollmentModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Populate course list
    if (courseList) {
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <input type="checkbox" id="course-${course.id}" value="${course.id}">
                <div class="course-info">
                    <h4>${course.title}</h4>
                    <div class="course-price">
                        $${course.discountPrice.toFixed(2)} 
                        <span class="original-price">$${course.originalPrice.toFixed(2)}</span>
                        <span class="discount-badge">20% OFF</span>
                    </div>
                </div>
            `;
            courseList.appendChild(courseItem);
        });
    }

    // Handle form submission
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected courses
            const selectedCourses = Array.from(document.querySelectorAll('.course-item input:checked'))
                .map(checkbox => parseInt(checkbox.value));
            
            if (selectedCourses.length === 0) {
                alert('Please select at least one course');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(() => {
                // Hide loading state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                showEnrollmentSuccess();
            }, 1500);
        });
    }
     
    // Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Button ripple effect
    const enrollBtn = document.getElementById('enrollNowBtn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function(e) {
            // Remove any existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            // Position ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});
    // Show enrollment success
    function showEnrollmentSuccess() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="enrollment-success">
                <i class="fas fa-check-circle"></i>
                <h3>Enrollment Successful!</h3>
                <p>Thank you for enrolling. You will receive a confirmation email with course access instructions shortly.</p>
                <button class="btn btn-primary close-enrollment">Continue to Dashboard</button>
            </div>
        `;
        
        // Close button functionality
        document.querySelector('.close-enrollment').addEventListener('click', function() {
            enrollmentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// For option A
document.querySelectorAll('.see-more[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});














document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const guestOptions = document.getElementById('guest-options');
    const userOptions = document.getElementById('user-options');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Check if user is logged in (in a real app, this would check localStorage/session)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Initialize UI based on login state
    if (isLoggedIn) {
        guestOptions.style.display = 'none';
        userOptions.style.display = 'block';
        
        // Load user data if available
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.name) {
            document.getElementById('username-display').textContent = userData.name;
        }
        if (userData.avatar) {
            document.getElementById('user-avatar').src = userData.avatar;
        }
    } else {
        guestOptions.style.display = 'flex';
        userOptions.style.display = 'none';
    }
    
    // Event Listeners
    loginBtn?.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    
    signupBtn?.addEventListener('click', () => {
        signupModal.style.display = 'flex';
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    switchToSignup?.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    
    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        guestOptions.style.display = 'flex';
        userOptions.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // Form Submissions
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, you would validate and send to server
        console.log('Login attempt with:', email, password);
        
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        guestOptions.style.display = 'none';
        userOptions.style.display = 'block';
        loginModal.style.display = 'none';
    });
    
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        const avatarInput = document.getElementById('signup-avatar');
        
        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Handle avatar upload
        let avatarUrl = 'https://via.placeholder.com/40';
        if (avatarInput.files && avatarInput.files[0]) {
            // In a real app, you would upload this to a server
            avatarUrl = URL.createObjectURL(avatarInput.files[0]);
        }
        
        // Save user data (in a real app, this would go to a server)
        const userData = {
            name: name,
            email: email,
            avatar: avatarUrl
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update UI
        document.getElementById('username-display').textContent = name;
        document.getElementById('user-avatar').src = avatarUrl;
        guestOptions.style.display = 'none';
        userOptions.style.display = 'block';
        signupModal.style.display = 'none';
    });
});

