<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.


  $userCurrentId = $_POST['RowID'];  
  $StudId = $_POST['StudID'];
  $name = $_POST['Name'];
  $status = $_POST['Status'];
  
if (isset($userCurrentId)) {

 try{
   $sql = "UPDATE `tbl_bills` SET `status` = '$status' WHERE `tbl_bills`.`id` = $userCurrentId;";
   mysqli_query($con, $sql);
   $sql = "UPDATE `tbl_grades` SET `status` = '$status' WHERE `tbl_grades`.`studentid` = $StudId AND `tbl_grades`.`subject_code` = '$name';";
   mysqli_query($con, $sql);
   $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Removed: Fee  rowID: $userCurrentId');";
   mysqli_query($con, $auditsql);
   exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP
  
?>