let slidesCount = 1;

function init() {
	const $slider = $('.news__slider');

	if (!$slider.length) {
		return;
	}

	$slider.find('.news__slide').each((index, element) => {
		if (slidesCount === 1) {
			$(element).addClass('is-first');
			slidesCount++;
		} else if (slidesCount === 2) {
			$(element).addClass('is-second');
			slidesCount++;
		} else {
			$(element).addClass('is-third');
			slidesCount = 1;
		}
	});

	$slider.slick({
		rows: 0,
		speed: 500,
		dots: false,
		arrows: true,
		infinite: true,
		cssEase: 'linear',
		variableWidth: true,
		nextArrow: '<button type="button" class="slick-next slick-arrow button"><span></span>Следующий<span></span></button>',
		prevArrow: '<button type="button" class="slick-prev slick-arrow button"><span></span>Предыдущий<span></span></button>',
	});
}

init();

export default {
	init,
};
