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
import sphere from './components/sphere';

NProgress.configure({
	showSpinner: false,
});

$(document).ready(function () {
	if ($('[data-barba-namespace="home"]').length > 0) {
		console.log('main page');
		sphere.stateNormal();
	} else {
		console.log('not main page');
		sphere.statePageLoaded();
	}
});

function scrollPage() {
	$(window).scroll(function () { 
		if ($(this).scrollTop() < 10) {
			sphere.statePageLoaded();
		} else if ($(this).scrollTop() > 10 && $(this).scrollTop() < 50) {
			sphere.stateStartScroll();
		} else if ($(this).scrollTop() > 50) {
			sphere.stateScroll();
		}
	});
}

function checkLink() {
	$('a').on('click', function () {
		var checkLogo = $(this).hasClass('header__logo');
		if (checkLogo) {
			// console.log('клик по лого')
			sphere.stateNormal();
		} else {
			sphere.statePageLoaded();
			// console.log('клик по ссылке')
		}
	});
}

checkLink();

barba.use(barbaCss);

barba.init({

	transitions: [
		// {
		// 	name: 'homepageTo',
		// 	to: {
		// 		namespace: 'home'
		// 	},
		// 	beforeEnter() {
		// 		sphere.stateNormal();
		// 	}
		// },
		// {
		// 	name: 'homepageFrom',
		// 	from: {
		// 		namespace: [
		// 			'home'
		// 		]
		// 	},
		// 	beforeLeave() {
		// 		sphere.statePageLoaded();
		// 	}
		// },
		{
		// sync: true,
		beforeLeave() {
			NProgress.start();

			$('html, body').animate({
				scrollTop: 0,
			}, 300);

			globals.vars.$html
				.addClass('is-no-interact')
				.removeClass('is-overflow-hidden');

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
			
			// sphere.statePageLoaded();
			NProgress.done();
		},
		
		afterEnter() {
			globals.vars.$html.removeClass('is-no-interact');
			checkLink();
			scrollPage();
			// statePageLoaded();
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