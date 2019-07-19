let $card = $('.filter-card');
let $city = $('.filter-city');
let $region = $('.filter-region');

function filterCard(filter) {
	if (filter === 'all') {
		$card.show();
	} else {
		let filters = [];
		let objActive = [];

		filters.push(filter);

		$card.each((i, e) => {
			let param = $(e).data('filter');

			let k = filters.length;

			for (let j = 0; j < filters.length; j++) {
				if (param.indexOf(filters[j]) !== -1) {
					k--;
				}
			}

			if (k === 0) {
				objActive.push(e);
			}
		});
		$card.hide();

		for (let k of objActive) {
			$(k).show();
		}
	}
}

function filterContainer(filter, name, $item) {
	if (filter === 'all') {
		$item.show();
	} else {
		$item.show();

		$item.each((i, e) => {
			let param = $(e).data(name);

			if (filter !== param) {
				$(e).hide();
			}
		});
	}
}

function filterCitySelect(filter) {
	const $filter = $('.js-filter-city');
	const $item = $filter.find('optgroup');

	$filter.val('all');
	$city.show();

	if (filter === 'all') {
		$item.show();
	} else {
		$item.show();

		$item.each((i, e) => {
			let param = $(e).attr('value');

			if (filter !== param) {
				$(e).hide();
			}
		});
	}
}

$('.js-filter-select').on('change', (e) => {
	const filter = $(e.currentTarget).val();

	filterCard(filter);
});

$('.js-filter-city').on('change', (e) => {
	const filter = $(e.currentTarget).val();
	const name = $(e.currentTarget).attr('name');

	filterContainer(filter, name, $city);
});

$('.js-filter-region').on('change', (e) => {
	const filter = $(e.currentTarget).val();
	const name = $(e.currentTarget).attr('name');

	filterContainer(filter, name, $region);
	filterCitySelect(filter);
});
