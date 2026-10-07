
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIcon = menuToggle.querySelector('i');
const header = document.getElementById('main-header');
const navItems = document.querySelectorAll('.nav-item');


menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');


    if (navLinks.classList.contains('mobile-active')) {
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


navItems.forEach(item => {
    item.addEventListener('click', function () {

        navItems.forEach(nav => nav.classList.remove('active'));


        this.classList.add('active');


        navLinks.classList.remove('mobile-active');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
});





document.getElementById('newsletterForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('newsletterEmail');
    const emailValue = emailInput.value.trim();


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {

        showMessage("Please enter your email address.", "msg-error");
    } else if (!emailPattern.test(emailValue)) {

        showMessage("Please enter a valid email address.", "msg-error");
    } else {

        showMessage("Thank you for subscribing!", "msg-success");
        emailInput.value = "";
    }
});


function showMessage(message, className) {
    const messageDiv = document.getElementById('newsletterMsg');


    messageDiv.textContent = message;
    messageDiv.className = `form-msg ${className}`;


    setTimeout(() => {
        messageDiv.className = 'form-msg';
        window.location.href ='404.html'
    }, 400);
}





document.addEventListener("DOMContentLoaded", () => {
    
    const loaderOverlay = document.getElementById('cyber-loader');
    const barFill = document.getElementById('loader-bar');
    const percentageText = document.getElementById('loader-percentage');
    const statusText = document.getElementById('loader-status-text');

   
    const loadingMessages = [
        "INITIALIZING NEURAL LINK...",
        "DECRYPTING SECURE DATA...",
        "CONNECTING TO GLOBAL SERVERS...",
        "LOADING HIGH-RES ASSETS...",
        "BYPASSING FIREWALLS...",
        "ACCESS GRANTED!"
    ];

    let progress = 0;
    
  
    let loadingInterval = setInterval(() => {
      
        progress += Math.floor(Math.random() * 7) + 2; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            
            statusText.innerText = loadingMessages[5];
            statusText.style.color = "#00ff9d"; // Changes to Neon Green
            statusText.style.textShadow = "0 0 15px #00ff9d";

         
            setTimeout(() => {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }, 800); 
        }

        
        barFill.style.width = progress + "%";
        percentageText.innerText = progress + "%";

       
        if (progress > 0 && progress < 20) {
            statusText.innerText = loadingMessages[0];
        } else if (progress >= 20 && progress < 40) {
            statusText.innerText = loadingMessages[1];
        } else if (progress >= 40 && progress < 60) {
            statusText.innerText = loadingMessages[2];
        } else if (progress >= 60 && progress < 85) {
            statusText.innerText = loadingMessages[3];
        } else if (progress >= 85 && progress < 100) {
            statusText.innerText = loadingMessages[4];
        }

    }, 150); 
});