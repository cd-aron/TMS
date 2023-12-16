<?php
   if($_SERVER['REQUEST_METHOD'] === "POST"){
       session_start();
       $conn = new mysqli("localhost", "root", "", "tms");

       if($conn->connect_error){
       http_response_code(500);
        die();
       }
      
       $json_data = file_get_contents('php://input');
       $data = json_decode($json_data);
       
       $uname = $data->uname;
       $pass = $data->pass;

       $sql = $conn->prepare("SELECT * FROM reg WHERE uname = ?");
       $sql->bind_param("s",$uname);
       $sql->execute();
       $result = $sql->get_result();
        
      if ($result->num_rows > 0){
         $data = $result->fetch_assoc();
         $hash = $data['pass'];
         if(password_verify($pass, $hash)){
            $user_data =[
               "id" => $data['id'],
               "uname" => $data['uname']
              ];
   
              $_SESSION['user'] = $user_data;
           echo json_encode(["message" => "Login Successfull", "status" => 200, "uname"=> $data['uname']]);
           die();
         }
         else{
            echo json_encode(["status"=>301, "message" => "Incorrect Password"]);
         }
      }
      else{
        echo json_encode(["status"=>500, "message" => "Incorrect Username"]);
      }
       
   }
   else{
      echo json_encode(["status"=>400, "message" => "Method Not Allowed!"]);
   }
?> 	