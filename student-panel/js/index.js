
window.onload = function() {
   getAllStudentData();
    getAllResults();
    getAllBills();
    getAllNotifications();
}
setInterval('getAllResults()', 50000);
setInterval('getAllBills()', 50000);
setInterval('getAllNotifications()', 50000);

//get all notitifications
var StudentInfo = {};


const getAllNotifications = async () =>{
    let studentNumber = document.getElementById('studentNumber').value;
    formData = new FormData();
    formData.append('studentNumber', studentNumber);
    const fetchResponse = await fetch("../controller/student-notification.php",{
        method: "POST",
        body:formData,
    });

    const getResponse = await fetchResponse.json();

    console.log(getResponse);

    let notificationCounter = '';

    notificationCounter += `You have `+getResponse.length+` notifications`;

    document.querySelector('#notif-counter').innerHTML = notificationCounter;
    document.querySelector('#notif-badge').innerHTML = getResponse.length;

    //Dropdown
    let notificationDrop = '';
    for(let i =0; i< getResponse.length; i++){
        if(i < 4) {
            if(getResponse[i].category == "Warning"){
                notificationDrop += ` 
                <li class="notification-item">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <p>`+getResponse[i].message+`</p>
                  <p>`+getResponse[i].added_at+`</p>
                </div>
              </li>
            
              <li>
                <hr class="dropdown-divider">
              </li>`;
               }else if(getResponse[i].category == "Danger"){
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-x-circle text-danger"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
               }else if(getResponse[i].category == "Success"){
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-check-circle text-success"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
               }else{
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-info-circle text-primary"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
               }
        }
       
    }
    notificationDrop += `<li class="dropdown-footer">
    <a href="#" onClick="showAllNotif(); return false;">Show all notifications</a>
  </li>`;
    document.querySelector('#notif-content').innerHTML =notificationDrop;
}


// Refresh or reload page.
// function refresh() {
//     window.location.reload();
// }

//Show All Notification
const showAllNotif = async () =>{
    let studentNumber = document.getElementById('studentNumber').value;
    formData = new FormData();
    formData.append('studentNumber', studentNumber);
    const fetchResponse = await fetch("../controller/student-notification.php",{
        method: "POST",
        body:formData,
    });

    const getResponse = await fetchResponse.json();

    console.log(getResponse);

    let notificationCounter = '';

       //Dropdown
    let notificationDrop = '';
    for(let i =0; i< getResponse.length; i++){
        if(i < 4) {
                 notificationDrop += ` 
                <li class="notification-item">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <p>`+getResponse[i].message+`</p>
                  <p>`+getResponse[i].added_at+`</p>
                </div>
              </li>
            
              <li>
                <hr class="dropdown-divider">
              </li>`;
               }else if(getResponse[i].category == "Danger"){
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-x-circle text-danger"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
               }else if(getResponse[i].category == "Success"){
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-check-circle text-success"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
               }else{
                   notificationDrop += `
                   <li class="notification-item">
                   <i class="bi bi-info-circle text-primary"></i>
                   <div>
                     <p>`+getResponse[i].message+`</p>
                     <p>`+getResponse[i].added_at+`</p>
                   </div>
                 </li>
               
                 <li>
                   <hr class="dropdown-divider">
                 </li>`;
              }
        }
    document.querySelector('#notif-content').innerHTML =notificationDrop;
}


