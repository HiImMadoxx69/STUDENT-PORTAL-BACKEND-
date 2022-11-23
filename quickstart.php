<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


require __DIR__ . '/vendor/autoload.php';

// Use the Configuration class 
use Cloudinary\Configuration\Configuration;

// Configure an instance of your Cloudinary cloud
Configuration::instance('cloudinary://my_key:my_secret@my_cloud_name?secure=true');
// Use the UploadApi class for uploading assets
use Cloudinary\Api\Upload\UploadApi;

// include_once("/employee/connections/connection.php");
// $con = connection();


try{
    $Image = $_POST['Image'];
    $data = json_decode(file_get_contents($Image), true);
    
// $img_name = $_FILES['Image']['name'];
// $img_size = $_FILES['Image']['size'];
// $imgSize = $_FILES['Image']['size'];
// $tmp_name = $_FILES['Image']['tmp_name'];

$img_name = $data['name'];
$imgSize = $data['size'];
$tmp_name = $data['name'];


    if (isset($img_name)) {
        if ( $imgSize > 2000000) {
          exit(json_encode(array("statusCode"=>201)));
        }  
            try{
                $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
                $img_ex_lc = strtolower($img_ex);

                $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
                $img_upload_path = 'uploads/'.$new_img_name;
                move_uploaded_file($tmp_name, $img_upload_path);
                exit(json_encode(array("image"=>$new_img_name,"statusCode"=>200)));
            }catch(Exception $e){
                exit(json_encode(array("statusCode"=>$e->getMessage())));
            }
                      
                
      }else{
        exit(json_encode(array("image"=>$new_img_name,"statusCode"=>$Image)));
      }
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


// // Upload the image

// $upload = new UploadApi();
// echo '<pre>';
// echo json_encode(
//     $upload->upload('https://res.cloudinary.com/demo/image/upload/flower.jpg', [
//         'public_id' => 'flower_sample',
//         'use_filename' => TRUE,
//         'overwrite' => TRUE]),
//     JSON_PRETTY_PRINT
// );
// echo '</pre>';

// Use the AdminApi class for managing assets
// use Cloudinary\Api\Admin\AdminApi;

// Get the asset details

// $admin = new AdminApi();
// echo '<pre>';
// echo json_encode($admin->asset('flower_sample', [
//     'colors' => TRUE]), JSON_PRETTY_PRINT
// );
// echo '</pre>';

// Use the Resize transformation group and the ImageTag class

// use Cloudinary\Transformation\Resize;
// use Cloudinary\Transformation\Background;
// use Cloudinary\Tag\ImageTag;

// // Create the image tag with the transformed image
// $imgtag = (new ImageTag('flower_sample'))
//     ->resize(Resize::pad()
//         ->width(400)
//         ->height(400)
//         ->background(Background::predominant())
//     );

// echo $imgtag;

// The code above generates an HTML image tag similar to the following:
//  <img src="https://res.cloudinary.com/demo/image/upload/b_auto:predominant,c_pad,h_400,w_400/flower_sample">