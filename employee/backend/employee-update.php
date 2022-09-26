<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


// $uploadDirectory = "../../uploads/";

$errors = []; // Store all foreseen and unforeseen errors here.

// $fileExtensions = ['jpeg','jpg','png']; // Get all the file extensions.

// $fileName = $_FILES['profileEdit']['name'];
// $fileSize = $_FILES['profileEdit']['size'];
// $fileTmpName  = $_FILES['profileEdit']['tmp_name'];
// $fileType = $_FILES['profileEdit']['type'];
// $fileExtension = strtolower(end(explode('.',$fileName)));

// $uploadPath = $uploadDirectory . basename($fileName); 

// echo $uploadPath;
try{


  $email = $_POST['Email'];
  $fname = $_POST['Firstname'];
  $mname = $_POST['Middlename'];
  $lname = $_POST['Lastname'];
  $birthday = $_POST['Birthday'];
  // exit(json_encode(array("statusCode"=>$birthday)));
  $sex = $_POST['Sex'];
  $about = $_POST['About'];
  $position = $_POST['Position'];
  $address = $_POST['Address'];
  $contact = $_POST['Contact'];
  $twitter = $_POST['Twitter'];
  $facebook = $_POST['Facebook'];
  $instagram = $_POST['Instagram'];
  $linkedin = $_POST['LinkedIn'];

  
if (isset($email)) {
 
 
 try{
                  $sql = "UPDATE `tbl_admin` SET `firstname` = '$fname', `middlename` = '$mname', `lastname` = '$lname', `birthday` = '$birthday', `sex` = '$sex', `position` = '$position', `address` = '$address', `contact` = '$contact', `about` = '$about', `twitterprofile` = '$twitter', `facebookprofile` = '$facebook', `instagramprofile` = '$instagram', `linkedinprofile` = '$linkedin' WHERE `tbl_admin`.`email` = '$email';";
    
                  mysqli_query($con, $sql);


                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: User Account rowID: $userCurrentId');";
                  mysqli_query($con, $auditsql);

                  $dsql = mysqli_query($con, "SELECT 
                id, profile_url, email,username,firstname,middlename,lastname,birthday
                ,sex,position,address,contact,about
                ,twitterprofile
                ,facebookprofile
                ,instagramprofile
                ,linkedinprofile
                ,status
                ,added_at FROM `tbl_admin` ORDER BY `added_at` DESC");

//store in result

$result = mysqli_fetch_all($dsql, MYSQLI_ASSOC);
                  exit(json_encode(array("statusCode"=>$result)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>201)));
 }

}
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
}