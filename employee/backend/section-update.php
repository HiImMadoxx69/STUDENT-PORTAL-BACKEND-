<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

try{



$CurrentId  = $_POST['ID'];
$Semester = $_POST['Semester'];
$Status = $_POST['Status'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];

//sd
try{
    
    if (isset($CurrentId)) {

        $beforeSql = "SELECT * FROM tbl_section WHERE `id` = '$CurrentId';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        $sql = "UPDATE `tbl_section` SET `subject_name` = '$SubjectName',`units` = '$Units',`type` = '$Type',`course_available` = '$Course',`year_available` = '$Year',`semester_available` = '$Semester',`status` = '$Status' WHERE `tbl_section`.`subject_code` = '$SubjectCode';";
        mysqli_query($con, $sql);
       
        $AfterSql = "SELECT * FROM tbl_section WHERE `subject_code` = '$SubjectCode';";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$SubjectCode', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_section` WHERE `subject_code` =  '$SubjectCode'";
        mysqli_query($con, $xsql);

        $user = $con ->query($xsql) or die ($con->error);
        $row = $user->fetch_assoc();
        exit(json_encode(array("statusCode"=>$row)));
    }
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
?>