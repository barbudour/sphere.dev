let maxAngle = 1080;

$(document).on('mousemove', (e) => {
	if (innerWidth > 1024) {
		let angle = e.clientX / (innerWidth / 100) * (maxAngle / 100);

		TweenMax.to($('.home__fixed__decoration__image'), 0.3, {
			rotation: angle,
			ease: Power0.easeNone,
		});

		TweenMax.to($('.home__fixed__decoration__polygon'), 0.3, {
			rotation: -angle,
			ease: Power0.easeNone,
		});
	}
});
