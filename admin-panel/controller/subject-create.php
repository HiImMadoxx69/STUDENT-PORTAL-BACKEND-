<?php
include_once("../connections/connection.php");
$con = connection();

$subject_code = $_POST['Subject_Code'];
$subject_name = $_POST['Subject_Name'];
$units = $_POST['Units'];

if(isset($subject_code)){

    
$sql = "SELECT * FROM tbl_subject WHERE subject_code = '$subject_code'";

$user = $con ->query($sql) or die ($con->error);
$row = $user->fetch_assoc();
$total = $user->num_rows;

if($total > 0){
    exit(json_encode(array("statusCode"=>201)));
}
try{
    $sql = "INSERT INTO `tbl_subject` (`subject_code`, `subject_name`, `units`) VALUES ('$subject_code', '$subject_name', '$units');";
    mysqli_query($con, $sql);


    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: new subject');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}

?>