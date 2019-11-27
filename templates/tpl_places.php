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
function pageDetailItem($place, $images) { ?>
  <div class="container_detail">
      <script type='text/javascript'>
      <?php echo 'let imgs = '.json_encode($images).';'; ?>
      </script>
      <script src="../js/pageDetail.js" defer></script>
      <img class="full_width_image"  src="<?=$images[0]?>"/>
      <img class="left_arrow_image"  src="../images/left_arrow.png"/>
      <img class="right_arrow_image"  src="../images/right_arrow.png"/>

      <div class="container_detail_content">

        <div id="col-1">
          <h1> <?=$place['place_title']?> </h2>
          <h3 class="detail_location"> <?=$place['place_location']?> </h3>
          <p class=""> <?=$place['place_description']?> </p>
        </div>
        <div id="col-2">
          <div>
            <img class="user_detail_content" src="../images/profile_icon.png" width="75" height="75"/>
            <div class="user_detail_content">
              <h3>Owner</h3>
              <h3> <?=$place['place_owner']?> </h3>
            </div>
            
          </div>
          <h2 class="place_price"> <?=$place['place_price_per_day']?> € / day</h2>
          
          
          
        </div>

      </div>

  </div>
<?php }


?>
