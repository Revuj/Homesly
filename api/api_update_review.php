<?php
    include_once('../database/db_users.php');

    $review_id = $_POST['review_id'];
    $review_content = $_POST['review_content'];
    $rating = $_POST['rating'];

    echo json_encode(updateUserReview($review_id, $review_content, $rating));
?>