// --- LÓGICA DO CARROSSEL DE IMAGENS ---
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");
    if (!slides.length || !dots.length) return;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("fade");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("fade");
    dots[slideIndex-1].className += " active-dot";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetInterval();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetInterval();
}

function autoSlides() {
    plusSlides(1);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlides, 5000);
}

// --- ANIMAÇÃO DE REVELAÇÃO AO ROLAR ---
function reveal() {
    const sections = document.querySelectorAll('.reveal-section');
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
}

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", function() {
    // Inicia o carrossel
    if (document.getElementsByClassName("carousel-slide").length > 0) {
        showSlides(slideIndex);
        slideInterval = setInterval(autoSlides, 5000);
    }

    // Scroll reveal
    window.addEventListener('scroll', reveal);
    reveal();
    
    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});