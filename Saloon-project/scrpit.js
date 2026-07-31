// script.js - Optimized Version
document.addEventListener('DOMContentLoaded', function() {
    // Simple loader - remove after page load
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 300);
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Simple scroll animation
    const animateElements = document.querySelectorAll('.service-card-detailed, .course-card, .opportunity-card, .branch-card, .instructor-card');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            }
        });
    }

    // Set initial styles
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.3s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load

    // Form handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    
                    // Remove error after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '#ddd';
                    }, 2000);
                } else {
                    input.style.borderColor = '#00C851';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you! We will get back to you soon.');
                form.reset();
                
                // Reset border colors
                inputs.forEach(input => {
                    input.style.borderColor = '#ddd';
                });
            } else {
                alert('Please fill all required fields.');
            }
        });
    });

    // Chat widget click
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.addEventListener('click', function() {
            alert('👋 Welcome to Glow & Co.! How can we help you?');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Simple counter animation
    const counters = document.querySelectorAll('.stat-number, .number');
    
    function animateNumbers() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                
                const target = parseInt(counter.innerText);
                if (isNaN(target)) return;
                
                let current = 0;
                const increment = target / 50;
                const duration = 1000;
                const stepTime = 20;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.innerText = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.innerText = Math.floor(current) + '+';
                    }
                }, stepTime);
            }
        });
    }
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // Check on load
});

// Add menu toggle button to navigation
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    if (nav && !document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            nav.insertBefore(menuToggle, navLinks);
        }
    }
});



// Enrollment Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all enroll buttons
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const modal = document.getElementById('enrollModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Current step
    let currentStep = 1;
    const totalSteps = 4;
    
    // Open modal when enroll button clicked
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Get course name from card
            const courseCard = this.closest('.course-card');
            if (courseCard) {
                const courseName = courseCard.querySelector('h3').textContent;
                const courseSelect = document.getElementById('selectedCourse');
                
                // Auto-select the course
                for (let option of courseSelect.options) {
                    if (option.text.includes(courseName)) {
                        option.selected = true;
                        updateCourseFee();
                        break;
                    }
                }
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Update steps
    function updateSteps() {
        // Update step visibility
        for (let i = 1; i <= totalSteps; i++) {
            const step = document.getElementById(`step${i}`);
            if (i === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        }
        
        // Update progress bar
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update buttons
        prevBtn.disabled = currentStep === 1;
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }
    
    // Validate current step
    function validateStep() {
        const currentStepElement = document.getElementById(`step${currentStep}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
                
                // Show error message
                const errorId = field.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                }
            } else {
                field.classList.remove('error');
                
                // Clear error message
                const errorId = field.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
                
                // Email validation
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('error');
                        document.getElementById('emailError').textContent = 'Please enter a valid email';
                        isValid = false;
                    }
                }
                
                // Phone validation
                if (field.id === 'phone') {
                    const phoneRegex = /^[0-9+\-\s]{10,}$/;
                    if (!phoneRegex.test(field.value)) {
                        field.classList.add('error');
                        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                        isValid = false;
                    }
                }
            }
        });
        
        // Special validation for step 3 (terms checkbox)
        if (currentStep === 3) {
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                isValid = false;
                alert('Please accept the terms and conditions');
            }
        }
        
        return isValid;
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (validateStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateSteps();
                
                // If moving to step 3, update payment summary
                if (currentStep === 3) {
                    updatePaymentSummary();
                }
                
                // If moving to step 4, update review
                if (currentStep === 4) {
                    updateReview();
                }
            }
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateSteps();
        }
    });
    
    // Update course fee
    function updateCourseFee() {
        const courseSelect = document.getElementById('selectedCourse');
        const selectedOption = courseSelect.options[courseSelect.selectedIndex];
        const price = selectedOption.dataset.price || 0;
        
        document.getElementById('courseFee').textContent = '₹' + parseInt(price).toLocaleString();
        
        const total = parseInt(price) + 2000 + 5000;
        document.getElementById('totalAmount').textContent = '₹' + total.toLocaleString();
    }
    
    document.getElementById('selectedCourse').addEventListener('change', updateCourseFee);
    
    // Payment method toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            const upiDetails = document.getElementById('upiDetails');
            
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
                upiDetails.style.display = 'none';
            } else if (this.value === 'upi') {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'none';
            }
        });
    });
    
    // Update payment summary
    function updatePaymentSummary() {
        updateCourseFee();
    }
    
    // Update review section
    function updateReview() {
        // Personal Information
        const personalHTML = `
            <div><strong>Name:</strong> ${document.getElementById('fullName').value}</div>
            <div><strong>DOB:</strong> ${document.getElementById('dob').value}</div>
            <div><strong>Email:</strong> ${document.getElementById('email').value}</div>
            <div><strong>Phone:</strong> ${document.getElementById('phone').value}</div>
            <div><strong>Gender:</strong> ${document.getElementById('gender').value}</div>
            <div><strong>City:</strong> ${document.getElementById('city').value}</div>
        `;
        document.getElementById('reviewPersonal').innerHTML = personalHTML;
        
        // Course Details
        const courseSelect = document.getElementById('selectedCourse');
        const courseText = courseSelect.options[courseSelect.selectedIndex].text;
        const batch = document.getElementById('batch');
        const batchText = batch.options[batch.selectedIndex].text;
        
        const courseHTML = `
            <div><strong>Course:</strong> ${courseText}</div>
            <div><strong>Batch:</strong> ${batchText}</div>
            <div><strong>Start Date:</strong> ${document.getElementById('startDate').value}</div>
            <div><strong>Qualification:</strong> ${document.getElementById('qualification').value}</div>
        `;
        document.getElementById('reviewCourse').innerHTML = courseHTML;
        
        // Payment Summary
        const paymentHTML = `
            <div><strong>Course Fee:</strong> ${document.getElementById('courseFee').textContent}</div>
            <div><strong>Registration:</strong> ₹2,000</div>
            <div><strong>Material:</strong> ₹5,000</div>
            <div><strong>Total:</strong> ${document.getElementById('totalAmount').textContent}</div>
            <div><strong>Payment Method:</strong> ${document.querySelector('input[name="paymentMethod"]:checked').value}</div>
        `;
        document.getElementById('reviewPayment').innerHTML = paymentHTML;
    }
    
    // Form submission
    document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        alert('✅ Enrollment submitted successfully!\n\nThank you for choosing Glow & Co. Academy. Our team will contact you within 24 hours with further details.');
        
        // Close modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        this.reset();
        currentStep = 1;
        updateSteps();
    });
    
    // Terms and Conditions modal
    const showTerms = document.getElementById('showTerms');
    const termsModal = document.getElementById('termsModal');
    const termsClose = document.querySelector('.terms-close');
    const acceptTerms = document.querySelector('.accept-terms');
    
    showTerms.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    termsClose.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });
    
    acceptTerms.addEventListener('click', function() {
        termsModal.style.display = 'none';
        document.getElementById('terms').checked = true;
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });
    
    // Format card number
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });
    
    // Format expiry date
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2,4);
        }
        e.target.value = value;
    });
    
    // Initialize
    updateSteps();
});
// Book now button functionality - redirect to new elegant booking form
document.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const serviceName = this.closest('.service-details')?.querySelector('h3')?.textContent || 'Bridal Package';
        // service name ah localStorage la store pannalam (optional)
        localStorage.setItem('selectedService', serviceName);
        window.location.href = 'book.html'; // book.html ku redirect pannum
    });
});