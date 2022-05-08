//Javascript for user-profile 
const btnUpdateMyProfile = document.getElementById('btnUpdateProfile');//button of update profile info
btnUpdateMyProfile.addEventListener('click', updateProfile);//get the click listener of button update profile
document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);
let btnChangeToLoadingS = document.getElementById('btnChangeToLoading');//loading button
let modalMessage = document.getElementById('modalLogs');// modal message body
let fileupload = document.getElementById('profileEdit');// fileupload
const id = document.getElementById('currentUserID').value;
     //POST NAME
function updateProfile(e){
 
e.preventDefault();


let firstname = document.getElementById('firstName').value;
let lastname = document.getElementById('lastName').value;
let about = document.getElementById('About').value;
let position = document.getElementById('Position').value;
let address = document.getElementById('Address').value;
let contact = document.getElementById('Contact').value;
let email = document.getElementById('Email').value;
let twitter = document.getElementById('Twitter').value;
let facebook = document.getElementById('Facebook').value;
let instagram = document.getElementById('Instagram').value;
let linkedin = document.getElementById('Linkedin').value;



let params =  
"firstname="+firstname+
"&lastname="+lastname+
"&about="+about+
"&position="+position+
"&address="+address+
"&contact="+contact+
"&email="+email+
"&twitter="+twitter+
"&facebook="+facebook+
"&instagram="+instagram+
"&linkedin="+linkedin+
"&id="+id
;

const xhr = new XMLHttpRequest();

xhr.open('POST', '../controller/user-edit.php', true);

xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


console.log(params);
//send
xhr.send(params);

xhr.onprogress = function (){
 
btnUpdateMyProfile.style.display = "none";
btnChangeToLoadingS.removeAttribute("hidden");
};

xhr.onload = function(){
    let getResult = JSON.parse(this.responseText);
    setTimeout(delayedFunc, 1000);//Timer for loading
    function delayedFunc(){
          if(getResult.statusCode === 200){
            btnUpdateMyProfile.style.display = "inline-block";
            btnChangeToLoadingS.setAttribute("hidden", "hidden");
             $("#basicModal").modal('toggle');//toggle the modal
             modalMessage.innerText = 'Succesfull';
             uploadFile();
          }else{          
            btnUpdateMyProfile.style.display = "inline-block";
            btnChangeToLoadingS.setAttribute("hidden", "hidden");
             $("#basicModal").modal('toggle');//toggle the modal
             modalMessage.innerText = 'Failed';
         }//end of if status 200 
        
        }//end of delayedFunc
    


  }//onload


  function uploadFile() {

  
 // Picking up files from the input .  .  .
 let files = fileupload.files;

 // Uploading only one file; multiple uploads are not allowed.
  let file = files[0]; 

   // Create a FormData object.
  formData = new FormData();

    // Add the file to the request.
    formData.append('profileEdit', file, file.name);
    var xhr = new XMLHttpRequest();

    // Open the connection.
    xhr.open('POST', '../controller/upload.php', true);


    // Set up a handler for when the task for the request is complete.
    xhr.onload = function () {
      if (xhr.status === 200) {
       let getResult = JSON.parse(this.responseText);
       console.log(getResult.statusCode);
      } else {
        console.log("error");
      }
    };

    // Send the Data.
    xhr.send(formData);
  }
}