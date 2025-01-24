// document.getElementById('close-intro').addEventListener('click', function() {
//     document.querySelector('.blur-background').style.display = 'none';
//     document.querySelector('.intro-screen').style.display = 'none';
// });


document.body.classList.add('lock-scroll');

// Single event listener for smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initial language setup
    handleLanguage();
});

// Optimized navbar show/hide with throttling
let lastScrollPosition = 0;
let ticking = false;

function showNavbar() {
    const currentScroll = window.scrollY;
    const navbar = document.getElementById("navbar");
    
    if (currentScroll > 50) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-200px";
    }
    
    lastScrollPosition = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            showNavbar();
        });
        ticking = true;
    }
});

// Simplified language handling
function handleLanguage(toggle = false) {
    const currentPage = window.location.pathname.split('/').pop();
    let lang = localStorage.getItem('preferredLanguage') || 
               (navigator.language.startsWith('ja') ? 'ja' : 'en');
    
    if (toggle) {
        lang = lang === 'en' ? 'ja' : 'en';
        localStorage.setItem('preferredLanguage', lang);
    }

    const targetPage = lang === 'ja' ? 'index_ja.html' : 'index.html';
    if (currentPage !== targetPage) {
        window.location.href = targetPage;
    }
}

// Language toggle function
const toggleLanguage = () => handleLanguage(true);

// Projects data - Consider moving to a separate JSON file if the list grows
const projects = [
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