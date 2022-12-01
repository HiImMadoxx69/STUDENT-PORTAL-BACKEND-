<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$Email = $_POST['Email'];

    $sql = mysqli_query($con,"SELECT `tbl_professor`.`email` , `tbl_subjectpersection`.* FROM `tbl_professor` LEFT JOIN `tbl_subjectpersection` ON `tbl_professor`.`professor_username` = `tbl_subjectpersection`.`professor_initial` WHERE `tbl_professor`.`email` = '$Email'  AND `tbl_subjectpersection`.`status` = 'active';");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>