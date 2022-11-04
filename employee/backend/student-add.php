<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
//includes/PHPMailer.php
//include required phpmailerfiles
require_once '../phpmailer/includes/PHPMailer.php';
require_once '../phpmailer/includes/SMTP.php';
require_once '../phpmailer/includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


    include_once("../connections/connection.php");
$con = connection();


    $StudentNumber = $_POST['StudentNumber'];   
    $Firstname = $_POST['FirstName'];
    $Middlename = $_POST['MiddleName'];
    $Lastname = $_POST['LastName'];
    $Email = $_POST['Email'];
    $Password = $_POST['Password'];
    $Type = $_POST['Type'];
    $Birthday = $_POST['Birthday'];
    $Address = $_POST['Address'];
    $Course = $_POST['Course'];
    $Section = $_POST['Section'];
    $Action = $_POST['Action'];
    $EditorPosition = $_POST['EditorPosition'];
    $EditorEmail = $_POST['EditorEmail'];
    $Category = $_POST['Category'];

try{
    
$check = false;

// $hashed_password = password_hash($Password, PASSWORD_DEFAULT);
//Create instance of phpmailer
$mail = new PHPMailer();
//Set mailer to use smtp
$mail->isSMTP();
//define smtp host
$mail->Host = "smtp.gmail.com";
//enable smtp authentication
$mail->SMTPAuth = "true";
//set type of encryption (ssl/tls)
$mail->SMTPSecure = "tls";
//set port to connect smtp
$mail->Port = '587';
//set gmail username
$mail->Username = 'nocumadoxx@gmail.com';
//set gmail password
$mail->Password = 'ehluumhipkoxcksw';
//set email subject
$mail->Subject = 'Aisat Portal';
//set sender email
$mail->setFrom('nocumadoxx@gmail.com');
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body ="<h1>HI! Our School Now Have A New Professor! </h1> <h2>Welcome to our Family!</h2>
<p>You can now login to our Employee portal: Your Password = $Password</p>";
//Add recipient
$mail->addAddress($Email);
//Finally send email
try{
    $mail->Send();
    //Closing smtp connection
    $mail->smtpClose();
    $check = true;
    
}catch(Exception $e) {
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    
    try{
        $sql = "INSERT INTO `tbl_studentinfo` (`profile_url`,`studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `password`,`type`,`birthday`,`address`,`course`,`section`) VALUES ('default_profile.jpg',`$StudentNumber`, '$Firstname', '$Middlename', '$Lastname', '$Email', '$hashedPassword','$Type', '$Birthday', '$Address', '$Course', '$Section' );";
        mysqli_query($con, $sql);
    
        $BeforeSql = "SELECT `profile_url`, `firstname`, `middlename`, `lastname`, `email`, `type`, `birthday`, `address`, `course`, `section` `status`, `added_at` FROM tbl_studentinfo WHERE studentnumber = '$StudentNumber'";     
                    
        mysqli_query($con, $BeforeSql);
    
        $getBefore = $con ->query($BeforeSql) or die ($con->error);
        $rowBefore = json_encode($getBefore ->fetch_assoc());
    
    
        
    
        $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$StudentNumber', '$rowBefore' );";
        mysqli_query($con, $auditsql);
    
        
        exit(json_encode(array("statusCode"=>200)));
    }catch(Exception $e){
        exit(json_encode(array("statusCode"=>$e->getMessage())));
    }

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }



?>