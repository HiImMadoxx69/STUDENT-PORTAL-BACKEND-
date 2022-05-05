document.getElementById('loginForm').addEventListener('submit', logIn);
document.getElementById('btnLogin').addEventListener('click', logIn);
const spin = document.getElementById('cardSpinner');//Spinner
const logInNow = document.getElementById('containerLogin');//Main login form
const username = document.getElementById('yourUsername').value;
const password = document.getElementById('yourPassword').value;

function logIn(e){
    e.preventDefault();
    
    const xhr = new XMLHttpRequest();

    let params = "username="+username+"&password="+password;

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
           
            let user = JSON.parse(this.responseText);
             
             if(user === username){
                location.reload();
            }else{
                console.log("Wrong Credentials!");
            }

            console.log(user);
       }
    }

    xhr.send();
}