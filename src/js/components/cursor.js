import * as globals from '../globals';

function init() {
	globals.vars.$siteContainer.append('<div class="cursor"></div>');

	const $cursor = $(document).find('.cursor');

	$('.js-cursor').each((index, element) => {
		if (globals.isDesktop()) {
			$(element).on('mousemove.cursor', (e) => {
				TweenMax.to($cursor, 0.1, {
					x: e.pageX - $cursor.width() / 2,
					y: e.pageY - $cursor.height() / 2,
				});
			}).on('mouseenter.cursor', () => {
				$cursor.addClass('is-active');
			}).on('mouseleave.cursor', () => {
				$cursor.removeClass('is-active');
			});

			$('.news__more span').on('mouseenter.cursor', () => {
				$cursor.addClass('is-plus');
			}).on('mouseleave.cursor', () => {
				$cursor.removeClass('is-plus');
			});
		}
	});
}

function destroy() {
	$('.js-cursor, .news__more span').off('.cursor');
}

init();

export default {
	init,
	destroy,
};
