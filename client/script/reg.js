let reg_form = document.querySelector('#reg_form');

let pname = document.querySelector('#pname');
let email = document.querySelector('#email');
let phone_number = document.querySelector('#phone_number');
let address = document.querySelector('#address');
let uname = document.querySelector('#uname');

let pass = document.querySelector('#pass');
let cpass = document.querySelector('#cpass');

function check(field) {
   if (field.value === "") {
      field.style.borderColor = "red";
      const para = document.createElement("p");
      para.innerText = "Please Fill " + field.name;
      document.body.appendChild(para);
      setTimeout(function() {
        document.body.removeChild(para);
      }, 2000);
      
      return false; // Return false to indicate that the field is empty
   } else {
      field.style.borderColor = "";

      if (pass.value !== cpass.value) {
        const cp_message = document.getElementById('cp_message');
        cp_message.innerText = "Password doesn't match";
        cp_message.style.color = "red";
        return false; // Return false to indicate that passwords don't match
     }
     return true; // Return true when the field is filled and passwords match
   }
}

reg_form.addEventListener("submit", (e) =>{
      e.preventDefault();
      
      if (
        check(pname) &&
        check(email) &&
        check(phone_number) &&
        check(address) &&
        check(uname) &&
        check(pass) &&
        check(cpass)
      ) {   
        
        const data = {
            "pname": pname.value,
            "email": email.value,
            "phone_number": phone_number.value,
            "address": address.value,
            "uname": uname.value,
            "pass": pass.value 
        }

        const init = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost/tms/server/reg.php", init)
        .then(response => {
          if (response.status === 200) {
            return response.json()
        } else if (response.status === 405) {
            throw new Error("Bad Request")
        } else if (response.status === 409) {
            throw new Error("Data already exists")
        } else {
            return response.json().then(errorData => {
                throw new Error("Internal Server Error")
            });
        }
        })
        .then(data =>{
           alert(data.message)
           window.location.href = "http://localhost/tms/client/log.html"
        })
        .catch(error =>{
          if (error.message === "Bad Request") {
            alert(error.message)
        } else if (error.message === "Data already exists") {
            alert(error.message)
        } else {
            alert("Internal Server Error")
        }
        })
      }
})
