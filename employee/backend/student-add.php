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
    $Contact = $_POST['Contact'];
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
    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    $check = false;
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
$mail->Password = 'ehluumhipkoxcksw';
//set email subject
$mail->Subject = 'Aisat Portal';
//set sender email
$mail->setFrom('nocumadoxx@gmail.com');
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body = "<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
<center style="width: 100%; background-color: #f1f1f1;">
<div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
<div style="max-width: 600px; margin: 0 auto;" class="email-container">
    <!-- BEGIN BODY -->
  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      <tr>
      <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                  <td class="logo" style="text-align: center;">
                    <h1><a href="#">AISAT COLLEGE DASMARIÑAS</a></h1>
                  </td>
              </tr>
          </table>
      </td>
      </tr><!-- end tr -->
            <tr>
      <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 0 2.5em; text-align: center; padding-bottom: 3em;">
                    <div class="text">
                        <h2>Welcome to Asian Institute of Technology Dasmariñas!</h2>
                    </div>
                </td>
            </tr>
            <tr>
                  <td style="text-align: center;">
                      <div class="text-author">
                          <img src="images/logo.jpg" alt="" style="width: 100px; max-width: 600px; height: auto; margin: auto; display: block;">
                          <h2 class="name">WELCOME NEW PROFFESOR!</h2>
                           <p><a href="https://aisat-portal.netlify.app/?fbclid=IwAR3_LTplTpx1zRLeUxtWCQkJV0_FEBfh0PzkduGepNm5cLzKWVwRcFWf_AQ" class="btn btn-primary">AISAT HOME PAGE</a></p>
                           <p><a href="https://aisat-portal.netlify.app/Loginemployee?fbclid=IwAR2oAnVixrwy09Sdl6Td2N6m3R42m5_kaNG3v0gXO5i7LkfbZN184oTCrP4" class="btn-custom">Portal Login Page</a></p>
                       </div>
                  </td>
                </tr>
        </table>
      </td>
      </tr><!-- end tr -->
  <!-- 1 Column Text + Button : END -->
  </table>
  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      <tr>
      <td valign="middle" class="bg_light footer email-section">
        <table>
            <tr>
            <td valign="top" width="33.333%" style="padding-top: 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: left; padding-right: 10px;">
                      <h3 class="heading">You can now Login to our Portal!</h3>
                      <p>EMAIL: = $Email</p>
                    <p>PASSWORD: = $Password</p>
                    <p>If you are not able to login your account please contact the registar on the campus.</p>
                  </td>
                </tr>
              </table>
            </td>

          </tr>
        </table>
      </td>
    </tr><!-- end: tr -->
    <tr>
      <td class="bg_light" style="text-align: center;">
          
      </td>
    </tr>
  </table>

</div>
</center>
</body>";
//Add recipient
$mail->addAddress($Email);
//Finally send email
try{
    $mail->Send();
    //Closing smtp connection
    $mail->smtpClose();
    $check = true;

}catch(Exception $e) {
    $check = false;
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

    
    if($check){
        try{
            $sql = "INSERT INTO `tbl_studentinfo` (`profile_url`,`studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `password`,`type`,`birthday`,`address`,`course`,`section`,`contact`) VALUES ('default_profile.jpg','$StudentNumber', '$Firstname', '$Middlename', '$Lastname', '$Email', '$hashedPassword','$Type', '$Birthday', '$Address', '$Course', '$Section', '$Contact' );";
            mysqli_query($con, $sql);
        
            $BeforeSql = "SELECT `profile_url`, `firstname`, `middlename`, `lastname`, `email`, `type`, `birthday`, `address`, `course`, `section`,`contact`, `status`, `added_at` FROM tbl_studentinfo WHERE studentnumber = '$StudentNumber'";     
                        
            mysqli_query($con, $BeforeSql);
        
            $getBefore = $con ->query($BeforeSql) or die ($con->error);
            $rowBefore = json_encode($getBefore ->fetch_assoc());
        
            $auditsql = "INSERT INTO `tbl_updatehistory` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$StudentNumber', '$rowBefore' );";
            mysqli_query($con, $auditsql);
        
            exit(json_encode(array("statusCode"=>200)));
        }catch(Exception $e){
            exit(json_encode(array("statusCode"=>$e->getMessage())));
        }
    }
    
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }



?>