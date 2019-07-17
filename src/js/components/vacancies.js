function showPopup(id, name) {
	
}

$('.js-vacancies-button-more').on('click', (e) => {
	const $this = $(e.currentTarget);

	$this.toggleClass('is-active');
	$this.closest('.vacancies-item').find('.vacancies-item__body').slideToggle();
});

$('.js-vacancies-button-resume').on('click', (e) => {
	const $this = $(e.currentTarget);

	const id = $this.data('id');
	const name = $this.data('name');

	showPopup(id, name);
});
