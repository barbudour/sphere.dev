import * as globals from '../globals';
import {filterCard} from './filter';
import {getFilter} from './select';

// eslint-disable-next-line consistent-return
function loadVacancy(objects) {
	let html = '';

	for (const i in objects) {
		if (Object.prototype.hasOwnProperty.call(objects, i)) {
			const object = objects[i];

			html += `<div class="vacancies-item filter-card" id="${object.id}" data-filter="${object.filter}" ${object.hidden ? 'style="display:none"' : ''}>
						<div class="vacancies-item__info">
							<div class="vacancies-item__info__top">
								${object.date ? `<div class="vacancies-item__date">${object.date}</div>` : ''}
								${object.city ? `<div class="vacancies-item__city">${object.city}</div>` : ''}
							</div>
							<div class="vacancies-item__info__bottom">
								<h3 class="vacancies-item__name">${object.title}</h3>
								${object.salary ? `<div class="vacancies-item__salary">${object.salary}</div>` : ''}
							</div>
							<button class="vacancies-item__button js-vacancies-button-more"><span></span><svg><use xlink:href="/images/sprites.svg#arrow"></use></svg></button>
						</div>
						<div class="vacancies-item__body">
							${object.list.map((item) => `
								<div class="vacancies-item__body__title">${item.name}</div>
								<ul class="vacancies-item__list no-offset-top">
									${item.array.map((arr) => `
										<li class="vacancies-item__list__item">${arr}</li>
									`).join('')}
								</ul>
							`).join('')}
							<div class="vacancies-item__bottom">
								<div class="vacancies-item__bottom__left">Указанные выше сведения не&nbsp;являются официальным предложением заключения трудового договора, а&nbsp;уведомляют о&nbsp;имеющейся вакансии в&nbsp;штатном расписании, актуальной на&nbsp;момент размещения.</div>
								<div class="vacancies-item__bottom__right">
									<button class="button vacancies-item__body__button js-vacancies-popup-open" type="button" data-name="${object.title}" data-id="${object.id}"><span></span>Отправить резюме<span></span></button>
								</div>
							</div>
						</div>
					</div>`;
		}
	}

	return html;
}

// eslint-disable-next-line consistent-return
function loadNews(id, objects, count, iteration) {
	let html = '';
	let iter = iteration || 0;
	count += iter;

	for (const el in objects) {
		if (Object.prototype.hasOwnProperty.call(objects, el)) {
			const object = objects[el];
			iter += 1;

			if (iter <= count) {
				html += `<a class="grid-item filter-card" href="${object.link}" data-filter="${object.filter}" ${object.hidden ? 'style="display:none"' : ''}>
							<div class="grid-item__bg" style="${object.style}">
								${object.src ? `<img src="${object.src}" srcset="${object.srcset} 2x">` : ''}
							</div>
							<div class="grid-item__content">
								<div class="grid-item__topside">
									${object.label ? `<div class="grid-item__label">${object.label}</div>` : ''}
									${object.date ? `<div class="grid-item__date">${object.date}</div>` : ''}
								</div>
								<div class="grid-item__bottomside">
									<p class="grid-item__title">${object.title}</p>
								</div>
							</div>
						</a>`;
			}
		}
	}

	$(`[data-id=${id}]`).data('iteration', iter);

	return html;
}

function load(id, path, type, count, iteration) {
	const $container = $(`#${id}`);

	$.ajax({
		url: path,
		method: 'GET',
		dataType: 'json',
	})
		.done((response) => {
			if (type === 'vacancy') {
				$container.append(loadVacancy(response));
				let filter = '';

				if (globals.isDesktop()) {
					filter = getFilter($('.js-filter-select'));
				} else {
					filter = $('.js-filter-select').val();
				}

				filterCard(filter, $('body').find('.filter-card'));
			} else if (type === 'news') {
				if (!count) {
					count = 1;
				}

				$container.append(loadNews(id, response, count, iteration));
			}
		})
		.fail(() => {
			$container.append('<div class="message message__error">Извините, произошла ошибка при загрузке данных!</div>');
		});
}

$('.js-add-more').on('click', (e) => {
	const $this = $(e.currentTarget);
	const id = $this.data('id');
	const url = $this.data('url');
	const type = $this.data('type');
	const count = $this.data('count') ? $this.data('count') : false;
	const iteration = $this.data('iteration') ? $this.data('iteration') : false;

	if (!count) {
		$this.hide();
	}

	load(id, url, type, count, iteration);
});
