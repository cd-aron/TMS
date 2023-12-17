<?php 

 if($_SERVER['REQUEST_METHOD'] === "POST"){
   $conn = new mysqli("localhost", "root", "", "tms");  
   
   if($conn-> connect_error){
    http_response_code(500);
    die();
   }

   $json_data = file_get_contents('php://input');
   $data = json_decode($json_data);

 
   $email = $data->email;
   $phone_number = $data->phone_number;
   $role = $data->role;
   $uname = $data->uname;
   $pass = $data->pass;
   
   $hash = password_hash($pass, PASSWORD_DEFAULT);


   $sql = $conn->prepare("SELECT email, phone_number, uname FROM admin");
       $sql->execute();
       $result = $sql->get_result();

       while ($row = $result->fetch_assoc()) {
        if ($email == $row['email'] || $phone_number == $row['phone_number'] || $uname == $row['uname']) {
            http_response_code(409);
            die();
        }
    }

   $sql = "INSERT INTO admin(email, phone_number, uname, pass,role) VALUES('$email', '$phone_number','$uname', '$hash', '$role')";
     
   if($conn->query($sql)){
      http_response_code(200);

      header ('Content-Type: application/json');
      echo json_encode(["message" => "Supervisor Successfully Added"]);
      die();
   }
   else{
    http_response_code(500);
    die();
   }
}
 else{
   http_response_code(405);
   die();
 }
?>