/* ========================================
   MATH WITH WINNY — Portfolio Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Initialize Lucide Icons ----
    lucide.createIcons();

    // ---- Mobile Menu Toggle ----
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Stagger children bento cards
                const cards = entry.target.querySelectorAll('.bento-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Counter Animation ----
    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    const statItems = document.querySelectorAll('.stat-item');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statEl = entry.target.querySelector('.stat-number');
                const target = parseInt(statEl.dataset.target);
                animateCounter(statEl, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => counterObserver.observe(item));

    // ---- Contact Form Submit ----
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `<span class="flex items-center gap-2">Sent! ✨
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg></span>`;
        btn.classList.remove('from-brand-pink', 'to-brand-purple');
        btn.classList.add('bg-brand-green');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.add('from-brand-pink', 'to-brand-purple');
            btn.classList.remove('bg-brand-green');
            contactForm.reset();
            lucide.createIcons();
        }, 2500);
    });

    // ---- Smooth Scroll for Nav Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Parallax on Floating Shapes ----
    let rafId = null;
    window.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const shapes = document.querySelectorAll('.shape-3d');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            shapes.forEach((shape, i) => {
                const speed = (i + 1) * 4;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    });

});
