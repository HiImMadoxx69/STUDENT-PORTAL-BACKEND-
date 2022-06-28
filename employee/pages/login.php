<?php
if(!isset($_SESSION)){
  session_start();//if there is no session then start session
} //Session lol

if(isset($_SESSION['Email'])){
  echo header("Location: dashboard.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Admin</title>
    <link rel="stylesheet" href="../assets/css/main/app.css">
    <link rel="stylesheet" href="../assets/css/pages/auth.css">
    <link rel="shortcut icon" href="../assets/images/logo/globe-client-logo.png" type="image/png">
</head>

<body>
    <div id="auth">
        
<div class="row h-100">
    <div class="col-lg-5 col-12">
        <div id="auth-left">
            <div class="auth-logo">
                <a href="../../homepage.php"><img src="../assets/images/logo/client-logo.png" alt="Logo"></a>
            </div>
            <h1 class="auth-title">Employee Portal</h1>
            <p class="auth-subtitle mb-5">Log in with your data that has been sent to your Email</p>

            <form id = "loginForm">
                <div class="form-group position-relative has-icon-left mb-4">
                    <input type="text" class="form-control" id="inputEmail" placeholder="Email" OnChange ="checkEmail()" >
                    <div class="form-control-icon">
                        <i class="bi bi-person"></i>
                    </div>
                    <div class="invalid-feedback" hidden id ="ErrorEmail">
                                    
                    </div>
                </div>
               
                <div class="form-group position-relative has-icon-left mb-4">
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                    <div class="form-control-icon">
                        <i class="bi bi-shield-lock"></i>
                    </div>
                    <div class="invalid-feedback" hidden id ="ErrorPassword">
                                    
                    </div>
                </div>
                <!-- <div class="form-check form-check-lg d-flex align-items-end">
                    <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label text-gray-600" for="flexCheckDefault">
                        Keep me logged in
                    </label>
                </div> -->
                <button type ="submit" class="btn btn-primary btn-block btn-lg shadow-lg mt-5" id="btnLogin">Log in</button>

                <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5" type="button" id="btnLoginLoading"  hidden disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                </button>
            </form>
            <div class="text-center mt-5 text-lg fs-4">
                <!-- <p class="text-gray-600">Don't have an account? <a href="auth-register.html" class="font-bold">Sign
                        up</a>.</p> -->
                <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right">

        </div>
    </div>
</div>

    </div>
    
    <script src ="../pages-js/login.js?t=1491313943549" type = "text/javascript"></script>
</body>

</html>
