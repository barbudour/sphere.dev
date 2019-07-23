$('.slider').each((index, element) => {
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

	$(element).append(slidesCounter);
	$(element).find('.slides-counter__all').html(itemsColText);

	$(element).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
		counter = nextSlide + 1;

		if (counter < 10) {
			counter = `0${nextSlide + 1}`;
		}

		$(element).find('.slides-counter__current').html(counter);
	});
});
