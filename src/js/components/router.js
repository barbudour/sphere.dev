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