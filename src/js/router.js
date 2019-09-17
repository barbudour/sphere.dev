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

var stateSphereActive = false;

$(document).ready(function () {
	if (location.pathname != '/') {
		sphere.stateInnerPage();
		window.onload = function() {
			sphere.stateStartScroll();
			setTimeout(function() {
				sphere.stateScroll();
			}, 1000)
			stateSphereActive = true;
		};
	} else {
		return false;
	}
});

NProgress.configure({
	showSpinner: false,
});

function checkLink() {
	$('a').on('click', function () {
		var checkLogo = $(this).hasClass('header__logo');
		if (checkLogo) {
			// console.log('клик по лого')
			// sphere.statePageLoaded();
			sphere.stateStartScroll();
			sphere.statePageLoaded();
			sphere.stateNormal();
			stateSphereActive = false;
		} else {
			if (!stateSphereActive) {
				sphere.statePageLoaded();
				setTimeout(function() {
					sphere.stateStartScroll();
					setTimeout(function() {
						sphere.stateScroll();
					}, 1000)
				}, 1000)
				stateSphereActive = true;
			}
			// console.log('клик по ссылке')
		}
	});
}

function homeSphereHover() {
	$( ".home__fixed__decoration" ).hover(
		function() {
			sphere.hoverOn();
		}, function() {
			sphere.hoverOff();
		}
		);
}

checkLink();
homeSphereHover();

barba.use(barbaCss);

barba.init({

	transitions: [
		{
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
			homeSphereHover();
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
