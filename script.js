// ========================================
// TAB FUNCTIONALITY (Skills, Experience, Education)
// ========================================
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    // Remove active class from all tabs
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    // Hide all tab contents
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    // Add active class to clicked tab and show corresponding content
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Toggle active class for menu visibility
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Close the menu
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
}

// ========================================
// STICKY NAVBAR & SCROLL TO TOP BUTTON
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Add sticky class when scrolled 100px down
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
        scrollToTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('sticky');
        scrollToTopBtn.classList.remove('visible');
    }
});

// ========================================
// SCROLL TO TOP FUNCTION
// ========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// ANIMATE ON SCROLL (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========================================
// FORM SUBMISSION (Google Sheets Integration)
// ========================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbw-9PzBW5KerS7eQIx-oaO6p8uTW0T0Fir-dfJzDjM5c0yptWkV_67sCr7zAVyJ1t1B0g/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission
    
    // Send form data to Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        // Success message
        msg.innerHTML = "✅ Message sent successfully!";
        msg.style.color = "#4CAF50";
        
        // Hide message after 5 seconds
        setTimeout(function(){
            msg.innerHTML = "";
        }, 5000);
        
        // Reset form fields
        form.reset();
      })
      .catch(error => {
        // Error message
        msg.innerHTML = "❌ Error sending message. Please try again.";
        msg.style.color = "#f44336";
        console.error('Error!', error.message);
      });
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get target element
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ========================================
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Check if click is outside menu and toggle button
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ========================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ========================================
const navMenu = document.getElementById('nav-menu');
const body = document.body;

const observer2 = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
});

observer2.observe(navMenu, { attributes: true, attributeFilter: ['class'] });