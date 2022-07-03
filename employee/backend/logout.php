<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
session_start();
try{
    unset($_SESSION['ID']);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

//  echo header("Location: admin-login.php");
?>