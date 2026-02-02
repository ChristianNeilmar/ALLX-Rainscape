// Fix for Elementor Popup closing on anchor link click
document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (event) {
		const anchor = event.target.closest('.elementor-location-popup a[href*="#"]');
		if (anchor) {
			elementorProFrontend.modules.popup.closePopup({}, event);
		}
	});
});

// Audio player with tabs
document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelector('.rain-audio-wrapper');
	if (!wrapper) return;

	const PLAY_ICON = 'https://staging.appetiser.com.au/rainscape/wp-content/uploads/2026/01/Icon-1.png';
	const PAUSE_ICON = 'https://staging.appetiser.com.au/rainscape/wp-content/uploads/2026/01/Icon.png';

	const tabs = wrapper.querySelectorAll('.rain-tab');
	const featuredImage = wrapper.querySelector('#rain-featured-image');
	const audio = wrapper.querySelector('#rain-audio');

	let currentTab = null;

	function resetTabs() {
		tabs.forEach(t => {
			t.classList.remove('active');
			t.querySelector('.play img').src = PLAY_ICON;
		});
	}

	function playTab(tab) {
		const audioSrc = tab.dataset.audio;
		const icon = tab.querySelector('.play img');

		// Switching tabs
		if (currentTab !== tab) {
			resetTabs();

			fadeImage(tab.dataset.image);
			audio.src = audioSrc;
			audio.play();

			tab.classList.add('active');
			icon.src = PAUSE_ICON;

			currentTab = tab;
			return;
		}

		// Toggle play / pause
		if (audio.paused) {
			audio.play();
			icon.src = PAUSE_ICON;
		} else {
			audio.pause();
			icon.src = PLAY_ICON;
		}
	}

	tabs.forEach(tab => {
		tab.addEventListener('click', () => playTab(tab));
	});

	// Initialize first tab (no autoplay)
	if (tabs.length) {
		currentTab = tabs[0];
		featuredImage.src = currentTab.dataset.image;
		audio.src = currentTab.dataset.audio;
		currentTab.classList.add('active');
		currentTab.querySelector('.play img').src = PLAY_ICON;
	}

	// Reset icon when audio ends
	audio.addEventListener('ended', () => {
		if (currentTab) {
			currentTab.querySelector('.play img').src = PLAY_ICON;
		}
	});

	function fadeImage(newSrc) {
		featuredImage.classList.add('is-fading');

		setTimeout(() => {
			featuredImage.src = newSrc;
			featuredImage.classList.remove('is-fading');
		}, 200);
	}
});

const selectors = ['.mailing-list-1 .quform-field-select', '.mailing-list .quform-field-select'];
selectors.forEach(selector => {
	const elements = document.querySelectorAll(selector);
	console.log(elements);
	elements.forEach(el => {
		console.log(el);
		if (el && el.options.length > 0) {
			el.options[0].text = "Platform";
			console.log('Updated first option text');
		}
	});
});