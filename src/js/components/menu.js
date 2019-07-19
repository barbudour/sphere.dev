import * as globals from '../globals';

$('.header__burger').on('click', () => {
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
