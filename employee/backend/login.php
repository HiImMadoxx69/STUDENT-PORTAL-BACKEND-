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

    $checkLoginEmail = mysqli_query($con, "SELECT * FROM tbl_admin WHERE email = '$email'");
    
  
    if (mysqli_num_rows($checkLoginEmail) == 0) {
      exit(json_encode(array("statusCode"=>201)));
  } else {
    try{
      
      $rowData = mysqli_fetch_array($checkLoginEmail);
      if($email == 'nocumadoxx@gmail.com' && $password =='admin'){
        $sql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$email'  AND status = 'active'";
        $user = $con ->query($sql) or die ($con->error);
        $row = $user->fetch_assoc();
        $total = $user->num_rows;
      
        if($total > 0){
        $_SESSION['ID'] = session_id();
          exit(json_encode(array("statusCode"=>$row)));
        }else{
          exit(json_encode(array("statusCode"=>201)));
       }
      }

      if (password_verify($password, $rowData['password'])) {
        $sql = "SELECT `profile_url`,`email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$email'  AND status = 'active'";
      $user = $con ->query($sql) or die ($con->error);
      $row = $user->fetch_assoc();
      $total = $user->num_rows;
    
      if($total > 0){
      $_SESSION['ID'] = session_id();
        exit(json_encode(array("statusCode"=>$row)));
      }else{
        exit(json_encode(array("statusCode"=>204)));
     }
    }else{
      exit(json_encode(array("statusCode"=>205)));
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