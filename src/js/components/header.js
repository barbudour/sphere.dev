import * as globals from '../globals';

globals.vars.$window.on('scroll', () => {
	globals.vars.$header.toggleClass('is-fixed', globals.vars.$window.scrollTop() > 10);
});

globals.vars.$document.on('click', '.header__burger', () => {
	if (globals.isMobile()) {
		globals.vars.$header.toggleClass('is-active');
		globals.vars.$html.toggleClass('is-overflow-hidden');
	}

	if (globals.vars.$html.hasClass('is-overflow-hidden')) {
		globals.saveScrollPosition();
	} else {
		globals.restoreScrollPosition();
	}
});
