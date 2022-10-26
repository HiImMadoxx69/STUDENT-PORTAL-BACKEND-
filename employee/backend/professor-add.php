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


$Firstname = $_POST['Firstname'];
$Middlename = $_POST['Middlename'];
$Lastname = $_POST['Lastname'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$Gender = $_POST['Gender'];
$Faculty = $_POST['Faculty'];
$ProfessorUsername = $_POST['ProfessorUsername'];

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
$mail->Password = 'tjmgrybklskwxtia';
//set email subject
$mail->Subject = 'Test Email Using PHPMailer';
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
try {
    $mail->Send();
    //Closing smtp connection
$mail->smtpClose();
    $check = true;
} catch (Exception $e) {
    exit(json_encode(array("statusCode"=>201)));
}


    $sql = "INSERT INTO `tbl_professor` (`profile_url`, `firstname`, `middlename`, `lastname`, `email`, `password`, `gender`, `faculty`,`professor_username`) VALUES ('default_profile.jpg', '$Firstname', '$Middlename', '$Lastname', '$Email', '$Password', '$Gender', '$Faculty', '$ProfessorUsername');";
    mysqli_query($con, $sql);

    $BeforeSql = "SELECT * FROM tbl_professor WHERE professor_username = '$ProfessorUsername'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    

    $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$ProfessorUsername', '$Faculty', '$rowBefore' );";
    mysqli_query($con, $auditsql);

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }



?>