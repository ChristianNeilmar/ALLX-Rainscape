// Fix for Elementor Popup closing on anchor link click
document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (event) {
		const anchor = event.target.closest('.elementor-location-popup a[href*="#"]');
		if (anchor) {
			elementorProFrontend.modules.popup.closePopup({}, event);
		}
	});
});

const selectors = ['.mailing-list-1 .quform-field-select', '.mailing-list .quform-field-select'];
selectors.forEach(selector => {
	const elements = document.querySelectorAll(selector);
	elements.forEach(el => {
		if (el && el.options.length > 0) {
			el.options[0].text = "Platform";
		}
	});
});