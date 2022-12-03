<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$Year = $_['Year'];
$AcademicYear = $_POST['AcademicYear'];
$Semester = $_POST['Semester'];
$Course = $_POST['Course'];
try{

    $sql = mysqli_query($con, "SELECT `tbl_subjectpersection`.* FROM `tbl_subjectpersection` WHERE `tbl_subjectpersection`.`sectionandsemester` = (SELECT `tbl_section`.`sectionandsemester` FROM `tbl_section` WHERE `tbl_section`.`academic_year` = '$AcademicYear' AND `tbl_section`.`section_year` ='$Year' AND `tbl_section`.`semester` ='$Semester' AND `tbl_section`.`course` = '$Course' AND `tbl_section`.`maxstudent` != `tbl_section`.`totalstudent` LIMIT 1)");

    //store in result
    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
    
exit(json_encode($result));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>