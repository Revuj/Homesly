<?php
    include_once('../templates/tpl_common.php');
    include_once('../templates/tpl_profile.php');

    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
        $_SESSION['messages'][] = array('type' => 'error', 'content' => 'Must be logged in!');
        header('Location: ../pages/homepage.php');
    }
    draw_header();
    draw_profile($_SESSION['username']);
    draw_footer();
?>