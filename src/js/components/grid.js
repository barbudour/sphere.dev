import * as globals from '../globals';

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

if (globals.isDesktopBig() && $('.page').hasClass('home')) {
	$gridItem.each((index, element) => {
		if (index !== 0) {
			$(element).css({
				height: `${gridHeight}px`,
			});

			$(element).children('.grid-item__bg').css({
				top: '-1px',
				right: '-3px',
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
			$(element).children('.grid-item__bg').css({
				top: '-1px',
				right: '-3px',
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

$(window).on('resize', () => {
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

if (globals.isDesktop()) {
	$('.js-grid').find('.grid-item').not('.grid-item--empty').each((index, element) => {
		$(element)
			.on('mouseenter', (event) => {
				let $this = $(event.currentTarget);

				$this
					.css({
						'z-index': 3,
					})
					.addClass('is-hovered');

				TweenMax.to($this, 0.3, {
					scale: 1.05,
					rotationZ: -0.001,
					ease: Power1.easeOut,
					force3d: false,
				});
			})
			.on('mouseleave', (event) => {
				let $this = $(event.currentTarget);

				$this
					.css({
						'z-index': 2,
					})
					.removeClass('is-hovered');

				$this
					.children('.grid-item__bg').css({
						left: '0',
						bottom: '0',
					});

				TweenMax.to($this, 0.3, {
					scale: 1,
					rotationZ: -0.001,
					ease: Power1.easeOut,
					force3d: false,
					clearProps: 'rotationZ',
					onComplete() {
						$this.css('z-index', 1);
					},
				});
			});
	});
}
