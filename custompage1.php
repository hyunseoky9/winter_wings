<?php /* Template Name: CustomPageT1 */ 
get_header();
add_action( 'wp_enqueue_script', 'load_js');

function load_js() {
	wp_register_script('app', plugins_url('app.js',__FILE__), array('jquery'));
	wp_enqueue_script('app');
}
?>
<!DOCTYPE html>
<html>
<h1 class="rick"> WOBBA LUBBA DUBDUB!! </h1>
</html>
<?php get_footer();