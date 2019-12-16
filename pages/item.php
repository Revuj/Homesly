<?php
  include_once('../database/db_places.php');
  include_once('../templates/tpl_common.php');
  include_once('../templates/tpl_places.php');

  if (!isset($_GET['id']))
    die("No id!");

  $place = getPlaceWithId($_GET['id']);

  if (!isset($place) || empty($place))
    die("The place you where looking for is unnavailable!");

  draw_header();
  

  $place_images = getAllImagesFromPlace($place['place_id']);
  $images_paths = [];
  foreach($place_images as $image) {
      array_push($images_paths, "../images/uploads/" . $image['image_id'] . ".png");
  }

  pageDetailItem($place, $images_paths);
  draw_footer();
?>