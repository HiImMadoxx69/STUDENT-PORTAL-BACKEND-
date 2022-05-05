document.getElementById('loginForm').addEventListener('submit', logIn);
document.getElementById('btnLogin').addEventListener('click', logIn);
const spin = document.getElementById('cardSpinner');//Spinner
const logInNow = document.getElementById('containerLogin');//Main login form


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
    xhr.onprogress = function (){
        spin.style.display = 'block';
        logInNow.style.display = 'none';
    }
    //send
    xhr.send(params);
    checkStatus();
}


function checkStatus(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '../controller/user-login.php', true);

    xhr.onprogress = function (){
        spin.style.display = 'block';
        logInNow.style.display = 'none';
    }

    xhr.onload = function (){
        if(this.status == 200){
                      
            let currentUser = this.responseText;
            console.log(currentUser);
            if(currentUser === true){
                location.reload();
                
            }else{
                logInNow.style.display = 'block';
                console.log("Wrong Credentials!");
            }

            console.log(currentUser);
       }
    }
    xhr.send();
}