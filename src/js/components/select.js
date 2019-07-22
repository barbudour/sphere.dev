function getWidth($el) {
	const text = $el.find('option:selected').text();

	const $test = $('<span>').html(text);

	$test.appendTo('body');
	const width = $test.width();
	$test.remove();

	$el.width(width);
}

$('.js-select').each((i, e) => {
	getWidth($(e));
});
