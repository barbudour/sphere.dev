import * as globals from '../globals';

let maxAngle = 1080;

$(document).on('mousemove', (e) => {
	if (globals.isDesktop()) {
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
