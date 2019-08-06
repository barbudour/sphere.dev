import * as globals from '../globals';

let windowPosBottom = $(window).scrollTop() + innerHeight;
let docScroll;
const $techBody = globals.vars.$technology.find('.technology__content__body');
const $techMedia = globals.vars.$technology.find('.technology__media__image');
const $yellowCubes = globals.vars.$technology.find('.cubes__yellow');

const getPageYScroll = () => {
	docScroll = window.pageYOffset || document.documentElement.scrollTop;
};

function figuresCubes() {
	const X = 50;
	let Y = 60;
	const Y2 = 32;
	let body = [];
	let scrollCalc;

	$techBody.each((i, e) => {
		body.push($(e));
	});


	$techMedia.each((i, e) => {
		const $el = $(e);

		let titlePos = body[i].find('h2').offset().top;
		let titlePosBottom = titlePos + body[i].find('h2').innerHeight();
		let elPos = $el.offset().top;
		let elPosBottom = elPos + $el.innerHeight();

		scrollCalc = elPosBottom / titlePos;

		TweenMax.to($el, 0, {
			y: -$el.innerHeight() * i,
			bottom: 0,
			zIndex: `+=${i}`,
			opacity: 1
			// opacity: scrollCalc > 0 ? scrollCalc.toFixed(3) : 1,
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
			titlePos = body[i].find('h2').offset().top;
			titlePosBottom = titlePos + body[i].find('h2').innerHeight();
			elPos = $el.offset().top;
			elPosBottom = elPos + $el.innerHeight();
			
			scrollCalc = elPosBottom / titlePos;
			
			getPageYScroll();
			
			if (titlePosBottom > windowPosBottom) {
				TweenMax.to($el, 0.5, {
					opacity: 1
				});
				
				if (i !== 0) {
					TweenMax.to($el, 1, {
						y: -$el.innerHeight() * i + docScroll / 2.5,
						opacity: 1
					});
				}
			} else {
				TweenMax.to($el, 1, {
					y: 0,
					opacity: 0,
				});
			}
			
			if (titlePosBottom > elPos && titlePos < elPosBottom) {
				body[i].addClass('is-active');
				$el.addClass('is-active');
			} else if (body[i].addClass('is-active')) {
				body[i].removeClass('is-active');
				$el.removeClass('is-active');
			}
		});
	});


	$yellowCubes.each((i, e) => {
		const $el = $(e);
		TweenMax.to($el, 0, {
			y: -$el.innerHeight() * i,
			bottom: 0,
			zIndex: `+=${i}`,
			opacity: 0
			// opacity: scrollCalc > 0 ? scrollCalc.toFixed(3) : 0,
		});

		if (i !== 0) {
			TweenMax.to($el, 0, {
				bottom: `+=${Y * i}`,
			});
		}

		if (i == 1) {
			TweenMax.to($el, 0, {
				zIndex: 999,
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
			let titlePos = body[i].find('h2').offset().top;
			let titlePosBottom = titlePos + body[i].find('h2').innerHeight();
			let elPos = $el.offset().top;
			let elPosBottom = elPos + $el.innerHeight();
			
			scrollCalc = elPosBottom / titlePos;
			
			getPageYScroll();
			
			if (titlePosBottom > windowPosBottom) {
				TweenMax.to($el, 0.5, {
					opacity: 0
				});
				
				if (i !== 0) {
					TweenMax.to($el, 1, {
						y: -$el.innerHeight() * i + docScroll / 2.5,
						opacity: 0
					});
				}
			} else {
				TweenMax.to($el, 1, {
					y: 0,
					opacity: 1,
				});
			}
			
			if (titlePosBottom > elPos && titlePos < elPosBottom) {
				body[i].addClass('is-active');
				$el.addClass('is-active');
			} else if (body[i].addClass('is-active')) {
				body[i].removeClass('is-active');
				$el.removeClass('is-active');
			}
		});
	});
}

figuresCubes();

let sticky = {};
let stickyTime = 1;
sticky.$sticky = $('.js-sticky');
sticky.$stickyStopper = $('.sticky-stopper');

function stickyPos() {
	if (sticky.stickyStopPos < windowPosBottom) {
		TweenMax.to(sticky.$sticky, stickyTime, {
			y: sticky.diff,
		});

		$techBody.removeClass('is-active');
		$techMedia.removeClass('is-active');
	} else {
		TweenMax.to(sticky.$sticky, stickyTime, {
			y: windowPosBottom - sticky.stickyParentPos - sticky.height,
		});
	}
}

if (sticky.$sticky.length) {
	sticky.height = sticky.$sticky.innerHeight();
	sticky.stickyStopPos = sticky.$stickyStopper.offset().top;
	sticky.stickyParentHeight = sticky.$sticky.parent().innerHeight();
	sticky.stickyParentPos = sticky.$sticky.parent().offset().top;
	sticky.diff = sticky.stickyParentHeight - sticky.height;

	$(window).on('load', () => {
		stickyPos();

		stickyTime = 0;
	});

	$(window).on('scroll.techology', () => {
		windowPosBottom = $(window).scrollTop() + innerHeight;

		stickyPos();
	});
}
