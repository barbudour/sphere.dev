$('.news-grid .grid-item').each((index, element) => {
	let myCanvas = $(element).find('.grid-item__blur').get(0);
	let $blurImg = $(element).find('.grid-item__bg img');

	if ($blurImg.length > 0) {
		myCanvas.width = $blurImg.width() + 20;
		myCanvas.height = $blurImg.height() + 20;
		let ctx = myCanvas.getContext('2d');
		let pic = new Image();
		pic.src = $blurImg.attr('src');
		pic.onload = () => {
			ctx.filter = 'blur(10px)';
			ctx.drawImage(pic, 0, 0, $blurImg.width() + 20, $blurImg.height() + 20);
		};
	}
});
