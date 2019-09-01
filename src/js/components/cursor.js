import * as globals from '../globals';

globals.vars.$siteContainer.append('<div class="cursor"></div>');

const $cursor = $(document).find('.cursor');

$('.js-cursor').each((index, element) => {
	if (globals.isDesktop()) {
		$(element).on('mousemove', (e) => {
			TweenMax.to($cursor, 0.1, {
				x: e.pageX - $cursor.width() / 2,
				y: e.pageY - $cursor.height() / 2,
			});
		}).on('mouseenter', () => {
			$cursor.addClass('is-active');
		}).on('mouseleave', () => {
			$cursor.removeClass('is-active');
		});

		$('.news__more span').on('mouseenter', () => {
			$cursor.addClass('is-plus');
		}).on('mouseleave', () => {
			$cursor.removeClass('is-plus');
		});
	}
});

