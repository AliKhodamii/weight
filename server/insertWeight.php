<?php

// connection info
$hostname = 'localhost:3306';
$username = 'jjqioyps_user';
$password = 'Sed1508libero';
$database = 'jjqioyps_weight';

$conn = new mysqli($hostname,$username,$password,$database);

if($conn->connect_error){
    die ("connection error " . $conn->connect_error);
}

// handle post req
$user_id = $_POST['user_id'];
$weight = $_POST['weight'];

echo '<pre>';
print_r($_POST);
echo '</pre>';

$stmt = $conn->prepare("INSERT INTO weight_entries (user_id,weight) VALUES (?, ?)");
$stmt->bind_param("id",$user_id,$weight);

if ($stmt->execute()) {
    echo "Inserted!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();