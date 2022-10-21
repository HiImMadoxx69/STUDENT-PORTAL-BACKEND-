<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


//Add shits here
$Course = $_POST['Course'];
$Year = $_POST['Year'];
$AcademicYear = $_POST['AcademicYear'];


try{

    $existSQL = "SELECT COUNT(*)+1 FROM tbl_section WHERE course = '$Course' AND section_year = '$Year' AND academic_year = '$AcademicYear'";
    mysqli_query($con, $existSQL);
    
    $dataAdd = $existSQL;

    exit(json_encode(array("statusCode"=>$dataAdd)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>