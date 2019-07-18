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
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
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
