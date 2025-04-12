<?php
// require_once('./lib/jdatetime.class.php');

$hostname = 'localhost:3306';
$username = 'jjqioyps_user';
$password = 'Sed1508libero';
$database = 'jjqioyps_weight';

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// $sql = "SELECT *,ROUND(AVG(humidity)) AS avg_humidity FROM humidity_records  where date_and_time between \"" . date('Y-m-d H:i:s', strtotime("-1 month")) . "\" and \"" . date('Y-m-d H:i:s') . "\"GROUP BY day(date_and_time) order by date_and_time asc";

$sql = "SELECT *,ROUND(AVG(weight)) AS avg_weight FROM weight_entries  where entry_date  between \"" . date('Y-m-d H:i:s', strtotime("-1 month")) . "\" and \"" . date('Y-m-d H:i:s') . "\" GROUP BY day(entry_date),user_id  order by entry_date asc";
$result = $conn->query($sql);

// put result in a array

$data = array();
$rows = [];
$dataByUser = [];
$userAvgWeight = [];
$userEntryDate = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        // $data[] = (new jDateTime(false, true))->convertFormatToFormat('m/d', 'Y-m-d H:i:s', $row["date_and_time"]);

        // if ($row["avg_humidity"] > 900) {
        //     $humidity[] = 0;
        // } else if ($row["avg_humidity"] < 700) {
        //     $humidity[] = 100;
        // } else {
        //     $humidity[] = ($row["avg_humidity"] - 900) / -2;
        // }
        $userId = $row["user_id"];
        $dataByUser[$userId][] = $row;

        $userAvgWeight[$userId][] = $row['avg_weight'];
        $userEntryDate[$userId][] = date('Y-m-d', strtotime($row['entry_date']));
    }
}

$conn->close();
header('Content-Type: application/json');

$obj = array(
    $userAvgWeight,
    $userEntryDate
);

echo json_encode($obj);
