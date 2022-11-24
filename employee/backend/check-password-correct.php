<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");
  
$con = connection();
try{



if(isset($_POST['Email'])){
    $email =  mysqli_real_escape_string($con, $_POST['Email']);
    $password =   mysqli_real_escape_string($con,$_POST['Password']);

    $checkLoginEmail = mysqli_query($con, "SELECT * FROM tbl_admin WHERE email = '$email'");
    $rowData = mysqli_fetch_array($checkLoginEmail);
    if (password_verify($password, $rowData['password'])) {
        exit(json_encode(array("statusCode"=>200)));
    }else{
        exit(json_encode(array("statusCode"=>201)));
    }
}else{
    exit(json_encode(array("statusCode"=>201)));
}
}catch(Exception $e){
    echo json_encode(array("statusCode"=>$e->getMessage()));
}
  
?>