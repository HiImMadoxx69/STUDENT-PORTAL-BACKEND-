<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


try{
    include_once("../connections/connection.php");
$con = connection();


$Name = $_POST['Name'];


    $sql = "SELECT * FROM tbl_fee WHERE name = '$Name'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>'Name already exist')));
    }else{
        exit(json_encode(array("statusCode"=>200)));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }
?>