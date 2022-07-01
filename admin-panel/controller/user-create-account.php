<?php

//includes/PHPMailer.php
//include required phpmailerfiles
require '../PHPMailer/includes/PHPMailer.php';
require '../PHPMailer/includes/SMTP.php';
require '../PHPMailer/includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once("../connections/connection.php");
$con = connection();


$Fname = $_POST['Fname'];
$Mname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Username = $_POST['Username'];
$Password = $_POST['Password'];
$Job = $_POST['Job'];
$Birthday = $_POST['Birthday'];
$Sex = $_POST['Sex'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$About = $_POST['About'];
$Twitter = $_POST['Twitter'];
$Facebook = $_POST['Facebook'];
$Instagram = $_POST['Instagram'];
$Linkedin = $_POST['Linkedin'];
if(isset($Fname)){

    $sql = "SELECT * FROM tbl_admin WHERE username = '$Username'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>201)));
    }
    
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
$mail->Port = "587";
//set gmail username
$mail->Username = "nocumadoxx@gmail.com";
//set gmail password
$mail->Password = "tjmgrybklskwxtia";
//set email subject
$mail->Subject = "AISAT BOT";
//set sender email
$mail->setFrom("nocumadoxx@gmail.com");
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body ="<h1>HI! Our School Now Have A New $Job! </h1> <h2>Welcome to our Family!</h2>
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

//Host user = iplm.haribon@gmail.com
//Host password = iplm2022
if($check = true){
    $sql = "INSERT INTO `tbl_admin` (`profile_url`, `email`, `username`,`password`, `firstname`, `middlename`, `lastname`, `birthday`, `sex`, `position`, `address`, `contact`, `about`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`) VALUES ('default_profile.jpg', '$Email', '$Username','$Password', '$Fname', '$Mname', '$Lname', '$Birthday', '$Sex', '$Job', '$Address', '$Contact', '$About', '$Twitter', '$Facebook', '$Instagram', '$Linkedin');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created a new User Account');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}
  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}
// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }

?>