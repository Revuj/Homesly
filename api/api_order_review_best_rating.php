<?php
    include_once('../database/db_places.php');

    $place_id = $_POST['place_id'];

    echo json_encode(getPlaceReviewsBestRating($place_id));
?>