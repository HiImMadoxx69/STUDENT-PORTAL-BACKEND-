<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
 include_once("../connections/connection.php");
$con = connection();

$email = $_POST['Email'];

if (isset($email)) {

    try{
        $sql = "SELECT * from `tbl_admin` WHERE `email` =  '$email'";
        mysqli_query($con, $sql);

        $user = $con ->query($sql) or die ($con->error);
        $row = $user->fetch_assoc();
        exit(json_encode(array($row)));
    }catch(Exception $e){
        exit(json_encode(array("statusCode"=>$e->getMessage())));
    }
}else{
    exit(json_encode(array("statusCode"=>"No email received")));
}
?>