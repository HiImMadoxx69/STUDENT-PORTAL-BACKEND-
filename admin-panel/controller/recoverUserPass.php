<?php

// includes/PHPMailer.php
//Inclue required phpmailerfiles
require '../PHPMailer/includes/PHPMailer.php';
require '../PHPMailer/includes/SMTP.php';
require '../PHPMailer/includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once("../connections/connection.php");
$con = connection();

$Email = $_POST['recoverMail'];

if(isset($Email)){
try{
    $sql = "SELECT * FROM tbl_admin WHERE email = '$Email' AND status = 'active'";
  
    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  $pass;
    if($total > 0){
        $pass = $row['password'];
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
$mail->Port = "587";
//set gmail username
$mail->Username = "nocumadoxx@gmail.com";
//set gmail password
$mail->Password = "pzectockhpctciww";
//set email subject
$mail->Subject = "Aisat Bot";
//set sender email
$mail->setFrom("nocumadoxx@gmail.com");
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body ="<h1>Hi it seems like you forgot your password! </h1> <h2>Don't worry, >We got you!</h2>
<p>Your Password = $pass</p>";
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
exit(json_encode(array("statusCode"=>200)));
    }

    exit(json_encode(array("statusCode"=>201)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}