import { personalInfo, skills, projects, testimonials } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  renderSkills();
  initPortfolio();
  initTestimonials();
  initScrollReveal();
  initContactForm();
  initCopyEmail();
  initScrollTop();
});

/* ----------------------------------------------------
   1. NAVBAR & MOBILE MENU & SCROLLSPY
---------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('glass-header', 'py-3');
      header.classList.remove('py-5', 'bg-transparent');
    } else {
      header.classList.remove('glass-header', 'py-3');
      header.classList.add('py-5', 'bg-transparent');
    }

    // Scrollspy for active nav link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-accent-cyan', 'font-semibold');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-accent-cyan', 'font-semibold');
        link.classList.remove('text-slate-400');
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `<svg class="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = `<svg class="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
      }
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `<svg class="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      });
    });
  }
}

/* ----------------------------------------------------
   2. HERO TYPING EFFECT
---------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const titles = [
    "WordPress Developer",
    "PHP Developer",
    "Python Developer",
    "Server Admin"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ----------------------------------------------------
   3. SKILLS SHOWCASE RENDER
---------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skills.map(group => `
    <div class="glass-card p-6 reveal-on-scroll hover:border-indigo-500/40">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-3 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
          ${group.icon}
        </div>
        <h3 class="text-xl font-bold text-white tracking-wide">${group.category}</h3>
      </div>
      <div class="space-y-4">
        ${group.items.map(item => `
          <div>
            <div class="flex justify-between items-center mb-1 text-sm font-medium">
              <span class="text-slate-300 flex items-center gap-2">
                <span>${item.icon}</span> ${item.name}
              </span>
              <span class="text-accent-cyan text-xs font-semibold">${item.level}%</span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800/80">
              <div class="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out" style="width: ${item.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ----------------------------------------------------
   4. PORTFOLIO FILTERING & MODAL
---------------------------------------------------- */
let currentCategory = 'all';

function initPortfolio() {
  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  if (!grid) return;

  function renderProjects(category = 'all') {
    const filtered = category === 'all' 
      ? projects 
      : projects.filter(p => p.categoryKey === category);

    grid.innerHTML = filtered.map(project => `
      <div class="glass-card glass-card-hover group overflow-hidden flex flex-col reveal-on-scroll border border-slate-800/90 hover:border-indigo-500/50">
        <div class="relative overflow-hidden aspect-video bg-slate-900">
          <img 
            src="${project.image}" 
            alt="${project.title}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
          <span class="absolute top-4 right-4 glass-pill border-indigo-500/30 text-indigo-300">
            ${project.category}
          </span>
        </div>
        
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors mb-2">
              ${project.title}
            </h3>
            <p class="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
              ${project.description}
            </p>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${project.tags.map(tag => `
                <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  ${tag}
                </span>
              `).join('')}
            </div>

            <button 
              data-project-id="${project.id}" 
              class="open-modal-btn w-full py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-indigo-600/30 border border-slate-700/80 hover:border-indigo-400 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>Explore Details</span>
              <svg class="w-4 h-4 text-accent-cyan transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Re-bind modal click handlers
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-project-id');
        openProjectModal(id);
      });
    });

    initScrollReveal();
  }

  // Initial render
  renderProjects('all');

  // Filter tab events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/20');
        b.classList.add('bg-slate-900/60', 'text-slate-400', 'hover:text-slate-200');
      });

      e.currentTarget.classList.remove('bg-slate-900/60', 'text-slate-400', 'hover:text-slate-200');
      e.currentTarget.classList.add('bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/20');

      const cat = e.currentTarget.getAttribute('data-filter');
      renderProjects(cat);
    });
  });
}

function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative overflow-hidden rounded-t-2xl aspect-video bg-slate-900">
      <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
    </div>
    
    <div class="p-6 md:p-8">
      <div class="flex items-center justify-between gap-4 mb-3">
        <span class="glass-pill border-indigo-500/40 text-accent-cyan font-semibold">
          ${project.category}
        </span>
      </div>

      <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">
        ${project.title}
      </h2>

      <p class="text-slate-300 text-base leading-relaxed mb-6">
        ${project.description}
      </p>

      <div class="mb-6">
        <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Key Highlights & Architecture</h4>
        <ul class="space-y-2">
          ${project.highlights.map(h => `
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <svg class="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="mb-8">
        <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Technologies Used</h4>
        <div class="flex flex-wrap gap-2">
          ${project.tags.map(t => `
            <span class="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-3 border-t border-slate-800/80 pt-6">
        <a href="${project.demoUrl}" target="_blank" class="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25">
          <span>View Live Demo</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
        <a href="${project.githubUrl}" target="_blank" class="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>Source Code</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  // Close handlers
  const closeBtn = document.getElementById('close-modal-btn');
  const backdrop = document.getElementById('modal-backdrop');

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;
}

/* ----------------------------------------------------
   5. TESTIMONIALS CAROUSEL
---------------------------------------------------- */
function initTestimonials() {
  const container = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!container) return;

  let currentIndex = 0;

  function renderTestimonials() {
    container.innerHTML = testimonials.map((t, index) => `
      <div class="testimonial-slide min-w-full px-2 transition-transform duration-500 ease-out">
        <div class="glass-card p-8 md:p-10 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between h-full">
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <div class="flex items-center gap-1 text-amber-400 mb-6">
              ${Array(t.rating).fill(0).map(() => `
                <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              `).join('')}
            </div>

            <p class="text-slate-200 text-lg md:text-xl font-normal leading-relaxed italic mb-8">
              "${t.quote}"
            </p>
          </div>

          <div class="flex items-center gap-4 pt-6 border-t border-slate-800/80">
            <img src="${t.avatar}" alt="${t.name}" class="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/40 shadow-md" />
            <div>
              <h4 class="text-white font-bold text-base">${t.name}</h4>
              <p class="text-slate-400 text-xs">${t.role} · <span class="text-indigo-400">${t.company}</span></p>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    renderDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = testimonials.map((_, i) => `
      <button 
        data-slide="${i}" 
        class="w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent-cyan w-8' : 'bg-slate-700 hover:bg-slate-500'}"
      ></button>
    `).join('');

    dotsContainer.querySelectorAll('button').forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.currentTarget.getAttribute('data-slide'));
        updateSlider();
      });
    });
  }

  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    renderDots();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    });
  }

  renderTestimonials();
}

/* ----------------------------------------------------
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
---------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
   7. CONTACT FORM VALIDATION & TOAST
---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    // Submit animation simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg class="animate-spin w-5 h-5 text-white mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast('Thank you! Your message has been sent successfully.', 'success');
    }, 1200);
  });

  function showToast(msg, type = 'success') {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-message');
    if (toastText) toastText.textContent = msg;

    toast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
  }
}

/* ----------------------------------------------------
   8. COPY EMAIL TO CLIPBOARD
---------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = personalInfo.email;
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      const tooltip = copyBtn.querySelector('.copy-tooltip');
      if (tooltip) {
        tooltip.textContent = 'Copied!';
        setTimeout(() => tooltip.textContent = 'Copy Email', 2000);
      }
    });
  });
}

/* ----------------------------------------------------
   9. SCROLL TO TOP BUTTON
---------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('hidden', 'opacity-0');
      scrollTopBtn.classList.add('flex', 'opacity-100');
    } else {
      scrollTopBtn.classList.add('opacity-0');
      setTimeout(() => {
        if (window.scrollY <= 400) scrollTopBtn.classList.add('hidden');
      }, 300);
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
