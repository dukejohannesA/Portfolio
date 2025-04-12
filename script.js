let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('active')

}

window.onscroll = () => {
    menu.classList.remove('bx-x')
    navbar.classList.remove('active')

}

const typed = new Typed('.multiple-text', {
  strings: ['Electronic Enginer', 'Computer Engineer', 'Full Stack dev.', 'Software Dev.', 'Cybersecurity ethusiast', 'Embedded Engineer', 'ML Engineer'],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1200,
  loop: true,
}); 

// Loading animation
window.addEventListener('load', function() {
  setTimeout(function() {
      document.querySelector('.loader-wrapper').classList.add('fade-out');
  }, 800);
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
  });
});

// Initialize tilt effect for profile image
document.addEventListener('DOMContentLoaded', function() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (tiltElements.length > 0) {
      VanillaTilt.init(tiltElements, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.3
      });
  }
});

// Animate progress bars when scrolling to the skills section
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const progressBars = entry.target.querySelectorAll('.progress');
              progressBars.forEach(progress => {
                  progress.style.width = progress.getAttribute('data-progress');
              });
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
      observer.observe(skillsSection);
  }
});



// Contact Form with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form using fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                // Success
                formStatus.textContent = "Message sent successfully!";
                formStatus.className = "form-status success";
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                // Error
                formStatus.textContent = "Failed to send message. Please try again.";
                formStatus.className = "form-status error";
                console.error("Form submission error:", error);
            })
            .finally(() => {
                // Reset button regardless of outcome
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});
