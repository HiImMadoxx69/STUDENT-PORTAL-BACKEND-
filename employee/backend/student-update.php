<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();


try{
$StudentNumber = $_POST['StudentNumber'];
$FirstName = $_POST['FirstName'];
$MiddleName = $_POST['MiddleName'];
$LastName = $_POST['LastName'];
$Email = $_POST['Email'];
$Address = $_POST['Address'];
$Sex = $_POST['Sex'];
$Course = $_POST['Course'];
$Section = $_POST['Section'];
$Birthday = $_POST['Birthday'];
$Contact = $_POST['Contact'];
$Guardian = $_POST['Guardian'];
$GuardianContact = $_POST['GuardianContact'];
$Status = $_POST['Status'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];
$Category = $_POST['Category'];

try{
    
    if (isset($StudentNumber)) {

        $beforeSql = "SELECT * FROM tbl_studentinfo WHERE `studentnumber` = '$StudentNumber';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        $sql = "UPDATE `tbl_studentinfo` SET `firstname` = '$FirstName', `middlename` = '$MiddleName',`lastname` = '$LastName',`email` = '$Email', `address` = '$Address', `sex` = '$Sex', `course` = '$Course',`section` = '$Section', `birthday` = '$Birthday',`contact` = '$Contact', `guardian` = '$Guardian', `guardian_contact` = '$GuardianContact', `status` = '$Status' WHERE `studentnumber` = '$StudentNumber';";
        mysqli_query($con, $sql);
       
        $AfterSql = "SELECT * FROM tbl_studentinfo WHERE `studentnumber` = '$StudentNumber';";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$StudentNumber', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_studentinfo` WHERE `studentnumber` =  '$StudentNumber';";
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