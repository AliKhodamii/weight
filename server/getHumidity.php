<?php
require_once('./lib/jdatetime.class.php');


$hostname = 'localhost:3306';
$username = 'jjqioyps_watering_user';
$password = 'ibG_tvK1bznh';
$database = 'jjqioyps_smartgarden_db';

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT *,ROUND(AVG(humidity)) AS avg_humidity FROM humidity_records  where date_and_time between \"" . date('Y-m-d H:i:s', strtotime("-1 month")) . "\" and \"" . date('Y-m-d H:i:s') . "\"GROUP BY day(date_and_time) order by date_and_time asc";
$result = $conn->query($sql);

// SELECT *,ROUND(AVG(weight)) AS avg_weight FROM weight_entries  where entry_date between '2025-03-12'  and '2025-04-13' GROUP BY day(entry_date),user_id  order by entry_date asc;
//put result in a array
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $data[] = (new jDateTime(false, true))->convertFormatToFormat('m/d', 'Y-m-d H:i:s', $row["date_and_time"]);
        if ($row["avg_humidity"] > 900) {
            $humidity[] = 0;
        } else if ($row["avg_humidity"] < 700) {
            $humidity[] = 100;
        } else {
            $humidity[] = ($row["avg_humidity"] - 900) / -2;
        }
    }
}

$conn->close();
header('Content-Type: application/json');

$obj = array(
    $data,
    $humidity
);
echo json_encode($obj);
?>