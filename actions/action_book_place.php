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
        $place_id = $_POST['place_id'];

        list($place_checkin, $place_checkout) = explode(' - ', $_POST['date_range']);

        if (validateDate($place_checkin) && validateDate($place_checkout)){
            insertReservation($place_checkin, $place_checkout, $place_guest, $place_id);
        }

        // $place_range = $_POST['date_range'];

        
    }
    header('Location: ../pages/placeslist.php');



    function validateDate($date, $format = 'Y-m-d')
    {
        $d = DateTime::createFromFormat($format, $date);
        // The Y ( 4 digits year ) returns TRUE for any integer with any number of digits so changing the comparison from == to === fixes the issue.
        return $d && $d->format($format) === $date;
    }
?>