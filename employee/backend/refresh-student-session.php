<?php
try{
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
if(!isset($_SESSION)){
  session_start();
}

include_once("../connections/connection.php");

$con = connection();


  if(isset($_POST['StudentNumber'])){
    $studentnumber =  mysqli_real_escape_string($con, $_POST['StudentNumber']);
   
    try{
 
          $sql = "SELECT * FROM tbl_studentinfo WHERE studentnumber = '$studentnumber'  AND status = 'active'";
        $user = $con ->query($sql) or die ($con->error);
        $row = $user->fetch_assoc();
        $total = $user->num_rows;
      
        if($total > 0){
        $_SESSION['ID'] = session_id();
          exit(json_encode(array("statusCode"=>$row)));
        }else{
          exit(json_encode(array("statusCode"=>201)));
       }
     
      }catch(Exception $e){
        exit(json_encode(array("statusCode"=>201)));
      }
}

}catch(Exception $e){
  exit(json_encode(array("statusCode"=>201)));
}
 
?>