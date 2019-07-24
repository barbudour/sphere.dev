import * as globals from '../globals';

let windowCalc = $(window).scrollTop() + innerHeight;
let firstTime = 1;

function sortFigures() {
	const X = 55;
	let Y = 66;
	const Y2 = 34;
	let body = [];

	globals.vars.$siteContainer.find('.technology__content__body').each((i, e) => {
		body.push($(e));
	});

	globals.vars.$siteContainer.find('.technology__media__image').each((i, e) => {
		const $el = $(e);

		TweenMax.to($el, 0, {
			y: -$el.innerHeight() * i,
			bottom: 0,
			zIndex: `+=${i}`,
			opacity: 1,
		});

		if (i !== 0) {
			TweenMax.to($el, 0, {
				bottom: `+=${Y * i}`,
			});
		}

		if (i % 2 === 0 && i !== 0) {
			TweenMax.to($el, 0, {
				left: X,
				bottom: `-=${Y2}`,
				zIndex: `-=${2}`,
			});
		}

		$(window).on('load scroll', () => {
			if (body[i].offset().top > windowCalc - 40) {
				body[i].removeClass('is-active');
				if (i !== 0) {
					TweenMax.to($el, 1, {
						y: `-=${$el.innerHeight()}`,
					});
				}
			} else {
				body[i].addClass('is-active');
				if (i !== 0) {
					TweenMax.to($el, 1, {
						y: 0,
					});
				}
			}

			if (body[i].find('h2').offset().top + body[i].find('h2').innerHeight() > $el.offset().top && body[i].hasClass('is-active')) {
				body[i].addClass('is-active');
			} else {
				body[i].removeClass('is-active');
			}
		});
	});
}

sortFigures();

const $sticky = $('.js-sticky');
const $stickyrStopper = $('.sticky-stopper');
const stickyHeight = $sticky.innerHeight();
const stickyStopPosition = $stickyrStopper.offset().top;
const stickyParentHeight = $sticky.parent().innerHeight();
const stickyParentPosition = $sticky.parent().offset().top;
const diff = stickyParentHeight - stickyHeight;

function sticky() {
	if (stickyStopPosition < windowCalc) {
		TweenMax.to($sticky, firstTime, {
			y: diff,
		});

		$('.technology__content__body').removeClass('is-active');
	} else {
		TweenMax.to($sticky, firstTime, {
			y: windowCalc - stickyParentPosition - stickyHeight,
		});
	}
}

$(window).on('load', () => {
	sticky();

	firstTime = 0;
});

$(window).on('scroll', () => {
	windowCalc = $(window).scrollTop() + innerHeight;

	sticky();
});

