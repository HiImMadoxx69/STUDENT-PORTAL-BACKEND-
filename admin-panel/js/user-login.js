document.getElementById('loginForm').addEventListener('submit', logIn);
const btnLogIn = document.getElementById('btnLogin');// Button for login
btnLogIn.addEventListener('click', logIn);// when clicked
const alertPrompt = document.getElementById('alertLogin');// alert error
const btnChangeToLoadingS = document.getElementById('btnChangeToLoading');//loading button
const alertMSG = document.getElementById('alertMessage');

const recoverPass = async () =>{
  let recoverEmail = document.getElementById('recoverEmail').value;
console.log(recoverEmail)
  formData = new FormData();
  formData.append('recoverMail', recoverEmail);

  const fetchResponse = await fetch("../controller/recoverUserPass.php",{
    method: "POST",
    body: formData,
});

  const getResponse = await fetchResponse.json();
 if(getResponse.statusCode == 200){
  $('#verticalycentered').modal('hide');
  alert("Your password has been sent to your email");
 }else{
   alert("Email Doesn't exist!")
 }
}

// HTTP REQUEST
function logIn(e){
    const username = document.getElementById('yourUsername').value;
    const password = document.getElementById('yourPassword').value;
    
    console.log(username+ " " + password)
if(username !== "" && password !== ""){
  e.preventDefault();
    let params = 
    "username="+username+
    "&password="+password;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '../controller/user-login.php', true);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    //send
    xhr.send(params);
  console.log(params)
    xhr.onprogress = function (){
      // alertPrompt.style.display = 'none';
      btnChangeToLoadingS.removeAttribute("hidden");
      btnLogIn.style.display = 'none';
    }//progress
    
   
xhr.onload = function (){//once loaded
  let getResult = JSON.parse(this.responseText);
setTimeout(delayedFunc, 1000);//Timer for loading
function delayedFunc(){

     
      console.log(getResult.statusCode)
      
      if(getResult.statusCode !== 201){
            location.reload();
      }else{          
          alertPrompt.style.display = 'inline-block';
          alertMSG.innerHTML = 'Wrong Email or Password';
          btnChangeToLoadingS.setAttribute("hidden", "hidden");
          btnLogIn.style.display = 'inline-block';
     }//end of if status 200 
    
    }//end of delayedFunc
  } // end of onload 

}
}//end of login

