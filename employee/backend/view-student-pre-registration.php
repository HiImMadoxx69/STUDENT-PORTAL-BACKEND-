<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$CurrentID = $_POST['ID'];
$StudentNumber = $_POST['StudentNumber'];
$SectionAndSemester = $_POST['SectionAndSemester'];

try{

    $sqlpreregister = mysqli_query($con, "SELECT * FROM `tbl_studentregistration` WHERE `tbl_studentregistration`.`id` = '$CurrentID' ORDER BY `id` DESC");

    $prereg = mysqli_fetch_all($sqlpreregister, MYSQLI_ASSOC);
    
    $sqlsched = mysqli_query($con, "SELECT * FROM `tbl_gradesperstudent` WHERE `tbl_gradesperstudent`.`student_id` = '$StudentNumber' AND  `tbl_gradesperstudent`.`sectionandsemester` = '$SectionAndSemester' ORDER BY `id` DESC");
    
    $sched = mysqli_fetch_all($sqlsched, MYSQLI_ASSOC);
    
    $sqlfee = mysqli_query($con, "SELECT * FROM `tbl_feeperstudent` WHERE `tbl_feeperstudent`.`student_id` = '$StudentNumber' AND `tbl_feeperstudent`.`sectionandsemester` = '$SectionAndSemester' ORDER BY `id` DESC");
    
    $fee = mysqli_fetch_all($sqlfee, MYSQLI_ASSOC);
    
    $sqlstudent = mysqli_query($con, "SELECT * FROM `tbl_studentinfo` WHERE `tbl_studentinfo`.`studentnumber` = '$StudentNumber'  ORDER BY `id` DESC");
    
    $student = mysqli_fetch_all($sqlstudent, MYSQLI_ASSOC);
    
    exit(json_encode(array("info"=>$prereg, "sched" => $sched, "fee" =>$fee, "student" => $student)));
}catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }
?>