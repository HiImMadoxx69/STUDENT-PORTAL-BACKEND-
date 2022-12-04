<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");
  
$con = connection();
try{



if(isset($_POST['StudentNumber'])){
    $studentnumber =  mysqli_real_escape_string($con, $_POST['StudentNumber']);
    $password =   mysqli_real_escape_string($con,$_POST['Password']);

    $checkLoginEmail = mysqli_query($con, "SELECT * FROM tbl_studentinfo WHERE studentnumber = '$studentnumber'");
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