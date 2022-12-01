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

    $sql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$Email'  AND status = 'active'";
    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();

    exit(json_encode(array("statusCode"=>200, "content" =>  $row)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>201, "error" => $e->getMessage())));
}


?>