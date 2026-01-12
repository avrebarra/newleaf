// Smooth scroll functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Music control
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicText = musicToggle.querySelector('.music-text');

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicText.textContent = 'Music Off';
        isPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Audio play failed:', err);
        });
        musicText.textContent = 'Music On';
        isPlaying = true;
    }
});

// Location function
function openLocation() {
    // Placeholder - replace with actual Google Maps link
    alert('Google Maps link would open here');
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Make first section visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Prevent audio autoplay issues
window.addEventListener('load', () => {
    bgMusic.volume = 0.3; // Set volume to 30%
});
