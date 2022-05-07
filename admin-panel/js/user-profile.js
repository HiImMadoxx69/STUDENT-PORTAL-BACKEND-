//Javascript for user-profile 
const btnUpdateMyProfile = document.getElementById('btnUpdateProfile');//button of update profile info
btnUpdateMyProfile.addEventListener('click', updateProfile);//get the click listener of button update profile
document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);
let btnChangeToLoadingS = document.getElementById('btnChangeToLoading');//loading button
let modalMessage = document.getElementById('modalLogs');// modal message body

     //POST NAME
function updateProfile(e){
 
e.preventDefault();

let id = document.getElementById('currentUserID').value;
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

xhr.onprogress = function (){
btnUpdateMyProfile.style.display = "none";
btnChangeToLoadingS.removeAttribute("hidden");
};

xhr.onload = function(){
  setTimeout(delayedFunc, 1000);//Timer for loading
  function delayedFunc(){
    btnUpdateMyProfile.style.display = "inline-block";
    btnChangeToLoadingS.setAttribute("hidden", "hidden");
    console.log("Status: 200");
     $("#basicModal").modal('toggle');//toggle the modal
     modalMessage.innerText = params;
    }
  }
console.log(params);
//send
xhr.send(params);
}