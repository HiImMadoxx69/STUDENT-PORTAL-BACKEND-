<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


try{

$CurrentID = $_POST['ID'];
$Section = $_POST['Section'];
$Semester = $_POST['Semester'];
$AcademicYear = $_POST['AcademicYear'];
$Status = $_POST['Status'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];
$Category = $_POST['Category'];
$StudentNumber = $_POST['StudentId'];
try{
    
    if (isset($CurrentID)) {

        $beforeSql = "SELECT * FROM tbl_studentregistration WHERE `id` = '$CurrentID';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        if($Status == 'confirmed'){
            $sql = "UPDATE `tbl_studentregistration` SET `status` = '$Status' WHERE `id` = '$CurrentID';";
            mysqli_query($con, $sql);

            
            
            $sqlv = "UPDATE `tbl_studentinfo` SET `section` = '$Section', `semester` = '$Semester', `academicyear` = '$AcademicYear' WHERE `studentnumber` = '$StudentNumber';";
            mysqli_query($con, $sqlv);
        }

        if($Status == 'decline' || $Status == 'pending'){
            $sql = "UPDATE `tbl_studentregistration` SET `status` = '$Status' WHERE `id` = '$CurrentID';";
            mysqli_query($con, $sql);
        }


       
        $AfterSql = "SELECT * FROM tbl_studentregistration WHERE `id` = '$CurrentID';";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$CurrentID', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_studentregistration` WHERE `id` =  '$CurrentID';";
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