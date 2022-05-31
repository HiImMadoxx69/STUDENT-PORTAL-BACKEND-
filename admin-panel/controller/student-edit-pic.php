<?php
include_once("../connections/connection.php");
$con = connection();

//UPLOAD > PHP
$img_url = $_POST['Image_Url'];
$userCurrentId = $_POST['userId'];


if (isset($userCurrentId)) {
    if (empty($errors)) {

                    $sql = "UPDATE tbl_studentinfo SET `profile_url` = '$img_url' WHERE id =  $userCurrentId";
                    mysqli_query($con, $sql);

                    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Student Account Pic rowID: $userCurrentId');";
                    mysqli_query($con, $auditsql);
                    exit(json_encode(array("statusCode"=>200)));
    } else {
      exit(json_encode(array("statusCode"=>201)));
    }
  } 
?>