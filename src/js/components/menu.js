$('.header__burger').on('click', () => {
	if (innerWidth < 768) {
		$('.header').toggleClass('is-active');
		$(document.documentElement).toggleClass('is-overflow-hidden');
	}
});
