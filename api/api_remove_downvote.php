<?php
    include_once('../database/db_places.php');

    $username = $_POST['username'];
    $review_id = $_POST['review_id'];

    echo json_encode(removeDownvote($username, $review_id));
?>