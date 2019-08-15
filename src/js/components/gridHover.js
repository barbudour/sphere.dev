$(".grid-item").each(function(){
	var blurImg = $(this).find(".grid-item__bg img");
	var blurCanvas = $(this).find(".grid-item__blur");
	// StackBlur.image(blurImg, blurCanvas, 20, true);
	var img = new Image();
	img.src = blurImg.attr("src");
	img.onload = function() {
		context.drawImage(img, this.x, this.y, blurImg.clientWidth, blurImg.clientHeight);
	};

	$(this).on("mouseenter", function () {
		console.log("hover");
	});
});