import barba from '@barba/core';
import barbaCss from '@barba/css';
import NProgress from 'nprogress';

import * as globals from './globals';

import cursor from './components/cursor';
import filter from './components/filter';
import grid from './components/grid';
import moreCards from './components/moreCards';
import news from './components/news';
import polygon from './components/polygon';
import popup from './components/popup';
import select from './components/select';
import slider from './components/slider';
import tabletScroll from './components/tabletscroll';
import technology from './components/technology';
import vacancies from './components/vacancies';

NProgress.configure({
	showSpinner: false,
});

barba.use(barbaCss);

barba.init({

	transitions: [{

		beforeLeave() {
			NProgress.start();

			$('html, body').animate({
				scrollTop: 0,
			}, 300);

			globals.vars.$html.addClass('is-no-interact');

			cursor.destroy();
			filter.destroy();
			grid.destroy();
			moreCards.destroy();
			polygon.destroy();
			select.destroy();
			slider.destroy();
			tabletScroll.destroy();
			technology.destroy();
			vacancies.destroy();
		},

		beforeEnter() {
			globals.initVars();

			cursor.init();
			filter.init();
			grid.init();
			moreCards.init();
			news.init();
			polygon.init();
			popup.init();
			select.init();
			slider.init();
			tabletScroll.init();
			technology.init();
			vacancies.init();

			NProgress.done();
		},

		afterEnter() {
			globals.vars.$html.removeClass('is-no-interact');
		},

	}],

	prevent(data) {
		if (location.pathname === data.href) {
			data.event.preventDefault();

			return true;
		}

		return false;
	},

});
