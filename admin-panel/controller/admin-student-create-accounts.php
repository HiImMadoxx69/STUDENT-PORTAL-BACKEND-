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
<<<<<<< HEAD
=======

if(isset($firstname)){
>>>>>>> b853d417e247c4c1140809b0aad77ed22485d81c

if(isset($firstname)){
   
    
try{
<<<<<<< HEAD

  

    $sql = "INSERT INTO `tbl_studentinfo` (`profile_url`, `studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `password`, `birthday`, `contact`, `guardian`, `guardian_contact`) VALUES ('default_profile.jpg', '$studentnumber', '$firstname', '$middlename', '$lastname',  '$email', '$password','$birthday', '$contact', '$guardian','$guardian_contact');";
=======
    $sql = "INSERT INTO `tbl_studentinfo` ( `profile_url`, `studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `password`, `course`, `section`, `birthday`, `contact`, `guardian`,`guardian_contact`) VALUES ( 'default_profile.jpg', '$studentnumber', '$firstname', '$middlename', '$lastname', '$email', '$password', '$course', '$section', '$birthday', '$contact', '$guardian', '$guardian_contact');";
>>>>>>> b853d417e247c4c1140809b0aad77ed22485d81c
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