//getAllResults
const getAllResults = async () =>{
    let studentNumber = document.getElementById('studentNumber').value;
    formData = new FormData();
    formData.append('studentNumber', studentNumber);
    const fetchResponse = await fetch("../controller/student-grade-table.php",{
        method: "POST",
        body:formData,
    });
    const getResponse = await fetchResponse.json();
    console.log(getResponse)
    let output = '';
    let myTable = '';
    let count = 0;
    let MyAverage = 0;
for(let i =0; i<getResponse.length;i++){
    if(getResponse[i].grade == 0){
        getResponse[i].grade = "No Grade";
    }
    output +=`<tr>
    <td>`+getResponse[i].subject_code+`</td>
    <td>`+getResponse[i].subject_name+`</td>
    <td>`+getResponse[i].units+`</td>
    <td>`+getResponse[i].grade+`</td>
    </tr>`;
    if(getResponse[i].grade > 0){
        MyAverage = parseFloat(MyAverage) + parseFloat(getResponse[i].grade);
        count++; 
     }
}
console.log(MyAverage)
MyAverage = parseFloat(MyAverage) / parseFloat(count);
MyAverage = MyAverage.toFixed(2)
output +=`<tr>
<td>Average</td>
<td>-</td>
<td>-</td>
<td>`+MyAverage+`<td></tr>`;

let schedules ='';
    for(let i =0; i<getResponse.length;i++){
        if(getResponse[i].grade == 0){
            getResponse[i].grade = "No Grade";
        }
        schedules +=`<tr>
        <td>`+getResponse[i].subject_name+`</td>
        <td>`+getResponse[i].schedule+`</td>
        <td>`+getResponse[i].instructor+`</td>
        </tr>`;
    }
        document.querySelector('#grade-table-body').innerHTML = output;
        document.querySelector('#schedule-table-body').innerHTML = schedules;
}


//Get All Bills

const getAllBills = async() =>{
    let studentNumber = document.getElementById('studentNumber').value;
    console.log(studentNumber)
        formData = new FormData();
        formData.append('studentNumber', studentNumber);
        const fetchResponse = await fetch("../controller/student-fee-table.php",{
            method: "POST",
            body:formData,
        });
        const getResponse = await fetchResponse.json();
        console.log(getResponse)
        
        let output = '';
        let miscFee = '';
        let totalAmount = 0;
        let balance = 0;
for(let i = 0; i<getResponse.length;i++){
    if(getResponse[i].type ==='Subject'){
        output += `<tr>
        <td>`+getResponse[i].billcode+`</td>
        <td></td>
        <td>`+getResponse[i].amount+`</td>
        </tr>`;
        totalAmount += parseFloat(getResponse[i].amount);
    }
    if(getResponse[i].type === 'Miscellaneous Fee'){
        miscFee += `<tr>
        <td>`+getResponse[i].billcode+`</td>
        <td></td>
        <td>`+getResponse[i].amount+`</td>
        </tr>`;
      }
      totalAmount += parseFloat(getResponse[i].amount);
}
     
miscFee += `<tr>
<td style="background-color:#0dff98">Total</td>
<td style="background-color:#0dff98"></td>
<td style="background-color:#0dff98">`+totalAmount+`</td>
</tr style="background-color:#0dff98">
`;

 document.querySelector('#subject-fee-table-body').innerHTML = output;
 document.querySelector('#misc-fee-table-body').innerHTML = miscFee;

 
}

//fetchData
const getAllStudentData = async () =>{
  let studentID = document.getElementById("studentIDHolder").value;

  formData = new FormData();
  formData.append("StudentID", studentID);

  const fetchStudentInfo = await fetch("../controller/student-table.php",{
    method: "POST",
    body: formData,
});

const getResponse = await fetchStudentInfo.json();

StudentInfo = getResponse;
}

//Change Password
const changePassword = async () =>{
  let studentID = document.getElementById("studentIDHolder").value;
  let currentPass = StudentInfo[0].password;
  let currentPassword = document.getElementById('currentPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if(currentPass !== currentPassword){
    console.log(currentPass)
    console.log(currentPassword)
    
  }else if(newPassword !== confirmPassword){
    alert("New Password and Confirm Password Doesnt match!");
  }else if(newPassword === currentPass){
    alert("Your new password is still the same!");
  }
  else if (newPassword.length <6){
    alert("Your password is too short!");
  }else{
    formData = new FormData();
    formData.append("StudentID", studentID);
    formData.append("NewPassword", confirmPassword);
    const fetchEditPassword = await fetch("../controller/edit-password.php",{
      method: "POST",
      body: formData,
  });

  const getResponse = await fetchEditPassword.json();

  if(getResponse.statusCode == 200){
    $('#verticalycentered').modal('hide');
    alert("Change Succesfully!");
    }
  }
}