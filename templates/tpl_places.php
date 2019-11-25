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
      <i class="far fa-heart"></i>
      <i class="fas fa-heart"></i>
      <p class="place_location"> <?=$place['place_location']?> </p>
      <p class="place_title"> <?=$place['place_title']?> </p>
      <p class="place_price"> <?=$place['place_price_per_day']?> € / day</p>
    </a>
  </article>
<?php }
?>
