<?php
session_start();
unset($_SESSION['Email']);
unset($_SESSION['Position']);
echo header("Location: login.php");
?>