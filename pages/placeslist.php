<?php
    include_once('../database/db_places.php');
    include_once('../templates/tpl_common.php');
    include_once('../templates/tpl_places.php');
    draw_header();
    draw_search_bar(); //to implement in tpl_common (check mockups)
    
    // Gets list with all the places -> later to be filtered with search input
    $places_list = getAllPlaces();
    listPlaces($places_list);
    draw_footer();
?>