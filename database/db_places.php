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

/**
 * Inserts place on databse
 */
function insertPlace($place_title, $place_description, $place_location, $place_price, $place_owner) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('INSERT INTO place VALUES(?, ?, ?, ?, ?, ?)');
    $stmt->execute(array(NULL, $place_title, $place_description, $place_location, $place_price, $place_owner));   
}
?>