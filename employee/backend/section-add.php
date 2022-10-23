<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$editPosition = $_POST['EditorPosition'];
$editEmail = $_POST['EditorEmail'];
$category =  $_POST['Category'];
$action = $_POST['Action'];
//Add shits here
$Course = $_POST['Course'];
$Year = $_POST['Year'];
$Semester = $_POST['Semester'];
$StartYear = $_POST['StartYear'];
$EndYear = $_POST['EndYear'];
$AcademicYear = $_POST['AcademicYear'];
$SectionName = $_POST['SectionName'];
try{
    $sql = "INSERT INTO `tbl_section` (`section_name`,`course`,`section_year`,`semester`,`year_start`,`year_end`,`academic_year`) VALUES ('$SectionName', '$Course', '$Year', '$Semester', '$StartYear', '$EndYear', '$AcademicYear');";
    mysqli_query($con, $sql);


     

    $BeforeSql = "SELECT * FROM tbl_section WHERE section_name = '$SectionName' AND academic_year = '$AcademicYear'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$SectionName', '$rowBefore' );";
    mysqli_query($con, $auditsql);



    $getAllSubject = mysqli_query($con, "SELECT * FROM tbl_subject WHERE course_available = '$Course' AND year_available = '$Year' AND semester_available = '$Semester'");

    //store in result
    $result = mysqli_fetch_all($getAllSubject, MYSQLI_ASSOC);
    $count = count($result);
    for($i = 0; $i < $count; $i++ ){
        $GenerateSubName = $result[$i]['subject_code'];
        $GenerateDesc = $result[$i]['subject_name'];
        $GenerateUnit = $result[$i]['units'];
        $GenerateID = $result[$i]['id'];
        $sqlGenerateSchedule = "INSERT INTO tbl_subjectpersection (`subject_name`, `section_name`, `description`, `units`,`semester`, `schedule_day`, `schedule_time`, `professor_initial`, `academic_year`, `subject_id`,`section_id`) VALUES ('$GenerateSubName', '$SectionName', '$GenerateDesc', '$GenerateUnit','$Semester', '', '', '', '$AcademicYear', '$GenerateID','$GenerateSectionID');";
        mysqli_query($con, $sqlGenerateSchedule);
    }

    
    exit(json_encode(array("statusCode"=>$count)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

?>