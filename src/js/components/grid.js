let gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
let firstGridHeight = Math.round(400 / 1360 * innerWidth);
let gridOffset = gridHeight - firstGridHeight;
let beforeLastGridHeight = gridHeight + gridOffset;

$('.page.home').find('.grid-item').each((index, element) => {
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

	if (index === $('.page').find('.grid-item').length - 2) {
		$(element)
			.addClass('is-before-last')
			.css({
				'margin-top': `-${gridOffset}px`,
				'height': `${beforeLastGridHeight}px`,
			});
	}

	if (index === $('.page').find('.grid-item').length - 1) {
		$(element)
			.addClass('is-last');
	}
});

$(window).on('resize', () => {
	gridHeight = Math.round(480 / 1360 * innerWidth) + 1;
	firstGridHeight = Math.round(400 / 1360 * innerWidth);
	gridOffset = gridHeight - firstGridHeight;
	beforeLastGridHeight = gridHeight + gridOffset;

	$('.page.home').find('.grid-item').each((index, element) => {
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

		if (index === $('.page.home').find('.grid-item').length - 2) {
			$(element)
				.css({
					'margin-top': `-${gridOffset}px`,
					'height': `${beforeLastGridHeight}px`,
				});
		}
	});
});

if (innerWidth > 1024) {
	$('.grid-item').each((index, element) => {
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
