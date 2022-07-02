<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
if(!isset($_SESSION)){
  session_start();
}
try{
include_once("../connections/connection.php");

$con = connection();


  if(isset($_POST['Email'])){
    $email =  mysqli_real_escape_string($con, $_POST['Email']);
    $password =   mysqli_real_escape_string($con,$_POST['Password']);
    
    $sql = "SELECT * FROM tbl_admin WHERE email = '$email' AND password ='$password' AND status = 'active'";
    
    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
    $_SESSION['Email'] = $row['email'];
      $_SESSION['Position'] = $row['position'];
      echo json_encode(array("statusCode"=>200));
    }else{
      echo json_encode(array("statusCode"=>201));
     }
    }
}catch(Exception $e){
  echo json_encode(array("statusCode"=>$e->getMessage()));
}
 
?>