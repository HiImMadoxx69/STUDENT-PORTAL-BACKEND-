<?php
include_once("../connections/connection.php");
$con = connection();


$StudID = $_POST['StudentId'];
$Name = $_POST['FeeName'];
$Amount = $_POST['Amount'];
$Type = $_POST['Type'];
$Editor = $_POST['Editor'];
if(isset($StudID)){

    
    $sql = "SELECT * FROM tbl_bills WHERE studentid = '$StudID' AND billname = '$Name' AND status ='active'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>201)));
    }

  
  
try{
    $sql = "INSERT INTO `tbl_bills` (`studentid`, `billcode`,`billname`, `amount`, `type`) VALUES ('$StudID', '$Name', '$Name','$Amount','$Type');";
    mysqli_query($con, $sql);

    $xsql = "INSERT INTO `tbl_announcement` (`editor`, `category`, `message`,`target`) VALUES ('$Editor', 'Warning', 'Check you bills now!','$StudID');";
    mysqli_query($con, $xsql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: new fee: $Name to User Id: $StudID');";
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