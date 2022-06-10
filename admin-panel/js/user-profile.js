//Javascript for user-profile 
const btnUpdateMyProfile = document.getElementById('btnUpdateProfile');//button of update profile info

btnUpdateMyProfile.addEventListener('click', updateProfile);//get the click listener of button update profile


document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);


//Loading buttons
let btnChangeToLoadingS = document.getElementById('btnChangeToLoading');//loading button
let btnChangeToLoadingPassword = document.getElementById('btnChangeToLoadingPassword');//loading button for change pass


let modalMessage = document.getElementById('modalLogs');// modal message body
let modalHeading = document.getElementById('modalMainMessage');



const currentId = document.getElementById('currentUserID').value;//current user id
const currentPassword = document.getElementById('currentUserPassword').value;

//Change pass button
const btnUserChangePass = document.getElementById('btnUserChangePass');
btnUserChangePass.addEventListener('click', changeUserPassword);

document.getElementById('formUserChangePass').addEventListener('submit', changeUserPassword);//form of changeuser pass

function getSuccessModal(){
  modalHeading.innerHTML = 'Updated Succesfully!';
  $("#basicModal").modal('toggle');//toggle the modal
  modalMessage.innerText = 'Succesfull!';
 
}

function getFailedModal(){
  modalHeading.innerHTML = 'Change Password Failed!';
  $("#basicModal").modal('toggle');//toggle the modal
  modalMessage.innerText = 'Check your inputs and try again!';
}

//Change password function
function changeUserPassword(e){
  e.preventDefault();
let getCurrentPassword = document.getElementById('currentPassword').value;
let newPassword = document.getElementById('newPassword').value;
let confirmNewPassword = document.getElementById('renewPassword').value;

console.log('currentpass' + getCurrentPassword +'; currentPasword ' +currentPassword+ '; newPass' + newPassword+ + '; cnfirmPass '+ confirmNewPassword);
if(newPassword < 6){
  btnUserChangePass.style.display = "inline-block";
  btnChangeToLoadingPassword.setAttribute("hidden", "hidden");
  getFailedModal();
}else if(getCurrentPassword ===  currentPassword && newPassword === confirmNewPassword){
  var xhr = new XMLHttpRequest();
  // Create a FormData object.
  formData = new FormData();
  formData.append('newpassword', newPassword);
  formData.append('userId', currentId);
  xhr.open('POST', '../controller/user-change-password.php', true);
  xhr.send(formData);

  xhr.onprogress = function(){
    btnUserChangePass.style.display = "none";
    btnChangeToLoadingPassword.removeAttribute("hidden");
  }

  xhr.onload = function(){
    let getResult = JSON.parse(this.responseText);
    setTimeout(delayedFunc, 1000);//Timer for loading
    function delayedFunc(){
    if(getResult.statusCode === 200){
      btnUserChangePass.style.display = "inline-block";
      btnChangeToLoadingPassword.setAttribute("hidden", "hidden");
      getSuccessModal();
    }else{          
      btnUserChangePass.style.display = "inline-block";
      btnChangeToLoadingPassword.setAttribute("hidden", "hidden");
      getFailedModal();
      }//end of if status 200 
    }
  }

 

}else{
  getFailedModal();
}
}
  

//POST NAME
function updateProfile(e){

    e.preventDefault();
  
  
    let firstname = document.getElementById('firstName').value;
    let middlename = document.getElementById('middleName').value;
    let lastname = document.getElementById('lastName').value;
    let birthday = document.getElementById('birthDay').value;
    let sex = document.getElementById('Sex').value;
    let about = document.getElementById('About').value;
    let position = document.getElementById('Position').value;
    let address = document.getElementById('Address').value;
    let contact = document.getElementById('Contact').value;
    let email = document.getElementById('Email').value;
    let twitter = document.getElementById('Twitter').value;
    let facebook = document.getElementById('Facebook').value;
    let instagram = document.getElementById('Instagram').value;
    let linkedin = document.getElementById('Linkedin').value; 




   // Create a FormData object.
  formData = new FormData();

    // Add the file to the request.
  
    console.log(currentId);
    formData.append('UserId', currentId);
    formData.append('Fname', firstname);
    formData.append('Mname', middlename);
    formData.append('Lname', lastname);
    formData.append('Birthday', birthday);
    formData.append('Sex', sex);
    formData.append('About', about);
    formData.append('Job', position);
    formData.append('Address', address);
    formData.append('Contact', contact);
    formData.append('Email', email);
    formData.append('Twitter', twitter);
    formData.append('Facebook', facebook);
    formData.append('Instagram', instagram);
    formData.append('Linkedin', linkedin);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
   }
    var xhr = new XMLHttpRequest();

    
    // Open the connection
    xhr.open('POST', '../controller/user-profile-edit.php', true);



xhr.onprogress = function (){
 
btnUpdateMyProfile.style.display = "none";
btnChangeToLoadingS.removeAttribute("hidden");
};
  // Send the Data.
  xhr.send(formData);
    
xhr.onload = function(){
  let getResult = JSON.parse(this.responseText);
  console.log(getResult.statusCode)
  setTimeout(delayedFunc, 1000);//Timer for loading
  function delayedFunc(){
        if(getResult.statusCode === 200){
          btnUpdateMyProfile.style.display = "inline-block";
          btnChangeToLoadingS.setAttribute("hidden", "hidden");
          getSuccessModal();
        }else{          
          btnUpdateMyProfile.style.display = "inline-block";
          btnChangeToLoadingS.setAttribute("hidden", "hidden");
          getFailedModal();
       }//end of if status 200 
      
      }//end of delayedFunc
  


  };//onload
}

//change profile


const changeProfile = async() =>{
 
  let fileupload = document.getElementById('profileEdit');// fileupload


 // Picking up files from the input .  .  .
 let files = fileupload.files;

 // Uploading only one file; multiple uploads are not allowed.
  let imageFile = files[0]; 

   // Create a FormData object.
  formData = new FormData();

  // Add the file to the request.
  formData.append('profileEdit', imageFile, imageFile.name);
  formData.append('userId', currentId);
try{

const fetchResponse = await fetch("../controller/move-only-image.php",{
    method: "POST",
    body:formData,
});

const receivedStatus = await fetchResponse.json();

formImage_Url = new FormData();

formImage_Url.append('Image_Url', receivedStatus.image);
formImage_Url.append('userId', currentId);
const autoUpload = await fetch("../controller/user-edit-pic.php",{
method: "POST",
body:formImage_Url,
});



  console.log(receivedStatus.image)
  let output = ''; 
  output += `<img src="../../uploads/${receivedStatus.image}" alt="Profile" id ="currentPhoto" class="rounded-circle"/>`;
  document.querySelector('#showMyProfilePic').innerHTML = output;
  document.querySelector('#upperProfilepic').innerHTML = output;
  document.querySelector('#profilePicture').innerHTML = output;



}catch (e){
console.log(e)
}
}