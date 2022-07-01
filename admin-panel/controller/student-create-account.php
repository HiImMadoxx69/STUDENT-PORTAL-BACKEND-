<?php


// includes/PHPMailer.php
//Inclue required phpmailerfiles
require_once '../phpmailer/includes/PHPMailer.php';
require_once '../phpmailer/includes/SMTP.php';
require_once '../phpmailer/includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


include_once("../connections/connection.php");
$con = connection();
try{
    

$StudNum = $_POST['StudentNumber'];
$Fname = $_POST['Fname'];
$Mname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$Birthday = $_POST['Birthday'];
$Sex = $_POST['Sex'];
$Course = $_POST['Course'];
$Section = $_POST['Section'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$Guardian = $_POST['Guardian'];
$GuardianContact = $_POST['GuardianNum'];
if(isset($Fname)){

    $sql = "SELECT * FROM tbl_studentinfo WHERE studentnumber = '$StudNum'";

    $user = $con ->query($sql) or die ($con->error);
    $row = $user->fetch_assoc();
    $total = $user->num_rows;
  
    if($total > 0){
        exit(json_encode(array("statusCode"=>201)));
    }

try{
    $sql = "INSERT INTO `tbl_studentinfo` (`profile_url`, `studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `address`, `password`, `sex`, `course`, `section`, `birthday`, `contact`, `guardian`, `guardian_contact`) VALUES ('default_profile.jpg', '$StudNum', '$Fname', '$Mname', '$Lname', '$Email', '$Address', '$Password', '$Sex', '$Course', '$Section', '$Birthday', '$Contact', '$Guardian', '$GuardianContact');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created: New Account studentnumber: $StudNum');";
    mysqli_query($con, $auditsql);




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
$mail->Subject = "Test Email Using PHPMailer";
//set sender email
$mail->setFrom("nocumadoxx@gmail.com");
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body ="<h1>HI! Our School Now Have A New Student! </h1> <h2>Welcome to our Family!</h2>
<p>You can now login to our Student Portal portal: Your Student Number = $StudNum and Your Password = $Password</p>";
//Add recipient
$mail->addAddress($Email);
//Finally send email
$mail->Send();
//Closing smtp connection
$mail->smtpClose();

//Host user = iplm.haribon@gmail.com
//Host password = iplm2022

    exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
}
// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }
}catch (Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
?>