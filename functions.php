<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if (!function_exists('chld_thm_cfg_locale_css')):
    function chld_thm_cfg_locale_css($uri)
    {
        if (empty($uri) && is_rtl() && file_exists(get_template_directory() . '/rtl.css'))
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter('locale_stylesheet_uri', 'chld_thm_cfg_locale_css');

if (!function_exists('child_theme_configurator_css')):
    function child_theme_configurator_css()
    {
        wp_enqueue_style('chld_thm_cfg_child', trailingslashit(get_stylesheet_directory_uri()) . 'style.css', array('hello-elementor', 'hello-elementor-theme-style', 'hello-elementor-header-footer'));
    }
endif;
add_action('wp_enqueue_scripts', 'child_theme_configurator_css', 10);

// END ENQUEUE PARENT ACTION
function enqueue_child_assets_style()
{
    wp_enqueue_style('child-custom-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), filemtime(get_stylesheet_directory() . '/assets/css/style.css'));
    wp_enqueue_script('child-custom-js', get_stylesheet_directory_uri() . '/assets/js/app.js', array('jquery'), filemtime(get_stylesheet_directory() . '/assets/js/app.js'), true);

    // Enqueue rain audio loop
    wp_enqueue_script('rain-audio-loop-script', get_stylesheet_directory_uri() . '/rain_audio_loop/rain_audio_loop.js', array(), filemtime(get_stylesheet_directory() . '/rain_audio_loop/rain_audio_loop.js'), true);
}
add_action('wp_enqueue_scripts', 'enqueue_child_assets_style', 20);

// Include shortcodes
require_once(get_stylesheet_directory() . '/rain_audio_loop/rain_audio_loop.php');