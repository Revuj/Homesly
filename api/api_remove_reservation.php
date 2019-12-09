<?php
    include_once('../database/db_users.php');

    $reservation_id = $_POST['reservation_id'];

    echo json_encode(removeUserReservation($reservation_id));
?>