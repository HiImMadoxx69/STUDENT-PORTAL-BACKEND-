<?php
try{
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    if(!isset($_SESSION)){
        exit(json_encode(array("statusCode"=>'noSession')));
    }
    if(isset($_POST['Session']) == session_id()){
        exit(json_encode(array("statusCode"=>session_id())));
    }

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
  }
?>