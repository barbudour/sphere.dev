import * as globals from '../globals';

let windowCalc = $(window).scrollTop() + innerHeight;
let firstTime = 1;
let docScroll;
const $techBody = globals.vars.$technology.find('.technology__content__body');
const $techMedia = globals.vars.$technology.find('.technology__media__image');

const getPageYScroll = () => {
	docScroll = window.pageYOffset || document.documentElement.scrollTop;
};

function sortFigures() {
	const X = 55;
	let Y = 66;
	const Y2 = 34;
	let body = [];
	let scrollPercent;

	$techBody.each((i, e) => {
		body.push($(e));
	});

	$techMedia.each((i, e) => {
		const $el = $(e);

		let start = body[i].offset().top;
		let startEl = $el.offset().top;

		let end = start + body[i].innerHeight();
		let endEl = startEl + $el.innerHeight();

		scrollPercent = (startEl - start) / (endEl - end);

		TweenMax.to($el, 0, {
			y: -$el.innerHeight() * i,
			bottom: 0,
			zIndex: `+=${i}`,
			opacity: scrollPercent > 0 ? scrollPercent > 1 ? 1 : scrollPercent.toFixed(3) : 0,
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

		$(window).on('scroll.techology', () => {
			start = body[i].offset().top;
			startEl = $el.offset().top;

			end = start + body[i].innerHeight();
			endEl = startEl + $el.innerHeight();
			scrollPercent = (startEl - start) / (endEl - end);
			getPageYScroll();

			console.log(scrollPercent.toFixed(3));

			if (body[i].offset().top > windowCalc - 40) {
				if (i !== 0) {
					TweenMax.to($el, 1, {
						opacity: scrollPercent > 0 ? scrollPercent > 1 ? 1 : scrollPercent.toFixed(3) : 0,
						y: -$el.innerHeight() * i + docScroll / 1.5,
					});
				}
			} else if (i !== 0) {
				TweenMax.to($el, 1, {
					y: 0,
				});
			}

			const titlePosition = body[i].find('h2').offset().top;
			const titlePositionWithHeight = titlePosition + body[i].find('h2').innerHeight();
			const elPosition = $el.offset().top;
			const elPositionWithHeight = elPosition + $el.innerHeight();

			if (titlePositionWithHeight > elPosition && titlePosition < elPositionWithHeight) {
				body[i].addClass('is-active');
				$el.addClass('is-active');
			} else if (body[i].addClass('is-active')) {
				body[i].removeClass('is-active');
				$el.removeClass('is-active');
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

		$techBody.removeClass('is-active');
		$techMedia.removeClass('is-active');
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

$(window).on('scroll.techology', () => {
	windowCalc = $(window).scrollTop() + innerHeight;

	sticky();
});

