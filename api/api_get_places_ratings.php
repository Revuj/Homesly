<?php
    include_once('../database/db_places.php');

    echo json_encode(getAllPlacesRatings());
?>