<?php
include_once("../connections/connection.php");
$con = connection();


$errors = []; // Store all foreseen and unforeseen errors here.

  $rowId = $_POST['SubjectId'];
  $name = $_POST['Name'];
  $amount = $_POST['Amount'];
 
if (isset($rowId)) {
 try{
                  $sql = "UPDATE `tbl_addfee` SET `name` = '$name', `amount` = '$amount' WHERE `tbl_addfee`.`id` = $rowId;";
                  mysqli_query($con, $sql);
                 
                  $dsql = "UPDATE `tbl_bills` SET `amount` = '$amount' WHERE `tbl_bills`.`billcode` = '$name';";
                  mysqli_query($con, $dsql);
         
                 

                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: Miscellaneous Fee: $name');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP
?>