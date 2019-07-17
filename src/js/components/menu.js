import * as globals from '../globals';

$('.header__burger').on('click', () => {
	if (globals.isMobile()) {
		$('.header').toggleClass('is-active');
		globals.vars.$html.toggleClass('is-overflow-hidden');
	}

	if ($('.header').hasClass('is-active')) {
		globals.saveScrollPosition();
	} else {
		globals.restoreScrollPosition();
	}
});
