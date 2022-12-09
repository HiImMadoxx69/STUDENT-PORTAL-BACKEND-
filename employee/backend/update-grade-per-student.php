<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

require __DIR__ . '../../../vendor/autoload.php';
use Twilio\Rest\Client;
try{



$CurrentId  = $_POST['ID'];
$Grade = $_POST['Grade'];
$StudentNumber = $_POST['StudentNumber'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];
$Category = $_POST['Category'];
try{
    
    if (isset($CurrentId)) {

        $beforeSql = "SELECT * FROM tbl_gradesperstudent WHERE `id` = '$CurrentId';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        $sql = "UPDATE `tbl_gradesperstudent` SET `grade` = '$Grade' WHERE `tbl_gradesperstudent`.`id` = $CurrentId;";
        mysqli_query($con, $sql);
       
        $AfterSql = "SELECT * FROM tbl_gradesperstudent WHERE `id` = $CurrentId;";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_history` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$SectionAndYear', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_gradesperstudent` WHERE `id` = '$CurrentId'";
        mysqli_query($con, $xsql);

        $user = $con ->query($xsql) or die ($con->error);
        $row = $user->fetch_assoc();

        $studentSql = "SELECT `contact` from `tbl_studentinfo` WHERE `tbl_studentinfo`.`contact` = '$StudentNumber'";
        mysqli_query($con, $xsql);

        $user = $con ->query($studentSql) or die ($con->error);
        $row = $user->fetch_assoc();
        
// Your Account SID and Auth Token from twilio.com/console
$account_sid = 'ACae648f1b603ee817585643e5e5fc89c0';
$auth_token = 'e989c10c051a158e01262447f432e3aa';
// In production, these should be environment variables. E.g.:
// $auth_token = $_ENV["TWILIO_AUTH_TOKEN"]
$contact = substr_replace($row['contact'], "+63", 0, 1);
// A Twilio number you own with SMS capabilities
$twilio_number = '+13075221591';

$client = new Client($account_sid, $auth_token);
$client->messages->create(
    // Where to send a text message (your cell phone?)
    $contact,
    array(
        'from' => $twilio_number,
        'body' => 'Your grades has been updated, please check your student information in our student portal!'
    )
);
       
        
        exit(json_encode(array("statusCode"=>$row)));
    }
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage(),"contact"=> $contact)));
}

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
?>