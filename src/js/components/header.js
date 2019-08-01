import * as globals from '../globals';

$(window).on('scroll', () => {
	globals.vars.$header.toggleClass('is-fixed', $(window).scrollTop() > globals.vars.$header.innerHeight());
});
