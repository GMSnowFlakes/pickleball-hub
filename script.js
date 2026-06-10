/* =====================================================
   PICKLEBALL HUB V3.0
   script.js

   Mobile Menu
   Header Effects
   Smooth Scroll
   Reveal Animations
   Counter Animation
   Floating Ball Parallax
   Active Navigation
   Events Tabs
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    initFloatingBall();
    initActiveNav();
    initEventsTabs();

});

/* =====================================================
   HEADER SCROLL
===================================================== */

function initHeaderScroll(){

    const header =
        document.querySelector('.header');

    if(!header) return;

    window.addEventListener('scroll', () => {

        if(window.scrollY > 50){

            header.style.background =
                'rgba(11,7,20,.95)';

            header.style.boxShadow =
                '0 10px 40px rgba(0,0,0,.25)';

        }else{

            header.style.background =
                'rgba(11,7,20,.55)';

            header.style.boxShadow =
                'none';
        }

    });

}

/* =====================================================
   MOBILE MENU
   Fix: use existing HTML element, don't create a duplicate
===================================================== */

function initMobileMenu(){

    const button =
        document.getElementById('mobileToggle');

    const menu =
        document.getElementById('mobileMenu');

    if(!button || !menu) return;

    button.addEventListener('click', () => {

        const isOpen = menu.classList.toggle('active');

        button.setAttribute(
            'aria-label',
            isOpen ? 'Close Menu' : 'Open Menu'
        );

        button.querySelector('i').className =
            isOpen ? 'ri-close-line' : 'ri-menu-line';

    });

    menu.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            menu.classList.remove('active');

            button.setAttribute('aria-label', 'Open Menu');

            button.querySelector('i').className =
                'ri-menu-line';

        });

    });

}

/* =====================================================
   SMOOTH SCROLL
===================================================== */

function initSmoothScroll(){

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                'click',
                function(e){

                    const targetId =
                        this.getAttribute('href');

                    if(targetId === '#') return;

                    const target =
                        document.querySelector(targetId);

                    if(!target) return;

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior:'smooth',
                        block:'start'
                    });

                }
            );

        });

}

/* =====================================================
   REVEAL ANIMATIONS
   Fix: use actual class names from the HTML
===================================================== */

function initRevealAnimations(){

    const elements = document.querySelectorAll(
        '.why-card, .journey-step, .feature-box, ' +
        '.event-item, .community-grid, .stat-box, ' +
        '.membership-card, .built-image, .events-image, ' +
        '.journey-card, .numbers-card, .community-card'
    );

    elements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(

        entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('active');
                }
            });
        },
        { threshold: .12 }

    );

    elements.forEach(el => observer.observe(el));

}

/* =====================================================
   COUNTER ANIMATION
   Fix: use actual selector .stat-box span
===================================================== */

function initCounters(){

    const stats =
        document.querySelectorAll('.stat-box span');

    if(!stats.length) return;

    const observer = new IntersectionObserver(

        entries => {
            entries.forEach(entry => {

                if(!entry.isIntersecting) return;

                const el       = entry.target;
                const original = el.textContent.trim();
                const number   = parseInt(
                    original.replace(/\D/g,'')
                );

                if(!isNaN(number)){
                    animateCounter(el, number, original);
                }

                observer.unobserve(el);

            });
        },
        { threshold: .5 }

    );

    stats.forEach(stat => observer.observe(stat));

}

function animateCounter(element, target, original){

    let current  = 0;
    const duration  = 1800;
    const increment = target / (duration / 16);
    const hasPlusSign = original.includes('+');

    const timer = setInterval(() => {

        current += increment;

        if(current >= target){
            current = target;
            clearInterval(timer);
        }

        element.textContent = hasPlusSign
            ? Math.floor(current) + '+'
            : Math.floor(current);

    }, 16);

}

/* =====================================================
   EVENTS TABS
   Fix: add click interactivity to tab switching
===================================================== */

