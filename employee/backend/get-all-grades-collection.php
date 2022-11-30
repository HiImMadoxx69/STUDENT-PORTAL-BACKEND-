<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$StudentID = $_POST['StudentId'];

    $sql = "SELECT * FROM tbl_studentregistration WHERE student_id = '$StudentID' AND status = 'confirmed' ";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>200)));
    }else{
        exit(json_encode(array("statusCode"=>'Schedule doesnt not exist')));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }

 ?>