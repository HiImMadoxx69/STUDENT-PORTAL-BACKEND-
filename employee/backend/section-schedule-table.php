<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$SectionName = $_POST['SectionName'];
$AcademicYear = $_POST['AcademicYear'];

try{

    $sql = mysqli_query($con, "SELECT * FROM `tbl_subjectpersection` WHERE sectionandsemester = '$SectionName' ORDER BY `id` DESC");

    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
exit(json_encode($result));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>