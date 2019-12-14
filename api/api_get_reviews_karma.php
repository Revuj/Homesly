<?php
    include_once('../database/db_places.php');

    $review_ids = json_decode($_POST['review_ids']);
    $review_karmas = [];
    for ($i = 0; $i < count($review_ids); $i++) {
        $review_karmas[$i] = getReviewKarma($review_ids[$i]);
    }

    echo json_encode($review_karmas);
?>