<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$AcademicYear = $_POST['AcademicYear'];
$StartYear = $_POST['StartYear'];
$EndYear = $_POST['EndYear'];

$editPosition = $_POST['EditorPosition'];
$editEmail = $_POST['EditorEmail'];
$category =  $_POST['Category'];
$action = $_POST['Action'];

try{
    


    $sql = "INSERT INTO `tbl_academicyear` (`start`,`end`, `academicyear`) VALUES ('$StartYear','$StartYear', '$AcademicYear');";
    mysqli_query($con, $sql);


    $BeforeSql = "SELECT * FROM tbl_academicyear WHERE academicyear = '$AcademicYear'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    

    $auditsql = "INSERT INTO `tbl_history` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$AcademicYear', '$rowBefore' );";
    mysqli_query($con, $auditsql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>