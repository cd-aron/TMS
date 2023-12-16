<?php 
 if($_SERVER['REQUEST_METHOD'] === "POST"){
   $conn = new mysqli("localhost", "root", "", "tms");  
   
   if($conn-> connect_error){
    http_response_code(500);
    die();
   }

   $json_data = file_get_contents('php://input');
   $data = json_decode($json_data);

   $pname = $data->pname;
   $email = $data->email;
   $phone_number = $data->phone_number;
   $address = $data->address;
   $uname = $data->uname;
   $pass = $data->pass;
   
   $hash = password_hash($pass, PASSWORD_DEFAULT);

   $sql = $conn->prepare("SELECT email, phone_number, uname FROM reg");
       $sql->execute();
       $result = $sql->get_result();

       while ($row = $result->fetch_assoc()) {
        if ($email == $row['email'] || $phone_number == $row['phone_number'] || $uname == $row['uname']) {
            http_response_code(409);
            die();
        }
    }

   $sql = "INSERT INTO reg(pname, email, phone_number,address, uname, pass) VALUES('$pname', '$email', '$phone_number','$address','$uname', '$hash')";

   if($conn->query($sql)){
      http_response_code(200);
      header ('Content-Type: application/json');
      echo json_encode(["message" => "Your request has been recorded!"]);
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