<?php
function draw_main_page() { ?>
    <div class="bgimg-1">
        <section id="search-1">
            <p>Travel Anywhere...</p>
            <form method="post" action="../actions/action_search.php">
                <label>Location<input type="text" name="location" placeholder="Where" ></label>
                <label>Checkin<input type="date" name="checkin" placeholder="mm/dd/yyyy" ></label>
                <label>Checkout<input type="date" name="checkout" placeholder="mm/dd/yyyy" ></label>
                <label>Guests<input type="number" min="0" name="guests" placeholder="Guests" ></label>
                <input type="submit" value="Search">
            </form>
        </section>
    </div>
<?php }
?>