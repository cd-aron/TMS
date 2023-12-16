<?php 
   $conn = new mysqli("localhost", "root", "", "tms");
   if($conn->connect_error){
      http_response_code(404);
   }

   $sql = "SELECT id, uname FROM reg";
   $result = $conn->query($sql);

   if($result->num_rows > 0){ 
     $data = $result->fetch_all(MYSQLI_ASSOC);
     echo json_encode($data);
   }
?>