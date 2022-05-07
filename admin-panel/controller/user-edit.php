<?php

include_once("../connections/connection.php");
$con = connection();

if(isset($_POST['firstname'])){
    $fname = mysqli_real_escape_string($con, $_POST['firstname']);
    $userCurrentId = mysqli_real_escape_string($con, $_POST['id']);
    $lname = mysqli_real_escape_string($con, $_POST['lastname']);
    $about = mysqli_real_escape_string($con, $_POST['about']);
    $position = mysqli_real_escape_string($con, $_POST['position']);
    $address = mysqli_real_escape_string($con, $_POST['address']);
    $contact = mysqli_real_escape_string($con, $_POST['contact']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $twitter = mysqli_real_escape_string($con, $_POST['twitter']);
    $facebook = mysqli_real_escape_string($con, $_POST['facebook']);
    $instagram = mysqli_real_escape_string($con, $_POST['instagram']);
    $linkedin = mysqli_real_escape_string($con, $_POST['linkedin']);
    
 
     $sqlUpdate = "UPDATE tbl_admin SET firstname = '$fname', lastname = '$lname', about = '$about', position = '$position', address = '$address', contact = '$contact', email = '$email', twitterprofile = '$twitter', facebookprofile = '$facebook', instagramprofile = '$instagram', linkedinprofile = '$linkedin' WHERE id = $userCurrentId";
 




     if(mysqli_query($con, $sqlUpdate)){
        echo json_encode(array("statusCode"=>200));
     }else{
        echo json_encode(array("statusCode"=>201));
     }
}
?>