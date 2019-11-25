<?php
function draw_main_page() { ?>
    <img id="main-background" src="../images/background.jpg"/>
    <div class="bgimg-1">
        <section class="form-1">
            <h2>Travel Anywhere...</h2>
            <form method="get" action="../pages/placeslist.php">
                <label>Location<input type="text" value="" name="location" placeholder="Where" ></label>
                <label>Checkin<input type="date" value="" name="checkin" placeholder="mm/dd/yyyy" ></label>
                <label>Checkout<input type="date" value="" name="checkout" placeholder="mm/dd/yyyy" ></label>
                <label>Guests<input type="number" value="" min="0" name="guests" placeholder="Guests" ></label>
                <button type="submit">Search</button>
            </form>
        </section>
    </div>
<?php }
?>