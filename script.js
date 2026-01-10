// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
  });
}

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // Filter portfolio cards
    portfolioCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      project: document.getElementById('project').value,
      message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// CV Download Function
function downloadCV() {
  const cvUrl = 'cv_placeholder.pdf';
  if (cvUrl === 'cv_placeholder.pdf') {
    const userConfirmed = confirm(
      'This is a placeholder link. To set up your CV download:\n\n' +
      '1. Rename your CV file to "cv.pdf"\n' +
      '2. Place it in the same folder as this website\n\n' +
      'Would you like to continue with the demo?'
    );
    
    if (!userConfirmed) return;
    
    // Create a demo CV download
    const demoCV = `
      Name: Imesh Rathnayake
      Title: Motion & Digital Media Designer
      Email: hello@imeshrathnayake.com
      Portfolio: imeshrathnayake.com
      
      This is a demo CV. Please replace with your actual CV file.
    `;
    
    const blob = new Blob([demoCV], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Imesh_Rathnayake_CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    const a = document.createElement('a');
    a.href = cvUrl;
    a.download = 'Imesh_Rathnayake_CV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .portfolio-card, .skill-category, .contact-card').forEach(el => {
  observer.observe(el);
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.nav-container').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-level');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// Initialize skill bars animation when skills section is in view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillsObserver.observe(skillsSection);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
});

// Theme switcher (optional dark/light mode)
function initThemeSwitcher() {
  const themeToggle = document.createElement('button');
  themeToggle.id = 'themeToggle';
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
  themeToggle.setAttribute('title', 'Toggle theme');
  
  document.querySelector('.nav-content').appendChild(themeToggle);
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-theme')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.remove('fa-moon');
    themeToggle.querySelector('i').classList.add('fa-sun');
  }
}

// Initialize theme switcher (uncomment to enable)
// initThemeSwitcher();

// Add light theme styles (uncomment if using theme switcher)
/*
.light-theme {
  --primary: #f8fafc;
  --primary-dark: #e2e8f0;
  --dark: #ffffff;
  --white: #0f172a;
  --light: #0a0f2b;
  --gray-100: #0f172a;
  --gray-900: #f8fafc;
}

.light-theme .nav-container {
  background: rgba(248, 250, 252, 0.95);
}

.light-theme .nav-link {
  color: #475569;
}

.light-theme .nav-link:hover {
  color: #0f172a;
}

.light-theme .visual-card,
.light-theme .skill-category,
.light-theme .portfolio-card,
.light-theme .contact-card,
.light-theme .contact-form {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.1);
}

.light-theme .portfolio-description,
.light-theme .hero-description,
.light-theme .section-subtitle,
.light-theme .skill-name,
.light-theme .form-group label {
  color: #475569;
}

.light-theme .form-group input,
.light-theme .form-group select,
.light-theme .form-group textarea {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.2);
  color: #0f172a;
}

.light-theme .footer {
  background: rgba(0, 0, 0, 0.05);
}

.light-theme .cta-section {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(255, 204, 51, 0.15));
}
*/

