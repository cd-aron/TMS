<?php 
   if($_SERVER['REQUEST_METHOD'] === "POST"){
       $json_data = file_get_contents('php://input');
       $data = json_decode($json_data);
         
       $u_id = $data->u_id;
       $uname = $data->uname;
       $deadline = $data->deadline;
       $task =$data->task;
       $task_des = $data->task_des;
       $link = $data->link;
       $doc = $data->doc;
       $status = 0;

       $conn = new mysqli("localhost", "root", "", "tms");
       if($conn->connect_error){
         echo json_encode(["message" => "Connection Error !", "status" => "500"]);
       }
       
       $sql = "INSERT INTO task(u_id,uname, deadline, task, task_description, link, doc, status) 
          VALUES('$u_id','$uname','$deadline','$task','$task_des','$link','$doc', '$status')";
       if(mysqli_query($conn, $sql)){
         echo json_encode(["message" => "Task added", "status" => "200"]);
       }
       else{
         echo json_encode(["message" => "Server Error", "status" => "303"]);
       }
   }
   else{
      echo json_encode(["message"=>"Method Not Allowed !", "status" => "400"]);
   }
?> 