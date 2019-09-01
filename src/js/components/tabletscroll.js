function tabletscroll() {
	if (window.innerWidth < 1021) {
		$(window).on('scroll', () => {
			if ($(window).scrollTop() > 50) {
				$('.home__fixed__title').fadeOut();
				$('.home__fixed__button').fadeOut();
			} else {
				$('.home__fixed__title').fadeIn();
				$('.home__fixed__button').fadeIn();
			}
		});
	}
}

$(window).resize(() => {
	tabletscroll();
});

tabletscroll();
