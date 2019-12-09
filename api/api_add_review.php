<?php
    include_once('../database/db_places.php');

    $place_id = $_POST['place_id'];
    $username = $_POST['username'];
    $text = $_POST['text'];
    date_default_timezone_set('Portugal');
    $date = date('Y/m/d', time());

    echo json_encode(addReview($place_id, $username, $text, $date));
?>