import * as globals from '../globals';
import {filterCard, filterSelect} from './filter';

function createClassName(className) {
	return className ? ` ${className}` : '';
}

function templateOption(element) {
	if (element.index === 0) {
		return '';
	}

	const checked = element.selected ? 'checked' : '';
	const name = element.parentElement.attributes[1].nodeValue;
	const id = `${name}-${element.index}`;

	return `<fieldset class="filter__item">
				<input class="filter__input" id="filterOption-${id}" name="filterType-${id}" type="checkbox" value="${element.value}" ${checked}/>
				<label class="filter__label" for="filterOption-${id}">${element.text}</label>
			</fieldset>`;
}

function renderOption(select) {
	let html = '';

	if (select.find('optgroup').length > 0) {
		select.find('optgroup').each((i, el) => {
			let subHtml = '';

			$(el).find('option').each((j, subel) => {
				subHtml += templateOption(subel);
			});

			html += `<div class="filter__group" data-filter="${$(el).attr('value')}">
					<div class="filter__group__name">${el.label}</div>
						${subHtml}
					</div>`;
		});
	} else {
		select.find('option').each((i, el) => {
			html += `${templateOption(el)}`;
		});
	}

	return html;
}

function getWidth($el) {
	const text = $el.find('option:selected').text();

	const $html = $('<span>').html(text);

	$html.appendTo('body');
	const width = $html.width();
	$html.remove();

	$el.width(width);
}

function closeSelect() {
	$('.js-select-holder').removeClass('is-active right');
	$('.js-select-toggle').fadeOut();
}

export function getFilter($element) {
	let array = [];

	$element.find('input[type="checkbox"]').each((i, el) => {
		const $this = $(el);

		if ($this.prop('checked')) {
			array.push($this.val());
		} else {
			array.remove($this.val());
		}
	});

	if (!array.length) {
		array = 'all';
	}

	return array;
}

function init() {
	const $select = globals.vars.$body.find('.js-select');

	if (!$select.length) {
		return;
	}

	let $city = globals.vars.$body.find('.filter-city');
	let $region = globals.vars.$body.find('.filter-region');

	$select.each((i, e) => {
		const $this = $(e);

		if (globals.isDesktop()) {
			const className = $this.data('class');
			const value = $this.find('option:selected').text();

			$this.wrap(`<div class="filter js-select-holder${createClassName(className)}"></div>`);
			$this.before(`<button class="filter__select js-select-button" type="button">${value}</button>`);
			$this.before(`<div class="filter__body js-select-toggle"><div class="filter__body__list">${renderOption($this)}</div><div class="filter__bottom"><button class="filter__bottom__button js-select-pick button" type="button"><span></span>Применить<span></span></button><button class="filter__bottom__clear js-select-clear" type="button">Очистить все</button></div></div>`);
		} else {
			const className = $this.data('class');

			$this.addClass(className);
		}

		getWidth($this);
	});

	globals.vars.$document
		.on('click.select', '.js-select-button', (e) => {
			const $this = $(e.currentTarget);
			const $parent = $this.parent();

			if ($parent.hasClass('is-active')) {
				$parent.removeClass('is-active');
				$this.siblings('.js-select-toggle').fadeOut();
			} else {
				closeSelect();
				$parent.addClass('is-active');
				$this.siblings('.js-select-toggle').fadeIn();

				if (innerWidth < $this.offset().left + $parent.find('.js-select-toggle').innerWidth()) {
					$parent.addClass('right');
				}
			}
		})
		.on('click.select', '.js-select-clear', (e) => {
			const $this = $(e.currentTarget);
			const $parent = $this.closest('.js-select-toggle');

			$parent.removeData('value');
			$parent.find('input').prop('checked', false);
		})
		.on('click.select', (e) => {
			const $el = $('.js-select-holder');

			if (!$el.is(e.target) && $el.has(e.target).length === 0 && $el.hasClass('is-active')) {
				closeSelect();
			}
		})
		.on('click.select', '.js-filter-select .js-select-pick', (e) => {
			const $parent = $(e.currentTarget).closest('.js-select-holder');

			filterCard(getFilter($parent));
		})
		.on('click.select', '.js-filter-city .js-select-pick', (e) => {
			const $parent = $(e.currentTarget).closest('.js-select-holder');

			filterCard(getFilter($parent), $city);
		})
		.on('click.select', '.js-filter-region .js-select-pick', (e) => {
			const $parent = $(e.currentTarget).closest('.js-select-holder');

			filterCard(getFilter($parent), $region);
			filterSelect(getFilter($parent), $city);
		});
}

function destroy() {
	globals.vars.$document.off('.select');
}

init();

export default {
	init,
	destroy,
};
