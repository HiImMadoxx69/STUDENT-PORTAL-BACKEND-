<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$ImageUrl = $_POST['ImageUrl'];
$Email = $_POST['Email'];
try{
    


    $sql = "UPDATE `tbl_admin` SET `profile_url` = '$ImageUrl' WHERE `tbl_admin`.`email` = '$Email';";
    mysqli_query($con, $sql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>201, "error" => $e->getMessage())));
}


?>