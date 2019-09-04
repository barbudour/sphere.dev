export let vars = {};
let lastPageYOffset = null;

vars.$window = $(window);
vars.$document = $(document);
vars.$html = $(document.documentElement);
vars.$body = $(document.body);

vars.isEdgeIE = vars.$html.hasClass('is-browser-edge') || vars.$html.hasClass('is-browser-ie');

export function initVars() {
	vars.$siteContainer = $('.site-container');
	vars.$page = $('.page');
	vars.$header = $('.header');
	vars.$footer = $('.footer');
	vars.$technology = $('.page.technology');
}

export function isMobile() {
	return innerWidth <= 767;
}

export function isTablet() {
	return innerWidth <= 1019;
}

export function isTabletOnly() {
	return innerWidth >= 768 && innerWidth <= 1019;
}

export function isLaptop() {
	return innerWidth <= 1359;
}

export function isLaptopOnly() {
	return innerWidth >= 1020 && innerWidth <= 1359;
}

export function isDesktop() {
	return innerWidth >= 1025;
}

export function isDesktopBig() {
	return innerWidth >= 1360;
}

export function getBodyScrollbarWidth() {
	return window.innerWidth - document.body.offsetWidth;
}

export function bodyWithOutScrollbar() {
	vars.$siteContainer.css({
		paddingRight: `${getBodyScrollbarWidth()}px`,
	});

	$(vars.$header).css({
		right: `${getBodyScrollbarWidth()}px`,
	});

	$(vars.$footer).css({
		right: `${getBodyScrollbarWidth()}px`,
	});

	$('.page__fixed').css({
		right: `${getBodyScrollbarWidth()}px`,
	});

	$('.popup__close').css({
		right: `${getBodyScrollbarWidth()}px`,
	});
}

export function bodyWithScrollbar() {
	vars.$siteContainer.css({
		paddingRight: '',
	});

	$(vars.$header).css({
		right: '',
	});

	$(vars.$footer).css({
		right: '',
	});

	$('.page__fixed').css({
		right: '',
	});

	$('.popup__close').css({
		right: '',
	});
}

export function saveScrollPosition() {
	lastPageYOffset = window.pageYOffset || document.documentElement.scrollTop;
}

export function restoreScrollPosition() {
	if (lastPageYOffset !== null) {
		window.scrollTo(window.pageXOffset, lastPageYOffset);
		lastPageYOffset = null;
	}
}

initVars();
