const uname = document.querySelector('#uname');
const body = document.querySelector('.body');

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const name = params.get('uname');
uname.textContent = name;


let task = document.querySelector("#task")
   task.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/client/task.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

      //task display
         fetch("http://localhost/tms/server/user_task.php")
         .then(response => response.json())
         .then(data =>{
           console.log(data)
           var temp = ""
           var sl = 1;
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
                  <td>${item.link}</td>
                  <td>${item.doc}</td>
                  <td> </td>
                  <td style="background-color:green; color:white;">${isCompleted}</td>
              </tr>
          `;
               
             }
             else{
              temp += `
                  <tr>
                  <td>${sl}</td>
                  <td>${item.uname}</td>
                  <td>${item.deadline}</td>
                  <td>${item.task}</td>
                  <td>${item.task_description}</td>
                  <td>${item.link}</td>
                  <td>${item.doc}</td>
                  <td><button class="doneBtn" onclick="done(event, ${item.sl_no})">Done</button></td>
                  <td style="background-color:red; color:white;">${isPending}</td>
              </tr>
                            `;
                  sl++;          
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
function done(event, id){

  event.preventDefault()
  const init = {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  }
  fetch(`http://localhost/tms/server/user_done.php?id=${id}`, init)
  .then(response => response.json())
  .then( data =>{ 
       alert(data.message)
       window.location.href = "http://localhost/tms/client/user_dash.html"
  })
  .catch( error =>{
      console.log(error)
  })
}
 //Task 