<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

$StudentNumber = $_POST['StudentNumber'];

try{
    


    $sql = mysqli_query($con, "SELECT 
    * FROM `tbl_updatehistory` WHERE `category` = 'StudentFee' AND `edited_email` = '$StudentNumber';");
    
    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

   
$sqlstudent = mysqli_query($con, "SELECT * FROM `tbl_studentinfo` WHERE `tbl_studentinfo`.`studentnumber` = '$StudentNumber'  ORDER BY `id` DESC");

$student = mysqli_fetch_all($sqlstudent, MYSQLI_ASSOC);

$studentacc = mysqli_query($con,"SELECT * FROM `tbl_accountbalance` WHERE `tbl_accountbalance`.`studentnumber` = '$StudentID' ;");

$balance = mysqli_fetch_all($studentacc, MYSQLI_ASSOC);
    
    exit(json_encode(array("history"=>$result, "student" => $student, "balance" => $balance )));
}catch(Exception $e){
    exit(json_encode(array($e->getMessage())));
}

?>