console.log('Portfolio website initialized successfully!');
// WhatsApp Contact Functionality
function initWhatsAppContact() {
  // Your WhatsApp number (replace with your actual number)
  const whatsappNumber = "+94764638787"; // Example: "94771234567"
  
  // Default message (customize as needed)
  const defaultMessage = "Hello! I'm interested in your design services. Let's chat!";
  
  // Get elements
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappLink = document.getElementById('whatsappLink');
  
  // Create modal for better UX (optional)
  createWhatsAppModal();
  
  // Format number for display (add spaces for readability)
  function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.toString().replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else {
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
    }
  }
  
  // Encode message for URL
  function encodeMessage(message) {
    return encodeURIComponent(message);
  }
  
  // Generate WhatsApp URL
  function getWhatsAppURL(number, message) {
    // Remove all non-numeric characters from number
    const cleanNumber = number.toString().replace(/\D/g, '');
    
    // Create WhatsApp URL
    return `https://wa.me/${cleanNumber}?text=${encodeMessage(message)}`;
  }
  
  // Create optional modal for confirmation
  function createWhatsAppModal() {
    // Create modal HTML
    const modalHTML = `
      <div class="whatsapp-modal" id="whatsappModal">
        <button class="whatsapp-close" id="whatsappClose">
          <i class="fas fa-times"></i>
        </button>
        <div class="whatsapp-modal-content">
          <div class="whatsapp-modal-header">
            <div class="whatsapp-modal-icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <h3>Contact on WhatsApp</h3>
          </div>
          <div class="whatsapp-modal-body">
            <p>You'll be redirected to WhatsApp to start a conversation. Make sure you have WhatsApp installed on your device.</p>
            <div class="whatsapp-number-display">
              <div class="number">${formatPhoneNumber(whatsappNumber)}</div>
            </div>
            <p>You can edit the message before sending if needed.</p>
          </div>
          <div class="whatsapp-modal-actions">
            <button class="modal-btn modal-btn-primary" id="whatsappConfirm">
              <i class="fab fa-whatsapp"></i> Open WhatsApp
            </button>
            <button class="modal-btn modal-btn-secondary" id="whatsappCancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const whatsappModal = document.getElementById('whatsappModal');
    const whatsappClose = document.getElementById('whatsappClose');
    const whatsappConfirm = document.getElementById('whatsappConfirm');
    const whatsappCancel = document.getElementById('whatsappCancel');
    
    // Show modal function
    function showModal() {
      whatsappModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Hide modal function
    function hideModal() {
      whatsappModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Direct WhatsApp redirect
    function redirectToWhatsApp() {
      const url = getWhatsAppURL(whatsappNumber, defaultMessage);
      window.open(url, '_blank');
      hideModal();
    }
    
    // Event listeners for modal
    if (whatsappClose) {
      whatsappClose.addEventListener('click', hideModal);
    }
    
    if (whatsappCancel) {
      whatsappCancel.addEventListener('click', hideModal);
    }
    
    if (whatsappConfirm) {
      whatsappConfirm.addEventListener('click', redirectToWhatsApp);
    }
    
    // Close modal when clicking outside
    whatsappModal.addEventListener('click', (e) => {
      if (e.target === whatsappModal) {
        hideModal();
      }
    });
    
    // Set initial WhatsApp link (direct action)
    whatsappLink.href = getWhatsAppURL(whatsappNumber, defaultMessage);
    
    // Optional: Add click event for modal confirmation (comment out if you want direct redirect)
    whatsappLink.addEventListener('click', (e) => {
      e.preventDefault();
      showModal();
    });
    
    // Alternative: Uncomment below for direct redirect without modal
    /*
    whatsappLink.href = getWhatsAppURL(whatsappNumber, defaultMessage);
    whatsappLink.addEventListener('click', (e) => {
      // Let the default link action happen
    });
    */
  }
  
  // Add pulse animation on page load
  setTimeout(() => {
    const button = whatsappFloat.querySelector('.whatsapp-button');
    button.classList.add('pulse');
    
    // Remove pulse after 3 cycles
    setTimeout(() => {
      button.classList.remove('pulse');
    }, 6000);
  }, 2000);
  
  // Re-add pulse animation when scrolling to bottom (contact section)
  window.addEventListener('scroll', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        const button = whatsappFloat.querySelector('.whatsapp-button');
        if (!button.classList.contains('pulse')) {
          button.classList.add('pulse');
          setTimeout(() => {
            button.classList.remove('pulse');
          }, 6000);
        }
      }
    }
  });
  
  console.log('WhatsApp contact initialized. Number:', whatsappNumber);
}

// Initialize WhatsApp contact when page loads
document.addEventListener('DOMContentLoaded', initWhatsAppContact);


// CV Download Function - Updated for ML Engineer
function downloadCV() {
  const cvUrl = 'imesh_rathnayake_ml_engineer_cv.pdf';
  
  // You can use a placeholder or actual CV
  const userConfirmed = confirm(
    'Would you like to download my CV?\n\n' +
    'The CV includes:\n' +
    '• Machine Learning Projects\n' +
    '• Technical Skills\n' +
    '• Certifications\n' +
    '• Education & Experience'
  );
  
  if (!userConfirmed) return;
  
  // Create a demo CV download
  const demoCV = `
    Imesh Rathnayake - Machine Learning Engineer
    ===========================================
    
    EDUCATION
    ---------
    Bachelor of Science in Computer Science
    NSBM Green University (2022-2026)
    Specialization: Machine Learning & Data Science
    
    TECHNICAL SKILLS
    ----------------
    • Machine Learning: Scikit-learn, TensorFlow, Deep Learning
    • Programming: Python, SQL, Git, Linux
    • Data Science: Pandas, NumPy, Matplotlib, Data Analysis
    • Cybersecurity: Network Security, Cryptography
    
    CERTIFICATIONS
    --------------
    • Building Systems with ChatGPT API - DeepLearning.AI
    • Calculus for Machine Learning - DeepLearning.AI
    • Introduction to Cybersecurity - Harvard University
    • Foundations of Cybersecurity - Google
    
    EXPERIENCE
    ----------
    Associate IT Executive
    eBEYONDS Pvt Ltd (2021-2022)
    • IT Support and System Administration
    
    PROJECTS
    --------
    California Housing Price Prediction
    • End-to-end ML pipeline with regression models
    • Feature engineering and hyperparameter tuning
    
    CONTACT
    -------
    Email: imeshrathnayake@hotmail.com
    LinkedIn: linkedin.com/in/imesh-rathnayake
    GitHub: github.com/yourusername
  `;
  
  const blob = new Blob([demoCV], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Imesh_Rathnayake_ML_Engineer_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ... (rest of the existing JavaScript remains the same)
