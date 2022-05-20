<?php
include_once("../connections/connection.php");
$con = connection();


$Fname = $_POST['Fname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Username = $_POST['Username'];
$Password = $_POST['Password'];
$Job = $_POST['Job'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$About = $_POST['About'];
$Twitter = $_POST['Twitter'];
$Facebook = $_POST['Facebook'];
$Instagram = $_POST['Instagram'];
$Linkedin = $_POST['Linkedin'];
if(isset($Fname)){

    
try{
    $sql = "INSERT INTO `tbl_admin` (`profile_url`, `email`, `username`, `password`, `firstname`, `lastname`, `position`, `address`, `contact`, `about`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`) VALUES ('default_profile.jpg', '$Email', '$Username', '$Password', '$Fname', '$Lname', '$Job', '$Address', '$Contact', '$About', '$Twitter', '$Facebook', '$Instagram', '$Linkedin');";
    mysqli_query($con, $sql);
    exit(json_encode(array("statusCode"=>'Created Succesfully')));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}
// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }

?>