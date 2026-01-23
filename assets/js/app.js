// Fix for Elementor Popup closing on anchor link click
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        const anchor = event.target.closest('.elementor-location-popup a[href*="#"]');
        if (anchor) {
            elementorProFrontend.modules.popup.closePopup({}, event);
        }
    });
});