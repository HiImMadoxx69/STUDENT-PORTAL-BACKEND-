<?php
include_once("../connections/connection.php");
$con = connection();

$StudID = $_POST['studentNumber'];
if(isset($StudID)){
    $sql = mysqli_query($con, "SELECT * FROM `tbl_announcement` WHERE target = '$StudID' OR target = 'Student' ORDER BY `added_at` DESC");

    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
    exit(json_encode($result));
}
?>