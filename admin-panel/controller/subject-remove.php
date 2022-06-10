<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.


  $userCurrentId = $_POST['UserID'];  
  $status = $_POST['Status'];
  
if (isset($userCurrentId)) {


 try{
                  $sql = "UPDATE `tbl_subject` SET `status` = '$status' WHERE `tbl_subject`.`id` = $userCurrentId;";
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Archived: Subject rowID: $userCurrentId');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP
  
?>