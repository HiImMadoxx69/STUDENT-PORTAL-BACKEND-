<?php
include_once("../connections/connection.php");
$con = connection();

$StudentId = $_POST['StudentID'];

$sql = mysqli_query($con, "SELECT * FROM `tbl_studentinfo` WHERE studentnumber = '$StudentId' ORDER BY `id` DESC");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
?>