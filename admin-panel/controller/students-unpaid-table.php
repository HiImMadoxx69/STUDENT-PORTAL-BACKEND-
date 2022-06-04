<?php
include_once("../connections/connection.php");
$con = connection();


$sql = mysqli_query($con, "SELECT * FROM `tbl_studentinfo` WHERE `balance` > 0 AND `status` = 'active' ORDER BY `balance` ASC");

//store in result

$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));
?>