let slidesCount = 1;

$('.news__slide').each((index, element) => {
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

$('.news__slider').slick({
	speed: 500,
	dots: false,
	arrows: true,
	infinite: true,
	cssEase: 'linear',
	variableWidth: true,
});
