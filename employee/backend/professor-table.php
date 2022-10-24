<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();


$sql = mysqli_query($con, "SELECT id, profile_url, firstname, middlename, lastname, email, civil_status, gender, faculty, professor_username, status, added_at FROM `tbl_professor`  ORDER BY `id` DESC");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
?>