<?php
if(!isset($_SESSION)){
    session_start();
  }
include_once("../connections/connection.php");
  
$con = connection();
  if(isset($_POST['studentid'])){
  $studentid =  mysqli_real_escape_string($con, $_POST['studentid']);
  $password =  mysqli_real_escape_string($con, $_POST['password']);
  
  $sql = "SELECT * FROM tbl_studentinfo WHERE studentnumber = '$studentid' AND password = '$password' AND status = 'active'";
  
  $user = $con ->query($sql) or die ($con->error);
  $row = $user->fetch_assoc();
  $total = $user->num_rows;

  if($total > 0){
    $_SESSION['StudentID'] = $row['studentnumber'];
    echo json_encode(array("statusCode"=>200));
  }else{
    echo json_encode(array("statusCode"=>201));
   }
  }

?>