<?php
include_once("../connections/connection.php");
$con = connection();



$errors = []; // Store all foreseen and unforeseen errors here.


  $userCurrentId = $_POST['UserId'];  
  $cname = $_POST['Cname'];
  $faculty = $_POST['Faculty'];
  $credits = $_POST['Credits'];
  
if (isset($userCurrentId)) {
  $sql = "SELECT * FROM tbl_course WHERE course_name = '$cname'";

$user = $con ->query($sql) or die ($con->error);
$row = $user->fetch_assoc();
$total = $user->num_rows;

if($total > 0){
    exit(json_encode(array("statusCode"=>201)));
}

 try{
                  $sql = "UPDATE `tbl_course` SET `course_name` = '$cname', `course_faculty` = '$faculty', `credits` = '$credits' WHERE `tbl_course`.`id` = $userCurrentId;";
    
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Course Edited, Course Name: $cname');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>