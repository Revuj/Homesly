<?php
    include_once('../includes/session.php');
    include_once('../database/db_places.php');

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    // Verify if user is logged in
    if (!isset($_SESSION['username'])) {
        //Javascript alert to the client
        $message = "You must be logged in to host a place!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    else {
        $place_title = $_POST['title'];
        $place_description = $_POST['description'];
        $place_location = $_POST['location'];
        $place_price = $_POST['price_per_day'];

        insertPlace($place_title, $place_description, $place_location, $place_price, $_SESSION['username']);  
    
        $db = Database::instance()->db();
        $place_id = $db->lastInsertId();
        $target_dir = "../images/uploads/";
        $new_id_image = getBiggestIdOfImages() + 1;
        $target_file = $target_dir . $new_id_image . ".png";
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        // echo "The new biggest id is " . $new_id_image . "<br>";
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 10000000) {  // max 10MB
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            // if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            if (imagepng(imagecreatefromstring(file_get_contents($_FILES["fileToUpload"]["tmp_name"])), $target_file)) {
                echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                insertImageOfPlace($place_id, $new_id_image);
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        } 
    }
    header('Location: ../pages/homepage.php');
?>