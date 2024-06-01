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