const eventsData = {
    TODAY: [
        { month:'JUN', day:'06', title:'Social Play Open Gym',   time:'6:00 PM – 9:00 PM' },
        { month:'JUN', day:'06', title:'Beginner Drop-In',        time:'10:00 AM – 12:00 PM' },
    ],
    'THIS WEEK': [
        { month:'JUN', day:'07', title:'DUPR League Night',       time:'7:00 PM – 10:00 PM' },
        { month:'JUN', day:'08', title:'Advanced Clinic',         time:'9:00 AM – 11:00 AM' },
        { month:'JUN', day:'09', title:'Mixed Doubles Social',    time:'5:00 PM – 8:00 PM' },
    ],
    'THIS MONTH': [
        { month:'JUN', day:'14', title:'Round Robin Tournament',  time:'9:00 AM – 4:00 PM' },
        { month:'JUN', day:'21', title:'Family Fun Day',          time:'10:00 AM – 2:00 PM' },
        { month:'JUN', day:'28', title:'Skills Challenge',        time:'1:00 PM – 5:00 PM' },
    ],
    TOURNAMENTS: [
        { month:'JUL', day:'04', title:'Independence Smash Open', time:'8:00 AM – 6:00 PM' },
        { month:'AUG', day:'10', title:'Summer Championship',     time:'8:00 AM – 6:00 PM' },
    ],
    CLINICS: [
        { month:'JUN', day:'08', title:'Advanced Clinic',         time:'9:00 AM – 11:00 AM' },
        { month:'JUN', day:'15', title:'Beginner Bootcamp',       time:'10:00 AM – 12:00 PM' },
        { month:'JUN', day:'22', title:'Dinking Masterclass',     time:'2:00 PM – 4:00 PM' },
    ],
};

function initEventsTabs(){

    const tabs = document.querySelectorAll('.events-tabs span');
    const list = document.querySelector('.events-list');

    if(!tabs.length || !list) return;

    tabs.forEach(tab => {

        tab.style.cursor = 'pointer';

        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.textContent.trim();
            const events = eventsData[key] || [];

            list.innerHTML = events.map(ev => `
                <div class="event-item">
                    <div class="event-date">
                        <span>${ev.month}</span>
                        <strong>${ev.day}</strong>
                    </div>
                    <div class="event-info">
                        <h4>${ev.title}</h4>
                        <span>${ev.time}</span>
                    </div>
                    <a href="#" class="event-link">JOIN</a>
                </div>
            `).join('');

        });

    });

}

/* =====================================================
   FLOATING PICKLEBALL
===================================================== */

function initFloatingBall(){

    const ball = document.querySelector('.hero-ball');

    if(!ball) return;
    if(window.innerWidth < 992) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', e => {

        mouseX = (e.clientX / window.innerWidth)  - .5;
        mouseY = (e.clientY / window.innerHeight) - .5;

    });

    function animate(){

        currentX += ((mouseX * 30) - currentX) * .06;
        currentY += ((mouseY * 30) - currentY) * .06;

        ball.style.transform =
            `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);

    }

    animate();

}

/* =====================================================
   ACTIVE NAV
===================================================== */

function initActiveNav(){

    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {

        let current = '';

        sections.forEach(section => {

            const top    = section.offsetTop - 150;
            const height = section.offsetHeight;

            if(
                window.scrollY >= top &&
                window.scrollY <  top + height
            ){
                current = section.getAttribute('id');
            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            if(link.getAttribute('href') === '#' + current){
                link.classList.add('active');
            }

        });

    });

}

/* =====================================================
   CONTACT FORM
===================================================== */

function handleFormSubmit(e){

    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');

    const original = btn.innerHTML;

    btn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    btn.disabled = true;

    setTimeout(() => {

        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;

        e.target.reset();

    }, 3000);

}

/* =====================================================
   REDUCED MOTION SUPPORT
===================================================== */

if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('reduced-motion');
}

/* =====================================================
   DEBUG
===================================================== */

console.log('🏓 Pickleball Hub V3.0 Loaded');