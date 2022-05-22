<?php
include_once("../connections/connection.php");
$con = connection();

$Studentnumber = $_POST['Studentnumber'];
$Fname = $_POST['Fname'];
$Lname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$Course = $_POST['Course'];
$Contact = $_POST['Contact'];
$Section = $_POST['Section'];
$Birthday = $_POST['Birthday'];
$Contact = $_POST['Contact'];
$GuardianN = $_POST['GuardianN$GuardianN'];
$GuardianCon = $_POST['GuardianCon'];
if(isset($Fname)){

    
try{
    $sql = "INSERT INTO `tbl_studentinfo` (`profile_url`,`Studentnumber`, `password`, `firstname`, `lastname`, `email`, `course`, `section`, `birthday`, `contact`, `guardian`, `guardian_contact`, ) VALUES ('default_profile.jpg', '$Studentnumber', '$Fname', '$Mname', '$Lname',  '$Email', '$Password','$Course', '$Section', '$Contact', '$Birthday',  '$GuardianN', '$GuardianCon');";
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