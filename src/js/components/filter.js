import * as globals from '../globals';

let $card = $('.filter-card');
let $city = $('.filter-city');
let $region = $('.filter-region');

export function filterCard(filter, $item) {
	let $elem = $item || $card;

	if (filter === 'all') {
		$elem.show();
	} else {
		let objActive = [];

		$elem.each((i, e) => {
			let param = $(e).data('filter');

			for (let j = 0; j < filter.length; j++) {
				if (param.indexOf(filter[j]) !== -1) {
					objActive.push(e);
				}
			}
		});

		$elem.hide();

		for (let k of objActive) {
			$(k).show();
		}
	}
}

export function filterCitySelect(filter) {
	const $filter = $('.js-filter-city');
	const $item = $filter.find('optgroup');

	$filter.val('all');
	$city.show();

	if (filter === 'all') {
		$item.prop('disabled', false);
	} else {
		$item.prop('disabled', false);

		$item.each((i, e) => {
			let param = $(e).attr('value');

			if (filter !== param) {
				$(e).prop('disabled', true);
			}
		});
	}
}

export function filterSelect(filter) {
	const $select = $('.js-filter-city').find('select');
	const $group = $('.js-filter-city').find('.filter__group');

	$select.val('all');
	$city.show();

	if (filter === 'all') {
		$group.removeClass('is-disabled');
	} else {
		$group.addClass('is-disabled');

		$group.each((i, e) => {
			let param = $(e).data('filter');

			for (let j = 0; j < filter.length; j++) {
				if (param.indexOf(filter[j]) !== -1) {
					$(e).removeClass('is-disabled');
				}
			}
		});
	}
}

function init() {
	if (globals.isTablet()) {
		$('body')
			.on('change', '.js-filter-select', (e) => {
				let filter = $(e.currentTarget).val();

				if (!filter.length) {
					filter = 'all';
				}

				filterCard(filter);
			})
			.on('change', '.js-filter-city', (e) => {
				let filter = $(e.currentTarget).val();

				if (!filter.length) {
					filter = 'all';
				}

				filterCard(filter, $city);
			})
			.on('change', '.js-filter-region', (e) => {
				let filter = $(e.currentTarget).val();

				if (!filter.length) {
					filter = 'all';
				}

				filterCard(filter, $region);
				filterCitySelect(filter);
			});
	}
}

init();
