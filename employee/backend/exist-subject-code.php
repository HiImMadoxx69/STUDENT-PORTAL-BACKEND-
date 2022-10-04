<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


try{
    include_once("../connections/connection.php");
$con = connection();


$Subject_Code = $_POST['Subject_Code'];


    $sql = "SELECT * FROM tbl_subject WHERE subject_code = '$Subject_Code'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>'Subject code already exist')));
    }else{
        exit(json_encode(array("statusCode"=>200)));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }
?>