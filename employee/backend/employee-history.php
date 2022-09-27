<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

try{
    

    $sql = "SELECT * from `tbl_updatehistory` WHERE `category` =  'Employee'";
    mysqli_query($con, $sql);
    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    exit(json_encode(array("statusCode"=>$row)));
}catch(Exception $e){

}

?>