<?php

include "conn.php";

  $userCurrentId = mysqli_real_escape_string($con, $_POST['id']);
  $img_name = $_FILES['file']['name'];
  $img_size = $_FILES['file']['size'];
  $tmp_name = $_FILES['file']['tmp_name'];
  $error = $_FILES['file']['error'];
  echo $_FILES['file'];
  if ($error === 0){
      if($img_size > 125000){
          $em = "Too large"; 
      header("Location: index.php?error=$em");
      }else{
          $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
          $img_ex_lc = strtolower($img_ex);

          $allowed_exs = array("jpg", "jpeg", "png");

          if (in_array($img_ex_lc, $allowed_exs)){
              $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
              $img_upload_path = '../../uploads/'.$new_img_name;
              move_uploaded_file($tmp_name,$img_upload_path);


              //Insert into database

             $sql = "UPDATE tbl_admin SET profile_url = '$new_img_name' WHERE id = $userCurrentId";


              mysqli_query($con, $sql);
            echo 'succesfull';
          }else{
            echo json_encode(array("statusCode"=>201));
          }
      }
  }else{
    echo json_encode(array("statusCode"=>201));
  }

  
?>