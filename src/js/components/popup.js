import * as globals from '../globals';

const $popup = $('.js-popup');
const $popupBody = $popup.find('.popup__body');
const $popupShade = $popup.find('.popup__shade');
const $popupresult = $popup.find('.popup__result');

function showPopup(id, name) {
	$popupBody.find('[name="vacancy_id"]').val(id);
	$popupBody.find('[name="vacancy_name"]').val(name);

	new TimelineLite({
		onStart() {
			$popup.removeClass('is-hidden');
		},
	})
		.from($popupShade, 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		})
		.from($popupBody, 0.4, {
			x: '100%',
			clearProps: 'all',
		}, '-=0.2');
}

function closePopup() {
	new TimelineLite({
		onComplete() {
			$popup.addClass('is-hidden');
			$popupresult.addClass('is-hidden');

			TweenMax.set([$popupBody, $popupShade], {
				clearProps: 'all',
			});
		},
	})
		.to($popupBody, 0.4, {
			x: '100%',
		})
		.to($popupShade, 0.3, {
			autoAlpha: 0,
		});
}

$('body')
	.on('click', '.js-popup-open', (e) => {
		const id = $(e.currentTarget).data('id');
		const name = $(e.currentTarget).data('name');

		globals.bodyWithOutScrollbar();
		globals.vars.$html.addClass('is-overflow-hidden');
		globals.saveScrollPosition();
		showPopup(id, name);
	})
	.on('click', '.js-popup-close', () => {
		closePopup();

		setTimeout(() => {
			globals.vars.$html.removeClass('is-overflow-hidden');
			globals.restoreScrollPosition();
			globals.bodyWithScrollbar();
		}, 250);
	});
