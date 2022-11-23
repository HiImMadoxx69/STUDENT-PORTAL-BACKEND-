<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("/employee/connections/connection.php");
$con = connection();
require __DIR__ . '/vendor/autoload.php';

// Use the Configuration class 
use Cloudinary\Configuration\Configuration;

// Configure an instance of your Cloudinary cloud
Configuration::instance('CLOUDINARY_URL=cloudinary://972539963674128:qG-YBem7xYYs73NSQSYgUS06qBg@dm1ztuuvo?secure=true');
// Use the UploadApi class for uploading assets
use Cloudinary\Api\Upload\UploadApi;

// Use the AdminApi class for managing assets
use Cloudinary\Api\Admin\AdminApi;


// Use the Resize transformation group and the ImageTag class
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Background;
use Cloudinary\Tag\ImageTag;


try{

    $Image = $_POST['Image'];
    $ImagePath = $_POST['Image']['path'];
    $ImageName = $_POST['Image']['name'];
    // $cloudinary->uploadApi()->upload($Image, $options = []);

    // $cloudinary->uploadApi()->upload($Image);

// Upload the image

$upload = new UploadApi();

json_encode(
    $upload->upload($ImagePath, [
        'public_id' => $ImageName,
        'use_filename' => TRUE,
        'overwrite' => TRUE]),
    JSON_PRETTY_PRINT
);





// Get the asset details

$admin = new AdminApi();
// echo '<pre>';
// echo 
// json_encode($admin->asset($ImageName, [
//     'colors' => TRUE]), JSON_PRETTY_PRINT
// );

exit(json_encode($admin->asset($ImageName, [
    'colors' => TRUE]), JSON_PRETTY_PRINT
));
// echo '</pre>';



// Create the image tag with the transformed image

// $imgtag = (new ImageTag('flower_sample'))
//     ->resize(Resize::pad()
//         ->width(400)
//         ->height(400)
//         ->background(Background::predominant())
//     );

// echo $imgtag;
// The code above generates an HTML image tag similar to the following:
//  <img src="https://res.cloudinary.com/demo/image/upload/b_auto:predominant,c_pad,h_400,w_400/flower_sample">


}catch (Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}