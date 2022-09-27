<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

try{
    

    $sql = mysqli_query($con, "SELECT 
    * FROM `tbl_updatehistory` WHERE `category` = 'Employee'");
    
    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
    exit(json_encode($result));
}catch(Exception $e){

}

?>