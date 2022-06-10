<?php
include_once("../connections/connection.php");
$con = connection();

$name = $_POST['Name'];
$amount = $_POST['Amount'];

if(isset($name)){

    
$sql = "SELECT * FROM tbl_addfee WHERE name = '$name' AND status = 'active'";

$user = $con ->query($sql) or die ($con->error);
$row = $user->fetch_assoc();
$total = $user->num_rows;

if($total > 0){
    exit(json_encode(array("statusCode"=>201)));
}
try{
    $sql = "INSERT INTO `tbl_addfee` (`name`, `amount`) VALUES ('$name', '$amount');";
    mysqli_query($con, $sql);


    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: New miscellaneous fee');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}

?>