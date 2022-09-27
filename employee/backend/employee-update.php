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

  $action = $_POST['Action'];
  $category = $_POST['Category'];
  $editPosition = $_POST['EditorPosition'];
  $editEmail = $_POST['EditorEmail'];
  
if (isset($email)) {
 
 
 try{
                $beforeSql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$email'";     
                
                mysqli_query($con, $beforeSql);

                $getBefore = $con ->query($beforeSql) or die ($con->error);
                $rowBefore = implode(',', $getBefore ->fetch_assoc());
                
                  $sql = "UPDATE `tbl_admin` SET `firstname` = '$fname', `middlename` = '$mname', `lastname` = '$lname', `birthday` = '$birthday', `sex` = '$sex', `position` = '$position', `address` = '$address', `contact` = '$contact', `about` = '$about', `twitterprofile` = '$twitter', `facebookprofile` = '$facebook', `instagramprofile` = '$instagram', `linkedinprofile` = '$linkedin' WHERE `tbl_admin`.`email` = '$email';";
    
                  mysqli_query($con, $sql);

                  $AfterSql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$email'";     
                
                mysqli_query($con, $AfterSql);

                $getAfter = $con ->query($AfterSql) or die ($con->error);
                $rowAfter = implode(',', $getAfter ->fetch_assoc());


                  $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`,`after_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$email', '$rowBefore', '$rowAfter' );";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_admin` WHERE `email` =  '$email'";
        mysqli_query($con, $xsql);

        $user = $con ->query($xsql) or die ($con->error);
        $row = $user->fetch_assoc();
        exit(json_encode(array("statusCode"=>$row)));
 }catch(Exception $e){
  // exit(json_encode(array("statusCode"=>$e->getMessage())));
  exit(json_encode(array("statusCode"=>201)));
 }

}
}catch(Exception $e){
  // exit(json_encode(array("statusCode"=>$e->getMessage())));
  exit(json_encode(array("statusCode"=>201)));
}