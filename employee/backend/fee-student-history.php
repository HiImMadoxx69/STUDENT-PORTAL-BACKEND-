<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

$StudentNumber = $_POST['StudentNumber'];
$AcademicYear = $_POST['AcademicYear'];
$Semester = $_POST['Semester'];
try{
    


    $sql = mysqli_query($con, "SELECT 
    * FROM `tbl_history` WHERE `category` = 'StudentFee' AND `edited_email` = '$StudentNumber';");
    
    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

   
$sqlstudent = mysqli_query($con, "SELECT * FROM `tbl_studentinfo` WHERE `tbl_studentinfo`.`studentnumber` = '$StudentNumber'  ORDER BY `id` DESC");

$student = mysqli_fetch_all($sqlstudent, MYSQLI_ASSOC);

$studentfee = mysqli_query($con,"SELECT * FROM `tbl_feeperstudent` WHERE `tbl_feeperstudent`.`student_id` = '$StudentNumber' AND `tbl_feeperstudent`.`academicyear` = '$AcademicYear' AND `tbl_feeperstudent`.`semester` = '$Semester';");

$fee = mysqli_fetch_all($studentfee, MYSQLI_ASSOC);

$studentacc = mysqli_query($con,"SELECT * FROM `tbl_accountbalance` WHERE `tbl_accountbalance`.`studentnumber` = '$StudentNumber' AND `tbl_accountbalance`.`academicyear` = '$AcademicYear' AND `tbl_accountbalance`.`semester` = '$Semester';");

$balance = mysqli_fetch_all($studentacc, MYSQLI_ASSOC);
    
    exit(json_encode(array("history"=>$result, "student" => $student, "balance" => $balance, "fee" => $fee )));
}catch(Exception $e){
    exit(json_encode(array($e->getMessage())));
}

?>