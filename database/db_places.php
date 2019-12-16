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
 * Returns the list of places available according to input filters
 */
function getPlacesFiltered($location, $checkin, $checkout, $guests) {
    $db = Database::instance()->db();
    $query = 'SELECT * FROM place WHERE 1 ';
    $query_arguements = array();
    if ($location) {
        $query .= 'AND place_location = ?';
        array_push($query_arguements, $location);
    }
    if ($guests) {
        $query .= 'AND place_bedrooms >= ?';
        array_push($query_arguements, $guests);
    }
    if ($checkin && $checkout) {
        $query .= 'AND place_id NOT IN (SELECT place_id FROM place, reservation
        WHERE place.place_id = reservation.place
        AND ((reservation.first_night >= ?  AND reservation.first_night <= ?)
        OR (reservation.last_night >= ?  AND reservation.last_night <= ?)
        OR (reservation.first_night <= ? AND reservation.last_night >= ?)))';
        array_push($query_arguements, $checkin, $checkout, $checkin, $checkout, $checkin, $checkout);
    }

    $stmt = $db->prepare($query);
    $stmt->execute($query_arguements);

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
                        AND reservation.guest = ?
                        ORDER BY reservation.first_night');
    $stmt->execute(array($username));
    return $stmt->fetchAll(); 
}

/**
 * Returns the places belonging to a certain user.
 */
function getPlaceReservations($place) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * 
                        FROM reservation 
                        WHERE reservation.place = ?');
    $stmt->execute(array($place));
    return $stmt->fetchAll(); 
}

/**
 * Returns the reviews done by a certain user.
 */
function getUserReviews($username) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * FROM review WHERE username = ?');
    $stmt->execute(array($username));
    return $stmt->fetchAll(); 
} 

/**
 * Inserts place on databse
 */
function insertPlace($place_title, $place_description, $place_location, $place_price, $place_owner, $place_showers, $place_bedrooms, $place_heating, $place_view, $place_wifi, $place_parking) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO place VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute(array(NULL, $place_title, $place_description, $place_location, $place_price, $place_owner, $place_showers, $place_bedrooms, $place_heating, $place_view, $place_wifi, $place_parking));   
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

/**
 * Gets reviews for a specific place, ordered by ascending date
 */
function getPlaceReviewsAscDate($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM review WHERE place_id = ? ORDER BY published ASC");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
}

/**
 * Gets reviews for a specific place, ordered by descending date
 */
function getPlaceReviewsDescDate($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM review WHERE place_id = ? ORDER BY published DESC");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
}

/**
 * Gets reviews for a specific place, ordered by best to worst rating
 */
function getPlaceReviewsBestRating($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM review WHERE place_id = ? ORDER BY rating DESC");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
}

/**
 * Gets reviews for a specific place, ordered by worst to best rating
 */
function getPlaceReviewsWorstRating($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT * FROM review WHERE place_id = ? ORDER BY rating ASC");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll();
}

/**
 * Gets place's average rating
 */
 function getPlaceRating($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT avg(rating) FROM review WHERE place_id = ?");
    $stmt->execute(array($place_id));
    return $stmt->fetchAll()[0]['avg(rating)'];
 }

/**
 * Gets all ratings left on each place
 */
function getAllPlacesRatings() {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT place.place_id, review.rating
    FROM place, review
    WHERE place.place_id = review.place_id");
    $stmt->execute();
    return $stmt->fetchAll();
 }

/**
 * Gets all reservations booked on each place
 */
function getAllPlacesReservations() {
    $db = Database::instance()->db();
    $stmt = $db->prepare("SELECT place.place_id
    FROM place, reservation
    WHERE place.place_id = reservation.place");
    $stmt->execute();
    return $stmt->fetchAll();
 } 

/**
* Adds a review to a certain place
*/
function addReview($place_id, $username, $text, $date, $rating) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO review VALUES(?, ?, ?, ?, ?, ?)");
    $stmt->execute(array(NULL, $place_id, $username, $date, $text, $rating));
    $stmt = $db->prepare("SELECT * FROM review ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $review_id = $stmt->fetchAll()[0]['id'];
    $stmt = $db->prepare("INSERT INTO upvote VALUES(?, ?)");
    $stmt->execute(array($username, $review_id));
    return array($review_id, $username, $date, $text, $rating);
}

function getReviewKarma($review_id) {
    $db = Database::instance()->db();

    $stmt = $db->prepare("SELECT * FROM upvote WHERE review = ?");
    $stmt->execute(array($review_id));
    $upvotes = count($stmt->fetchAll());

    $stmt = $db->prepare("SELECT * FROM downvote WHERE review = ?");
    $stmt->execute(array($review_id));
    $downvotes = count($stmt->fetchAll());

    return $upvotes - $downvotes;
}

function upvoteReview($username, $review_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO upvote VALUES(?, ?)");
    $stmt->execute(array($username, $review_id));
    return array($username, $review_id);
}

function removeUpvote($username, $review_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('DELETE FROM upvote WHERE user = ? AND review = ?');
    $stmt->execute(array($username, $review_id));
    return array($username, $review_id); 
}

function downvoteReview($username, $review_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare("INSERT INTO downvote VALUES(?, ?)");
    $stmt->execute(array($username, $review_id));
    return array($username, $review_id);
}

function removeDownvote($username, $review_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('DELETE FROM downvote WHERE user = ? AND review = ?');
    $stmt->execute(array($username, $review_id));
    return array($username, $review_id); 
}

function updatePlace($place_id, $title, $location, $description) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('UPDATE place SET place_title = ?, place_location = ?, place_description = ? WHERE place_id = ?');
    $stmt->execute(array($title, $location, $description, $place_id));
    return array($place_id, $title, $location, $description);   
  }

?>
