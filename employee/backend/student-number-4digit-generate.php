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

    $existSQL = "SELECT * FROM tbl_studentinfo'";
    if($dataAdd = mysqli_query($con, $existSQL)){
        $rowcount = mysqli_num_rows($dataAdd);
        exit(json_encode(array("statusCode"=>$rowcount)));
    }  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>