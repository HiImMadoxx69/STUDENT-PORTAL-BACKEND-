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



$Fname = $_POST['Fname'];
$Mname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$Job = $_POST['Position'];
$Birthday = $_POST['Birthday'];
$Sex = $_POST['Sex'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$About = $_POST['About'];
$Twitter = $_POST['Twitter'];
$Facebook = $_POST['Facebook'];
$Instagram = $_POST['Instagram'];
$Linkedin = $_POST['Linkedin'];
$editPosition = $_POST['EditorPosition'];
$editEmail = $_POST['EditorEmail'];
$category =  $_POST['Category'];
$action = $_POST['Action'];
    
try{
    

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
$mail->Password = 'jivthfccfzabrlts';
//set email subject
$mail->Subject = 'AISAT Employee Account Status';
//set sender email
$mail->setFrom('nocumadoxx@gmail.com');
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

    $sql = "INSERT INTO `tbl_admin` (`profile_url`, `email`,`password`, `firstname`, `middlename`, `lastname`, `birthday`, `sex`, `position`, `address`, `contact`, `about`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`) VALUES ('default_profile.jpg', '$Email','$Password', '$Fname', '$Mname', '$Lname', '$Birthday', '$Sex', '$Job', '$Address', '$Contact', '$About', '$Twitter', '$Facebook', '$Instagram', '$Linkedin');";
    mysqli_query($con, $sql);


    $BeforeSql = "SELECT `email`,`firstname`,`middlename`,`lastname`,`birthday`,`sex`,`position`,`address`,`contact`,`about`,`twitterprofile`,`facebookprofile`,`instagramprofile`,`linkedinprofile`,`status`,`added_at` FROM tbl_admin WHERE email = '$Email'";     
                
    mysqli_query($con, $BeforeSql);

    $getBefore = $con ->query($BeforeSql) or die ($con->error);
    $rowBefore = json_encode($getBefore ->fetch_assoc());


    

    $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$action','$category','$editPosition','$editEmail', '$Email', '$rowBefore' );";
    mysqli_query($con, $auditsql);

    exit(json_encode(array("statusCode"=>200)));

  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }

?>