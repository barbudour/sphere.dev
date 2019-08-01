import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'gsap';
import 'slick-carousel';
import barba from '@barba/core';
import barbaRouter from '@barba/router';
import barbaCss from '@barba/css';
import './polyfill';

svg4everybody();

window.$ = $;
window.jQuery = $;

const routes = [{
	path: '/index',
	name: 'home'
}, {
	path: '/about',
	name: 'about'
}, {
	path: '/technologies',
	name: 'techall'
}, {
	path: '/technologies/:technology',
	name: 'tech'
}, {
	path: '/news/:post',
	name: 'post'
}, {
	path: '/news/:event',
	name: 'event'
}, {
	path: '/team',
	name: 'team'
}, {
	path: '/vacancies',
	name: 'job'
}];

barba.use(barbaRouter, {
	routes,
});

barba.use(barbaCss);

barba.hooks.leave((data) => {
	$('html,body').animate({ scrollTop: 0 }, 300);
});

barba.init();

require('ninelines-ua-parser');
