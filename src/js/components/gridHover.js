// eslint-disable-next-line func-names
$('.grid-item').each(function () {
	let blurImg = $(this).find('.grid-item__bg img');
	// eslint-disable-next-line no-unused-vars
	let blurCanvas = $(this).find('.grid-item__blur');
	// StackBlur.image(blurImg, blurCanvas, 20, true);
	let img = new Image();
	img.src = blurImg.attr('src');
	// eslint-disable-next-line func-names
	img.onload = function () {
		// eslint-disable-next-line no-undef
		context.drawImage(img, this.x, this.y, blurImg.clientWidth, blurImg.clientHeight);
	};
});
