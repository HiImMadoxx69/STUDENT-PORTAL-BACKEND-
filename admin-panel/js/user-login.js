document.getElementById('loginForm').addEventListener('submit', logIn);
document.getElementById('btnLogin').addEventListener('click', logIn);
const spin = document.getElementById('cardSpinner');//Spinner
const logInNow = document.getElementById('containerLogin');//Main login form
const alertPrompt = document.getElementById('alertLogin');

// HTTP REQUEST
function logIn(e){
    const username = document.getElementById('yourUsername').value;
    const password = document.getElementById('yourPassword').value;
    
    e.preventDefault();

    let params = 
    "username="+username+
    "&password="+password;
    console.log(params);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '../controller/user-login.php', true);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    logInNow.style.display = 'none';
    spin.style.display = 'inline-block';
    //send
    xhr.send(params);

    xhr.onprogress = function (){
        spin.style.display = 'inline-block';
        logInNow.style.display = 'none';
    }
    xhr.onload = function (){
        if(this.status === 200){ 
            console.log(this.responseText);
            let getResult = JSON.parse(this.responseText);

            if(getResult.statusCode === 200){
            spin.style.display = 'none';
            location.reload();
            }else{
                spin.style.display = 'none';
                alertPrompt.style.display = 'inline-block';
                logInNow.style.display = 'inline-block';   
                console.log("Wrong credentials!");
            }
       }
       
    }
    //checkStatus();
}


function checkStatus(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '../controller/user-login.php', true);

   
    xhr.send();
}
