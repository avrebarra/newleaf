// Smooth scroll functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Enable scrolling when opening invitation
        if (sectionId === 'hero2') {
            document.body.classList.add('opened');
            document.body.classList.remove('overflow-hidden');

            // Animate out hero section with GSAP
            const hero1 = document.getElementById('hero');
            const heroWedding = document.getElementById('hero-wedding');

            if (hero1) {
                gsap.to(hero1, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        hero1.style.display = 'none';

                        // Scroll to wedding section immediately after hiding hero
                        if (heroWedding) {
                            heroWedding.scrollIntoView({ behavior: 'smooth' });
                        }

                        // Refresh ScrollTrigger after layout change
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 100);
                    }
                });
            }

            // Animate in hero-wedding section
            if (heroWedding) {
                // Set initial state only once
                if (!heroWedding.dataset.animated) {
                    gsap.set(['.wedding-subtitle', '.wedding-name-1', '.wedding-and', '.wedding-name-2', '.wedding-date', '.wedding-countdown'], {
                        opacity: 0,
                        y: 30
                    });
                    heroWedding.dataset.animated = 'true';
                }

                setTimeout(() => {
                    // Animate elements in with stagger
                    gsap.to('.wedding-subtitle', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.3,
                        ease: 'power2.out'
                    });
                    gsap.to('.wedding-name-1', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 0.6,
                        ease: 'power2.out'
                    });
                    gsap.to('.wedding-and', {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 1.2,
                        ease: 'power2.out'
                    });
                    gsap.to('.wedding-name-2', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 1.5,
                        ease: 'power2.out'
                    });
                    gsap.to('.wedding-date', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 2.1,
                        ease: 'power2.out'
                    });
                    gsap.to('.wedding-countdown', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 2.4,
                        ease: 'power2.out'
                    });
                }, 800);
            }
        } else {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        // Start music when opening invitation
        if (sectionId === 'hero2' && !isPlaying && soundCloudWidget) {
            setTimeout(() => {
                soundCloudWidget.play();
                isPlaying = true;
                musicToggle.style.opacity = '1';
            }, 500);
        }
    }
}

// Music control
let isPlaying = false;
const bgMusicContainer = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let soundCloudWidget = null;

// Initialize SoundCloud widget when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.SC) {
        const iframe = bgMusicContainer.querySelector('iframe');
        soundCloudWidget = SC.Widget(iframe);

        soundCloudWidget.bind(SC.Widget.Events.READY, () => {
            soundCloudWidget.setVolume(50); // Set volume to 50%
        });
    }
});

musicToggle.addEventListener('click', () => {
    if (soundCloudWidget) {
        if (isPlaying) {
            soundCloudWidget.pause();
            isPlaying = false;
            musicToggle.style.opacity = '0.5';
        } else {
            soundCloudWidget.play();
            isPlaying = true;
            musicToggle.style.opacity = '1';
        }
    }
});

// Pause music when tab is inactive, resume when active
document.addEventListener('visibilitychange', () => {
    if (soundCloudWidget) {
        if (document.hidden && isPlaying) {
            soundCloudWidget.pause();
        } else if (!document.hidden && isPlaying) {
            soundCloudWidget.play();
        }
    }
});

// Location function
function openLocation() {
    window.open('https://maps.app.goo.gl/hCq6YvtACDPix4ba9', '_blank');
}

// Add to Calendar function
function addToCalendar() {
    const eventTitle = encodeURIComponent('The Wedding of Dhila & Avre');
    const eventDetails = encodeURIComponent('Resepsi Pernikahan Fadhila Auliya Widiaputri & Avreghly Barra Al-Ilman. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir memberikan doa dan restu. Lokasi: Hall Rumah Makan Primarasa, Lantai 2, Jl. Ahmad Yani No.166, Gayungan, Surabaya, Jawa Timur 60235');
    const location = encodeURIComponent('Hall Rumah Makan Primarasa, Lantai 2, Jl. Ahmad Yani No.166, Gayungan, Kec. Gayungan, Surabaya, Jawa Timur 60235');
    const startDate = '20260207T030000Z'; // Feb 7, 2026, 10:00 WIB = 03:00 UTC
    const endDate = '20260207T043000Z';   // Feb 7, 2026, 11:30 WIB = 04:30 UTC

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${location}&ctz=Asia/Jakarta`;

    window.open(calendarUrl, '_blank');
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is not at the top (e.g., after refresh while scrolled)
    if (window.scrollY > 0) {
        document.body.classList.remove('overflow-hidden');
    }

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Show hero elements immediately without animation
    gsap.set(['.hero-greeting', '.hero-title', '.hero-note', '.hero-button'], {
        opacity: 1,
        y: 0
    });

    // Button hover animation
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('mouseenter', () => {
            gsap.to(heroButton, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
        });
        heroButton.addEventListener('mouseleave', () => {
            gsap.to(heroButton, { scale: 1, duration: 0.4, ease: 'power2.out' });
        });
    }

    // === MUSIC TOGGLE BUTTON ===
    gsap.to('#musicToggle', {
        opacity: 1,
        duration: 0.6,
        delay: 1.2,
        ease: 'power2.out'
    });

    // === SCROLL-TRIGGERED ANIMATIONS ===
    // Scroll-tied animations that progress with scroll position
    const scrollSections = [
        { selector: '.bismillah-img, .quran-verse, .quran-reference', trigger: '#hero2' },
        { selector: '.wedding-subtitle, .wedding-name-1, .wedding-and, .wedding-name-2, .wedding-date', trigger: '#hero-wedding' },
        { selector: '.couple-intro, .couple-name-bride, .couple-and, .couple-name-groom, .couple-invitation', trigger: '#couple-names' },
        { selector: '.bride-label, .bride-name, .bride-subtitle, .bride-parents, .bride-social', trigger: '#bride' },
        { selector: '.groom-label, .groom-name, .groom-subtitle, .groom-parents, .groom-social', trigger: '#groom' },
        { selector: '.event-title, .event-card, .event-date, .event-time, .event-venue, .event-address', trigger: '#event' },
        { selector: '.quote-text', trigger: '#quote-separator' },
        { selector: '.closing-title, .closing-message, .closing-note, .closing-from, .closing-names, .closing-family', trigger: '#closing' }
    ];

    scrollSections.forEach(({ selector, trigger }) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((element) => {
            gsap.to(element, {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top bottom',
                    end: 'top 60%',
                    scrub: 0.5
                }
            });
        });
    });

    // Photo footer with subtle zoom
    gsap.to('#photo-footer img', {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '#photo-footer',
            start: 'top bottom',
            end: 'top 70%',
            scrub: 0.5
        }
    });

    // General scroll fade up elements
    gsap.utils.toArray('.scroll-fade-up').forEach((element) => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'top 70%',
                scrub: 0.5
            }
        });
    });
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('February 7, 2026 08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Wedding day has arrived
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Prevent audio autoplay issues
window.addEventListener('load', () => {
    bgMusic.volume = 0.3; // Set volume to 30%
});
