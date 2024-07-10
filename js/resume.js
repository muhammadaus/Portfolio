document.body.classList.add('lock-scroll');

window.onscroll = function() {showNavbar()};

function showNavbar() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-100px"; // Adjust this value to match the navbar's height
    }
}

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