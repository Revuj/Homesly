<?php
    include_once('../database/db_places.php');

    $place_id = $_POST['place_id'];
    $title = $_POST['title'];
    $location = $_POST['location'];
    $description = $_POST['description'];

    echo json_encode(updatePlace($place_id, $title, $location, $description));
?>