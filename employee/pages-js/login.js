//Form, Email, Password Variables
const Email = document.getElementById('inputEmail');
const Password = document.getElementById('inputPassword');
const Form = document.getElementById('loginForm');

//Email and Password input state
let EmailValid = false;
let PasswordValid = false;

//Error Messages
const ErrorEmail = document.getElementById('ErrorEmail');
const ErrorPassword = document.getElementById('ErrorPassword');

//Log In button

const btnLogin = document.getElementById('btnLogin');


//Form Submit Listener
Form.addEventListener('submit' , async (e) => {
    loginLoading(true);//make the button loading
    let ErrorExist = false;

    if(Email.value === "" || Email.value === null){
        errorEmail('Please input a email');
        ErrorExist = true;
        loginLoading(false)
        e.preventDefault();
        
    }if(Password.value === "" || Password.value === null){
        console.log("Password null")
        errorPassword('Please input a password');
        ErrorExist = true;
        loginLoading(false)
        e.preventDefault();
    }
    if(!ErrorExist){
        e.preventDefault();
        //no error submit input
        formData = new FormData();

        formData.append('Email', Email.value);
        formData.append('Password', Password.value);
        
        try{
            const sendRequest = await fetch("../backend/login.php",{
                method: "POST",
                body: formData,
            });
            
            const getResponse = await sendRequest.json();
            if(getResponse.statusCode === 200){
                setTimeout(()=>{location.reload()},1000)
            }
            if(getResponse.statusCode === 201){
                errorPassword('Wrong Password')
                loginLoading(false)
            }
            
        }catch(e){
            loginLoading(false)
          console.error(e)
        }
    }
});

//If button login click
const loginLoading = (StillLoading) =>{
//btnLogin
//btnLoginLoading
    if(StillLoading === true){
        btnLogin.setAttribute("disabled", "disabled");
        let newDom = '';
        newDom += `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...`;
        document.querySelector('#btnLogin').innerHTML = newDom;
    }
    if(StillLoading === false){
        btnLogin.removeAttribute("disabled");
        let newDom = '';
        newDom += `Login`;
        document.querySelector('#btnLogin').innerHTML = newDom;
    }
}


//Onchange Email Validation
const checkEmail = async () =>{
    ErrorEmail.setAttribute("hidden","hidden");// remove the error message

formData = new FormData();

formData.append('Email', Email.value);

    try{
        const sendRequest = await fetch("../backend/checkLoginEmail.php",{
            method: "POST",
            body:formData,
        });
        
        const getResponse = await sendRequest.json();
        //After we check if email exist do this 
        if(getResponse.statusCode == 200){
            EmailValid = true;
            Email.classList.remove('is-invalid');
            Email.classList.add('is-valid');
        }else{
            errorEmail('Email does not exist');
        }
    
    }catch(e){
        console.err(e)
    }



}
//.classList.add

//Password error message
const errorPassword = (message) =>{
    PasswordValid = false;
    Password.classList.remove('is-valid');
    Password.classList.add('is-invalid');
    ErrorPassword.removeAttribute("hidden");// show the error message
    let DomOuput = '';
     
    DomOuput += `<i class="bx bx-radio-circle"></i>`+message+``;

    document.querySelector('#ErrorPassword').innerHTML = DomOuput;
}

//Email error message
const errorEmail = (message) =>{
    EmailValid = false;
    Email.classList.remove('is-valid');
    Email.classList.add('is-invalid');
    ErrorEmail.removeAttribute("hidden");// show the error message
    let DomOuput = '';
     
    DomOuput += `<i class="bx bx-radio-circle"></i>`+message+``;

    document.querySelector('#ErrorEmail').innerHTML = DomOuput;
}

