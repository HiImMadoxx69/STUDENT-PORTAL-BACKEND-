<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


$sql = mysqli_query($con, "SELECT 
id FROM `tbl_professor` WHERE status = 'inactive' ORDER BY `added_at` DESC");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
?>