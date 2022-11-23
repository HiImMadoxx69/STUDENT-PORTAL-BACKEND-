<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$editPosition = $_POST['EditorPosition'];
$editEmail = $_POST['EditorEmail'];
$category =  $_POST['Category'];
$action = $_POST['Action'];

$ImageUrl = $_POST['ImageUrl'];
$Title = $_POST['Title'];
$Category = $_POST['Category'];
$Message = $_POST['Message'];
try{
    


    $sql = "INSERT INTO `tbl_announcement` (`image_url`,`title`,`category`,`message`) VALUES ('$ImageUrl','$Title','$Category','$Message');";
    mysqli_query($con, $sql);

    

    $BeforeSql = "SELECT * FROM tbl_announcement ORDER BY id DESC LIMIT 1";     
                

    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());

    $getID = $rowBefore['id'];
    

    $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$getID', '$rowBefore' );";
    mysqli_query($con, $auditsql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>