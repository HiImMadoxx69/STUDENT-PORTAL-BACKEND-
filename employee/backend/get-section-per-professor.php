<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$Username = $_POST['Username'];

    $sql = mysqli_query($con,"SELECT * FROM `tbl_subjectpersection` WHERE `tbl_subjectpersection`.`professor_initial` = '$Username' AND `tbl_subjectpersection`.`status` = 'active' GROUP BY(`tbl_subjectpersection`.`sectionandsemester`);");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>