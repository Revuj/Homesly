<?php
    include_once('../database/db_places.php');
    include_once('../templates/tpl_common.php');
    include_once('../templates/tpl_places.php');
    draw_header();
    draw_search_bar(); 
    
    // Gets list with all the places -> later to be filtered with search input

    // não está a funcionar bem -> perguntar à stora
    /*
    if (isset($location)) {
        $location = $_GET['location'];
    }
    else {
        $location = '';
    }
    if (isset($checkin)) 
        $checkin = $_GET['checkin'];
    else
        $checkin = '';
    if (isset($checkout)) 
        $checkout = $_GET['checkout'];
    else
        $checkout = '';
    if (isset($guests)) 
        $guests = $_GET['guests'];
    else
        $guests = '';
    
    $places_list = getPlacesFiltered($_GET['location'], $checkin, $checkout, $guests);
    */
    $places_list = getAllPlaces();
    listPlaces($places_list);
    draw_footer();
?>