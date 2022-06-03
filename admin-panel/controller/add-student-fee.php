<?php
include_once("../connections/connection.php");
$con = connection();



$errors = []; // Store all foreseen and unforeseen errors here.


  $studNum = $_POST['StudNum'];
  $balance = $_POST['Balance'];
if (isset($studNum)) {

  
    try{

   

                 $sql = "UPDATE `tbl_studentinfo` SET balance = balance+$balance WHERE `tbl_studentinfo`.`studentnumber` = $studNum;";
    
                  mysqli_query($con, $sql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('UPDATE: STUDENT: $studNum PAY: $balance');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP


  
?>