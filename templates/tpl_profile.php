<?php
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
                    <li>Reservations</li>
                    <li>Your Places</li>
                    <li>Reviews</li>
                </ul>
            </nav>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat totam aperiam unde sequi? Tempore facere totam non vitae, alias vero. Veniam repellendus omnis nam similique quisquam necessitatibus consectetur inventore id.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat totam aperiam unde sequi? Tempore facere totam non vitae, alias vero. Veniam repellendus omnis nam similique quisquam necessitatibus consectetur inventore id.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat totam aperiam unde sequi? Tempore facere totam non vitae, alias vero. Veniam repellendus omnis nam similique quisquam necessitatibus consectetur inventore id.</p>
        </div>
    </section>
    <?php }
?>