let log_form = document.querySelector('#log_form')

let uname = document.querySelector('#uname')
let pass = document.querySelector('#pass')


function validate(field){
    if(field.value === ""){
        field.style.borderColor = "red"
        const para = document.createElement("p")
        para.innerText = "Please Fill " + field.name
        document.body.appendChild(para)
        setTimeout(function(){
            document.body.removeChild(para)
        }, 2000)

        return false
    }
    else{
        field.style.borderColor = "black"
        return true
    }
}


log_form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validate(pass)) {

        const data = {
            "uname": uname.value,
            "pass": pass.value
        }

        const init = {
            method: "POST",
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost/tms/server/admin_log.php", init)
            .then(response => {
                if (response.status === 200) {

                 return response.json()

                } else if (response.status === 301) {
                    throw new Error("Incorrect Password")

                } else if (response.status === 400) {
                    throw new Error("Invalid Request")
                } else {
                    return response.json().then(errorData => {
                        throw new Error("Internal Server Error")
                    });
                }
            })
            .then(data => {
                alert(data.message)
                window.location = `http://localhost/tms/admin/dashboard.html?uname=${data.uname}`
            })
            .catch(error => {
                if (error.message === "Invalid Request") {
                    alert(error.message)
                } else if (error.message === "Incorrect Password") {
                    alert(error.message)
                } else {
                    alert("Internal Server Error")
                }
            })
    }
})
