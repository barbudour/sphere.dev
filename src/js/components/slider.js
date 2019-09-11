function init() {
	const $slider = $('.slider');

	if (!$slider.length) {
		return;
	}

	$slider.each((index, element) => {
		let itemsCol = $(element).find('.slide').length;
		let counter = '01';
		let itemsColText = itemsCol;
		let slidesCounter = `
			<div class="slides-counter">
				<span class="slides-counter__current">01</span> из <span class="slides-counter__all"></span>
			</div>
		`;

		if (itemsCol < 10) {
			itemsColText = `0${itemsCol}`;
		}

		$(element).slick({
			rows: 0,
			fade: true,
			speed: 500,
			dots: false,
			arrows: true,
			infinite: true,
			cssEase: 'linear',
			nextArrow: '<button type="button" class="slick-next slick-arrow button"><span></span>Следующий<span></span></button>',
			prevArrow: '<button type="button" class="slick-prev slick-arrow button"><span></span>Предыдущий<span></span></button>',
		});

		if (itemsCol > 1) {
			$(element).append(slidesCounter);
		} else {
			$slider.find('button').remove();
		}

		$(element).find('.slides-counter__all').html(itemsColText);

		$(element).on('beforeChange.slider', (event, slick, currentSlide, nextSlide) => {
			counter = nextSlide + 1;

			if (counter < 10) {
				counter = `0${nextSlide + 1}`;
			}

			$(element).find('.slides-counter__current').html(counter);
		});
	});

	$('.js-slide-image-plus').on('click.slider', (e) => {
		const $element = $(e.currentTarget).closest('.slide').find('img');
		let zoom = Number($element.data('zoom'));

		if (zoom < 2.5) {
			zoom += 0.25;

			TweenLite.to($element, 0.4, {
				scaleY: `${zoom}`,
				scaleX: `${zoom}`,
			});

			$element.attr('data-zoom', `${zoom}`).data('zoom', `${zoom}`);
		}
	});

	$('.js-slide-image-minus').on('click.slider', (e) => {
		const $element = $(e.currentTarget).closest('.slide').find('img');
		let zoom = Number($element.data('zoom'));

		if (zoom > 1) {
			zoom -= 0.25;

			TweenLite.to($element, 0.4, {
				scaleY: `${zoom}`,
				scaleX: `${zoom}`,
			});

			$element.attr('data-zoom', `${zoom}`).data('zoom', `${zoom}`);
		} else {
			TweenLite.to($element, 0.4, {
				scale: 1,
			});

			$element.attr('data-zoom', 1).data('zoom', 1);
		}
	});
}

function destroy() {
	$('.slider, .js-slide-image-plus, .js-slide-image-minus').off('.slider');
}

init();

export default {
	init,
	destroy,
};
