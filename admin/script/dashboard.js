
const uname = document.querySelector('#uname');
const body = document.querySelector('.body');

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const name = params.get('uname');
uname.textContent = name;

//Dashboard
// let dashboard = document.querySelector("#dashboard")
//    dashboard.addEventListener("click" ,(e) =>{
//      e.preventDefault();

//     fetch("http://localhost/tms/admin/dashboard.html")
//     .then(response => response.text())
//     .then(htmlContent => {
//       body.innerHTML = htmlContent;
//     })
//     .catch((error) => console.error("Error fetching dashboard.html:", error));
// });


//Task 
let task = document.querySelector("#task")
   task.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/task.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

      //task display
         fetch("http://localhost/tms/server/tasks.php")
         .then(response => response.json())
         .then(data =>{
           console.log(data)
           var temp = ""
           var isCompleted = "Completed"
           var isPending = "Pending"
            data.forEach(item => {

           
             if(item.status == 1){
              temp += `
              <tr>
                  <td>${item.sl_no}</td>
                  <td>${item.uname}</td>
                  <td>${item.deadline}</td>
                  <td>${item.task}</td>
                  <td>${item.task_description}</td>
                  <td></td>
                  <td style="background-color:green; color:white;">${isCompleted}</td>
              </tr>
          `;
             }
             else{
              temp += `
                  <tr>
                  <td>${item.sl_no}</td>
                  <td>${item.uname}</td>
                  <td>${item.deadline}</td>
                  <td>${item.task}</td>
                  <td>${item.task_description}</td>
                  <td><button class="editBtn" onclick="editRedirect(event, ${item.sl_no})">Edit</button></td>
                  <td style="background-color:red; color:white;">${isPending}</td>
              </tr>
                            `;
             }
            })
           document.getElementById('taskTable').innerHTML = temp;
         })
         .catch(error => {
          console.error(error)
         })
      //task display

    })
    .catch((error) => console.error("Error fetching task.html:", error));
});
    function editRedirect(event, id){
        event.preventDefault()
        window.open(`http://localhost/tms/admin/edit_task.html?id=${id}`, '_blank');
      }
    
    
 //Task 
//Assign task
let assign_task = document.querySelector("#assign_task")
assign_task.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/assign_task.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

    //intern_option
    let intern_opt = document.querySelector("#intern_opt");
    fetch("http://localhost/tms/server/intern_opt.php")
        .then(response => response.json())
        .then(data => {

              console.log(data)

               data.forEach(username => {
               
                let option = document.createElement("option");
                option.value = username.id; 
                option.text = username.uname;
                option.classList.add("usr_name");
                intern_opt.add(option);           

            });
        })
        .catch(error => {
            console.error(error);
        });
    //intern_option

    // Assign Task
let usr_name = document.querySelectorAll('.usr_name');

let deadline = document.querySelector('#deadline')
let task = document.querySelector('#task_d')
let task_des = document.querySelector('#task_des')
let link = document.querySelector('#link')
let doc = document.querySelector('#doc')

let assign_form = document.querySelector('#assign_form')


assign_form.addEventListener("submit", e =>{
    e.preventDefault() 
  
    let selected_usr_name = intern_opt.options[intern_opt.selectedIndex].text;
    let data = {
      "u_id": intern_opt.value,
      "uname":selected_usr_name,
      "deadline": deadline.value,
      "task": task.value,
      "task_des": task_des.value,
      "link": link.value,
      "doc": doc.value
    }

    const init = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Request-Type" :"application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost/tms/server/assign_task.php",init)
    .then(response => response.json())
    .then(message =>{
       alert(message.message)
       window.location.reload("http://localhost/tms/admin/dashboard.html");
          
        
    })
    .catch(error =>{
      console.error(error)
    })

    //Assign Task
})
    })
    .catch((error) => console.error("Error fetching assing_task.html:", error));
});

//Interns
let interns = document.querySelector("#interns")
interns.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/interns.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching inters.html:", error));
});

// Add sup
let add_sup = document.querySelector("#add_sup")
add_sup.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/add_sup.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching add_sup.html:", error));
});

// Profile
let profile = document.querySelector("#profile")
profile.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/profile.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching profile.html:", error));
});

//Notification
let notification = document.querySelector("#notification")
notification.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/notification.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching notification.html:", error));
});


