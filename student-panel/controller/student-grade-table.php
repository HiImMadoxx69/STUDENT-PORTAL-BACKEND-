<?php
include_once("../connections/connection.php");
$con = connection();

$StudID = $_POST['studentNumber'];

if(isset($StudID)){
try{
    $sql = mysqli_query($con, "SELECT * FROM `tbl_grades` WHERE `studentid` LIKE '$StudID' AND `status` LIKE 'active' ORDER BY `tbl_grades`.`added_at` DESC");
    //store in result
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    exit(json_encode($result));
}catch(Exception $e){
    exit(json_encode(array("statusCodes"=>$e->getMessage())));
 }
}