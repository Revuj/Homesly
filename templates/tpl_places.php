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
      <div class="display_buttons">
        <img class="grid" src="../images/grid_icon.png" />
        <img class="list" src="../images/list_icon.png" />
      </div>
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
      <i value=<?=$place['place_id']?> id="value_detail_place"></i>
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
          <h1 id="title_detail_place" class="detail_title" contentEditable=false> <?=$place['place_title']?> </h2>
          <h3 id="location_detail_place" class="detail_location"> <?=$place['place_location']?> </h3>
          <p id="description_detail_place" class="detail_description"> <?=$place['place_description']?> </p>
        </div>
        <div id="col-2">
          <?php 
          if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true && $_SESSION['username'] == $place['place_owner']){
            echo '<button id="edit_place"><i class="far fa-edit"></i> Edit Place</button>';
          }
          ?>
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
        <?php
          $whole_stars = floor($review['rating']);
          $half_stars = $review['rating'] - $whole_stars;
          $counter = 0;
          while($counter < $whole_stars) {
            echo '<i class="fas fa-star"></i> ';
            $counter++;
          }
          if ($half_stars != 0) {
            echo '<i class="fas fa-star-half-alt"></i> ';
            $counter++;
          }
          while($counter < 5) {
            echo '<i class="far fa-star"></i> ';
            $counter++;
          }
        ?>
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
      <form class="input_review">
      <div class="rating">
        <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
        <input type="radio" id="star4half" name="rating" value="4.5" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
        <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
        <input type="radio" id="star3half" name="rating" value="3.5" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
        <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
        <input type="radio" id="star2half" name="rating" value="2.5" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
        <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
        <input type="radio" id="star1half" name="rating" value="1.5" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
        <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
        <input type="radio" id="starhalf" name="rating" value="0.5" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
      </div>
        <textarea placeholder="What do you think of this place?" name="text"></textarea>
        <input type="hidden" name="place_id" value="<?=$place_id?>">
        <input type="hidden" name="username" value="<?=$_SESSION['username']?>">
        <button>Add Review</button>
      </form>
  </div>
<?php }

?>
