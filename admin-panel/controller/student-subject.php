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
$Amount = $_POST['Amount'];
$Type = $_POST['Type'];
$Editor = $_POST['Editor'];

if(isset($StudID)){

    
    $sql = "SELECT * FROM tbl_grades WHERE studentid = '$StudID' AND subject_code = '$SubCode' AND status ='active'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>201)));
    }
    //if archived subject overwrite
    $Deletesql = "DELETE FROM `tbl_grades` WHERE `tbl_grades`.`studentid` = '$StudID' AND `tbl_grades`.`subject_code` = '$SubCode' AND status != 'active'";
    mysqli_query($con, $Deletesql);
  
try{
    $sql = "INSERT INTO `tbl_grades` (`studentid`, `subject_name`, `subject_code`, `units`, `grade`, `instructor`, `schedule`) VALUES ('$StudID', '$SubName', '$SubCode', '$Units', '$Grade', '$Instructor', '$Schedule');";
    mysqli_query($con, $sql);

    
    $sqlAdd = "UPDATE `tbl_studentinfo` SET balance = balance+$Amount WHERE `tbl_studentinfo`.`studentnumber` = $StudID;";
    
    mysqli_query($con, $sqlAdd);

    $sql = "INSERT INTO `tbl_announcement` (`editor`, `category`, `message`,`target`) VALUES ('$Editor', 'Warning', 'Check you bills now!','$StudID');";
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