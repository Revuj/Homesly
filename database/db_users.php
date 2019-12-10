<?php
  include_once('../includes/database.php');

  /**
   * Verifies if a certain username, password combination
   * exists in the database. Use the sha1 hashing function.
   */
  function checkUserPassword($username, $password) {
    $db = Database::instance()->db();

    $stmt = $db->prepare('SELECT * FROM user WHERE username = ?');
    $stmt->execute(array($username));

    $user = $stmt->fetch();
    return $user !== false && password_verify($password, $user['password']);
  }

  function insertUser($username, $password, $bio) {
    $db = Database::instance()->db();

    $options = ['cost' => 12];

    $stmt = $db->prepare('INSERT INTO user VALUES(?, ?, ?)');
    $stmt->execute(array($username, password_hash($password, PASSWORD_DEFAULT, $options), $bio));
  }

  function getUserBio ($username) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT bio FROM user WHERE username = ?');
    $stmt->execute(array($username));
    $bio = $stmt->fetch()['bio'];
    if ($bio == '') {
      echo 'Tell Us About Yourself';
    }
    echo $bio;
  }

  function updateUserBio($username, $bio) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('UPDATE user SET bio = ? WHERE username = ?');
    $stmt->execute(array($bio, $username));
    return array($username, $bio);    
  }

  function removeUserReservation($reservation_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('DELETE FROM reservation WHERE reservation_id = ?');
    $stmt->execute(array($reservation_id));
    return array($reservation_id);   
  }

  function removePlace($place_id) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('DELETE FROM place WHERE place_id = ?');
    $stmt->execute(array($place_id));
    return array($place_id);   
  }

  function updateUserReview($review_id, $review_content, $rating) {
    $db = Database::instance()->db();
    $stmt = $db->prepare('UPDATE review SET content = ?, rating = ? WHERE id = ?');
    $stmt->execute(array($review_content, $rating, $review_id));
    return array($review_id, $review_content, $rating);   
  }

?>