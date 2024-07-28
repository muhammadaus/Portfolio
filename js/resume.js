// document.getElementById('close-intro').addEventListener('click', function() {
//     document.querySelector('.blur-background').style.display = 'none';
//     document.querySelector('.intro-screen').style.display = 'none';
// });


document.body.classList.add('lock-scroll');

$(document).ready(function(){
    $('a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});

window.onscroll = function() {showNavbar()};

function showNavbar() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-200px"; // Adjust this value to match the navbar's height
    }
}

function toggleLanguage(lang) {
    if (lang === 'ja') {
        window.location.href = 'index_ja.html';
    } else if (lang === 'en') {
        window.location.href = 'index.html';
    }
}

// Function to set the initial language based on user's preference or browser settings
function setInitialLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ja') && !window.location.href.includes('index_ja.html')) {
        window.location.href = 'index_ja.html';
    }
}

// Call setInitialLanguage when the page loads
window.onload = setInitialLanguage;

var projects = [
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