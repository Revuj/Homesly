<?php 
include_once('tpl_authentication.php');
session_start();
function draw_header() { ?>
    <!DOCTYPE html>

    <html>

    <head>
        <title>HOMES.LY</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        <link rel="stylesheet" type="text/css" href="../css/mainpagestyle.css">
        <link rel="stylesheet" type="text/css" href="../css/placesliststyle.css">
        <link rel="stylesheet" type="text/css" href="../css/detailviewstyle.css">
        <link rel="stylesheet" type="text/css" href="../css/profilestyle.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        <script src="../js/main.js" defer></script>
    </head>

    <body>

    <header>
        <nav id="navbar" class="navbar">
            <a href="../pages/homepage.php"><img id="logo" src="../images/homesly.png" alt="logo"></img></a>
            <ul>
                <li><a href="../pages/placeslist.php">Book</a></li>
                <li><a href=../pages/hostplace.php>Host</a></li>
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) { ?>
                    <li><a id="logout_button" href="../actions/action_logout.php">Logout</a></li>
                    <li><a id="username_button" href="../pages/profile.php"><i class="far fa-user-circle"></i></a></li>
                <?php }
                else { ?>
                    <li><a id="signup_button" href="#">Signup</a></li>
                    <li><a id="login_button" href="#">Login</a></li>
                <?php }
                ?>

                <a class="searchMenu"><i class="fas fa-search-location"></i></a>
                <a class="hamburguerMenu"><i class="fa fa-bars"></i></a>
            </ul>
        </nav>
    </header>

    <?php draw_login();
    draw_signup(); ?>
    <?php }

function draw_footer() { ?>
    <footer>
        <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Use Terms</a></li>
            <li><a href="#">Cookies</a></li>
        </ul>
        <ul>
            <li><img src="../images/facebook.png" alt="facebook link"></li>
            <li><img src="../images/instagram.png" alt="instagram link"></li>
            <li><img src="../images/youtube.png" alt="youtube link"></li>
        </ul>
    </footer>
    </body>
    </html>
<?php }

// draws a search bar 
function draw_search_bar() { ?>

<?php }

// draws a form that allows an user to add a new place if logged in
function draw_input_place() { ?>
    <section class="form-3">
        <h2>Host your Place!</h2>
        <form method="post" action="../actions/action_host_place.php">
        <label>Title<input type="text" name="title" placeholder="title" required></label>
        <label>Description<input type="text" name="description" placeholder="about" required></label>
        <label>Location<input type="text" name="location" placeholder="where" required></label>
        <label>Price/Day<input type="number" name="price_per_day" placeholder="price/day" min="1" required></label>
        <button type="submit">Host Place</button>
        </form>
    </section>
<?php }

?>