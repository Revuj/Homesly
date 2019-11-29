<?php
  include_once('../database/db_places.php');
  include_once('../templates/tpl_common.php');
  include_once('../templates/tpl_places.php');

  if (!isset($_GET['id']))
    die("No id!");

  $place = getPlaceWithId($_GET['id']);

  if (!isset($place))
    die("The place you where looking for is unnavailable!");

  draw_header();
  $images = [];
  $fileString = $place['place_files'];
  $counter = 0;
  while (true) {
    $pos = strpos($fileString, ';', $startIndex);
    if ($pos === false)
      break;
    $fileName = substr($fileString, $startIndex, $pos);
    $fileString = substr($fileString, strlen($fileName) + 1);
    $images[$counter] = $fileName;
    $counter++;
  }
  pageDetailItem($place, $images);
  draw_footer();
?>