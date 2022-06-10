<?php
include_once("../connections/connection.php");
$con = connection();



$Cname = $_POST['Cname'];
$Faculty = $_POST['Faculty'];
$Credits = $_POST['Credits'];
if(isset($Cname)){
    
$sql = "SELECT * FROM tbl_course WHERE course_name = '$Cname'";

$user = $con ->query($sql) or die ($con->error);
$row = $user->fetch_assoc();
$total = $user->num_rows;

if($total > 0){
    exit(json_encode(array("statusCode"=>201)));
}

try{
    $sql = "INSERT INTO `tbl_course` ( `course_name`, `course_faculty`, `credits`) VALUES ( '$Cname', '$Faculty', '$Credits');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: New Course Name: $Cname');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}

?>