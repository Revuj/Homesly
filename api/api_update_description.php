<?php
    include_once('../database/db_users.php');

    $username = $_POST['username'];
    $bio = $_POST['bio'];

    echo json_encode(updateUserBio($username, $bio));
?>