<?php

// connection info

$hostname = 'localhost:3306';
$username = 'jjqioyps_user';
$password = 'Sed1508libero';
$database = 'jjqioyps_weight';

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("connection error" . $conn->connect_error);
}

$sql = "SELECT * FROM users";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = [];

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

$conn->close();

echo json_encode($rows);
