<?php
  include_once('../database/db_places.php');
  include_once('../templates/tpl_common.php');
  include_once('../templates/tpl_places.php');

  if (!isset($_GET['id']))
    die("No id!");

  draw_header();
  //draw_place($_GET['id']); //a implementar em tpl_places que faz uma query com db_places
  draw_footer();
?>