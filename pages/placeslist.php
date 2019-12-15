<?php
    include_once('../database/db_places.php');
    include_once('../templates/tpl_common.php');
    include_once('../templates/tpl_places.php');
    draw_header();
    draw_search_bar(); 
    
    // Gets list with all the places -> later to be filtered with search input
    $location = null;
    $checkin = null;
    $checkout = null;
    $guests = null;
    if (isset($_GET['location'])) 
        $location = $_GET['location'];


    if (isset($_GET['checkin'])) 
        $checkin = $_GET['checkin'];

    if (isset($_GET['checkout'])) 
        $checkout = $_GET['checkout'];

    if (isset($_GET['guests'])) 
        $guests = $_GET['guests'];
    
    $filtered_places = getPlacesFiltered($location, $checkin, $checkout, $guests);
    listPlaces($filtered_places);
    draw_footer();
?>