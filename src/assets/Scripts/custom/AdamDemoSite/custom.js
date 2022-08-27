jQuery(document).ready(function () {
	jQuery( '.minimize a' ).click(function() {
	jQuery( '.minimize' ).toggleClass("maxmize")
	})

	jQuery('.submenu li a').click(function() {
	//jQuery('.submenu li').removeClass('active');
    jQuery(this).parent().addClass('active');
	});
	
	
	jQuery('.auto a').click(function() {
	jQuery('.auto').addClass('active1');
	});
	
	jQuery('.library a').click(function() {
	jQuery('.library').removeClass('active');
	jQuery('.library').addClass('active1');
	});
	
});
