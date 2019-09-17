$('.about__directions__item').each((index, element) => {
	$(element).on('mouseenter', (e) => {
		let $element = $(element);

		$element.addClass('is-hovered');

		if (index === 0) {
			$('.about__directions__item').eq(1).addClass('is-hovered');
			$('.about__directions__item').eq(3).addClass('is-hovered');
			$('.about__directions__item').eq(4).addClass('is-hovered');
		} else if (index === 1) {
			$('.about__directions__item').eq(2).addClass('is-hovered');
			$('.about__directions__item').eq(4).addClass('is-hovered');
			$('.about__directions__item').eq(5).addClass('is-hovered');
		} else if (index === 2) {
			$('.about__directions__item').eq(2).addClass('is-hovered');
			$('.about__directions__item').eq(5).addClass('is-hovered');
		} else if (index === 3) {
			$('.about__directions__item').eq(4).addClass('is-hovered');
			$('.about__directions__item').eq(6).addClass('is-hovered');
			$('.about__directions__item').eq(7).addClass('is-hovered');
		} else if (index === 4) {
			$('.about__directions__item').eq(5).addClass('is-hovered');
			$('.about__directions__item').eq(7).addClass('is-hovered');
		} else if (index === 6) {
			$('.about__directions__item').eq(7).addClass('is-hovered');
		}
	}).on('mouseleave', () => {
		$('.about__directions__item').removeClass('is-hovered');
	});
});
