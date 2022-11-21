<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$Schedule = $_POST['Schedule'];



exit(json_encode(array("statusCode"=>$Schedule)));

?>