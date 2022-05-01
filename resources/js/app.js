/* 
Template Name     : Mr. Burger - Real-time burger
File Description  : Main javascript file of the template
Author            : Bidhan Dev
Support           : bidhan.d@gmail.com
MIT license       :
*/


/* Global variable */
const doc = document;

/*----------------------------
              Navigation bar effects on scroll
              ------------------------------*/
window.addEventListener("scroll", function () {
    const header = doc.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

/*----------------------------
              Show scroll top
              ------------------------------*/
const scrollTop = () => {
    const scrollTop = doc.getElementById('scroll-top');
    if (this.scrollY >= 560) {
        scrollTop.classList.add('scroll-top');
    } else {
        scrollTop.classList.remove('scroll-top');
    }
};
window.addEventListener('scroll', scrollTop);


const menuBtn = doc.querySelector(".nav-menu-btn");
const navigation = doc.querySelector(".nav__menu");
const closeBtn = doc.querySelectorAll(".nav-close");
menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});
closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});


/*----------------------------
              Hero carousel
              ------------------------------*/
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 1200,
        dots: false
    });
});