<?php
/**
 * Draws a list of places that receives as an arguement
 */
function listPlaces($places) { ?>
  <article class="places_list">
      <?php
        foreach($places as $place) { 
            listItem($place);
        }
      ?>
  </article>
<?php
}

/**
 * Draws the information of a place (a alterar)
 */
function listItem($place) { ?>
  <article class="place_overview">
    <a href="../pages/item.php?id=<?=$place['place_id']?>">
      <img src="../images/test.jpg" />
      <p> <?=$place['place_price_per_day']?> </p>
      <p> <?=$place['place_title']?> </p>
      <p> <?=$place['place_location']?> </p>
    </a>
  </article>
<?php }
?>
