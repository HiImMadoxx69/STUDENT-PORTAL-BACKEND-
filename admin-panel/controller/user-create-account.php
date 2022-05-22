<?php
include_once("../connections/connection.php");
$con = connection();


$Fname = $_POST['Fname'];
$Mname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Username = $_POST['Username'];
$Password = $_POST['Password'];
$Job = $_POST['Job'];
$Birthday = $_POST['Birthday'];
$Sex = $_POST['Sex'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$About = $_POST['About'];
$Twitter = $_POST['Twitter'];
$Facebook = $_POST['Facebook'];
$Instagram = $_POST['Instagram'];
$Linkedin = $_POST['Linkedin'];
if(isset($Fname)){

    
try{
    $sql = "INSERT INTO `tbl_admin` (`profile_url`, `email`, `username`, `password`, `firstname`, `middlename`, `lastname`, `birthday`, `sex`, `position`, `address`, `contact`, `about`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`) VALUES ('default_profile.jpg', '$Email', '$Username', '$Password', '$Fname', '$Mname', '$Lname', '$Birthday', '$Sex', '$Job', '$Address', '$Contact', '$About', '$Twitter', '$Facebook', '$Instagram', '$Linkedin');";
    mysqli_query($con, $sql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}
// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }

?>