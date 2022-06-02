<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.

$studid = $_POST['StudentId'];
$subject_code = $_POST['SubjectCode'];
$grades = $_POST['Grades'];
$instructor = $_POST['Instructor'];
$sched = $_POST['Schedule'];
if (isset($studid)) {
 try{
                  $sql = "UPDATE `tbl_grades` SET `grade` = '$grades', `instructor` = '$instructor', `schedule` = '$sched' WHERE `tbl_grades`.`studentid` = '$studid' AND `tbl_grades`.`subject_code` = '$subject_code';";
    
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Subject subject code: $subject_code for Student ID: $studid');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>