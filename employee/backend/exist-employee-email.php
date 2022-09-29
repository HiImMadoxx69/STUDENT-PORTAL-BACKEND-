<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');


 try{
    include_once("../connections/connection.php");
$con = connection();


$Email = $_POST['Email'];


    $sql = "SELECT * FROM tbl_admin WHERE email = '$Email'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>'Email already exist')));
    }else{
        exit(json_encode(array("statusCode"=>200)));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }

 ?>