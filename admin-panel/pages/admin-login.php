
<?php
if(!isset($_SESSION)){
  session_start();//if there is no session then start session
} //Session lol

if(isset($_SESSION['ID'])){
  echo header("Location: admin-dashboard.php");
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Admin Login</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="../img/globe-client-logo.png" rel="icon" >
  <link href="../img/globe-client-logo.png" rel="apple-touch-icon" >

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" type="text/css">

  <!-- Vendor CSS Files -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" type="text/css">
  <link href="../vendor/boxicons/css/boxicons.min.css" rel="stylesheet" type="text/css">
  <link href="../vendor/quill/quill.snow.css" rel="stylesheet" type="text/css">
  <link href="../vendor/quill/quill.bubble.css" rel="stylesheet" type="text/css">
  <link href="../vendor/remixicon/remixicon.css" rel="stylesheet" type="text/css">
  <link href="../vendor/simple-datatables/style.css" rel="stylesheet" type="text/css">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet" type="text/css">

  
  <!-- My Custom Css-->
  <link href="../css/custom.css" rel="stylesheet" type="text/css">

  <style>
  body {
    background-image:url('../img/aisat-bg-login.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
</head>

<body>

  <main>
     
       
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  
      
          <!-- End Sized spinners -->
          

    
          <!-- End of Error Modal -->
          <div class="container" id ="containerLogin">
            
          <div class="row justify-content-center">

            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

    

              <div class="card mb-3">

                <div class="card-body">
             
                 
                  <div class="pt-4 pb-2">
                  <a href ="../../homepage.php"><i class ="bi bi-house-door"></i></a>
                  <div class="d-flex justify-content-center py-4">
                    
                <a href="admin-login.php" class="logo d-flex align-items-center w-auto">
                  <img src="../img/globe-client-logo.png" alt="">
                  <span class="d-none d-lg-block" style ="color:#08203c;">Employee Portal</span>
                </a>
              </div><!-- End Logo -->  <p class="text-center small">Enter your Email & Password to Login</p>
                  </div>
<!-- alert -->

<div >
      <div>
<div class="alert alert-danger alert-dismissible fade show w-100" role="alert" id = "alertLogin">
              <center><p id="alertMessage">A simple danger alert—check it out!</p>
              </center>    
            </div>
      </div>
</div>
                  <form class="row g-3 needs-validation" id ="loginForm">

                    <div class="col-12">
                      
                      <label for="yourUsername" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" required>
                        <div class="invalid-feedback">Please enter your email.</div>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" required>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>
      
                    </script> 
                    <div class="col-12">
                    <button class="btn btn-primary w-100" type="button" disabled id ="btnChangeToLoading" hidden>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Logging in...
              </button>
                      <button class="btn btn-primary w-100" type="submit"id ="btnLogin">Login</button>
                    </div>
                     <div class="col-12">
                      <p class="small mb-0">Forget your password? <a href="#" data-bs-toggle="modal" data-bs-target="#verticalycentered">Click Here</a></p>
                    </div>
                  </form>

                </div>
              </div>

             
            </div>
          </div>
        </div>
        <div class="modal fade" id="verticalycentered" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Recover Your Password</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="col-12">
                      <label for="recoverEmail" class="form-label">Email</label>
                      <input type="email" name="recoverEmail" class="form-control" id="recoverEmail" required>
                      <div class="invalid-feedback">Please enter your Email!</div>
                    </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-success" onclick="recoverPass(); return false;">Submit</button>
                    </div>
                  </div>
                </div>
              </div><!-- End Vertically centered Modal-->

      </section>

    </div>
  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  
  
  <!-------------------------------------------- MY JAVASCRIPT admin-login ------------------------------->
  <script src="../vendor/jquery-3.6.0.min.js?t=1491313943549"></script>
  <script src ="../js/user-login.js?t=1491313943549" type = "text/javascript">
  </script>
  <!-- END OF  MY JAVASCRIPT admin-login -->
  <!-- Vendor JS Files -->
  <script src="../vendor/apexcharts/apexcharts.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/chart.js/chart.min.js"></script>
  <script src="../vendor/echarts/echarts.min.js"></script>
  <script src="../vendor/quill/quill.min.js"></script>
  <script src="../vendor/simple-datatables/simple-datatables.js"></script>
  <script src="../vendor/tinymce/tinymce.min.js"></script>
  <!-- <script src="../vendor/php-email-form/validate.js"></script> -->

  <!-- Template Main JS File -->
  <script src="../js/main.js?t=1491313943549"></script>
 
</body>

</html>