<?php
    include_once("../database/db_places.php");
    function draw_profile($username) { ?>
    <section id="profile">
        <div id="profile_sidebar">
            <img id="profile_image" src="https://avatars0.githubusercontent.com/u/41621540?s=400&v=4" alt=<?=$username?>/>
            <ul id="user_details">
                <li><h4> Hi, I'm <?=$username?>!</h4></li>
                <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi numquam in nemo distinctio doloremque tenetur tempora fugiat vel excepturi, fugit praesentium magnam at et id adipisci quas nobis error!                </p></li>
                <li>teste111@gmail.com</li>
                <li><em><strong>936 382 932</strong></em></li>
                <li>Porto</li>
            </ul>
        </div>
        <div id="user_info">
            <nav class="navbar">
                <ul>
                    <li class="active">Reservations</li>
                    <li>Your Places</li>
                    <li>Reviews</li>
                </ul>
            </nav>
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
    function draw_user_reservations($username) { ?>
    <section id="user_reservations">
        <h1>Reservations</h1>
    </section>
    <?php }
?>

<?php
    include_once("tpl_places.php"); // a alterar
    function draw_user_places($username) { ?>
    <section id="user_places"> <?php
        $user_places = getUserPlaces($username);
        foreach($user_places as $place) {
            listItem($place);
        } ?>
    </section>
    <?php }
?>

<?php
    function draw_user_reviews($username) { ?>
    <section id="user_reviews">
        <h1>Reviews</h1>
    </section>
    <?php }
?>