<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.


  $rowId = $_POST['SubjectId'];  
  $subject_code = $_POST['Subject_Code'];
  $subject_name = $_POST['Subject_Name'];
  $units = $_POST['Units'];
  $amount = $_POST['Amount'];
 
if (isset($rowId)) {

 

 try{
                  $sql = "UPDATE `tbl_subject` SET `subject_code` = '$subject_code', `subject_name` = '$subject_name', `units` = '$units', `amount` = '$amount' WHERE `tbl_subject`.`id` = $rowId;";
                  mysqli_query($con, $sql);
                  $dsql = "UPDATE `tbl_bills` SET `amount` = '$amount' WHERE `tbl_bills`.`billcode` = '$subject_code';";
                  mysqli_query($con, $dsql);
             
                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Subject subject code: $subject_code');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>