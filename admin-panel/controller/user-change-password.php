<?php
include_once("../connections/connection.php");
$con = connection();

$newPassword = $_POST['newpassword'];
$userCurrentId = $_POST['userId'];  
if(isset($newPassword)){
    $sql = "UPDATE tbl_admin SET password = '$newPassword' WHERE id =  $userCurrentId";
    mysqli_query($con, $sql);
    exit(json_encode(array("statusCode"=>200)));
}
?>