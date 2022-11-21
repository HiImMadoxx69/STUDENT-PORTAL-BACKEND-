<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$Schedule = $_POST['Schedule'];
$StudentNumber = $_POST['StudentNumber'];

$GetSchedule = json_decode($Schedule, true);

for($i = 0; $i < count($GetSchedule); $i++ ){ 
$Sched = $GetSchedule[$i]['sched_code'];
$StudentNumber = $GetSchedule[$i]['student_id'];
$SubjectName = $GetSchedule[$i]['subject_name'];
$SectionName = $GetSchedule[$i]['section_name'];
$Description = $GetSchedule[$i]['description'];
$Units = $GetSchedule[$i]['units'];
$Semester = $GetSchedule[$i]['semester'];
$Day = $GetSchedule[$i]['schedule_day'];
$Time = $GetSchedule[$i]['schedule_time'];
$AcademicYear = $GetSchedule[$i]['academic_year'];
$SectionAndYear = $GetSchedule[$i]['sectionandacademicyear'];

$sqlGenerateSchedule = "INSERT INTO tbl_gradesperstudent (`sched_code`, `student_id`,`subject_name`,`section_name`,`description`,`units`,`semester`,`schedule_day`,`schedule_time`,`sectionandacademicyear`) VALUES ('$Sched', '$StudentNumber', '$SubjectName', '$SectionName', '$Description', '$Units', '$Semester', '$Day', '$Time', '$AcademicYear');";
mysqli_query($con, $sqlGenerateSchedule);

}
exit(json_encode(array("statusCode"=>$GetSchedule[0]['id'])));

?>