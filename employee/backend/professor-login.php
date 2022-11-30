<?php
try{
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");

$con = connection();


  if(isset($_POST['Email'])){
    $email =  mysqli_real_escape_string($con, $_POST['Email']);
    $password =   mysqli_real_escape_string($con,$_POST['Password']);

    $checkLoginEmail = mysqli_query($con, "SELECT * FROM tbl_professor WHERE email = '$email'");
    
  
    if (mysqli_num_rows($checkLoginEmail) == 0) {
      exit(json_encode(array("statusCode"=>201)));
  } else {
    try{
      

      $rowData = mysqli_fetch_array($checkLoginEmail);
      if (password_verify($password, $rowData['password'])) {
        $sql = "SELECT * FROM tbl_professor WHERE email = '$email'  AND status = 'active'";
      $user = $con ->query($sql) or die ($con->error);
      $row = $user->fetch_assoc();
      $total = $user->num_rows;
    
      if($total > 0){
      $_SESSION['ID'] = session_id();
        exit(json_encode(array("statusCode"=>$row)));
      }else{
        exit(json_encode(array("statusCode"=>201)));
     }
    }else{
      exit(json_encode(array("statusCode"=>201)));
    }
    }catch(Exception $e){
      exit(json_encode(array("statusCode"=>$e->getMessage())));
    }
   
 }
}

}catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
}
 
?>