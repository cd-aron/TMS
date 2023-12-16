<?php 

session_start();
$data = $_SESSION['user'];

$user_id = $data['id'];
$task_id = $_GET['id'];

    
if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $conn = new mysqli("localhost", "root","","tms");
  
    if($conn->connect_error){
       header('Content-Type: application/json');
       echo json_encode(["message" => "Database Connection Error!"]);
    }
    
 
  

    $sql = ("UPDATE task SET status = 1 WHERE u_id = $user_id AND sl_no = $task_id");
    
    if($conn->query($sql)){
        header('Content-Type: application/json');
        echo json_encode(["message" => "Task Done"]);
    }
    

    
    } 
?>