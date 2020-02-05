<?php
$db = new PDO("mysql:host=localhost;dbname=ttt", 'root', 'root');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $room_number = $_GET['room_number'];
    $result = $db->query("SELECT * FROM moves WHERE room_number = $room_number");
    $json = json_encode($result->fetchAll(PDO::FETCH_ASSOC));
    echo $json;
} else {
    if(isset($_POST['deleteRoom'])) {
        $db->query('DELETE FROM moves WHERE room_number = ' . $_POST['room_number']);
    }
    else {
        $room_number = $_POST['room_number'];
        $position = $_POST['position'];
        $player = $_POST['player'];
        $db->query("INSERT INTO moves (position, player, room_number) VALUES ($position, '$player', $room_number)");
    }
}

