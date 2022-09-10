<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
 include_once("../connections/connection.php");
$con = connection();


// $uploadDirectory = "../../uploads/";

$errors = []; // Store all foreseen and unforeseen errors here.

// $fileExtensions = ['jpeg','jpg','png']; // Get all the file extensions.

// $fileName = $_FILES['profileEdit']['name'];
// $fileSize = $_FILES['profileEdit']['size'];
// $fileTmpName  = $_FILES['profileEdit']['tmp_name'];
// $fileType = $_FILES['profileEdit']['type'];
// $fileExtension = strtolower(end(explode('.',$fileName)));

// $uploadPath = $uploadDirectory . basename($fileName); 

// echo $uploadPath;

  $userCurrentId = $_POST['UserId'];  
  $fname = $_POST['Fname'];
  $mname = $_POST['Mname'];
  $lname = $_POST['Lname'];
  $birthday = $_POST['Birthday'];
  // exit(json_encode(array("statusCode"=>$birthday)));
  $sex = $_POST['Sex'];
  $about = $_POST['About'];
  $position = $_POST['Job'];
  $address = $_POST['Address'];
  $contact = $_POST['Contact'];
  $email = $_POST['Email'];
  $username = $_POST['Username'];
  $password = $_POST['Password'];
  $twitter = $_POST['Twitter'];
  $facebook = $_POST['Facebook'];
  $instagram = $_POST['Instagram'];
  $linkedin = $_POST['Linkedin'];

  
if (isset($userCurrentId)) {
 
 
 try{
                  $sql = "UPDATE `tbl_admin` SET `email` = '$email',`username` = '$username',`password` = '$password', `firstname` = '$fname', `middlename` = '$mname', `lastname` = '$lname', `birthday` = '$birthday', `sex` = '$sex', `position` = '$position', `address` = '$address', `contact` = '$contact', `about` = '$about', `twitterprofile` = '$twitter', `facebookprofile` = '$facebook', `instagramprofile` = '$instagram', `linkedinprofile` = '$linkedin' WHERE `tbl_admin`.`id` = $userCurrentId;";
    
                  mysqli_query($con, $sql);


                  $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Updated: User Account rowID: $userCurrentId');";
                  mysqli_query($con, $auditsql);
                  exit(json_encode(array("statusCode"=>200)));
 }catch(Exception $e){
  exit(json_encode(array("statusCode"=>$e->getMessage())));
 }
}
//UPLOAD > PHP






// if (isset($img_name)) {
  
//   if ($error === 0){
//       if($img_size > 125000){
//           $em = "Too large"; 
//           echo json_encode(array("statusCode"=>201));
//       }else{
//           $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
//           $img_ex_lc = strtolower($img_ex);

//           $allowed_exs = array("jpg", "jpeg", "png");

//           if (in_array($img_ex_lc, $allowed_exs)){
//               $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
//               $img_upload_path = '../../uploads/'.$new_img_name;
//               move_uploaded_file($tmp_name, $img_upload_path);


//               //Insert into database

//              $sql = "UPDATE tbl_admin SET profile_url = '$new_img_name' WHERE id = 1";


//               mysqli_query($con, $sql);
//               echo json_encode(array("statusCode"=>200));
//           }else{
//             echo json_encode(array("statusCode"=>201));
//           }
//           echo json_encode(array("statusCode"=>201));
//       }
//   }else{
//     echo json_encode(array("statusCode"=>201));
//   }
// }



  



  
?>