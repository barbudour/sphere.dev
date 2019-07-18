$('.slider').each((index, element) => {
	$(element).slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});
});
