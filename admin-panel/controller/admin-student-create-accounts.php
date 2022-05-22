<?php
include_once("../connections/connection.php");
$con = connection();

$studentnumber = $_POST['Studentnumber'];
$firstname = $_POST['Fname'];
$middlename = $_POST['Mname'];
$lastname = $_POST['Lname'];
$email = $_POST['Email'];
$password = $_POST['Password'];
$course = $_POST['Course'];
$section = $_POST['Section'];
$birthday = $_POST['Birthday'];
$contact = $_POST['Contact'];
$guardian = $_POST['GuardianN'];
$guardian_contact = $_POST['GuardianCon'];

if(isset($firstname)){

    
try{
    $sql = "INSERT INTO `tbl_studentinfo` ( `profile_url`, `studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `password`, `course`, `section`, `birthday`, `contact`, `guardian`,`guardian_contact`) VALUES ( 'default_profile.jpg', '$studentnumber', '$firstname', '$middlename', '$lastname', '$email', '$password', '$course', '$section', '$birthday', '$contact', '$guardian', '$guardian_contact');";
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