import * as globals from '../globals';

let $home = $('.home');

let isScrollInited = false;

function tabletscroll() {
	if (innerWidth < 1021 && !isScrollInited) {
		const $title = $home.find('.home__fixed__title');
		const $button = $home.find('.home__fixed__button');

		globals.vars.$window.on('scroll.home', () => {
			if (globals.vars.$window.scrollTop() > 50) {
				$title.fadeOut();
				$button.fadeOut();
			} else {
				$title.fadeIn();
				$button.fadeIn();
			}
		});

		isScrollInited = true;
	} else if (innerWidth >= 1021 && isScrollInited) {
		globals.vars.$window.off('scroll.home');

		isScrollInited = false;
	}
}

function init() {
	$home = $('.home');

	if (!$home.length) {
		return;
	}

	tabletscroll();

	globals.vars.$window.on('resize.home', tabletscroll);
}

function destroy() {
	isScrollInited = false;

	globals.vars.$window.off('.home');
}

init();

export default {
	init,
	destroy,
};
