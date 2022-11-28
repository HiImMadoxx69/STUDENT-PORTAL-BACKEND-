<?php
try{
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    include_once("../connections/connection.php");
$con = connection();

$sql = mysqli_query($con, "SELECT `tbl_studentregistration`.* , `tbl_studentinfo`.`firstname`,`tbl_studentinfo`.`middlename`, `tbl_studentinfo`.`lastname`, `tbl_studentinfo`.`profile_url`, `tbl_feeperstudent`.*, `tbl_gradesperstudent`.* FROM `tbl_studentregistration` LEFT JOIN `tbl_studentinfo` ON `tbl_studentregistration`.`student_id` = `tbl_studentinfo`.`studentnumber` LEFT JOIN `tbl_feeperstudent` ON `tbl_studentregistration`.`sectionandsemester` = `tbl_feeperstudent`.`sectionandsemester` LEFT JOIN `tbl_gradesperstudent` ON `tbl_studentregistration`.`sectionandsemester` = `tbl_gradesperstudent`.`sectionandsemester` ORDER BY `tbl_studentregistration`.`added_at`;");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
}catch (Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

?>