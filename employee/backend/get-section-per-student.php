<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$SectionCode = $_POST['SectionCode'];

    $sql = "SELECT * FROM tbl_section WHERE sectionandsemester = '$SectionCode'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>200)));
    }else{
        exit(json_encode(array("statusCode"=>'Schedule doesnt not exist')));
    }
    exit(json_encode(array("statusCode"=>201)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }

 ?>