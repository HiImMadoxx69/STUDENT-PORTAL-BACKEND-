<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.


  $rowId = $_POST['SectionId'];  
  $subject_code = $_POST['Section_Name'];
if (isset($rowId)) {

 

 try{
                  $sql = "UPDATE `tbl_section` SET `name` = '$subject_code' WHERE `tbl_section`.`id` = $rowId;";
                  mysqli_query($con, $sql);
               
                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Section section name: $subject_code');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP



  
?>