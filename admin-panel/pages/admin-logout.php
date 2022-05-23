<?php

session_start();

unset($_SESSION['ID']);
unset($_SESSION['Position']);
echo header("Location: admin-login.php");
?>