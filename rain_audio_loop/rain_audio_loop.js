(function ($) {
    "use strict";

    let rainSwiper = null;

    // --- ICONS ---
    const PLAY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="61" viewBox="0 0 56 61" fill="none"><path d="M50.8035 22.2373C56.9958 25.7272 56.9959 34.7613 50.8035 38.2511L13.4143 59.3226C7.39601 62.7144 -3.0094e-07 58.2997 0 51.3157L1.81592e-06 9.17276C2.11686e-06 2.18872 7.396 -2.22591 13.4143 1.16584L50.8035 22.2373Z" fill="#AF04B3"></path></svg>';
    const PAUSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M0 3.37635C0 1.78473 0 0.988912 0.529774 0.494456C1.05955 0 1.91221 0 3.61752 0C5.32284 0 6.1755 0 6.70527 0.494456C7.23505 0.988912 7.23505 1.78473 7.23505 3.37635V13.5054C7.23505 15.097 7.23505 15.8929 6.70527 16.3873C6.1755 16.8818 5.32284 16.8818 3.61752 16.8818C1.91221 16.8818 1.05955 16.8818 0.529774 16.3873C0 15.8929 0 15.097 0 13.5054V3.37635Z" fill="#AF04B3"></path><path d="M9.64673 3.37635C9.64673 1.78473 9.64673 0.988912 10.1765 0.494456C10.7063 0 11.5589 0 13.2643 0C14.9696 0 15.8222 0 16.352 0.494456C16.8818 0.988912 16.8818 1.78473 16.8818 3.37635V13.5054C16.8818 15.097 16.8818 15.8929 16.352 16.3873C15.8222 16.8818 14.9696 16.8818 13.2643 16.8818C11.5589 16.8818 10.7063 16.8818 10.1765 16.3873C9.64673 15.8929 9.64673 15.097 9.64673 13.5054V3.37635Z" fill="#AF04B3"></path></svg>';
    
    function disableSwiping() {
        if (rainSwiper) {
            rainSwiper.allowTouchMove = false;
            rainSwiper.params.allowTouchMove = false;
            rainSwiper.update();
        }
    }

    function enableSwiping() {
        if (rainSwiper) {
            rainSwiper.allowTouchMove = true;
            rainSwiper.params.allowTouchMove = true;
            rainSwiper.update();
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return ":00";
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        return (min > 0 ? min : "") + ":" + (sec < 10 ? "0" + sec : sec);
    }

    function updateSliderFill($slider, val, max) {
        if (max <= 0) return;
        const percentage = (val / max) * 100;
        const thumbWidth = 8;
        const offset = (thumbWidth / 2) - (thumbWidth * (percentage / 100));
        $slider.css('background-size', `calc(${percentage}% + ${offset}px) 100%`);
    }

    function resetAllUI() {
        $('audio.native-audio-node').each(function () { this.pause(); });
        $('.loop_item_audio_container').removeClass('active');
        $('.rain_recording_carousel').removeClass('rain_audio_playing');
        $('[id^="pause_btn-"] .elementor-button-icon').html(PAUSE_SVG);
        enableSwiping();
    }

    function initAudioPlayers() {
        $('.custom-audio-player').each(function () {
            const $player = $(this);
            const audio = $player.find('audio')[0];
            const $slider = $player.find('.seek-slider');
            const $current = $player.find('.current-time');
            const $total = $player.find('.total-duration');

            if (!audio) return;

            let isMousedown = false;

            audio.onloadedmetadata = function () {
                $slider.attr('max', audio.duration);
                $total.text("00" + formatTime(audio.duration));
                updateSliderFill($slider, audio.currentTime, audio.duration);
            };

            audio.onended = function () {
                const idNumber = audio.id.split('_').pop();
                $(`#pause_btn-${idNumber} .elementor-button-icon`).html(PLAY_SVG);
                $('.rain_recording_carousel').removeClass('rain_audio_playing');
                enableSwiping();
            };

            audio.ontimeupdate = function () {
                if (!isMousedown) {
                    $slider.val(audio.currentTime);
                    updateSliderFill($slider, audio.currentTime, audio.duration);
                }
                $current.text("00" + formatTime(audio.currentTime));
                const remaining = Math.max(0, audio.duration - audio.currentTime);
                $total.text("00" + formatTime(remaining));
            };

            // Improved Slider Logic
            $slider.on('mousedown touchstart', function () {
                isMousedown = true;
            });

            $slider.on('input', function () {
                const val = $(this).val();
                updateSliderFill($(this), val, audio.duration);
                $current.text("00" + formatTime(val));
            });

            $slider.on('change mouseup touchend', function () {
                const val = $(this).val();
                // Ensure we don't seek past the duration
                audio.currentTime = Math.min(val, audio.duration - 0.1);
                isMousedown = false;
                updateSliderFill($slider, audio.currentTime, audio.duration);
            });
        });
    }

    $(document).ready(function () {
        initAudioPlayers();
    });

    $(document).on('click', '[id^="play_btn-"]', function (e) {
        e.preventDefault();
        const idNumber = $(this).attr('id').split('-')[1];
        const audio = document.getElementById(`audio_node_${idNumber}`);
        const $container = $(`.audio_id-${idNumber}`);

        if (!audio) return;

        if (audio.paused) {
            resetAllUI();
            $('.rain_recording_carousel').addClass('rain_audio_paused');
            audio.play().then(() => {
                $container.addClass('active');
                $('.rain_recording_carousel').addClass('rain_audio_playing');
                disableSwiping();
            }).catch(err => console.warn('Play rejected:', err));
        }
    });

    $(document).on('click', '[id^="pause_btn-"]', function (e) {
        e.preventDefault();
        const idNumber = $(this).attr('id').split('-')[1];
        const audio = document.getElementById(`audio_node_${idNumber}`);
        const $iconWrapper = $(this).find('.elementor-button-icon');

        if (!audio) return;

        if (audio.ended || audio.paused) {
            $('.rain_recording_carousel').addClass('rain_audio_playing');
            audio.play().then(() => {
                $iconWrapper.html(PAUSE_SVG);
                disableSwiping();
            });
        } else {
            audio.pause();
            $('.rain_recording_carousel').removeClass('rain_audio_playing');
            $iconWrapper.html(PLAY_SVG);
            enableSwiping();
        }
    });

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/loop-carousel.post', function ($scope) {
            if ($scope.hasClass('rain_recording_carousel')) {
                setTimeout(() => {
                    const swiperInstance = $scope.find('.swiper').data('swiper');
                    if (swiperInstance) {
                        rainSwiper = swiperInstance;
                        rainSwiper.on('slideChange', () => {
                            $('.loop_item_audio_container').removeClass('active');
                            $('.rain_recording_carousel').removeClass('rain_audio_paused');
                        });
                    }
                }, 1000);
            }
        });
    });

    $(document).on('click', '.elementor-swiper-button-next, .elementor-swiper-button-prev, .swiper-pagination-bullet', function () {
        if (!$('.rain_recording_carousel').hasClass('rain_audio_playing')) {
            resetAllUI();
        }
    });

})(jQuery);