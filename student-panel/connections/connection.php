<?php

function connection(){

    //localhost
    $host = "localhost";
    $username = "root";
    $password = "admin";
    $database = "db_admin";

    // //upserver
    // $host = "sql113.epizy.com";
    // $username = "epiz_31877053";
    // $password = "3DVYKyzccj5u";
    // $database = "epiz_31877053_db_studentportal";
    
    $con = new mysqli($host, $username, $password, $database,);
    
    if($con->connect_error){
        echo $con->connect_error;
    }else{
        return $con;
    }
}

?>