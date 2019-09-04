import * as globals from '../globals';

let maxAngle = 1080;

function init() {
	if (!$('.home__fixed__decoration').length) {
		return;
	}

	globals.vars.$document.on('mousemove.polygon', (e) => {
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
}

function destroy() {
	globals.vars.$document.off('.polygon');
}

init();

export default {
	init,
	destroy,
};
