// Configuration
const CONFIG = {
    SCROLL_THRESHOLD: 50,
    NAVBAR_HIDDEN_POSITION: '-200px',
    LANGUAGES: {
        JA: 'ja',
        EN: 'en'
    },
    PAGES: {
        JA: 'index_ja.html',
        EN: 'index.html'
    }
};

const PROJECTS = [
    {
        img: './img/projects/project_1.png',
        title: 'Decentralized Front-End for Smart Contract Interactions',
        description: 'My capstone project and potentially to be a very useful tool to all EVM users and developers',
        link: 'https://public.tableau.com/app/profile/muhammad.aus/vizzes'
    },
    {
        img: './img/projects/project_2.png',
        title: 'Tableau Visualization',
        description: 'Data representation that I can show based on practicality',
        link: 'https://public.tableau.com/app/profile/muhammad.aus/vizzes'
    },
    {
        img: './img/projects/project_3.png',
        title: 'SQL with Dune Analytics',
        description: 'The most optimal way to test SQL queries with real world use cases',
        link: 'https://dune.com/kr/gmx-open-interest-analysis'
    }
];

// Navbar handling
class NavbarManager {
    constructor() {
        this.lastScrollPosition = 0;
        this.ticking = false;
        this.navbar = document.getElementById("navbar");
        this.initScrollListener();
    }

    initScrollListener() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => this.updateNavbarPosition());
            this.ticking = true;
        }
    }

    updateNavbarPosition() {
        const currentScroll = window.scrollY;
        this.navbar.style.top = currentScroll > CONFIG.SCROLL_THRESHOLD ? "0" : CONFIG.NAVBAR_HIDDEN_POSITION;
        this.lastScrollPosition = currentScroll;
        this.ticking = false;
    }
}

// Language handling
class LanguageManager {
    constructor() {
        this.currentLang = this.getInitialLanguage();
    }

    getInitialLanguage() {
        return localStorage.getItem('preferredLanguage') || 
               (navigator.language.startsWith(CONFIG.LANGUAGES.JA) ? CONFIG.LANGUAGES.JA : CONFIG.LANGUAGES.EN);
    }

    toggleLanguage() {
        const newLang = this.currentLang === CONFIG.LANGUAGES.EN ? CONFIG.LANGUAGES.JA : CONFIG.LANGUAGES.EN;
        localStorage.setItem('preferredLanguage', newLang);
        this.redirectToLocalizedPage(newLang);
    }

    redirectToLocalizedPage(lang) {
        const currentPage = window.location.pathname.split('/').pop();
        const targetPage = lang === CONFIG.LANGUAGES.JA ? CONFIG.PAGES.JA : CONFIG.PAGES.EN;
        
        if (currentPage !== targetPage) {
            window.location.href = targetPage;
        }
    }
}

// Smooth scroll handling
class SmoothScroll {
    static init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetElement = document.querySelector(anchor.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize components
    const navbarManager = new NavbarManager();
    const languageManager = new LanguageManager();
    SmoothScroll.init();

    // Expose necessary functions globally
    window.toggleLanguage = (lang) => {
        const newLang = lang || (languageManager.currentLang === CONFIG.LANGUAGES.EN ? CONFIG.LANGUAGES.JA : CONFIG.LANGUAGES.EN);
        localStorage.setItem('preferredLanguage', newLang);
        languageManager.redirectToLocalizedPage(newLang);
    };
});