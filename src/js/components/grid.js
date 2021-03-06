import * as globals from '../globals';
import * as StackBlur from 'stackblur-canvas';

function gridItemsBlur() {
	const $gridItem = $('.grid-item');

	if (!$gridItem.length) {
		return;
	}

	$gridItem.each((index, element) => {
		let $blurImg = $(element).find('.grid-item__bg img');

		if ($blurImg.length > 0) {
			$blurImg
				.after('<canvas></canvas>');

			const $blur = $blurImg.parent();
			const $canvas = $blur.find('canvas');
			const canvas = $canvas.get(0);

			$canvas.css({
				height: `${$blurImg.height()}px`,
				width: `${$blurImg.width()}px`,
			});

			canvas.height = $blurImg.height();
			canvas.width = $blurImg.width();

			StackBlur.image($blurImg.get(0), $canvas.get(0), 10);

			$canvas.css({
				height: `${$blurImg.height()}px`,
				width: `${$blurImg.width()}px`,
			});
		}
	});
}

function init() {
	if (!$('.grid').length) {
		return;
	}

	let $gridItem = $('.page').find('.grid-item')
		.not('.for-laptop')
		.not('.for-laptop-only')
		.not('.for-tablet')
		.not('.for-tablet-only')
		.not('.for-mobile')
		.not('.for-mobile-only')
		.not('.grid-item--empty');
	let gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
	let firstGridHeight = Math.round(401 / 1360 * innerWidth);
	let gridOffset = gridHeight - firstGridHeight + 1;
	let beforeLastGridHeight = gridHeight + gridOffset;

	$gridItem.removeClass('is-before-last is-last is-bottom is-laptop-before-last is-tablet-before-last');

	if (globals.isDesktopBig() && $('.page').hasClass('home')) {
		$gridItem.each((index, element) => {
			if (index !== 0) {
				$(element).css({
					height: `${gridHeight}px`,
				});

				if (index % 2 === 0) {
					$(element).css({
						marginTop: `-${gridOffset}px`,
						height: `${gridHeight}px`,
					});
				}
			}

			if (index === 0) {
				$(element).css({
					height: `${firstGridHeight}px`,
				});
			}

			if (index === $gridItem.length - 2) {
				$(element)
					.addClass('is-before-last')
					.css({
						'margin-top': `-${gridOffset}px`,
						'height': `${beforeLastGridHeight}px`,
					});
			}

			if (index === $gridItem.length - 1) {
				$(element)
					.addClass('is-last');
			}
		});
	}

	if (globals.isDesktopBig() && $('.page').hasClass('news')) {
		$gridItem.each((index, element) => {
			$(element).css({
				height: `${gridHeight}px`,
			});

			if (index === 1) {
				$(element).css({
					height: `${firstGridHeight}px`,
				});
			}

			if ((index + 1) % 3 === 2 && index !== 1) {
				$(element).css({
					marginTop: `-${gridOffset}px`,
					height: `${gridHeight}px`,
				});
			}

			if (index === $gridItem.length - 1) {
				$(element)
					.addClass('is-last is-bottom');
			}

			if (index === $gridItem.length - 2) {
				$(element)
					.addClass('is-before-last is-bottom')
					.css({
						marginTop: `-${gridOffset}px`,
						height: `${beforeLastGridHeight}px`,
					});
			}

			if (index === $gridItem.length - 3) {
				$(element)
					.addClass('is-bottom');
			}
		});
	}

	if (globals.isLaptopOnly()) {
		$('.grid .grid-item')
			.eq($('.grid .grid-item').length - 2)
			.addClass('is-laptop-before-last');
	}

	if (globals.isTabletOnly()) {
		$('.grid .grid-item')
			.eq($('.grid .grid-item').length - 3)
			.addClass('is-tablet-before-last');
	}

	globals.vars.$window.on('resize.grid', () => {
		if (globals.isDesktopBig() && $('.page').hasClass('home')) {
			gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
			firstGridHeight = Math.round(401 / 1360 * innerWidth);
			gridOffset = gridHeight - firstGridHeight + 1;
			beforeLastGridHeight = gridHeight + gridOffset;

			$gridItem.each((index, element) => {
				if (index !== 0) {
					$(element).css({
						height: `${gridHeight}px`,
					});

					if (index % 2 === 0) {
						$(element).css({
							marginTop: `-${gridOffset}px`,
							height: `${gridHeight}px`,
						});
					}
				}

				if (index === 0) {
					$(element).css({
						height: `${firstGridHeight}px`,
					});
				}

				if (index === $gridItem.length - 2) {
					$(element)
						.css({
							marginTop: `-${gridOffset}px`,
							height: `${beforeLastGridHeight}px`,
						});
				}
			});
		}

		if (globals.isDesktopBig() && $('.page').hasClass('news')) {
			gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
			firstGridHeight = Math.round(400 / 1360 * innerWidth);
			gridOffset = gridHeight - firstGridHeight;
			beforeLastGridHeight = gridHeight + gridOffset;

			$gridItem.each((index, element) => {
				$(element).css({
					height: `${gridHeight}px`,
				});

				if (index === 1) {
					$(element).css({
						height: `${firstGridHeight}px`,
					});
				}

				if ((index + 1) % 3 === 2 && index !== 1) {
					$(element).css({
						marginTop: `-${gridOffset}px`,
						height: `${gridHeight}px`,
					});
				}

				if (index === $gridItem.length - 2) {
					$(element)
						.addClass('is-before-last')
						.css({
							marginTop: `-${gridOffset}px`,
							height: `${beforeLastGridHeight}px`,
						});
				}

				if (index === $gridItem.length - 1) {
					$(element)
						.addClass('is-last');
				}
			});
		}
	});

	$gridItem.each((index, element) => {
		if ($(element).hasClass('grid-item--first') && $(element).find('.grid-item__content').length > 1) {
			$(element).slick({
				speed: 500,
				fade: true,
				dots: true,
				arrows: false,
				infinite: true,
				cssEase: 'linear',
			});
		}
	});

	gridItemsBlur();
}

function destroy() {
	globals.vars.$window.off('.grid');
	$('.grid-item').off('.grid');
}

init();

export default {
	gridItemsBlur,
	init,
	destroy,
};
