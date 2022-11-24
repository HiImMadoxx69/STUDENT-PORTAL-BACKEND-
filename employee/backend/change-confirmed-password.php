<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


try{

    $Email = $_POST['Email'];
    $Password = $_POST['NewPassword'];
  
if (isset($email)) {

 
 try{
    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

                  $sql = "UPDATE `tbl_admin` SET `password` = '$hashedPassword' WHERE `tbl_admin`.`email` = '$Email';";
    
                  mysqli_query($con, $sql);


        exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
  // exit(json_encode(array("statusCode"=>201)));
 }
 exit(json_encode(array("statusCode"=>201)));
}
exit(json_encode(array("statusCode"=>201)));
}catch(Exception $e){
  // exit(json_encode(array("statusCode"=>$e->getMessage())));
  exit(json_encode(array("statusCode"=>201)));
}