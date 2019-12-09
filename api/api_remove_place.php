<?php
    include_once('../database/db_users.php');

    $place_id = $_POST['place_id'];

    echo json_encode(removePlace($place_id));
?>