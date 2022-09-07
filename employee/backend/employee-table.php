<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
try{
   
    include_once("../connections/connection.php");
$con = connection();


$sql = mysqli_query($con, "SELECT 
id, profile_url, email,username,firstname,middlename,lastname,birthday
,sex,position,address,contact,about
,twitterprofile
,facebookprofile
,instagramprofile
,linkedinprofile
,status
,added_at FROM `tbl_admin` ORDER BY `added_at` DESC");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
}catch (Exception $e){

}

?>