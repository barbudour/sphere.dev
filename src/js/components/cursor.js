$('.site-container').append('<div class="cursor"></div>');

const $cursor = $(document).find('.cursor');

$('.js-cursor').each((index, element) => {
	$(element).on('mousemove', (e) => {
		TweenMax.to($cursor, 0.1, {
			x: e.pageX - $cursor.width() / 2,
			y: e.pageY - $cursor.height() / 2,
		});
	}).on('mouseenter', () => {
		$cursor.addClass('is-active');
	}).on('mouseleave', () => {
		$cursor.removeClass('is-active');
	});
});

