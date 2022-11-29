<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$StudentID = $_POST['StudentId'];

    $sql = "SELECT `tbl_studentinfo`.* , `tbl_section`.* FROM `tbl_studentinfo` LEFT JOIN `tbl_section` ON `tbl_studentinfo`.`section` = `tbl_section`.`sectionandsemester` WHERE `tbl_studentinfo`.`studentnumber` = '$StudentID';";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();

  
    exit(json_encode(array("statusCode"=>200, "content" => $row)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>