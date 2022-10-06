<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


try{
    include_once("../connections/connection.php");
$con = connection();


$CourseName = $_POST['Course_Name'];


    $sql = "SELECT * FROM tbl_course WHERE course_name = '$CourseName'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>'Course name already exist')));
    }else{
        exit(json_encode(array("statusCode"=>200)));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }
?>