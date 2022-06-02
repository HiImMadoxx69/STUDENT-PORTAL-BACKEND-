<?php
include_once("../connections/connection.php");
$con = connection();



$errors = []; // Store all foreseen and unforeseen errors here.

  $userCurrentId = $_POST['UserId'];  
  $studNum = $_POST['StudNum'];
  $fname = $_POST['Fname'];
  $mname = $_POST['Mname'];
  $lname = $_POST['Lname'];
  $birthday = $_POST['Birthday'];
  $sex = $_POST['Sex'];
  $course = $_POST['Course'];
  $section = $_POST['Section'];
  $address = $_POST['Address'];
  $contact = $_POST['Contact'];
  $email = $_POST['Email'];
  $password = $_POST['Password'];
  $guardian = $_POST['Guardian'];
  $guardianNum = $_POST['GuardianNum'];
 
if (isset($userCurrentId)) {

  
 try{
                  $sql = "UPDATE `tbl_studentinfo` SET `studentnumber` = '$studNum', `firstname` = '$fname', `middlename` = '$mname', `lastname` = '$lname', `email` = '$email', `address` = '$address', `password` = '$password', `sex` = '$sex', `course` = '$course',`section` = '$section', `birthday` = '$birthday', `contact` = '$contact', `guardian` = '$guardian', `guardian_contact` = '$guardianNum' WHERE `tbl_studentinfo`.`id` = $userCurrentId;";
    
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('UPDATE: STUDENT rowID: $userCurrentId');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP


  
?>