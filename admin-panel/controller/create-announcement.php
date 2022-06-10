<?php
include_once("../connections/connection.php");
$con = connection();




$editor = $_POST['Editor'];
$target = $_POST['Target'];
$category = $_POST['Category'];
$message = $_POST['Message'];
if(isset($editor)){

try{
    $sql = "INSERT INTO `tbl_announcement` (`editor`, `category`, `message`,`target`) VALUES ('$editor', '$category', '$message','$target');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: $editor posted a new announcement');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}
// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }

?>