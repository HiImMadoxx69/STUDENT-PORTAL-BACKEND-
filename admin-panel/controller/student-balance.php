<?php
include_once("../connections/connection.php");
$con = connection();

$errors = []; // Store all foreseen and unforeseen errors here.

  $studNum = $_POST['StudNum'];
  $balance = $_POST['Balance'];
  $Editor = $_POST['Editor'];
if(isset($studNum)){
  
    try{
                  $sql = "UPDATE `tbl_studentinfo` SET `balance` = '$balance' WHERE `tbl_studentinfo`.`studentnumber` = '$studNum';";
    
                  mysqli_query($con, $sql);

                  $xsql = "INSERT INTO `tbl_announcement` (`editor`, `category`, `message`,`target`) VALUES ('$Editor', 'Success', 'Thanks for paying! Your current balance: $balance','$studNum');";
                  mysqli_query($con, $xsql);

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('UPDATE: STUDENT: $studNum CURRENT BALANCE: $balance');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP
?>