<?php
include_once("../connections/connection.php");
$con = connection();



$errors = []; // Store all foreseen and unforeseen errors here.

  $StudID = $_POST['StudentID'];  
  $password = $_POST['NewPassword'];
 
if (isset($StudID)) {

  
 try{
                  $sql = "UPDATE `tbl_studentinfo` SET `password` = '$password' WHERE `tbl_studentinfo`.`studentnumber` = '$StudID';";
    
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('UPDATE: STUDENT StudID: $StudID password');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP


  
?>