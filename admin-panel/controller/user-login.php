<?php
session_start();
  include_once("../connections/connection.php");
  
  $con = connection();
$total = 0;
  if(!isset($_POST['username'])&&($_POST['password'])){
  
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $sql = "SELECT * FROM tbl_admin WHERE username = '$username' AND password = '$password'";
  
  $user = $con ->query($sql) or die ($con->error);
  $row = $user->fetch_assoc();
  $total = $user->num_rows;
  
  if($total > 0){
    
    $_SESSION['UserLogin'] = $row['username'];
    $_SESSION['Position'] = $row['position'];
  }else{

   }
   
  } 
  echo json_encode($total);//Return a JSON format if correct or not
?>