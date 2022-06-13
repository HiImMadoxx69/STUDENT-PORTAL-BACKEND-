<?php
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");
  
$con = connection();

$username =  mysqli_real_escape_string($con, $_POST['username']);
echo json_encode(array("statusCode"=>$username));
  if(isset($_POST['username'])){

  $password =   mysqli_real_escape_string($con,$_POST['password']);
  
  $sql = "SELECT * FROM tbl_admin WHERE email = '$username' AND password ='$password' AND status = 'active'";
  
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
  
  // if(isset($_POST['username'])){
  //   $username =   $_POST['username'];
  //   $password =  $_POST['password'];
    
  //   $sql = "SELECT * FROM tbl_admin WHERE username = '$username' ";
    
  //   $user = $con ->query($sql) or die ($con->error);
  //   $row = $user->fetch_assoc();
  //   $total = $user->num_rows;
  
  //   if($row > 0){
      
  //     if(password_verify($password, $row['password'])) {
  //       $_SESSION['ID'] = $row['id'];
  //       $_SESSION['Position'] = $row['position'];
  //       echo json_encode(array("statusCode"=>200));
  //     }else{
  //       $tespass = '1059914Emmanuel';
  //       $hashME = '$2y$10$4kMy/OZcpil1fZ0pgVtnweYQMz7o0PsglKnIAqF12j3';
  //       // echo json_encode(array("statusCode"=>$row['password']));
  //       if(password_verify($tespass, $hashME)){
  //         exit(json_encode(array("statusCode"=>'valid Hashing')));
  //     }else{
  //       exit(json_encode(array("statusCode"=>'Invalid Hashing')));
  //     }
  //     }
  //   }else{
  //     echo json_encode(array("statusCode"=>201));
  //     }
  //   }
?>