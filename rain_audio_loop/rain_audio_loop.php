<?php
function acf_audio_loop_shortcode() {
    $post_id = get_the_ID();
    if (!$post_id) return '';

    $audio = get_field('audio', $post_id);
    if (!$audio) return '';

    $audio_url = is_array($audio) ? $audio['url'] : $audio;
    $id = esc_attr($post_id);

    ob_start(); ?>
    <div class="audio_container audio_id-<?php echo $id; ?> custom-audio-player">
        <audio id="audio_node_<?php echo $id; ?>" class="native-audio-node" preload="auto">
            <source src="<?php echo esc_url($audio_url); ?>" type="audio/mpeg">
        </audio>

        <div class="slider-wrapper">
            <input type="range" class="seek-slider" value="0" min="0" step="0.1">
            <div class="time-row">
                <span class="current-time">00:00</span>
                <span class="total-duration">00:00</span>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('acf_audio', 'acf_audio_loop_shortcode');