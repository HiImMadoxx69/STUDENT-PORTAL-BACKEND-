<?php
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

  $studentCurrentId = $_POST['StudNum'];  
  $fname = $_POST['Fname'];
  $mname = $_POST['Mname'];
  $lname = $_POST['Lname'];
  $email = $_POST['Email'];
  // exit(json_encode(array("statusCode"=>$birthday)));
  $password = $_POST['Password'];
  $course = $_POST['Course'];
  $section = $_POST['Section'];
  $birthday = $_POST['Birthday'];
  $contact = $_POST['Contact'];
  $twitter = $_POST['Twitter'];
  $faceboo = $_POST['Facebook'];
  $guardian = $_POST['GuardianN'];
  $guardian_contact = $_POST['GuardianCon'];
  
if (isset($studentCurrentId)) {

 try{
                  $sql = "UPDATE `tbl_studentinfo` SET `firstname` = '$fname', `middlename` = '$mname', `lastname` = '$lname', 'email' = '$email', 'password' = '$password', `birthday` = '$birthday', `contact` = '$contact', `guardian` = '$guardian', `guardian_contact` = '$guardian_contact' WHERE `tbl_studentinfo`.`id` = $studentCurrentId;";
    
                  mysqli_query($con, $sql);
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