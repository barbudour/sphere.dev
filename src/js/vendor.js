import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'gsap';
import 'slick-carousel';
import barba from '@barba/core';
import barbaRouter from '@barba/router';
import barbaCss from '@barba/css';
import './polyfill';
import * as StackBlur from 'stackblur-canvas';
import NProgress from 'nprogress';
// import 'pace-progressbar';

svg4everybody();

window.$ = $;
window.jQuery = $;
window.StackBlur = StackBlur;
window.barba = barba;
window.barbaRouter = barbaRouter;
window.barbaCss = barbaCss;
window.NProgress = NProgress;

const routes = [{
	path: '/index',
	name: 'home',
}, {
	path: '/about',
	name: 'about',
}, {
	path: '/technologies',
	name: 'techall',
}, {
	path: '/technologies/:technology',
	name: 'tech',
}, {
	path: '/news',
	name: 'news',
}, {
	path: '/news/:post',
	name: 'post',
}, {
	path: '/news/:event',
	name: 'event',
}, {
	path: '/team',
	name: 'team',
}, {
	path: '/vacancies',
	name: 'job',
}];

barba.use(barbaRouter, {
	routes,
});

barba.use(barbaCss);

NProgress.configure({
	showSpinner: false,
});

require('ninelines-ua-parser');
