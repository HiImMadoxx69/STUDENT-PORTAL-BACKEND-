<?php
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");
  
$con = connection();
try{
$Email =  $_POST['Email'];


    if(isset($Email)){

        $sql = "SELECT * FROM tbl_admin WHERE email = '$Email' AND status = 'active'";
        
        $user = $con ->query($sql) or die ($con->error);
        $row = $user->fetch_assoc();
        $total = $user->num_rows;
      
        if($total > 0){
          echo json_encode(array("statusCode"=>200));
        }else{
          echo json_encode(array("statusCode"=>201));
         }
        }
}catch(Exception $e){
    echo json_encode(array("statusCode"=>$e->getMessage()));
}
  
?>