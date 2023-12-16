<?php 
   session_start();
   $user_data = $_SESSION['user'];
   $id = $user_data['id'];

  $conn = new mysqli("localhost", "root", "", "tms");

  if($conn->connect_error){
      header('Content-Type: application/json');
      echo json_encode(["message" =>"Connection Error!"]);
  }

  $sql = "Select * FROM task WHERE u_id = $id";
  $stmt_result = $conn->query($sql);

  if($stmt_result->num_rows > 0){
    $data = $stmt_result->fetch_all(MYSQLI_ASSOC);
       header('Content-Type: application/json');
       echo json_encode($data);
       die();
  }
   
      header('Content-Type: application/json');
      echo json_encode(["message" => "Data Empty!"]);
      die();
      $conn->close();

?>