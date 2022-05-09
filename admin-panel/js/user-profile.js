//Javascript for user-profile 
const btnUpdateMyProfile = document.getElementById('btnUpdateProfile');//button of update profile info

btnUpdateMyProfile.addEventListener('click', updateProfile);//get the click listener of button update profile

document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);

let btnChangeToLoadingS = document.getElementById('btnChangeToLoading');//loading button

let modalMessage = document.getElementById('modalLogs');// modal message body

  

//POST NAME
function updateProfile(e){

 let currentId = document.getElementById('currentUserID').value;
    e.preventDefault();
    let fileupload = document.getElementById('profileEdit');// fileupload
  
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
 // Picking up files from the input .  .  .
 let files = fileupload.files;

 // Uploading only one file; multiple uploads are not allowed.
  let imageFile = files[0]; 

   // Create a FormData object.
  formData = new FormData();

    // Add the file to the request.
    formData.append('profileEdit', imageFile, imageFile.name);
    console.log(currentId);
    formData.append('userId', currentId);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('about', about);
    formData.append('position', position);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('twitter', twitter);
    formData.append('facebook', facebook);
    formData.append('instagram', instagram);
    formData.append('linkedin', linkedin);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
   }
    var xhr = new XMLHttpRequest();

    // Open the connection
    xhr.open('POST', '../controller/user-edit.php', true);

xhr.onprogress = function (){
 
btnUpdateMyProfile.style.display = "none";
btnChangeToLoadingS.removeAttribute("hidden");
};
  // Send the Data.
  xhr.send(formData);
    // Set up a handler for when the task for the request is complete.
    
xhr.onload = function(){
  let getResult = JSON.parse(this.responseText);
  setTimeout(delayedFunc, 1000);//Timer for loading
  function delayedFunc(){
        if(getResult.statusCode === 200){
          btnUpdateMyProfile.style.display = "inline-block";
          btnChangeToLoadingS.setAttribute("hidden", "hidden");
           $("#basicModal").modal('toggle');//toggle the modal
           modalMessage.innerText = 'Succesfull';
        }else{          
          btnUpdateMyProfile.style.display = "inline-block";
          btnChangeToLoadingS.setAttribute("hidden", "hidden");
           $("#basicModal").modal('toggle');//toggle the modal
           modalMessage.innerText = 'Failed';
       }//end of if status 200 
      
      }//end of delayedFunc
  


  };//onload
}