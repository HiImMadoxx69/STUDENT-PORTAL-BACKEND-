<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$Course = $_POST['Course'];
$Year = $_POST['Year'];

try{
    

    $sql = mysqli_query($con, "SELECT * FROM `tbl_subject` WHERE status = 'active' AND `course_available` LIKE '%$Course%' AND `year_available` = '$Year' ORDER BY `id` DESC");

    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    exit(json_encode($result));
  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>