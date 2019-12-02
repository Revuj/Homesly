<?php
    include_once('../includes/session.php');
    include_once('../database/db_places.php');

    // Verify if user is logged in
    if (!isset($_SESSION['username'])) {
        //Javascript alert to the client
        $message = "You must be logged in to host a place!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    else {
        $place_title = $_POST['title'];
        $place_description = $_POST['description'];
        $place_location = $_POST['location'];
        $place_price = $_POST['price_per_day'];
    
        insertPlace($place_title, $place_description, $place_location, $place_price, $_SESSION['username']);   
    }
    header('Location: ../pages/homepage.php');
?>