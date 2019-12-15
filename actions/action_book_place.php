<?php
    include_once('../includes/session.php');
    include_once('../database/db_places.php');

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    // Verify if user is logged in
    if (!isset($_SESSION['username'])) {
        //Javascript alert to the client
        $message = "You must be logged in to host a place!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    } else if ($_SESSION['csrf'] !== $_POST['csrf']){
        $message = "Not a legit request!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    } else {
        $place_guest = $_SESSION['username'];
        $place_checkin = $_POST['checkin'];
        $place_checkout = $_POST['checkout'];
        $place_id = $_POST['place_id'];

        insertReservation($place_checkin, $place_checkout, $place_guest, $place_id);
    }
    header('Location: ../pages/placeslist.php');
?>