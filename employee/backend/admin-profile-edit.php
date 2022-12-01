<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();



$FirstName = $_POST['FirstName'];
$MiddleName = $_POST['MiddleName'];
$LastName = $_POST['LastName'];
$Birthday = $_POST['Birthday'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$Email = $_POST['Email'];
try{
    


    $sql = "UPDATE `tbl_admin` SET `firstname` = '$FirstName', `middlename` = '$MiddleName',`lastname` = '$LastName', `birthday` = '$Birthday', `contact` = '$Contact', `address` = '$Address' WHERE `tbl_admin`.`email` = '$Email';";
    mysqli_query($con, $sql);

    $AfterSql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE `email` = '$Email'";     
                
    mysqli_query($con, $AfterSql);

    $getAfter = $con ->query($AfterSql) or die ($con->error);
    $rowAfter = json_encode($getAfter ->fetch_assoc());

   
    exit(json_encode(array("statusCode"=>200, "information" => $rowAfter )));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>201, "error" => $e->getMessage())));
}


?>