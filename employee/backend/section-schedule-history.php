<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

$CurrentID = $_POST['ID'];
try{
    
    $sql = mysqli_query($con, "SELECT 
    * FROM `tbl_updatehistory` WHERE `category` = 'SectionSchedule' AND edited_email = '$CurrentID';");
    
    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
    exit(json_encode($result));
}catch(Exception $e){
    exit(json_encode(array($e->getMessage())));
}

?>