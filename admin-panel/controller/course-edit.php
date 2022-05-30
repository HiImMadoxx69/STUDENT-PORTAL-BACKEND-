<?php
include_once("../connections/connection.php");
$con = connection();



$errors = []; // Store all foreseen and unforeseen errors here.


  $userCurrentId = $_POST['UserId'];  
  $cname = $_POST['Cname'];
  $faculty = $_POST['Faculty'];
  $credits = $_POST['Credits'];
  
if (isset($userCurrentId)) {

 try{
                  $sql = "UPDATE `tbl_course` SET `course_name` = '$cname', `course_faculty` = '$faculty', `credits` = '$credits' WHERE `tbl_course`.`id` = $userCurrentId;";
    
                  mysqli_query($con, $sql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>