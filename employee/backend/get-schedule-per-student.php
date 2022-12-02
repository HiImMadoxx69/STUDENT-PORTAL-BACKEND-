<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$StudentID = $_POST['StudentId'];

    $sql = mysqli_query($con,"SELECT `tbl_gradesperstudent`.* , `tbl_subjectpersection`.`professor_initial`FROM `tbl_gradesperstudent` LEFT JOIN `tbl_subjectpersection` ON `tbl_studentinfo`.`section` = `tbl_gradesperstudent`.`sectionandsemester` LEFT JOIN `tbl_subjectpersection` ON `tbl_gradesperstudent`.`subject_name` = `tbl_subjectpersection`.`subject_name` AND `tbl_studentinfo`.`academicyear` = `tbl_subjectpersection`.`academic_year` WHERE `tbl_studentinfo`.`studentnumber` = '$StudentID';");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>