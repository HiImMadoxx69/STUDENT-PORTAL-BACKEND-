<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$Faculty = $_POST['Faculty'];
$Description = $_POST['Description'];

$editPosition = $_POST['EditorPosition'];
$editEmail = $_POST['EditorEmail'];
$category =  $_POST['Category'];
$action = $_POST['Action'];

try{
    


    $sql = "INSERT INTO `tbl_faculty` (`faculty_name`,`description`) VALUES ('$Faculty','$Description');";
    mysqli_query($con, $sql);


    $BeforeSql = "SELECT * FROM tbl_faculty WHERE faculty_name = '$Faculty'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    

    $auditsql = "INSERT INTO `tbl_history` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$Faculty', '$rowBefore' );";
    mysqli_query($con, $auditsql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>