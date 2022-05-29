<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.


  $rowId = $_POST['SubjectId'];  
  $subject_code = $_POST['Subject_Code'];
  $subject_name = $_POST['Subject_Name'];
  $units = $_POST['Units'];
 
if (isset($userCurrentId)) {

 try{
                  $sql = "UPDATE `tbl_subject` SET `subject_code` = '$subject_code', `subject_name` = '$subject_name', `units` = '$units' WHERE `tbl_subject`.`id` = $rowId;";
    
                  mysqli_query($con, $sql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>