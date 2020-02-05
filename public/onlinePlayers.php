<?php
$db = new PDO("mysql:host=localhost;dbname=ttt", 'root', 'root');
if($db->errorCode())  {
    echo 'connection error';
    exit;
} else {
    echo 'connection ok';
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $room_number = $_GET['room_number'];
    $position = $_GET['position'];
    $player = $_GET['player'];
    $result = $db->query("SELECT * FROM moves WHERE room_number = $room_number");
    $json = json_encode($result->fetchAll());
    echo '<pre>' . $json . '</pre>';
} else {
    $room_number = $_POST['room_number'];
    $position = $_POST['position'];
    $player = $_POST['player'];
    $db->query("INSERT INTO moves (position, player, room_number) VALUES ($position, '$player', $room_number)");
}
