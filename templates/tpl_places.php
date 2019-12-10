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
    <i value=<?=$place['place_id']?> class="fas fa-trash"></i>
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
 * Draws the information of a reservation 
 */
function listReservation($reservation) { ?>
  <article class="place_overview">
    <i value=<?=$reservation['reservation_id']?> class="fas fa-trash"></i>
    <a href="../pages/item.php?id=<?=$reservation['place_id']?>">
      <div class="place_img">
        <img src="../images/test.jpg" />
        <time class="icon checkin" datetime= <?=$reservation['first_night']?> >
          <em>Sat</em>
          <strong>Sep</strong>
          <span>20</span>
        </time>
        <time class="icon checkout" datetime= <?=$reservation['last_night']?> >
          <em>Sun</em>
          <strong>Sep</strong>
          <span>28</span>
        </time>  
      </div>
      <div class="place_details">
        <p class="place_location"> <?=$reservation['place_location']?> </p>
        <p class="place_title"> <?=$reservation['place_title']?> </p>
        <p class="reservation_price"> <?=$reservation['place_price_per_day']?> €</p>
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
      <section class="place_reviews">
      <?php drawPlaceReviews($place);
      if (isset($_SESSION['username'])) {
        drawInputReview($place['place_id']);
      }
      ?>
    </section>  
  </section>
<?php }

function drawPlaceReviews($place) { ?>
    <?php
      $reviews = getPlaceReviews($place['place_id']);
      foreach(array_reverse($reviews) as $review) {
        drawReview($review);
      }
    ?>
    <h3 class="more_reviews">Show More...</h3>
<?php }

function drawReview($review) { ?>
  <div class="place_review">
      <span class="id"><?=$review['id']?></span>
      <h3><?=$review['username']?> </h3>
      <img src="../images/profile_icon.png" />
      <h4><?=$review['published']?> </h4>
      <div class="rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i>
      </div>
      <p><?=$review['content']?> </p>
      <div class="votes">
        <i class="fas fa-chevron-up"></i>
        <p>20</p>
        <i class="fas fa-chevron-down"></i>
      </div>
      <a href="../pages/item.php?id=<?=$review['place_id']?>"><i class="fas fa-link"></i> Go To Place</a>
  </div>
<?php }

function drawInputReview($place_id) { ?>
  <div class="place_review">
      <h3><?=$_SESSION['username']?> </h3>
      <img src="../images/profile_icon.png" />
      <div class="rating">
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
      </div>
      <form class="input_review">
        <textarea placeholder="What do you think of this place?" name="text"></textarea>
        <input type="hidden" name="place_id" value="<?=$place_id?>">
        <input type="hidden" name="username" value="<?=$_SESSION['username']?>">
        <button>Add Review</button>
      </form>
  </div>
<?php }

?>
