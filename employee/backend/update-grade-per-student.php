<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

$basic  = new \Vonage\Client\Credentials\Basic("3d9dfeb4", "iouHxWLbe9jz28N0");
$client = new \Vonage\Client($basic);

try{



$CurrentId  = $_POST['ID'];
$Grade = $_POST['Grade'];

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
        

        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$SectionAndYear', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $xsql = "SELECT * from `tbl_gradesperstudent` WHERE `id` = '$CurrentId'";
        mysqli_query($con, $xsql);

        $user = $con ->query($xsql) or die ($con->error);
        $row = $user->fetch_assoc();

        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS("639152052904", BRAND_NAME, 'A text message sent using the Nexmo SMS API')
        );
        
        $message = $response->current();
        
        if ($message->getStatus() == 0) {
            echo "The message was sent successfully\n";
        } else {
            echo "The message failed with status: " . $message->getStatus() . "\n";
        }
        
        exit(json_encode(array("statusCode"=>$row)));
    }
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
?>