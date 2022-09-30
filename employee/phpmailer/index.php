
<?php 


//Include required phpmailer files
require 'includes//PHPMailer.php';
require 'includes//SMTP.php';
require 'includes//Exception.php';
//Define Names spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
//Create instance of phpmailer
$mail = new PHPMailer(); 
//Set mailer to use smtp
$mail->isSMTP();
//define smtp host
$mail->Host = "smtp.gmail.com";
//enable smtp authentication
$mail->SMTPAuth ="true";
//set type of encryption (ssl/tls)
$mail->SMTPSecure = "tls";
//set port to connect smtp
$mail->Port ="587";
//set gmail username
$mail->Username = "nocumadoxx@gmail.com";
//set gmail password
$mail->Password = "pzectockhpctciww";
//set email subject
$mail->Subject = "Test Email Using PHPMailer";
//set sender email
$mail->setFrom("nocumadoxx@gmail.com");
//Email body
$mail->Body = "This is plain text email body";
//Add recipient
$mail->addAddress("emmanuel.nocum@cvsu.edu.ph");
$mail->SMTPDebug = 1;
//Finally send email
if($mail->Send()){
    echo "Email send!";
}else{
    echo "Error";
}
//Closing smtp connection
$mail->smtpClose();

//Host user = iplm.haribon@gmail.com
//Host password = iplmharibon2022