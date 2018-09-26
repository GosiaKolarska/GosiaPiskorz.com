$(document).ready(function() {

    // HEADER
    $('.nav__link').on('click', function() {
        $('.nav__item.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    // PROGRESS BAR
    $('.skills__bar').on('mouseover', function() {
        var bar_val = $(this).val();
        if (bar_val > 0 && bar_val < 20){
            var bar_val = 'BEGINNER'
        } else if (bar_val >= 20 && bar_val < 40) {
            var bar_val = 'LOW INTERMEDIATE'
        } else if (bar_val >= 40 && bar_val < 60) {
            var bar_val = 'INTERMEDIATE'
        }else if (bar_val >= 60 && bar_val < 80) {
            var bar_val = 'UPPER INTERMEDIATE'
        }else if (bar_val >= 80 && bar_val < 90) {
            var bar_val = 'ADVANCED'
        } else if (bar_val >= 90) {
            var bar_val = 'MASTER'
        }
        $('.skills__tooltip').addClass('active').text(bar_val);
    });
    $('.skills__bar').on('mouseout', function() {
        $('.skills__tooltip').removeClass('active')
    });

    var tooltips = document.querySelectorAll('.skills__tooltip');
    window.onmousemove = function (e) {
        var x = (e.clientX - 30) + 'px',
        y = (e.clientY + 25) + 'px';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.top = y;
            tooltips[i].style.left = x;
        }}

        // PROJECTS: click
        if ($(window).width() > 1024) {
            $('.projects__item').on('click', function() {
                $('.projects__item.active').removeClass('active');
                $(this).addClass('active');
            });
        }

        // PROJECTS: mousewheel horizontal
        $('.projects__list').on('mousewheel', function(e, delta) {
            this.scrollLeft -= (delta * 40);
            e.preventDefault();
        });

        //MOBILE: anchor menu
        if ($(window).width() <= 1024) {
            $(document).on('click', 'a[href^="#"]', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 100
                }, 500);
            });
            
            //MOBILE: menu down/up
            var prev = 0;
            var $window = $(window);
            var nav = $('header');
            
            $window.on('scroll', function(){
                var scrollTop = $window.scrollTop();
                nav.toggleClass('hidden', scrollTop > prev);
                prev = scrollTop;
            });
        }
            
});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; color: #fff;}";
    document.body.appendChild(css);
};
