/**
 * Modern Portfolio JavaScript
 * Enhanced interactivity and animations
 */

class ModernPortfolio {
    constructor() {
        this.githubService = new GitHubStatsService();
        this.blogManager = null;
        this.projectsLoaded = false;
        this.currentFilter = 'all';
        this.visibleProjectsCount = 12;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupNavigation();
        this.setupThemeToggle();
        this.loadProjectsData();
        this.setupProjectFilters();
        this.setupProjectModal();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupSkillBars();
        this.linkSkillsToProjects();
        this.initializeBlog();
        this.hideLoader();
    }

    // Event Listeners
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        window.addEventListener('load', this.handleLoad.bind(this));

        // Navigation events
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    // Navigation Setup
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    this.smoothScrollTo(targetId);
                }
            });
        });

        // Update active navigation on scroll
        this.updateActiveNavigation();
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // Project Filters
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.project-filters .filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter hardcoded HTML projects
                this.currentFilter = filter;
                this.filterHardcodedProjects(filter);
            });
        });
    }

    filterHardcodedProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');

            if (filter === 'all') {
                card.style.display = '';
            } else {
                if (categories && categories.includes(filter)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    filterProjects(filter) {
        // This method is kept for compatibility with skills linking
        const filterBtns = document.querySelectorAll('.project-filters .filter-btn');

        // Update active button
        filterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === filter) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Set current filter and re-render
        this.currentFilter = filter;
        this.visibleProjectsCount = 12;
        this.renderAllProjects();
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form);
        });

        // Form validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmission(form) {
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;

        try {
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Validate required fields
            if (!name || !email || !subject || !message) {
                this.showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Construct subject line with category
            const subjectMap = {
                'project': 'Project Collaboration Inquiry',
                'job': 'Job Opportunity',
                'consultation': 'Consultation Request',
                'other': 'General Inquiry'
            };
            const emailSubject = `${subjectMap[subject] || 'Contact'} - ${name}`;

            // Construct email body
            const emailBody = `Hello Muhammad,

My name is ${name}.

${message}

---
Best regards,
${name}
${email}`;

            // Encode for mailto URL
            const mailtoUrl = `mailto:aushijri@icloud.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // Open mailto link
            window.location.href = mailtoUrl;

            // Success feedback
            this.showNotification('Opening your email client...', 'success');

            // Reset form after brief delay
            setTimeout(() => {
                form.reset();
            }, 1000);

        } catch (error) {
            this.showNotification('Failed to create email. Please try again.', 'error');
        }
    }


    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Validation rules
        switch (field.type) {
            case 'email':
                isValid = this.isValidEmail(value);
                message = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                message = 'This field must be at least 2 characters long';
                break;
            default:
                isValid = value.length > 0;
                message = 'This field is required';
        }

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .stat-card');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            this.scrollObserver.observe(el);
        });
    }

    // Code Execution Visualization Animation - Vim-style typing
    setupTypingEffect() {
        const vimKeys = document.getElementById('vim-keys');
        const codeLine = document.getElementById('executing-line');

        if (!vimKeys || !codeLine) return;

        const codeSteps = [
            { keys: 'i', code: 'const hero = {' },
            { keys: 'i  name: "Muhammad Aus Hijri",', code: '  name: "Muhammad Aus Hijri",' },
            { keys: 'o  title: "Full Stack Blockchain Developer",', code: '  title: "Full Stack Blockchain Developer",' },
            { keys: 'o  specialty: "Smart Contracts & DeFi"', code: '  specialty: "Smart Contracts & DeFi"' },
            { keys: 'o};', code: '};' },
            { keys: 'ofunction displayHero() {', code: 'function displayHero() {' },
            { keys: 'i  render(hero.name);', code: '  render(hero.name);' },
            { keys: 'o  render(hero.title);', code: '  render(hero.title);' },
            { keys: 'o  render(hero.specialty);', code: '  render(hero.specialty);' },
            { keys: 'o}', code: '}' },
            { keys: 'odisplayHero();', code: 'displayHero();' }
        ];

        let currentStepIndex = 0;
        let isRunning = true;

        const typeText = async (element, text, keysElement, keys, speed = 80) => {
            element.textContent = '';
            keysElement.textContent = '';

            // Show vim keys first
            keysElement.textContent = keys;

            // Then type the code
            for (let i = 0; i < text.length; i++) {
                if (!isRunning) return;
                element.textContent += text[i];
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        };

        const runAnimation = async () => {
            while (isRunning) {
                const step = codeSteps[currentStepIndex];

                // Type code and show corresponding vim keys
                await typeText(codeLine, step.code, vimKeys, step.keys, 80);

                // Pause before next line
                await new Promise(resolve => setTimeout(resolve, 1500));

                currentStepIndex = (currentStepIndex + 1) % codeSteps.length;
            }
        };

        // Start animation
        runAnimation();

        // Pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isRunning = entry.isIntersecting;
                if (isRunning && entry.isIntersecting) runAnimation();
            });
        });

        const container = document.querySelector('.typing-container');
        if (container) observer.observe(container);
    }

    // Counter Animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        console.log('Setting up counters, found:', counters.length);

        // Immediately start animations
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log('Counter target:', target);
            if (!isNaN(target)) {
                this.animateCounter(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        console.log('Animating counter to:', target);
        const duration = 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
                console.log('Counter animation complete:', target);
            }
        };

        requestAnimationFrame(animate);
    }

    // Skill Bar Animations
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        // Animate skill bars immediately
        setTimeout(() => {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                if (progress) {
                    bar.style.width = progress + '%';
                }
            });
        }, 200);
    }

    // Navigation Active State
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => 
                        link.classList.remove('active'));
                    navLink?.classList.add('active');
                }
            });
        });
    }

    // Scroll Handling
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');
        
        // Navbar background on scroll
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
    }

    // Click Handling
    handleClick(e) {
        // Back to top button
        if (e.target.closest('#backToTop')) {
            e.preventDefault();
            this.smoothScrollTo('#home');
        }
        
        // Close mobile menu when clicking outside
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu?.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger')) {
            navMenu.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    }

    // Keyboard Handling
    handleKeydown(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        }
    }

    // Resize Handling
    handleResize() {
        // Close mobile menu on resize
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    }

    // Load Handling
    handleLoad() {
        // Trigger scroll animations for visible elements
        this.handleScroll();
        
        // Preload images
        this.preloadImages();
    }

    // Utility Functions
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? 'var(--success-color)' : 
                       type === 'error' ? 'var(--error-color)' : 'var(--primary-color)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-large)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    hideLoader() {
        // Loader removed - instant content display
        return;
    }

    // Animation Helper
    initializeAnimations() {
        // Add CSS for form errors
        const style = document.createElement('style');
        style.textContent = `
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: var(--error-color);
                background: rgba(239, 68, 68, 0.1);
            }
            
            .field-error {
                color: var(--error-color);
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // ===================================
    // ENHANCED PROJECT SHOWCASE METHODS
    // ===================================

    loadProjectsData() {
        if (!window.projectsData) {
            console.error('Projects data not loaded');
            return;
        }

        // Don't render - projects are hardcoded in HTML
        // this.renderAllProjects();
        this.updateFilterCounts();
        this.projectsLoaded = true;
    }

    renderAllProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        // Clear existing projects
        projectsGrid.innerHTML = '';

        // Get projects to display
        const projects = this.currentFilter === 'all'
            ? window.projectsData.all
            : window.projectsData.all.filter(p => p.category.includes(this.currentFilter));

        // Render projects
        const projectsToShow = projects.slice(0, this.visibleProjectsCount);
        projectsToShow.forEach((project, index) => {
            const isFeatured = window.projectsData.featured.some(fp => fp.id === project.id);
            const card = this.renderProjectCard(project, isFeatured);
            projectsGrid.appendChild(card);

            // Lazy load GitHub stats
            if (project.githubRepo) {
                this.fetchProjectGitHubStats(project, card);
            }
        });

        // Show/hide load more button
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            if (projects.length > this.visibleProjectsCount) {
                loadMoreContainer.style.display = 'flex';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }

    renderProjectCard(project, isFeatured = false) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category.join(' '));
        card.setAttribute('data-project-id', project.id);

        const statusBadge = project.status === 'in-progress' ? '<span class="tag">In Progress</span>' : '';
        const yearBadge = `<span class="tag">${project.year}</span>`;

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View Site"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${project.githubRepo ? `<a href="https://github.com/${project.githubRepo}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View Code"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tags">
                        ${project.highlights.map(h => `<span class="tag">${h}</span>`).join('')}
                        ${statusBadge}
                        ${yearBadge}
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.techStack.slice(0, 5).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="github-stats" id="github-stats-${project.id}">
                    <!-- GitHub stats will be loaded here -->
                </div>
            </div>
        `;

        // Add click handler for modal
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on links
            if (e.target.closest('a')) return;
            this.showProjectModal(project);
        });

        return card;
    }

    async fetchProjectGitHubStats(project, card) {
        const statsContainer = card.querySelector(`#github-stats-${project.id}`);
        if (!statsContainer || !project.githubRepo) return;

        // Show loading state
        statsContainer.innerHTML = `
            <div class="stat-item loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading stats...</span>
            </div>
        `;

        const [owner, repo] = project.githubRepo.split('/');
        const stats = await this.githubService.fetchRepoStats(owner, repo);

        if (stats.stars !== null) {
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span>${this.githubService.formatNumber(stats.stars)} stars</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-code-branch"></i>
                    <span>${this.githubService.formatNumber(stats.forks)} forks</span>
                </div>
                ${stats.language ? `
                <div class="stat-item">
                    <i class="fas fa-circle"></i>
                    <span>${stats.language}</span>
                </div>
                ` : ''}
                <div class="stat-item">
                    <i class="fas fa-clock"></i>
                    <span>${this.githubService.formatUpdatedDate(stats.updated)}</span>
                </div>
            `;
        } else {
            statsContainer.innerHTML = '';
        }
    }

    updateFilterCounts() {
        const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
        const allProjects = window.projectsData.all;

        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const count = filter === 'all'
                ? allProjects.length
                : allProjects.filter(p => p.category.includes(filter)).length;

            const countSpan = btn.querySelector('.filter-count');
            if (countSpan) {
                countSpan.textContent = count;
            }
        });
    }

    setupProjectModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = document.getElementById('modal-close');
        const overlay = document.getElementById('modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeProjectModal());
        }

        if (overlay) {
            overlay.addEventListener('click', () => this.closeProjectModal());
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
                this.closeProjectModal();
            }
        });

        // Setup load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleProjectsCount += 6;
                this.renderAllProjects();
            });
        }
    }

    showProjectModal(project) {
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');

        if (!modal || !modalContent) return;

        const githubLink = project.githubRepo ? `<a href="https://github.com/${project.githubRepo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fab fa-github"></i> View Code</a>` : '';
        const liveLink = project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> View Live</a>` : '';

        modalContent.innerHTML = `
            <div class="modal-project-header">
                <h2 class="modal-project-title" id="modal-project-title">${project.title}</h2>
                <div class="modal-project-meta">
                    <div class="project-tags">
                        ${project.category.map(c => `<span class="tag">${c}</span>`).join('')}
                        ${project.status === 'in-progress' ? '<span class="tag">In Progress</span>' : ''}
                        <span class="tag">${project.year}</span>
                    </div>
                </div>
            </div>

            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="modal-project-image">` : ''}

            <p class="modal-project-description">${project.longDescription || project.description}</p>

            ${project.features && project.features.length > 0 ? `
            <div class="modal-project-features">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="modal-project-features">
                <h4>Tech Stack</h4>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="modal-project-links">
                ${liveLink}
                ${githubLink}
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // ===================================
    // SKILLS LINKING METHODS
    // ===================================

    linkSkillsToProjects() {
        if (!window.skillsData) return;

        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skillName = item.querySelector('.skill-name');
            if (!skillName) return;

            const name = skillName.textContent.trim();
            const skillData = window.skillsData[name];

            if (skillData && skillData.projects) {
                const projectCount = skillData.projects.includes('all') ? '20+' : skillData.projects.length;

                // Add clickable behavior
                item.style.cursor = 'pointer';
                item.title = `Used in ${projectCount} projects. Click to filter.`;

                item.addEventListener('click', () => {
                    // Scroll to projects section
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });

                    // Set filter based on skill category
                    setTimeout(() => {
                        const category = this.getCategoryFromSkill(skillData.category);
                        if (category) {
                            this.currentFilter = category;
                            this.filterProjects(category);
                        }
                    }, 500);
                });
            }
        });
    }

    getCategoryFromSkill(skillCategory) {
        const categoryMap = {
            'Blockchain & Web3': 'blockchain',
            'Frontend Development': 'frontend',
            'Backend & Data': 'fullstack',
            'AI & Machine Learning': 'ai',
            'Tools & Systems': 'devtools',
            'Automation': 'fullstack'
        };

        return categoryMap[skillCategory] || 'all';
    }

    // ===================================
    // BLOG METHODS
    // ===================================

    initializeBlog() {
        this.blogManager = new BlogManager();
        this.blogManager.loadArticles();
    }
}

// ===================================
// BLOG MANAGER CLASS
// ===================================

class BlogManager {
    constructor() {
        this.articles = [];
        this.currentFilter = 'all';
    }

    async loadArticles() {
        console.log('loadArticles called');
        try {
            const response = await fetch('./blog/articles.json');
            console.log('Articles JSON response:', response);
            this.articles = await response.json();
            console.log('Articles loaded:', this.articles);
            this.renderArticleGrid();
            this.setupArticleFilters();
            this.setupArticleModal();
        } catch (error) {
            console.error('Failed to load articles:', error);
            this.showLoadingError();
        }
    }

    renderArticleGrid() {
        const articlesGrid = document.getElementById('articles-grid');
        if (!articlesGrid) return;

        const filteredArticles = this.currentFilter === 'all'
            ? this.articles
            : this.articles.filter(a => a.tags.includes(this.currentFilter));

        if (filteredArticles.length === 0) {
            articlesGrid.innerHTML = '';
            return;
        }

        articlesGrid.innerHTML = '';
        filteredArticles.forEach(article => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = article.title;
            link.onclick = (e) => {
                e.preventDefault();
                this.openArticle(article.slug);
            };
            articlesGrid.appendChild(link);
        });
    }

    renderArticleCard(article) {
        const card = document.createElement('div');
        card.className = `article-card ${article.featured ? 'featured' : ''}`;
        card.setAttribute('data-slug', article.slug);

        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="article-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="article-card-content">
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-description">${article.description}</p>
                <div class="article-card-tags">
                    ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
                <div class="article-card-meta">
                    <div class="article-card-date">
                        <i class="fas fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="article-card-readtime">
                        <i class="fas fa-clock"></i>
                        <span>${article.readTime}</span>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            console.log('Article card clicked:', article.slug);
            this.loadArticle(article.slug);
        });

        return card;
    }

    setupArticleFilters() {
        const filtersContainer = document.getElementById('article-filters');
        if (!filtersContainer) return;

        // Setup "All Articles" button listener
        const allButton = filtersContainer.querySelector('[data-filter="all"]');
        if (allButton) {
            allButton.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.article-filters .filter-btn').forEach(b => b.classList.remove('active'));
                allButton.classList.add('active');

                // Show all articles
                this.currentFilter = 'all';
                this.renderArticleGrid();
            });
        }

        // Get unique tags
        const tags = new Set();
        this.articles.forEach(article => {
            article.tags.forEach(tag => tags.add(tag));
        });

        // Add tag filter buttons
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.setAttribute('data-filter', tag);
            button.textContent = tag;

            button.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.article-filters .filter-btn').forEach(b => b.classList.remove('active'));
                button.classList.add('active');

                // Filter articles
                this.currentFilter = tag;
                this.renderArticleGrid();
            });

            filtersContainer.appendChild(button);
        });
    }

    async loadArticle(slug) {
        console.log('loadArticle called with slug:', slug);
        const article = this.articles.find(a => a.slug === slug);
        console.log('Article found:', article);
        if (!article) {
            console.error('Article not found for slug:', slug);
            return;
        }

        const modal = document.getElementById('article-modal');
        const modalContent = document.getElementById('article-modal-content');
        console.log('Modal elements:', { modal, modalContent });

        if (!modal || !modalContent) {
            console.error('Modal elements not found!', { modal, modalContent });
            return;
        }

        // Show loading state
        modalContent.innerHTML = '<div class="loading-state"><div class="loader-spinner"></div><p>Loading article...</p></div>';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        try {
            // Try to load the markdown file (if it exists)
            const response = await fetch(`./blog/posts/${slug}.md`);

            if (response.ok) {
                const markdown = await response.text();
                console.log('Markdown loaded, length:', markdown.length);
                console.log('marked object:', window.marked);
                const html = marked.parse(markdown);
                console.log('HTML generated, length:', html.length);

                modalContent.innerHTML = `
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${new Date(article.date).toLocaleDateString()}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime}</span>
                    </div>
                    ${html}
                `;

                // Apply syntax highlighting
                if (window.hljs) {
                    document.querySelectorAll('.article-content pre code').forEach((block) => {
                        hljs.highlightBlock(block);
                    });
                }
            } else {
                // Fallback if markdown file doesn't exist
                modalContent.innerHTML = `
                    <h1>${article.title}</h1>
                    <p>${article.description}</p>
                    <p><em>Full article coming soon...</em></p>
                `;
            }
        } catch (error) {
            console.error('Failed to load article:', error);
            modalContent.innerHTML = '<div class="loading-state"><p>Failed to load article.</p></div>';
        }
    }

    setupArticleModal() {
        const modal = document.getElementById('article-modal');
        const closeBtn = document.getElementById('article-modal-close');
        const overlay = document.getElementById('article-modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeArticleModal());
        }

        if (overlay) {
            overlay.addEventListener('click', () => this.closeArticleModal());
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
                this.closeArticleModal();
            }
        });
    }

    closeArticleModal() {
        const modal = document.getElementById('article-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    showLoadingError() {
        const articlesGrid = document.getElementById('articles-grid');
        if (articlesGrid) {
            articlesGrid.innerHTML = '<div class="loading-state"><p>Failed to load articles. Please try again later.</p></div>';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Additional utility functions for external use
window.portfolioUtils = {
    // Smooth scroll to element
    scrollTo: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },
    
    // Download resume/CV
    downloadResume: () => {
        // This would typically link to a PDF file
        window.open('/assets/Muhammad_Aus_Hijri_Resume.pdf', '_blank');
    }
};

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        }
    });
    observer.observe({ entryTypes: ['measure'] });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service
});