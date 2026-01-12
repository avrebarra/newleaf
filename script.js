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
                    gsap.set(['.wedding-subtitle', '.wedding-name-1', '.wedding-and', '.wedding-name-2', '.wedding-date'], {
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
                }, 800);
            }
        } else {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        // Start music when opening invitation
        if (sectionId === 'hero2' && !isPlaying) {
            setTimeout(() => {
                bgMusic.play().catch(err => {
                    console.log('Audio play failed:', err);
                });
                isPlaying = true;
            }, 500);
        }
    }
}

// Music control
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Audio play failed:', err);
        });
        isPlaying = true;
    }
});

// Pause music when tab is inactive, resume when active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (isPlaying && !bgMusic.paused) {
            bgMusic.pause();
        }
    } else {
        if (isPlaying && bgMusic.paused) {
            bgMusic.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }
    }
});

// Location function
function openLocation() {
    window.open('https://maps.app.goo.gl/vHMNRuSapuvimdbk8', '_blank');
}

// Add to Calendar function
function addToCalendar() {
    const eventTitle = encodeURIComponent('The Wedding of Dhila & Avre');
    const eventDetails = encodeURIComponent('Resepsi Pernikahan Dhila & Avre akan diadakan di Villa Bluesteps, Jl. Boulevard No. 7, Jl. Karangjati No. RT. 07, Gedongan, Bangunjiwo, Yogyakarta');
    const location = encodeURIComponent('Villa Bluesteps, Jl. Boulevard No. 7, Jl. Karangjati No. RT. 07, Gedongan, Bangunjiwo, Yogyakarta');
    const startDate = '20260207T090000Z'; // Feb 7, 2026, 16:00 WIB = 09:00 UTC
    const endDate = '20260207T110000Z';   // Feb 7, 2026, 18:00 WIB = 11:00 UTC

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

// Prevent audio autoplay issues
window.addEventListener('load', () => {
    bgMusic.volume = 0.3; // Set volume to 30%
});
