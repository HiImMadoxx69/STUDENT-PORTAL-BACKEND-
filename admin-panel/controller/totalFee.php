<?php
include_once("../connections/connection.php");
$con = connection();

$payment = $_POST['Payment'];

if(isset($payment)){
   $sql = "UPDATE `tbl_collectedfee` SET collectedfees = collectedfees+$payment WHERE `tbl_collectedfee`.`id` = 1";
    
  mysqli_query($con, $sql);
  exit(json_encode(array("statusCode"=>200)));
}
?>