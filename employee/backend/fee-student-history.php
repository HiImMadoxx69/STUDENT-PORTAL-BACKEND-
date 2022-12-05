<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

$StudentNumber = $_POST['StudentNumber'];

try{
    
    $sql = mysqli_query($con, "SELECT 
    * FROM `tbl_updatehistory` WHERE `category` = 'StudentFee' AND `editor_email` = '$StudentNumber';");
    
    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
    exit(json_encode($result));
}catch(Exception $e){
    exit(json_encode(array($e->getMessage())));
}

?>