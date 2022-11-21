<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$Schedule = $_POST['Schedule'];

$GetSchedule = json_decode($Schedule, true);

exit(json_encode(array("statusCode"=>$Schedule)));

?>