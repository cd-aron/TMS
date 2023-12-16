let logout = document.querySelector("#logout")
logout.addEventListener("click", e =>{
    
    fetch("http://localhost/tms/server/admin_logout.php")
    .then(response => response.json())
    .then(message =>{
          alert(message.message);
          window.location.href = "http://localhost/tms/admin/index.html"
    })
    .catch(error =>{

    })
})