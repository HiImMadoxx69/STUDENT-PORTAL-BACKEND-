<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


try{

    $StudentNumber = $_POST['StudentNumber'];
    $Password = $_POST['NewPassword'];
  
if (isset($StudentNumber)) {

 
 try{
    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

                  $sql = "UPDATE `tbl_studentinfo` SET `password` = '$hashedPassword' WHERE `tbl_studentinfo`.`student` = '$StudentNumber';";
    
                  mysqli_query($con, $sql);


        exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
  // exit(json_encode(array("statusCode"=>201)));
 }
 exit(json_encode(array("statusCode"=>201)));
}else{
    exit(json_encode(array("statusCode"=>201)));
}

}catch(Exception $e){
  // exit(json_encode(array("statusCode"=>$e->getMessage())));
  exit(json_encode(array("statusCode"=>201)));
}