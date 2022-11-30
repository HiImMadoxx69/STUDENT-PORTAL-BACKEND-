<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$StudentID = $_POST['StudentId'];
$SectionAndSemester = $_POST['SectionAndSemester'];

    $sql = mysqli_query($con,"SELECT * FROM `tbl_gradesperstudent` WHERE `tbl_gradesperstudent`.`student_id` = '$StudentID' AND `tbl_gradesperstudent`.`sectionandsemester` = '$SectionAndSemester' ;");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
   
    $GPA = 0;
    $Sum = 0;
   for($i = 0; $i < count($result); $i++){
      $float_value = (float) $result[$i]['grade'];
      $Sum = $Sum + $float_value; 
   }

   $GPA = $SUM / count($result);

    exit(json_encode(array("statusCode"=>200, "content" => $result, "GPA" => $GPA)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>