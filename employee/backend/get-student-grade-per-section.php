<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$Username = $_POST['Username'];
$Section = $_POST['Section'];

    $sql = mysqli_query($con,"SELECT *  WHERE `tbl_gradesperstudent`.`sectionandsemester` = '$Section' AND `tbl_gradesperstudent`.`professor_initial` = '$Username';");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>