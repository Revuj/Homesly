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
  
  $images = ["../images/test.jpg", "../images/test2.jpg", "../images/test3.jpg"];

  $images2 = getAllImagesFromPlace($place['place_id']);
  foreach($images2 as $image) {
      array_push($images, "../images/uploads/" . $image['image_id'] . ".png");
  }

  pageDetailItem($place, $images);
  draw_footer();
?>