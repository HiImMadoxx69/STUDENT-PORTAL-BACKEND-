<?php
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");
  
$con = connection();


  if(isset($_POST['username'])){
  $username =  mysqli_real_escape_string($con, $_POST['username']);
  $password =  mysqli_real_escape_string($con, $_POST['password']);
  
  $sql = "SELECT * FROM tbl_admin WHERE username = '$username' AND password = '$password' AND status = 'active'";
  
  $user = $con ->query($sql) or die ($con->error);
  $row = $user->fetch_assoc();
  $total = $user->num_rows;

  if($total > 0){
    $_SESSION['ID'] = $row['id'];
    $_SESSION['Position'] = $row['position'];
    echo json_encode(array("statusCode"=>200));
  }else{
    echo json_encode(array("statusCode"=>201));
   }
  }
  
  
?>