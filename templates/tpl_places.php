<?php
/**
 * Draws a list of places that receives as an arguement
 */
function listPlaces($places) { ?>
  <section class="form-2">
      <form method="get" action="../pages/placeslist.php">
          <label><input type="text" value="" name="location" placeholder="Where" ></label>
          <label><input type="date" value="" name="checkin" placeholder="mm/dd/yyyy" ></label>
          <label><input type="date" value="" name="checkout" placeholder="mm/dd/yyyy" ></label>
          <label><input type="number" value="" min="0" name="guests" placeholder="Guests" ></label>
          <button type="submit"><i class="fas fa-search"></i></button>
      </form>
  </section>
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

/**
 * Draws the detailed information of a place 
 */
function pageDetailItem($place) { ?>
  <div>
    <!-- <a href="../pages/item.php?id=<?=$place['place_id']?>"> -->
      <img src="../images/test.jpg" />
      <!-- <i class="far fa-heart"></i>
      <i class="fas fa-heart"></i> -->
      <p class="place_title"> <?=$place['place_title']?> </p>
      <p class="place_location"> <?=$place['place_location']?> </p>
      <p class=""> <?=$place['place_description']?> </p>
      <p class="place_price"> <?=$place['place_price_per_day']?> € / day</p>
      <p class=""> <?=$place['place_owner']?> </p>
    <!-- </a> -->
  </div>
<?php }


?>
