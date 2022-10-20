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
$SectionName = $Course.' '.substr($Year,0,1).'-'.'1';
try{

    $existSQL = "SELECT COUNT(*) FROM tbl_section WHERE course = '$Course' AND section_year = '$Year' AND academic_year = '$AcademicYear'";
    mysqli_query($con, $existSQL);

    $toInt = (int) $existSQL;
    if($existSQL > 1){
        $SectionName  = null;
        $uniqueSection = $toInt + 1;
        $SectionName = $Course.' '.substr($Year,0,1).'-'.$toInt;
    } 

    $sql = "INSERT INTO `tbl_section` (`section_name`,`course`,`section_year`,`semester`,`year_start`,`year_end`,`academic_year`) VALUES ('$SectionName', '$Course', '$Year', '$Semester', '$StartYear', '$EndYear', '$AcademicYear');";
    mysqli_query($con, $sql);


    $BeforeSql = "SELECT * FROM tbl_section WHERE section_name = '$SectionName' AND academic_year = '$AcademicYear'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    

    $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$SectionName', '$rowBefore' );";
    mysqli_query($con, $auditsql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

?>