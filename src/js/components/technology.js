import * as globals from '../globals';

let windowPosBottom = $(window).scrollTop() + innerHeight;
let docScroll;
let canScroll = true;
const $techBody = globals.vars.$technology.find('.technology__content__body');
const $techMedia = globals.vars.$technology.find('.technology__media__figure');

const getPageYScroll = () => {
	docScroll = window.pageYOffset || document.documentElement.scrollTop;
};

function sortFigures() {
	const X = 57;
	let Y = 68;
	const Y2 = 35;
	let body = [];

	$techBody.each((i, e) => {
		body.push($(e));
	});

	$techMedia.each((i, e) => {
		const $el = $(e);

		let titlePos = body[i].find('h2').offset().top;
		let titlePosBottom = titlePos + body[i].find('h2').innerHeight();
		let elPosBottom = $el.offset().top;

		TweenLite.to($el, 0, {
			y: -$el.innerHeight() * i,
			bottom: 0,
			zIndex: `+=${i}`,
		});

		if (i !== 0) {
			TweenLite.to($el, 0, {
				bottom: `+=${Y * i}`,
			});
		}

		if (i % 2 === 0 && i !== 0) {
			TweenLite.to($el, 0, {
				left: X,
				bottom: `-=${Y2}`,
				zIndex: `-=${2}`,
			});
		}

		$(window).on('scroll.techology', _.throttle(() => {
			getPageYScroll();

			if (canScroll) {
				elPosBottom = $el.offset().top;

				if (titlePosBottom > windowPosBottom) {
					TweenLite.to($el, 1, {
						y: -$el.innerHeight() * i + docScroll / 1.5,
					});
					body[i].removeClass('is-active');
					$el.removeClass('is-active');
				} else {
					TweenLite.to($el, 1, {
						y: 0,
					});
					body[i].addClass('is-active');
					$el.addClass('is-active');
				}

				if (titlePosBottom < elPosBottom && body[i].hasClass('is-active')) {
					body[i].removeClass('is-active');
				}
			}
		}, 121));
	});
}

let sticky = {};
let stickyTime = 1;
sticky.$sticky = $('.js-sticky');
sticky.$stickyStopper = $('.sticky-stopper');

function stickyPos() {
	if (sticky.stickyStopPos < windowPosBottom) {
		canScroll = false;
		TweenLite.to(sticky.$sticky, stickyTime, {
			top: sticky.diff,
		});

		$techBody.removeClass('is-active');
	} else {
		canScroll = true;
		TweenLite.to(sticky.$sticky, stickyTime, {
			top: windowPosBottom - sticky.stickyParentPos - sticky.height,
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

		sortFigures();

		TweenLite.to(sticky.$sticky, stickyTime * 1.75, {
			opacity: 1,
		});

		stickyTime = 0;
	});

	$(window).on('scroll.techology', () => {
		windowPosBottom = $(window).scrollTop() + innerHeight;

		stickyPos();
	});
}

if ($('main').data('barba-namespace') === 'tech' && globals.vars.isEdgeIE) {
	$('body').on('mousewheel', () => {
		event.preventDefault();

		let wheelDelta = event.wheelDelta;
		let currentScrollPosition = window.pageYOffset;
		window.scrollTo(0, currentScrollPosition - wheelDelta);
	});
}

$('.js-slide-image-plus').on('click', (e) => {
	const $element = $(e.currentTarget).closest('.slide').find('img');
	let zoom = Number($element.data('zoom'));

	if (zoom < 2.5) {
		zoom += 0.25;

		TweenLite.to($element, 0.4, {
			scaleY: `${zoom}`,
			scaleX: `${zoom}`,
		});

		$element.attr('data-zoom', `${zoom}`).data('zoom', `${zoom}`);
	}
});

$('.js-slide-image-minus').on('click', (e) => {
	const $element = $(e.currentTarget).closest('.slide').find('img');
	let zoom = Number($element.data('zoom'));

	if (zoom > 1) {
		zoom -= 0.25;

		TweenLite.to($element, 0.4, {
			scaleY: `${zoom}`,
			scaleX: `${zoom}`,
		});

		$element.attr('data-zoom', `${zoom}`).data('zoom', `${zoom}`);
	} else {
		TweenLite.to($element, 0.4, {
			scale: 1,
		});

		$element.attr('data-zoom', 1).data('zoom', 1);
	}
});
