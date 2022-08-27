//back-top
$(document).ready(function () {
$(".back_to_top").hide();
});

$(function () {
$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
$('.back_to_top').fadeIn();
} else {
$('.back_to_top').fadeOut();
}
});

// scroll body to 0px on click
$('#adam_ondemand').click(function () {
$('body,html').animate({
scrollTop: 0
}, 800);
return false;
});

//login signup and forgot pop-up
$(document).ready(function () {
$('.register').click(function () {
$("#myModal").hide();
$("#myModal2").show();
});

$('.lost-activation,.forgotpass').click(function () {
$("#myModal").hide();
$("#myModal2").hide();
$("#forgotPasswordModal").hide();
});

$('.login').click(function () {
$("#myModal2").hide();	
$(".modal-backdrop.in").hide();
$("#myModal").show();
});

$('.close-t').click(function () {
$("#termsModal").hide();
});

$('.terms').click(function () {
$("#termsModal").show();
});

$('.login-btn').click(function () {
$("#myModal").show();
});

});


// myshare start 
$(document).ready(function () {
$('.myshare').share({
networks: ['facebook','twitter','linkedin','googleplus','pinterest','digg','email'],
theme: 'square'
});
});

// preloader  start 
$(window).load(function() { // makes sure the whole site is loaded
$('#status').fadeOut(); // will first fade out the loading animation
$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
$('body').delay(350).css({'overflow':'visible'});
})




//phone tablet menu
$(document).ready(function() {
$(window).scroll(function () {

var scrollY = $(window).scrollTop();

if(scrollY>=40){
$('#ebix_focus').css({'position': 'fixed', 'margin-top': '-70px'});
} else{
$('#ebix_focus').css({'position': '', 'margin-top': ''});
}
});

});





//Reload on resolution chages
function orientationchange(){
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
window.location.reload()
}, false); 
}

function isiPhone(){
return (
//Detect iPhone
//var isiPad = navigator.userAgent.match(/iPad/i) != null;
(navigator.platform.indexOf("iPhone") != -1) ||
//Detect iPod
(navigator.platform.indexOf("iPad") != -1)
);
}

if(isiPhone()){
orientationchange();
}
});

