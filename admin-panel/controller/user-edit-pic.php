<?php
include_once("../connections/connection.php");
$con = connection();

//UPLOAD > PHP
$img_url = $_POST['Image_Url'];
$userCurrentId = $_POST['userId'];


if (isset($userCurrentId)) {
  
    if (empty($errors)) {

                    $sql = "UPDATE tbl_admin SET `profile_url` = '$img_url' WHERE id =  $userCurrentId";
                    mysqli_query($con, $sql);
                    exit(json_encode(array("statuCode"=>200)));
    } else {
      exit(json_encode(array("statusCode"=>201)));
    }
  } 
  


?>