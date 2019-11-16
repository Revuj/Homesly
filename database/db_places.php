<?php
include_once('../includes/database.php');

/**
* Returns the list with all places available in the database
*/
function getAllPlaces() {
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * FROM place');
    $stmt->execute();
    return $stmt->fetchAll();
}   
?>