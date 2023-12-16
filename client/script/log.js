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

        fetch("http://localhost/tms/server/log.php", init)
            .then(response => response.json())
            .then(data => {

                if(data.status === 301){
                    alert(data.message)
                    return 
                }
                else if(data.status === 500){
                    alert(data.message)
                    return
                }
                else if(data.status === 400)
                { 
                    alert(data.message)
                    return
                }
                else if(data.status ===200){
                    alert(data.message)
                    window.location = `http://localhost/tms/client/user_dash.html?uname=${data.uname}`
                }
                else{
                    alert("Internal Server Error!")
                }
                
            })
            .catch(error => {
            })
    }
})
