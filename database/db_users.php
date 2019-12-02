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
  }
?>