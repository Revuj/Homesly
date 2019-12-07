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
 * Draws the information of a place 
 */
function listItem($place) { ?>
  <article class="place_overview">
    <a href="../pages/item.php?id=<?=$place['place_id']?>">
      <div class="place_img">
        <img src="../images/test.jpg" />
        <i class="far fa-heart"></i>
        <i class="fas fa-heart"></i>
      </div>
      <div class="place_details">
        <p class="place_location"> <?=$place['place_location']?> </p>
        <p class="place_title"> <?=$place['place_title']?> </p>
        <p class="place_price"> <?=$place['place_price_per_day']?> </p>
        <p class="place_description"> <?=$place['place_description']?> </p>
      </div>
    </a>
  </article>
<?php }


/**
 * Draws the detailed information of a place 
 */
function pageDetailItem($place, $images) { ?>
  <section class="container_detail">
      <script type='text/javascript'>
      <?php 
        $images2 = getAllImagesFromPlace($place['place_id']);
        foreach($images2 as $image) {
            array_push($images, "../images/uploads/" . $image['image_id'] . ".png");
        }
        echo 'let imgs = '.json_encode($images).';'; 
      ?>
      </script>
      <div class="images_container">
        <div class="full_width_image"
          style="background-image: url(<?=$images[0]?>);">
        </div>
        <i class="fas fa-chevron-left left_arrow_image"></i>
        <i class="fas fa-chevron-right right_arrow_image"></i>
      </div>

      <div class="container_detail_content">
        <div id="col-1">
          <h1 class="detail_title"> <?=$place['place_title']?> </h2>
          <h3 class="detail_location"> <?=$place['place_location']?> </h3>
          <p class="detail_description"> <?=$place['place_description']?> </p>
        </div>
        <div id="col-2">
          <div class="host_info">
            <img id="place_host" src="../images/profile_icon.png"/>
            <div class="user_detail_content">
              <h4>Owner</h4>
              <h5> <?=$place['place_owner']?> </h5>
            </div>           
          </div>

          <div class="form-1 book-form">
          <h3 class="place_price"><?=$place['place_price_per_day']?></h3>
            <form method="post" action="../actions/action_book_place.php">
                <input type="hidden" name="place_id" value="<?=$place['place_id']?>">
                <label>Checkin<input type="date" value="" name="checkin" placeholder="mm/dd/yyyy" ></label>
                <label>Checkout<input type="date" value="" name="checkout" placeholder="mm/dd/yyyy" ></label>
                <label>Guests<input type="number" value="1" min="1" name="guests" placeholder="Guests" ></label>
                <p id="calculated_price">Total: <?=$place['place_price_per_day']?> €</p>
                <button type="submit">Book</button>
            </form>
          </div>
        </div>
      </div>
  </section>
<?php }


?>
