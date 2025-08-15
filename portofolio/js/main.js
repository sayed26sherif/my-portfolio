/*
  Sayed Sherif – Portfolio Scripts (Professional Edition)
  - Advanced theme toggle with smooth transitions
  - Enhanced typing effect with multiple roles
  - Professional scroll animations and effects
  - Statistics counter with smooth animations
  - Advanced AOS configuration
  - Performance optimizations
  - Interactive elements and micro-interactions
  - Enhanced particle system
  - Smooth parallax effects
*/

(function () {
  'use strict';

  // Enhanced Configuration
  const CONFIG = {
    THEME_KEY: 'preferred-theme',
    TYPING_SPEED: 45,
    ERASING_SPEED: 25,
    HOLD_DURATION: 2000,
    SCROLL_THRESHOLD: 500,
    AOS_DURATION: 1000,
    AOS_OFFSET: 30,
    PARTICLE_COUNT: 75,
    PARALLAX_SPEED: 0.5,
    CURSOR_FOLLOW_SPEED: 0.1
  };

  // Enhanced DOM Elements
  const elements = {
    body: document.body,
    themeToggle: document.getElementById('themeToggle'),
    themeToggleIcon: null,
    scrollTopBtn: document.getElementById('scrollTopBtn'),
    yearSpan: document.getElementById('year'),
    typedElement: document.getElementById('typed-text'),
    progressBar: null,
    particlesContainer: null,
    cursor: null
  };

  // Enhanced State management
  const state = {
    currentTheme: 'dark',
    isTyping: false,
    scrollProgress: 0,
    particles: [],
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    isScrolling: false
  };

  // Initialize theme toggle icon reference
  if (elements.themeToggle) {
    elements.themeToggleIcon = elements.themeToggle.querySelector('i');
  }

  // Enhanced Theme Management
  class ThemeManager {
    constructor() {
      this.init();
    }

    init() {
      this.loadTheme();
      this.bindEvents();
      this.updateThemeIcon();
      this.addThemeTransition();
    }

    loadTheme() {
      try {
        const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
        if (savedTheme === 'light') {
          this.setTheme('light');
        }
      } catch (error) {
        console.warn('Could not load theme preference:', error);
      }
    }

    setTheme(theme) {
      state.currentTheme = theme;
      elements.body.classList.toggle('light-theme', theme === 'light');
      
      // Add theme change animation
      this.animateThemeChange();
      
      try {
        localStorage.setItem(CONFIG.THEME_KEY, theme);
      } catch (error) {
        console.warn('Could not save theme preference:', error);
      }
    }

    toggleTheme() {
      const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      this.updateThemeIcon();
      
      // Enhanced smooth transition effect
      elements.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => {
        elements.body.style.transition = '';
      }, 800);
    }

    updateThemeIcon() {
      if (!elements.themeToggleIcon) return;
      
      const isLight = state.currentTheme === 'light';
      elements.themeToggleIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      
      // Add icon animation
      elements.themeToggleIcon.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(() => {
        elements.themeToggleIcon.style.transform = 'rotate(0deg) scale(1)';
      }, 300);
    }

    addThemeTransition() {
      const style = document.createElement('style');
      style.textContent = `
        * {
          transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `;
      document.head.appendChild(style);
    }

    animateThemeChange() {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: var(--gradient-primary);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0.3;
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '200vw';
        ripple.style.height = '200vh';
        ripple.style.opacity = '0';
      }, 50);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    }

    bindEvents() {
      elements.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }
  }

  // Enhanced Typing Effect Manager
  class TypingEffect {
    constructor() {
      this.roles = [
        'Software Engineer',
        'Full Stack .NET Web Developer',
        'ASP.NET Core Specialist',
        'Clean Architecture Advocate',
        'Performance Optimization Expert',
        'Cloud Solutions Architect',
        'UI/UX Enthusiast',
        'Problem Solver'
      ];
      
      this.currentRoleIndex = 0;
      this.currentCharIndex = 0;
      this.isErasing = false;
      this.isActive = false;
      this.typingSound = null;
      
      this.init();
    }

    init() {
      if (!elements.typedElement) return;
      
      // Start typing after a delay for better UX
      setTimeout(() => this.start(), 1000);
      this.createTypingSound();
    }

    createTypingSound() {
      // Create subtle typing sound effect
      this.typingSound = new Audio();
      this.typingSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }

    start() {
      this.isActive = true;
      this.typeLoop();
    }

    stop() {
      this.isActive = false;
    }

    typeLoop() {
      if (!this.isActive) return;

      const currentRole = this.roles[this.currentRoleIndex];
      
      if (!this.isErasing) {
        // Typing phase
        elements.typedElement.textContent = currentRole.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        
        // Add typing sound effect
        this.playTypingSound();
        
        if (this.currentCharIndex === currentRole.length) {
          this.isErasing = true;
          setTimeout(() => this.typeLoop(), CONFIG.HOLD_DURATION);
          return;
        }
        
        setTimeout(() => this.typeLoop(), CONFIG.TYPING_SPEED);
      } else {
        // Erasing phase
        elements.typedElement.textContent = currentRole.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        
        if (this.currentCharIndex === 0) {
          this.isErasing = false;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          setTimeout(() => this.typeLoop(), 500);
          return;
        }
        
        setTimeout(() => this.typeLoop(), CONFIG.ERASING_SPEED);
      }
    }

    playTypingSound() {
      if (this.typingSound) {
        this.typingSound.currentTime = 0;
        this.typingSound.play().catch(() => {});
      }
    }
  }

  // Enhanced Scroll Manager
  class ScrollManager {
    constructor() {
      this.init();
    }

    init() {
      this.createProgressBar();
      this.bindEvents();
      this.updateScrollProgress();
      this.initParallax();
    }

    createProgressBar() {
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-bar-container';
      progressContainer.innerHTML = '<div class="progress-bar-fill"></div>';
      document.body.appendChild(progressContainer);
      
      elements.progressBar = progressContainer.querySelector('.progress-bar-fill');
    }

    updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      state.scrollProgress = scrollPercent;
      
      if (elements.progressBar) {
        elements.progressBar.style.width = scrollPercent + '%';
      }

      // Show/hide scroll to top button with enhanced animation
      if (elements.scrollTopBtn) {
        if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
          elements.scrollTopBtn.classList.add('show');
          elements.scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
          elements.scrollTopBtn.classList.remove('show');
          elements.scrollTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        }
      }

      // Update scroll state
      state.isScrolling = true;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        state.isScrolling = false;
      }, 150);
    }

    initParallax() {
      const parallaxElements = document.querySelectorAll('.hero-bg-gradient, .particle');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
          const speed = CONFIG.PARALLAX_SPEED * (index % 3 + 1);
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      }, { passive: true });
    }

    bindEvents() {
      window.addEventListener('scroll', () => this.updateScrollProgress(), { passive: true });
      
      elements.scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
        
        // Add click animation
        elements.scrollTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
          elements.scrollTopBtn.style.transform = 'scale(1)';
        }, 150);
      });
    }
  }

  // Enhanced Particles Manager
  class ParticlesManager {
    constructor() {
      this.init();
    }

    init() {
      this.createParticlesContainer();
      this.generateParticles();
      this.animateParticles();
      this.bindMouseEvents();
    }

    createParticlesContainer() {
      const container = document.createElement('div');
      container.className = 'particles';
      container.id = 'particles';
      document.body.appendChild(container);
      
      elements.particlesContainer = container;
    }

    generateParticles() {
      if (!elements.particlesContainer) return;

      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Enhanced random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.opacity = Math.random() * 0.6 + 0.4;
        particle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        elements.particlesContainer.appendChild(particle);
        state.particles.push(particle);
      }
    }

    animateParticles() {
      // Enhanced particle interactions
      state.particles.forEach((particle, index) => {
        particle.addEventListener('mouseenter', () => {
          particle.style.transform = 'scale(3) rotate(180deg)';
          particle.style.background = 'var(--gradient-accent)';
          particle.style.boxShadow = 'var(--shadow-glow-accent)';
          particle.style.zIndex = '1000';
        });
        
        particle.addEventListener('mouseleave', () => {
          particle.style.transform = 'scale(1) rotate(0deg)';
          particle.style.background = 'var(--gradient-primary)';
          particle.style.boxShadow = 'var(--shadow-glow)';
          particle.style.zIndex = 'auto';
        });
      });
    }

    bindMouseEvents() {
      document.addEventListener('mousemove', (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        
        // Make particles react to mouse movement
        state.particles.forEach((particle, index) => {
          const rect = particle.getBoundingClientRect();
          const distance = Math.sqrt(
            Math.pow(e.clientX - rect.left, 2) + 
            Math.pow(e.clientY - rect.top, 2)
          );
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.style.transform = `scale(${1 + force * 0.5})`;
          }
        });
      });
    }
  }

  // Enhanced Statistics Counter
  class StatisticsCounter {
    constructor() {
      this.counters = document.querySelectorAll('.stats-counter');
      this.init();
    }

    init() {
      if (this.counters.length === 0) return;
      
      this.observeCounters();
    }

    observeCounters() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const duration = 2500;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          
          // Add completion animation
          counter.style.transform = 'scale(1.1)';
          setTimeout(() => {
            counter.style.transform = 'scale(1)';
          }, 200);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    }
  }

  // Enhanced Form Handler
  class FormHandler {
    constructor() {
      this.form = document.getElementById('contactForm');
      this.init();
    }

    init() {
      if (!this.form) return;
      
      this.bindEvents();
      this.addFloatingLabels();
      this.addFormAnimations();
    }

    bindEvents() {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Enhanced real-time validation
      this.form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
        input.addEventListener('focus', () => this.animateField(input));
      });
    }

    addFloatingLabels() {
      this.form.querySelectorAll('.form-floating').forEach(floating => {
        const input = floating.querySelector('input, textarea');
        const label = floating.querySelector('label');
        
        if (input && label) {
          input.addEventListener('focus', () => {
            floating.classList.add('focused');
          });
          
          input.addEventListener('blur', () => {
            if (!input.value) {
              floating.classList.remove('focused');
            }
          });
        }
      });
    }

    addFormAnimations() {
      const formFields = this.form.querySelectorAll('.form-control');
      
      formFields.forEach((field, index) => {
        field.style.animationDelay = `${index * 100}ms`;
        field.classList.add('fade-in-up');
      });
    }

    animateField(field) {
      field.style.transform = 'scale(1.02)';
      field.style.boxShadow = 'var(--shadow-glow)';
      
      setTimeout(() => {
        field.style.transform = 'scale(1)';
        field.style.boxShadow = '';
      }, 300);
    }

    validateField(field) {
      const value = field.value.trim();
      const isValid = field.checkValidity();
      
      if (!isValid) {
        this.showFieldError(field);
      } else {
        this.clearFieldError(field);
      }
      
      return isValid;
    }

    showFieldError(field) {
      field.classList.add('is-invalid');
      field.style.borderColor = 'var(--color-danger)';
      field.style.animation = 'shake 0.5s ease-in-out';
      
      setTimeout(() => {
        field.style.animation = '';
      }, 500);
    }

    clearFieldError(field) {
      field.classList.remove('is-invalid');
      field.style.borderColor = '';
    }

    handleSubmit(event) {
      event.preventDefault();
      
      if (!this.form.checkValidity()) {
        this.form.classList.add('was-validated');
        return;
      }

      // Enhanced form submission with loading state
      const submitBtn = this.form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      // Simulate form submission
      setTimeout(() => {
        this.showSuccessMessage();
        this.form.reset();
        this.form.classList.remove('was-validated');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 2000);
    }

    showSuccessMessage() {
      const message = document.createElement('div');
      message.className = 'alert alert-success fade-in-up';
      message.innerHTML = `
        <i class="fa-solid fa-check-circle me-2"></i>
        <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
      `;
      
      this.form.parentNode.insertBefore(message, this.form);
      
      // Add success animation
      message.style.transform = 'scale(0.8)';
      setTimeout(() => {
        message.style.transform = 'scale(1)';
      }, 100);
      
      setTimeout(() => {
        message.style.transform = 'scale(0.8)';
        message.style.opacity = '0';
        setTimeout(() => {
          message.remove();
        }, 300);
      }, 5000);
    }
  }

  // Enhanced Performance Optimizer
  class PerformanceOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.lazyLoadImages();
      this.debounceScrollEvents();
      this.optimizeAnimations();
    }

    lazyLoadImages() {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src || img.src;
              img.classList.remove('lazy');
              img.classList.add('fade-in-up');
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      }
    }

    debounceScrollEvents() {
      let ticking = false;
      
      const updateScroll = () => {
        // Update scroll-related elements
        ticking = false;
      };
      
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', requestTick, { passive: true });
    }

    optimizeAnimations() {
      // Reduce motion for users who prefer it
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.style.setProperty('--transition-fast', '0.1s ease');
        document.body.style.setProperty('--transition-normal', '0.2s ease');
        document.body.style.setProperty('--transition-slow', '0.3s ease');
      }
    }
  }

  // Enhanced Main Application Class
  class PortfolioApp {
    constructor() {
      this.modules = {};
      this.init();
    }

    init() {
      this.setCurrentYear();
      this.initializeModules();
      this.initializeAOS();
      this.initializeBootstrap();
      this.addCustomAnimations();
    }

    setCurrentYear() {
      if (elements.yearSpan) {
        elements.yearSpan.textContent = new Date().getFullYear();
      }
    }

    initializeModules() {
      this.modules = {
        theme: new ThemeManager(),
        typing: new TypingEffect(),
        scroll: new ScrollManager(),
        particles: new ParticlesManager(),
        statistics: new StatisticsCounter(),
        form: new FormHandler(),
        performance: new PerformanceOptimizer()
      };
    }

    initializeAOS() {
      try {
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: CONFIG.AOS_DURATION,
            once: true,
            easing: 'ease-out-cubic',
            offset: CONFIG.AOS_OFFSET,
            disable: 'mobile',
            mirror: false,
            anchorPlacement: 'top-bottom'
          });
        }
      } catch (error) {
        console.warn('AOS not available:', error);
      }
    }

    initializeBootstrap() {
      try {
        if (typeof bootstrap !== 'undefined') {
          // Initialize ScrollSpy
          const scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: '#navbarMain',
            offset: 90
          });
          
          // Initialize tooltips
          const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
          tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
          });
        }
      } catch (error) {
        console.warn('Bootstrap not available:', error);
      }
    }

    addCustomAnimations() {
      // Add shake animation for form validation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .skill-card:hover .fa-solid,
        .skill-card:hover .fa-brands {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialize the application when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
  } else {
    new PortfolioApp();
  }

})();


