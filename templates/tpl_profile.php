<?php
    include_once("../database/db_places.php");
    include_once("../database/db_users.php");

    function draw_profile($username) { ?>
    <section id="profile">
        <?php drawRemoveModal() ?>
        <div id="profile_sidebar">
            <img id="profile_image" src="../images/users/<?=$username?>.png" onerror="this.onerror=null; this.src='../images/profile_icon.png'" alt=<?=$username?> value=<?=$username?> />
            <ul id="user_details">
            <li><h4> Hi, I'm <?=$username?>!</h4></li>
            <form id="upload_profile_image" method="post" action="../actions/action_change_profile_image.php" enctype="multipart/form-data">
                <input type="hidden" name="csrf" value="<?=$_SESSION['csrf']?>">
                <input type="file" name="fileUpload" >
            </form>
                <button id="edit_profile"><i class="far fa-edit"></i> Edit Profile</button>
                <li><p contentEditable=false id="user_bio"><?php getUserBio($username)?></p></li>
                <li><i class="far fa-envelope"></i> <span id="email">teste111@gmail.com</span></li>
                <li><i class="fas fa-phone"></i> <span id="phone"><em><strong>936 382 932</strong></em></span></li>
                <li><i class="fas fa-search-location"></i> <span id="location">Porto</span></li>
                <button id="save_profile"><i class="far fa-save"></i> Save</button>
            </ul>
        </div>
        <div id="user_info">
            <div id="nav_container">
                <nav class="navbar">
                    <ul>
                        <li class="active">Reservations</li>
                        <li>Your Places</li>
                        <li>Reviews</li>
                    </ul>
                </nav>
            </div>
            <?php 
                draw_user_reservations($username);
                draw_user_places($username);
                draw_user_reviews($username);
            ?>
        </div>
    </section>
    <?php }
?>

<?php
/**
 * Draws a remove item modal
 */
function drawRemoveModal() { ?>
  <section class="form-1 modal remove_modal" id="remove_modal">
    <section class="modal_content">

      <span onclick="document.getElementById('remove_modal').style.display='none'" class="close" title="Close Modal"><i class="fas fa-times"></i></span>

      <h2>Are you sure you want to remove this item?</h2>

        <button type="submit">Remove</button>
        <button type="submit">Cancel</button>

    </section>
  </section>

<?php }
?>

<?php
    function draw_user_reservations($username) { ?>
    <section id="user_reservations" class="profile_places"> <?php
        $user_reservations = getUserReservations($username);
        if (count($user_reservations) == 0) { ?>
        <div class="first_reservation">   
            <a class="add_reservation" href="../pages/placeslist.php"> <img src="../images/first_reservation.png"/> </a>
            <h3>Get Ready For a New Adventure!</h3>
        </div>
        <?php }
        foreach($user_reservations as $reservation) {
            listReservation($reservation);
        } ?>
    </section>
    <?php }
?>

<?php
    include_once("tpl_places.php"); // a alterar
    function draw_user_places($username) { ?>
    <section id="user_places" class="profile_places"> <?php
        $user_places = getUserPlaces($username);
        if (count($user_places) == 0) { ?>
            <div class="first_reservation first_place">
                <a class="add_reservation" href="../pages/hostplace.php"> <img src="../images/first_place.png"/> </a>
                <h3>Host Your Place!</h3>
            </div>
        <?php }
        foreach($user_places as $place) {
            listItem($place);
        } ?>
    </section>
    <?php }
?>

<?php
    function draw_user_reviews($username) { ?>
    <section id="user_reviews" class="profile_places"> <?php
        $user_reviews = getUserReviews($username);
        foreach($user_reviews as $review) {
            drawReview($review);
        } ?>
    </section>
    <?php }
?>