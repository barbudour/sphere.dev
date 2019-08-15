import * as globals from '../globals';

const $popup = $('.js-popup');
const $popupBody = $popup.find('.popup__body');
const $popupShade = $popup.find('.popup__shade');

function getVideoId(url, type) {
	if (type === 'youtube') {
		let matcher = /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i;
		let id = url.match(matcher);

		return id[4];
	} else if (type === 'vimeo') {
		let matcher = /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/;

		let id = url.match(matcher);

		return id[2];
	}

	return url;
}

function generateURL(id, type) {
	if (type === 'youtube') {
		return `https://www.youtube.com/embed/${id}`;
	} else if (type === 'vimeo') {
		return `https://player.vimeo.com/video/${id}`;
	}

	return id;
}

function showPopup(id, type) {
	let TEMPLATE;

	if (!type) {
		TEMPLATE = `<video class="popup__video" controls controlsList="nodownload"><source src="${generateURL(id, type)}"/></video>`;
	} else {
		TEMPLATE = `<iframe class="popup__video" src="${generateURL(id, type)}" width="100%" height="100%" frameborder="0" allow="fullscreen" allowfullscreen></iframe>`;
	}

	new TimelineLite({
		onStart() {
			$popup.removeClass('is-hidden');
			$popupBody.append(TEMPLATE);
		},
	})
		.from($popupShade, 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		})
		.from($popupBody, 0.4, {
			y: '100%',
			clearProps: 'all',
		}, '-=0.2');
}

function closePopup() {
	new TimelineLite({
		onComplete() {
			$popup.addClass('is-hidden');
			$popupBody.html('');

			TweenMax.set([$popupBody, $popupShade], {
				clearProps: 'all',
			});
		},
	})
		.to($popupBody, 0.4, {
			y: '100%',
			autoAlpha: 0,
		});
}

$('body')
	.on('click', '.js-popup-open', (e) => {
		const url = $(e.currentTarget).data('url');
		const type = $(e.currentTarget).data('type');

		globals.bodyWithOutScrollbar();
		globals.vars.$html.addClass('is-overflow-hidden');
		globals.saveScrollPosition();

		showPopup(getVideoId(url, type), type);
	})
	.keyup(function(e) {
		if (e.keyCode === 27) {
			closePopup();
		}
	})
	.on('click', '.js-popup-close', () => {
		closePopup();

		setTimeout(() => {
			globals.vars.$html.removeClass('is-overflow-hidden');
			globals.restoreScrollPosition();
			globals.bodyWithScrollbar();
		}, 700);
	});
