<?php
    include_once('../templates/tpl_common.php');
    include_once('../templates/tpl_places.php');
    draw_header();
    draw_search_bar(); //to implement in tpl_common (check mockups)
    list_places();
    draw_footer();
?>