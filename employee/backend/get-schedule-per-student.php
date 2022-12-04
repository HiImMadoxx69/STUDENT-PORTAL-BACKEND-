<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$StudentID = $_POST['StudentId'];
$SectionAndSemester = $_POST['SectionAndSemester'];

    $sql = mysqli_query($con,"SELECT * FROM `tbl_gradesperstudent`  WHERE `tbl_gradespertstudent`.`studentnumber` = '$StudentID' AND `tbl_gradesperstudent`.`sectionandsemester` = '$SectionAndSemester';");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>