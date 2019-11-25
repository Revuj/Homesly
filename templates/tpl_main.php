<?php
function draw_main_page() { ?>
    <img id="main-background" src="../images/background.jpg"/>
    <div class="bgimg-1">
        <section class="form-1">
            <h2>Travel Anywhere...</h2>
            <form method="post" action="../actions/action_search.php">
                <label>Location<input type="text" name="location" placeholder="Where" ></label>
                <label>Checkin<input type="date" name="checkin" placeholder="mm/dd/yyyy" ></label>
                <label>Checkout<input type="date" name="checkout" placeholder="mm/dd/yyyy" ></label>
                <label>Guests<input type="number" min="0" name="guests" placeholder="Guests" ></label>
                <button type="submit">Search</button>
            </form>
        </section>
    </div>
<?php }
?>