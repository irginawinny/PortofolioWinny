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

    if (menuBtn && closeMenuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
        closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

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
                if (statEl && statEl.dataset.target) {
                    const target = parseInt(statEl.dataset.target);
                    animateCounter(statEl, target);
                    counterObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => counterObserver.observe(item));

    // ---- Contact Form Submit ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
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
    }

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

    // ========================================
    //  REUSABLE MODAL SYSTEM
    // ========================================

    /**
     * Open a project detail modal with image gallery
     * @param {Object} project - { title, description, images[], technologies[], links[{label, url}] }
     */
    window.openProjectModal = function(project) {
        let currentIndex = 0;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'projectModal';

        const galleryDotsHTML = project.images.length > 1
            ? `<div class="gallery-dots">${project.images.map((_, i) =>
                `<button class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to image ${i+1}"></button>`
              ).join('')}</div>`
            : '';

        const galleryNavHTML = project.images.length > 1
            ? `<button class="gallery-nav prev" aria-label="Previous image">‹</button>
               <button class="gallery-nav next" aria-label="Next image">›</button>`
            : '';

        const techHTML = project.technologies && project.technologies.length > 0
            ? `<div style="margin-top:1.25rem;">
                <h4 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#C1E8FF;margin-bottom:0.5rem;">
                    ${project.techLabel || 'Technologies Used'}
                </h4>
                <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
                    ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
              </div>`
            : '';
            
        const pubHTML = project.publication
            ? `<div style="margin-top:1.25rem;">
                <h4 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#C1E8FF;margin-bottom:0.5rem;">
                    ${project.publication.title}
                </h4>
                <p style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.7;">${project.publication.desc}</p>
              </div>`
            : '';

        const linksHTML = project.links && project.links.length > 0
            ? `<div style="margin-top:1.25rem;display:flex;flex-wrap:wrap;gap:0.5rem;">
                ${project.links.map(l =>
                    `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="ext-link-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        ${l.label}
                    </a>`
                ).join('')}
              </div>`
            : '';

        overlay.innerHTML = `
            <div class="modal-content" style="padding:1.5rem;">
                <button class="modal-close" aria-label="Close modal">✕</button>
                <div class="gallery-container">
                    <img src="${project.images[0]}" alt="${project.title}" id="galleryImg">
                    ${galleryNavHTML}
                </div>
                ${galleryDotsHTML}
                <div style="padding:0.5rem 0 0;">
                    <h3 style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.35rem;color:#ffffff;margin-bottom:0.5rem;">${project.title}</h3>
                    <p style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.7;">${project.description}</p>
                    ${techHTML}
                    ${pubHTML}
                    ${linksHTML}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Gallery navigation
        const img = overlay.querySelector('#galleryImg');
        const dots = overlay.querySelectorAll('.gallery-dot');

        function showImage(index) {
            currentIndex = index;
            img.src = project.images[currentIndex];
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        const prevBtn = overlay.querySelector('.gallery-nav.prev');
        const nextBtn = overlay.querySelector('.gallery-nav.next');
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage((currentIndex - 1 + project.images.length) % project.images.length); });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage((currentIndex + 1) % project.images.length); });
        dots.forEach(dot => dot.addEventListener('click', (e) => { e.stopPropagation(); showImage(parseInt(dot.dataset.index)); }));

        // Close handlers
        function closeModal() {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        overlay.querySelector('.modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
        });
    };

    /**
     * Open a simple image lightbox (single image or gallery)
     * @param {string[]} images - Array of image URLs
     * @param {number} startIndex - Which image to show first
     */
    window.openLightbox = function(images, startIndex = 0) {
        let currentIndex = startIndex;
        const isGallery = images.length > 1;

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const navHTML = isGallery
            ? `<button class="lightbox-nav prev" aria-label="Previous">‹</button>
               <button class="lightbox-nav next" aria-label="Next">›</button>`
            : '';

        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close">✕</button>
            ${navHTML}
            <img src="${images[currentIndex]}" alt="Preview" id="lightboxImg">
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => overlay.classList.add('active'));

        const img = overlay.querySelector('#lightboxImg');

        function showImage(index) {
            currentIndex = index;
            img.src = images[currentIndex];
        }

        if (isGallery) {
            overlay.querySelector('.lightbox-nav.prev').addEventListener('click', (e) => {
                e.stopPropagation();
                showImage((currentIndex - 1 + images.length) % images.length);
            });
            overlay.querySelector('.lightbox-nav.next').addEventListener('click', (e) => {
                e.stopPropagation();
                showImage((currentIndex + 1) % images.length);
            });
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', escHandler); }
        });
    };

    /**
     * Open an experience detail modal
     * @param {Object} exp - { title, role, period, description, skills[], images[] }
     */
    window.openExperienceModal = function(exp) {
        let currentIndex = 0;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        const hasImages = exp.images && exp.images.length > 0;

        let galleryHTML = '';
        if (hasImages) {
            const navHTML = exp.images.length > 1
                ? `<button class="gallery-nav prev" aria-label="Previous">‹</button>
                   <button class="gallery-nav next" aria-label="Next">›</button>`
                : '';
            const dotsHTML = exp.images.length > 1
                ? `<div class="gallery-dots">${exp.images.map((_, i) =>
                    `<button class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Image ${i+1}"></button>`
                  ).join('')}</div>`
                : '';
            galleryHTML = `
                <div class="gallery-container">
                    <img src="${exp.images[0]}" alt="${exp.title}" id="expGalleryImg">
                    ${navHTML}
                </div>
                ${dotsHTML}
            `;
        }

        const skillsHTML = exp.skills && exp.skills.length > 0
            ? `<div style="margin-top:1.25rem;">
                <h4 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#C1E8FF;margin-bottom:0.5rem;">Skills</h4>
                <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
                    ${exp.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                </div>
              </div>`
            : '';

        overlay.innerHTML = `
            <div class="modal-content" style="padding:1.5rem;">
                <button class="modal-close" aria-label="Close">✕</button>
                ${galleryHTML}
                <div style="padding:0.5rem 0 0;">
                    <h3 style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.35rem;color:#ffffff;margin-bottom:0.25rem;">${exp.title}</h3>
                    ${exp.role ? `<p style="font-size:14px;color:#C1E8FF;margin-bottom:0.15rem;">${exp.role}</p>` : ''}
                    ${exp.period ? `<p style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:0.75rem;">${exp.period}</p>` : ''}
                    <p style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.7;">${exp.description}</p>
                    ${skillsHTML}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Gallery navigation (if images exist)
        if (hasImages && exp.images.length > 1) {
            const img = overlay.querySelector('#expGalleryImg');
            const dots = overlay.querySelectorAll('.gallery-dot');

            function showImg(i) {
                currentIndex = i;
                img.src = exp.images[currentIndex];
                dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));
            }

            const prevBtn = overlay.querySelector('.gallery-nav.prev');
            const nextBtn = overlay.querySelector('.gallery-nav.next');
            if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImg((currentIndex - 1 + exp.images.length) % exp.images.length); });
            if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImg((currentIndex + 1) % exp.images.length); });
            dots.forEach(d => d.addEventListener('click', (e) => { e.stopPropagation(); showImg(parseInt(d.dataset.index)); }));
        }

        function closeModal() {
            overlay.classList.remove('active');
            setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
        }

        overlay.querySelector('.modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
        });
    };

});
