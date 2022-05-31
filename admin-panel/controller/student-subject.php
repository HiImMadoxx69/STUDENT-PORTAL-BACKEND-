<?php
include_once("../connections/connection.php");
$con = connection();

$StudID = $_POST['StudentId'];
$SubName = $_POST['Subject_name'];
$SubCode = $_POST['Subject_code'];
$Units = $_POST['Units'];
$Grade = $_POST['Grade'];
$Instructor = $_POST['Instructor'];
$Schedule = $_POST['Schedule'];

if(isset($StudID)){

    
    $sql = "SELECT * FROM tbl_grades WHERE studentid = '$StudID' AND subject_code = '$SubCode'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>201)));
    }
try{
    $sql = "INSERT INTO `tbl_grades` (`studentid`, `subject_name`, `subject_code`, `units`, `grade`, `instructor`, `schedule`) VALUES ('$StudID', '$SubName', '$SubCode', '$Units', '$Grade', '$Instructor', '$Schedule');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: new subject: $SubName to User Id: $StudID');";
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