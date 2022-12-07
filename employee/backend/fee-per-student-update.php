<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

try{

$CurrentId  = $_POST['ID'];
$StudentNumber = $_POST['StudentNumber'];
$Payment = $_POST['Payment'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];
$Category = $_POST['Category'];
//sd
try{
    
    if (isset($CurrentId)) {

        $beforeSql = "SELECT * FROM tbl_accountbalance WHERE `id` = '$CurrentId';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        $sql = "UPDATE `tbl_accountbalance` SET `tbl_accountbalance`.`totalpaid` = `tbl_accountbalance`.`totalpaid` + '$Payment', `tbl_accountbalance`.`balance` = `tbl_accountbalance`.`balance` - `tbl_accountbalance`.`totalpaid`, `tbl_accountbalance`.`payment` = '$Payment' WHERE `tbl_accountbalance`.`id` = '$CurrentId';";
        mysqli_query($con, $sql);

    //     $sql = "INSERT INTO `tbl_accountbalancehistory` (`academicyear`,`semester`,`totalfee`,`totalpaid`,`balance`,`payment`) VALUES ('$AcademicYear','$Semester');";
    // mysqli_query($con, $sql);


       
        $AfterSql = "SELECT * FROM tbl_accountbalance WHERE `id` = '$CurrentId';";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $arPayment = [$Payment];
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$StudentNumber', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_accountbalance` WHERE `id` =  '$CurrentId'";
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