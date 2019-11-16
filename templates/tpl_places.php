<?php
/**
 * Draws a list of places that receives as an arguement
 */
function listPlaces($places) { ?>
  <article class="places">
      <?php
        foreach($places as $place) { 
            listItem($place);
        }
      ?>
  </article>
<?php
}

/**
 * Draws the information of a place
 */
function listItem($place) { ?>
    <p> <?=$place['place_title']?> </p>
    <p> <?=$place['place_description']?> </p>
    <p> <?=$place['place_location']?> </p>
    <p> <?=$place['place_price_per_day']?> </p>
<?php }
?>
