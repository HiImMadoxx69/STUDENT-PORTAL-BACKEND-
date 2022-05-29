<?php
include_once("../connections/connection.php");
$con = connection();

$subject_code = $_POST['Subject_Code'];
$subject_name = $_POST['Subject_Name'];
$units = $_POST['Units'];

if(isset($subject_code)){
try{
    $sql = "INSERT INTO `tbl_subject` (`subject_code`, `subject_name`, `units`) VALUES ('$subject_code', '$subject_name', '$units');";
    mysqli_query($con, $sql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}

?>