import * as globals from '../globals';
import IMask from 'imask';

let $popup = $('.vacancies__popup');
let $popupBody = $popup.find('.vacancies__popup__body');
let $popupShade = $popup.find('.vacancies__popup__shade');
let $popupForm = $popup.find('.vacancies__popup__form');
let $popupresult = $popup.find('.vacancies__popup__result');

function showPopup(id, name) {
	$popupBody.find('[name="vacancy_id"]').val(id);
	$popupBody.find('[name="vacancy_name"]').val(name);

	new TimelineLite({
		onStart() {
			$popup.removeClass('is-hidden');

			$('.vacancies__popup__field--hide').val('');
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
			$popupForm.removeClass('is-hidden');

			if ($popupBody.find('.vacancies__popup__result__text').is(':hidden')) {
				$popupBody.find('.vacancies__popup__result__title').text('Спасибо!');
				$popupBody.find('.vacancies__popup__result__text').show();
			}

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

function showSendMessage($form) {
	new TimelineLite({
		onStart() {
			$popupresult.removeClass('is-hidden');
		},
		onComplete() {
			$('.vacancies__popup__form input, vacancies__popup__form textarea').val('').removeClass('is-filled');
			$('.vacancies__popup__submit').prop('disabled', true);
			$('.vacancies__popup__file__result').html('');
			$form.find('input, textarea').val('');

			TweenMax.set($popupForm, {
				clearProps: 'all',
			});
		},
	})
		.to($popupForm, 0.5, {
			autoAlpha: 0,
			y: 30,
			onComplete() {
				$popupForm.addClass('is-hidden');
			},
		})
		.from($popupresult, 0.5, {
			autoAlpha: 0,
			y: 30,
			clearProps: 'all',
		});
}

function ajaxForm($form, action) {
	$.ajax({
		url: action,
		type: 'POST',
		data: $form.serialize(),
	})
		.done(() => {
			showSendMessage($form);
		})
		.fail(() => {
			$popupBody.find('.vacancies__popup__result__title').text('Извините, произошла ошибка при отправке данных!');
			$popupBody.find('.vacancies__popup__result__text').hide();
			showSendMessage($form);
		});
}

$('.vacancies__popup__field[name="name"]').on('keyup', (e) => {
	let input = $(e.currentTarget).get()[0];

	input.value = input.value.replace(/[^а-яА-яa-zA-Z ]/g, '');
});

// eslint-disable-next-line consistent-return
function validateForm(e) {
	const $form = $(e.currentTarget);
	const $textInput = $form.find('.required input').not('[name="email"]');
	const $email = $form.find('[name="email"]');

	$textInput.each((i, el) => {
		const length = Number($(el).data('length'));

		$(el).closest('.required').toggleClass('is-error', $(el).val().length < length);
	});

	// eslint-disable-next-line no-useless-escape
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.[A-Za-z]/;
	const address = $email.val();
	const addressLength = $email.data('length');

	console.log(address.length, addressLength, reg.test(address))

	if (address.length < addressLength || reg.test(address) === false) {
		$email.closest('.required').addClass('is-error');

		e.preventDefault();
	} else {
		$email.closest('.required').removeClass('is-error');
	}

	if ($form.find('.is-error').length) {
		$form.animate({
			scrollTop: $form.find('.is-error').position().top,
		});

		return false;
	}

	ajaxForm($form);
}

function enabledButton(e) {
	const $form = $(e.currentTarget).closest('form');
	const countField = $form.find('.required').length;
	const countFilled = $form.find('.required .is-filled').length;

	if (countField === countFilled) {
		$form.find('.vacancies__popup__submit').prop('disabled', false);
	} else {
		$form.find('.vacancies__popup__submit').prop('disabled', true);
	}
}

function updateFiles(event) {
	const $input = $(event.target);
	const $result = $('.vacancies__popup__file__result');
	const BUTTON = '<button class="vacancies__popup__file__result__remove js-vacancies-popup-file-remove" type="button"><svg><use xlink:href="/images/sprites.svg#delete"></use></svg></button>';

	const curFiles = $input.get(0).files;

	if (curFiles.length === 0) {
		$result.append('<div class="vacancies__popup__file__result__empty">Файлы не выбраны</div>');
	} else {
		$('.vacancies__popup__file__result__empty').remove();

		for (let i = 0; i < curFiles.length; i++) {
			const resItemCount = $result.children().length;

			if (curFiles[i].size > 10971520) {
				// eslint-disable-next-line no-alert
				alert(`Файл "${curFiles[i].name}" слишком велик`);
			} else if (i < 2 && resItemCount < 2) {
				const listItem = `<div class="vacancies__popup__file__result__item"><p>${curFiles[i].name}</p>${BUTTON}</div>`;
				$result.append(listItem);
			}
		}

		$result.removeClass('is-hidden');
	}
}

function removeFile(event) {
	$(event.target).closest('.vacancies__popup__file__result__item').remove();
}

function init() {
	if (!$('.vacancies').length) {
		return;
	}

	$popup = $('.vacancies__popup');
	$popupBody = $popup.find('.vacancies__popup__body');
	$popupShade = $popup.find('.vacancies__popup__shade');
	$popupForm = $popup.find('.vacancies__popup__form');
	$popupresult = $popup.find('.vacancies__popup__result');

	$('.js-mask-phone').each((i, el) => {
		const $this = $(el);

		// eslint-disable-next-line no-unused-vars
		const mask = new IMask($this.get(0), {
			mask: '+{7} 000 000 00 00',
		});
	});

	$('.vacancies__popup__field').on('keyup.vacancies', (e) => {
		$(e.currentTarget).toggleClass('is-filled', $(e.currentTarget).val().length > 0);

		if ($(e.currentTarget).closest('.reqired')) {
			enabledButton(e);
		}
	});

	$popupForm.on('submit.vacancies', (e) => {
		e.preventDefault();

		validateForm(e);
	});

	globals.vars.$document
		.on('click.vacancies', '.js-vacancies-popup-file-remove', removeFile)
		.on('change.vacancies', '.js-vacancies-popup-file', updateFiles)
		.on('click.vacancies', '.vacancies-item__info', (e) => {
			const $this = $(e.currentTarget);

			$this.closest('.vacancies-item').find('.vacancies-item__button').toggleClass('is-active');
			$this.closest('.vacancies-item').find('.vacancies-item__body').slideToggle();
			$this.closest('.vacancies-item').find('.vacancies-item__salary').toggleClass('vacancies-item__salary--hide');
		})
		.on('click.vacancies', '.js-vacancies-popup-open', (e) => {
			const id = $(e.currentTarget).data('id');
			const name = $(e.currentTarget).data('name');

			globals.bodyWithOutScrollbar();
			globals.vars.$html.addClass('is-overflow-hidden');
			globals.saveScrollPosition();
			showPopup(id, name);
		})
		.on('keydown', (e) => {
			if (e.keyCode === 27) {
				closePopup();

				setTimeout(() => {
					globals.vars.$html.removeClass('is-overflow-hidden');
					globals.restoreScrollPosition();
					globals.bodyWithScrollbar();
				}, 250);
			}
		})
		.on('click.vacancies', '.js-vacancies-popup-close', () => {
			closePopup();

			setTimeout(() => {
				globals.vars.$html.removeClass('is-overflow-hidden');
				globals.restoreScrollPosition();
				globals.bodyWithScrollbar();
			}, 250);
		});
}

function destroy() {
	globals.vars.$document.off('.vacancies');
	$popupForm.off('.vacancies');
	$('.vacancies__popup__field').off('.vacancies');
}

init();

export default {
	init,
	destroy,
};
