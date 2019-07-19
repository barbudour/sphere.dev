import * as globals from '../globals';

let $gridItem = $('.page.home').find('.grid-item')
	.not('.for-laptop')
	.not('.for-laptop-only')
	.not('.for-tablet')
	.not('.for-tablet-only')
	.not('.for-mobile')
	.not('.for-mobile-only');
let gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
let firstGridHeight = Math.round(400 / 1360 * innerWidth);
let gridOffset = gridHeight - firstGridHeight;
let beforeLastGridHeight = gridHeight + gridOffset;

if (globals.isDesktopBig()) {
	$gridItem.each((index, element) => {
		if (index !== 0) {
			$(element).css({
				height: `${gridHeight}px`,
			});

			if (index % 2 === 0) {
				$(element).css({
					'margin-top': `-${gridOffset}px`,
					'height': `${gridHeight}px`,
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

if (globals.isLaptopOnly()) {
	$('.home-grid .grid-item')
		.eq($('.home-grid .grid-item').length - 2)
		.addClass('is-laptop-before-last');
}

if (globals.isTabletOnly()) {
	$('.home-grid .grid-item')
		.eq($('.home-grid .grid-item').length - 3)
		.addClass('is-tablet-before-last');
}

$(window).on('resize', () => {
	if (globals.isDesktopBig()) {
		gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
		firstGridHeight = Math.round(400 / 1360 * innerWidth);
		gridOffset = gridHeight - firstGridHeight;
		beforeLastGridHeight = gridHeight + gridOffset;

		$gridItem.each((index, element) => {
			if (index !== 0) {
				$(element).css({
					height: `${gridHeight}px`,
				});

				if (index % 2 === 0) {
					$(element).css({
						'margin-top': `-${gridOffset}px`,
						'height': `${gridHeight}px`,
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
						'margin-top': `-${gridOffset}px`,
						'height': `${beforeLastGridHeight}px`,
					});
			}
		});
	}
});

if (globals.isDesktop()) {
	$('.home-grid').find('.grid-item').each((index, element) => {
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
					ease: Power0.easeNone,
				});
			})
			.on('mouseleave', (event) => {
				let $this = $(event.currentTarget);

				$this
					.css({
						'z-index': 2,
					})
					.removeClass('is-hovered');

				TweenMax.to($this, 0.3, {
					scale: 1,
					rotationZ: -0.001,
					ease: Power0.easeNone,
					clearProps: 'rotationZ',
					onComplete() {
						$this.css('z-index', 1);
					},
				});
			});
	});
}
