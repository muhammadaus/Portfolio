// document.getElementById('close-intro').addEventListener('click', function() {
//     document.querySelector('.blur-background').style.display = 'none';
//     document.querySelector('.intro-screen').style.display = 'none';
// });

document.body.classList.add('lock-scroll');

document.getElementById('close-intro').addEventListener('click', function() {
    document.body.classList.remove('lock-scroll');
    document.querySelector('.intro-screen').style.display = 'none';
    var elements = document.querySelectorAll('body > *:not(.intro-screen)');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
    }
});

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