<?php
     session_start();
   if($_SERVER['REQUEST_METHOD'] === "POST"){
       $conn = new mysqli("localhost", "root", "", "tms");

       if($conn->connect_error){
       http_response_code(500);
        die();
       }
      
       $json_data = file_get_contents('php://input');
       $data = json_decode($json_data);
       
       $uname = $data->uname;
       $pass = $data->pass;

       $sql = $conn->prepare("SELECT * FROM admin WHERE uname = ?");
       $sql->bind_param("s",$uname);
       $sql->execute();
       $result = $sql->get_result();
        
      if ($result->num_rows > 0){
         $data = $result->fetch_assoc();
         if($data['pass'] == $pass){
           $user_data =[
            "id" => $data['id'],
            "uname" => $data['uname']
           ];

           $_SESSION['user'] = $user_data;
           http_response_code(200);
           header('Content-Type: application/json');
           echo json_encode(["message" => "Success In LogIn", "uname" => $data['uname']]); 
           die(); 
         }
         else{
            http_response_code(301);
            die();
         }
      }
      else{
        http_response_code(500);
        die();
      }
       
   }
   else{
     http_response_code(400);
   }
?> 	