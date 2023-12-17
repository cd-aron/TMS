<?php 
    session_start();
    $user_data = $_SESSION['user'];
    $id = $user_data['id'];

    $conn = new mysqli("localhost", "root", "", "tms");

    if($conn->connect_error){
        echo json_encode(["message" => "Internal Server Error!"]);
        die();
    }

    $sql = "SELECT * FROM admin where id = $id";
    
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $data = $result->fetch_assoc();
        echo json_encode($data);
        die();
    }
?>