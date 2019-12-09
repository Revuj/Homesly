<?php
include_once('../includes/database.php');

/**
* Returns the list with all places available in the database
*/
function getAllPlaces() {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM place");
    $stmt->execute();
    return $stmt->fetchAll();
}   

/**
 * Gets place whose ID equals $id
 */
function getPlaceWithId($id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM place WHERE place_id = $id");
    $stmt->execute();
    return $stmt->fetch();
}

/**
 * Returns the places belonging to a certain user.
 */
function getUserPlaces($username) {
$db = Database::instance()->db();
$stmt = $db->prepare('SELECT * FROM place WHERE place_owner = ?');
$stmt->execute(array($username));
return $stmt->fetchAll(); 
}

/**
 * Returns the places belonging to a certain user.
 */
function getUserReservations($username) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * 
                        FROM place, reservation 
                        WHERE reservation.place = place.place_id
                        AND reservation.guest = ?');
    $stmt->execute(array($username));
    return $stmt->fetchAll(); 
}

/**
* Returns the list with all places available that respect the filters
*/
function getPlacesFiltered($location, $checkin, $checkout, $guests) {
    $db = Database::instance()->db();
    echo $location;
    if ($location != '') {
        $stmt = $db->prepare("SELECT * FROM place WHERE place_location = ?");
        $stmt->execute(array($location));
    }
    else {
        $stmt = $db->prepare("SELECT * FROM place");
        $stmt->execute();
    }
    return $stmt->fetchAll();
}   

/**
 * Inserts place on databse
 */
function insertPlace($place_title, $place_description, $place_location, $place_price, $place_owner) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO place VALUES(?, ?, ?, ?, ?, ?)");
    $stmt->execute(array(NULL, $place_title, $place_description, $place_location, $place_price, $place_owner));   
}

/**
 * Inserts image of place on databse
 */
function insertImageOfPlace($place_id, $image_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO image VALUES(?, ?)");
    $stmt->execute(array($image_id, $place_id));
}

/**
* Returns the list with all images from place available in the database
*/
function getAllImagesFromPlace($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM image WHERE place_of_image = ?");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
} 

/**
 * Gets latest image ID
 */
function getBiggestIdOfImages() {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM image ORDER BY image_id DESC LIMIT 1");
    $stmt->execute();
    $image = $stmt->fetch();
    return $image['image_id'];
}

/**
 * Inserts new reservation on database
 */
function insertReservation($place_checkin, $place_checkout, $place_guest, $place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO reservation VALUES(?, ?, ?, ?, ?)");
    $stmt->execute(array(NULL, $place_checkin, $place_checkout, $place_guest, $place_id));
}

/**
 * Gets reviews for a specific place
 */
function getPlaceReviews($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM review WHERE place_id = ?");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
}
?>
