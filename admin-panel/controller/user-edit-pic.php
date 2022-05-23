<?php
include_once("../connections/connection.php");
$con = connection();

//UPLOAD > PHP
$img_url = $_POST['Img_url'];
$userCurrentId = $_POST['Id'];


if (isset($img_url)) {
  
    if (empty($errors)) {
  
                  
    
                    $sql = "UPDATE tbl_admin SET profile_url = '$img_url' WHERE id =  $userCurrentId";
      
                    mysqli_query($con, $sql);
                    exit(json_encode(array("image"=>$new_img_name)));
    } else {
      exit(json_encode(array("statusCode"=>201)));
    }
  } 
  


?>