<?php
include_once("../connections/connection.php");
$con = connection();



$Cname = $_POST['Cname'];
$Faculty = $_POST['Faculty'];
$Credits = $_POST['Credits'];
if(isset($Cname)){

try{
    $sql = "INSERT INTO `tbl_course` ( `course_name`, `course_faculty`, `credits`) VALUES ( '$Cname', '$Faculty', '$Credits');";
    mysqli_query($con, $sql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}

?>