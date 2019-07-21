// eslint-disable-next-line consistent-return
function loadVacancy(objects) {
	for (const i in objects) {
		if (Object.prototype.hasOwnProperty.call(objects, i)) {
			const object = objects[i];

			return `<div class="vacancies-item" id="${object.id}">
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
}

// eslint-disable-next-line no-unused-vars
function loadNews(object, count) {
	// eslint-disable-next-line no-console
	console.log(object);
}

function load(id, path, type, count) {
	const $container = $(`#${id}`);

	$.ajax({
		url: path,
		method: 'GET',
		dataType: 'json',
	})
		.done((response) => {
			if (type === 'vacancy') {
				$container.append(loadVacancy(response));
			} else if (type === 'news') {
				$container.append(loadNews(response, count));
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

	if (!count) {
		$this.hide();
	}

	load(id, url, type, count);
});
