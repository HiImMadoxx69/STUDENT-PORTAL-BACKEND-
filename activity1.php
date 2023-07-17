
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activity 1</title>
</head>
<body>
    
<?php

function phpBasicAlgorithm($minNumber, $maxNumber, $divNumber){
    try{
        $count = 0;
        $holdMin = $minNumber;
        for($minNumber; $minNumber <= $maxNumber; $minNumber++){
            if($minNumber % $divNumber == 0){
                $count++;
            }
        }
        echo '<h2>Sample Data</h2><p>First number:'.$holdMin.'</p><p>Second number:'.$maxNumber.'</p><p>Divisible number: '.$divNumber.'</p>Output is:'.$count.'</p>';
    }catch(Exception $e){
        echo '<h3>Please input a valid number!</h3>';
    }
}

phpBasicAlgorithm(5, 20, 3);
?>


</body>
</html>