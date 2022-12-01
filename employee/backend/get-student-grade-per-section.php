<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$Username = $_POST['Username'];
$Section = $_POST['Section'];

    $sql = mysqli_query($con,"SELECT `tbl_gradesperstudent`.* ,`tbl_studentinfo`.`firstname`, `tbl_studentinfo`.`middlename`, `tbl_studentinfo`.`lastname` FROM `tbl_gradesperstudent` LEFT JOIN `tbl_subjectpersection` ON `tbl_gradesperstudent`.`sectionandacademicyear` = `tbl_subjectpersection`.`sectionacademicyear` LEFT JOIN `tbl_studentinfo` ON `tbl_gradesperstudent`.`student_id` = `tbl_studentinfo`.`studentnumber` WHERE `tbl_subjectpersection`.`professor_initial` = '$Username' AND `tbl_gradesperstudent`.`sectionandacademicyear` = '$Section';");

    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
 }catch(Exception $e){
    exit(json_encode(array("statusCode" =>201, "error"=>$e->getMessage())));
 }

 ?>