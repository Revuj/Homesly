<?php function draw_login() { 
/**
 * Draws the login section.
 */ ?>
  <section class="form-1" id="login">
    
    <section class="login_content">

      <span onclick="document.getElementById('login').style.display='none'" class="close" title="Close Modal">&times;</span>

      <h2>Welcome Back</h2>

      

      <form method="post" action="../actions/action_login.php">
        <input type="text" name="username" placeholder="username" required>
        <input type="password" name="password" placeholder="password" required>
        <button type="submit">Login</button>
      </form>

      <!-- <footer> -->
        <p>Don't have an account? <a href="signup.php">Signup!</a></p>
      <!-- </footer> -->

    </section>

  </section>
<?php } ?>

<?php function draw_signup() { 
/**
 * Draws the signup section.
 */ ?>
  <section class="form-1" id="signup">

    <section class="login_content">

      <span onclick="document.getElementById('signup').style.display='none'" class="close" title="Close Modal">&times;</span>

      <h2>New Account</h2>

      

      <form method="post" action="../actions/action_signup.php">
        <input type="text" name="username" placeholder="username" required>
        <input type="password" name="password" placeholder="password" required>
        <button type="submit">Signup</button>
      </form>

      <!-- <footer> -->
        <p>Already have an account? <a href="login.php">Login!</a></p>
      <!-- </footer> -->

    </section>

  </section>
<?php } ?>