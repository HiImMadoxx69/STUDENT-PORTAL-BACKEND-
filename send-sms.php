<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


require __DIR__ . '/twilio-php-main/src/Twilio/autoload.php';
    use Twilio\Rest\Client;
try {// Include the bundled autoload from the Twilio PHP Helper Library
    
    // Your Account SID and Auth Token from twilio.com/console
    $account_sid = 'ACae648f1b603ee817585643e5e5fc89c0';
    $auth_token = 'e989c10c051a158e01262447f432e3aa';
    // In production, these should be environment variables. E.g.:
    // $auth_token = $_ENV["TWILIO_ACCOUNT_SID"]
    // A Twilio number you own with SMS capabilities
    $twilio_number = "+13075221591";
    $client = new Client($account_sid, $auth_token);
    $client->messages->create(
        // Where to send a text message (your cell phone?)
        '+639152052904',
        array(
            'from' => $twilio_number,
            'body' => 'I sent this message in under 10 minutes!'
        )
    );

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}