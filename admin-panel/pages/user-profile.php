<?php
session_start();
if(!isset($_SESSION['ID'])){
  echo header("Location: admin-login.php");
}
include_once("../connections/connection.php");
$con = connection();

$sql = "SELECT * FROM tbl_admin WHERE id = '".$_SESSION['ID']."';";

$user = $con->query($sql) or die ($con->error);//if wrong query kill the connections (students is the query)

$user = $user->fetch_assoc();// for getting the admin credentials it is like a array to access data 

$currentId = $user['id'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Users / Profile</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="../img/globe-client-logo.png" rel="icon">
  <link href="../img/globe-client-logo.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
 <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"> 

  <!-- Vendor CSS Files -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="../vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="../vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="../vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="../vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet">


</head>

<body>

  <!-- TOASTER -->


  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    
    <div class="d-flex align-items-center justify-content-between">
      <a href="admin-dashboard.php" class="logo d-flex align-items-center">
        <img src="../img/globe-client-logo.png" alt="">
        <span class="d-none d-lg-block">Employee Portal</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn"></i>
    </div><!-- End Logo -->

 

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
          <a class="nav-link nav-icon search-bar-toggle " href="#">
            <i class="bi bi-search"></i>
          </a>
        </li><!-- End Search Icon-->

     

        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
<div id="upperProfilepic">
<?php

echo '<img src="../../uploads/'.$user['profile_url'].'" alt="Profile" class="rounded-circle"  />';
?>
</div>
                <?php
                echo '<span class="d-none d-md-block dropdown-toggle ps-2">'.$user['username'].'</span>' ;
                ?>
            
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
               <?php
                echo '<h6>'.$user['firstname'].' '.$user['lastname'].'</h6>' ;
                ?>
               <?php
                echo '<span>'.$user['position'].'</span>' ;
                ?>
              
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

        
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="user-profile.php">
                <i class="bi bi-gear"></i>
                <span>Account Settings</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

           
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="admin-logout.php">
                <i class="bi bi-box-arrow-right"></i>           
              <span>Sign Out
                </span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

      </ul>
    </nav><!-- End Icons Navigation -->

  </header><!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link collapsed" href="admin-dashboard.php">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->



      <li class="nav-heading">Pages</li>

     

      <?php if($_SESSION['Position'] == 'Admin'){
  echo '<li class="nav-item">
  <a class="nav-link collapsed" href="user-accounts.php">
    <i class="bi bi-people-fill"></i>
    <span>Employee Account</span>
  </a>
</li><!-- End User Account Nav -->';
}
?>

      <li class="nav-item">
        <a class="nav-link collapsed " href="admin-student-accounts.php">
          <i class="bi bi-person-square"></i>
          <span>Student Account</span>
        </a>
      </li><!-- End Student Account Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="subject.php">
          <i class="bi bi-book"></i>
          <span>Subjects</span>
        </a>
      </li><!-- End Subject Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed " href="courses.php">
          <i class="bx bxs-graduation"></i>
          <span>Courses</span>
        </a>
      </li><!-- End Archives Nav -->
      <li class="nav-item">
        <a class="nav-link collapsed " href="section.php">
          <i class="bi bi-person-lines-fill"></i>
          <span>Section</span>
        </a>
      </li><!-- End Archives Nav -->
<!-- 
      <li class="nav-item">
        <a class="nav-link collapsed " href="miscellaneous-fee.php">
          <i class="bi bi-currency-dollar"></i>
          <span>Miscellaneous Fee</span>
        </a>
      </li> -->
      <!-- End Archives Nav -->
      <li class="nav-item">
        <a class="nav-link collapsed " href="announcement.php">
          <i class="bi bi-megaphone-fill"></i>
          <span>Announcement</span>
        </a>
      </li><!-- End Archives Nav -->


      <li class="nav-item">
        <a class="nav-link collapsed " href="audit.php">
          <i class="bi bi-file-earmark-medical"></i>
          <span>Audit Log</span>
        </a>
      </li><!-- End Archives Nav -->
      <li class="nav-heading">Settings</li>
<li class="nav-item">
  <a class="nav-link" href="user-profile.php">
    <i class="bi bi-person-circle"></i>
    <span>Profile</span>
  </a>
</li><!-- End Profile Page Nav -->
     
    </ul>

  </aside><!-- End Sidebar-->

  <main id="main" class="main">
  <div class="modal fade" id="basicModal" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id ="modalMainMessage">Updated Succesfully!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                    <div class="modal-body">
                     <p id="modalLogs"></p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" onClick ="reloadPage()"data-bs-dismiss="modal">Close</button>
                      <script> function reloadPage(){location.reload()}</script>
                    </div>
                  </div>
                </div>
              </div><!-- End Basic Modal-->

    <div class="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="admin-dashboard.php">Home</a></li>
          <li class="breadcrumb-item">Pages</li>
          <li class="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section profile">
      <div class="row">
        <div class="col-xl-12">

          <div class="card" id ="profileCoverPhoto">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

            
              <div id ="profilePicture">
            <?php
              echo '<img src="../../uploads/'.$user['profile_url'].'" alt="Profile" class="rounded-circle"  />';
            ?>
              </div>
              <?php echo '<h2>'.$user['firstname'].' '.$user['lastname'].'</h2>' 
              ?>
              
              <?php echo '<h3>'.$user['position'].'</h3>' 
              ?>
              <div class="social-links mt-2">
    
                <?php echo '<a href= "'.$user['twitterprofile'].'" class ="twitter"><i class="bi bi-twitter"></i></a>' 
              ?>
             
                <?php echo '<a href= "'.$user['facebookprofile'].'" class ="facebook"><i class="bi bi-facebook"></i></a>' 
              ?>
                

                <?php echo '<a href= "'.$user['instagramprofile'].'" class ="instagram"><i class="bi bi-instagram"></i></a>' 
              ?>
               
                <?php echo '<a href= "'.$user['linkedinprofile'].'" class ="linkedin"><i class="bi bi-linkedin"></i></a>' 
              ?>
              </div>
            </div>
          </div>

        </div>

        <div class="col-xl-12">

          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                </li>

            

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                  <h5 class="card-title">About</h5>
                  <?php echo '<p class ="small fst-italic">'.$user['about'].'</p>' 
              ?>
                  <h5 class="card-title">Profile Details</h5>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['firstname'].' '.$user['middlename'].' '.$user['lastname'].'</div>' 
              ?>
                  </div>

                 

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Position</div>
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['position'].'</div>' 
              ?>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Birthday</div>
                    
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['birthday'].'</div>' 
              ?>
                  </div>
            
                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Address</div>
                   
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['address'].'</div>' 
              ?>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Phone</div>
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['contact'].'</div>' 
              ?>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Email</div>
                
                    <?php echo '<div class="col-lg-9 col-md-8">'.$user['email'].'</div>' 
              ?>
                  </div>

                </div>

                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
               
                <!-- Profile Edit Form -->
                  <form id ="updateProfileForm" enctype="multipart/form-data">
                  

                <!-- PROFILE IMAGE -->
                    <div class="row mb-3">
                      <label for="currentPhoto" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                      <div class="col-md-8 col-slg-9" id ="showMyProfilePic">
                        
                        <?php

                              echo '<img src="../../uploads/'.$user['profile_url'].'" alt="Profile" id ="currentPhoto"  />';
                        ?>
                        <?php

                        ?>
                        
                      </div>
                    </div>
                    <!-- Get the new profile -->
                <div class="row mb-3">
                  <label for="profileEdit" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div class="col-md-8 col-lg-9">
                    <input class="form-control" type ="file" name = "profileEdit" id ="profileEdit" onchange="changeProfile()">
                  
                    </div>
                </div>


                    <div class="row mb-3">
                         <!-- GET THE ID OF USER -->
                <?php
echo '<input type = "hidden" id ="currentUserID" value = "'.$user['id'].'"/>';  
echo '<input type = "hidden" id ="currentUserPassword" value = "'.$user['password'].'"/>';
?>
                      <label for="firstName" class="col-md-4 col-lg-3 col-form-label">First Name</label>
                      <div class="col-md-8 col-lg-9">
                          <?php echo '<input name="firstname" type="text" class="form-control" id="firstName" value ="'.$user['firstname'].'"/>' 
              ?>  
                    </div>
                    </div>


                    <div class="row mb-3">
                      <label for="middleName" class="col-md-4 col-lg-3 col-form-label">Middle Name</label>
                      <div class="col-md-8 col-lg-9">
                        <?php echo '<input name = "middlename" type="text" class="form-control" id="middleName" value ="'.$user['middlename'].'"/>' 
              ?>
                      </div>
                    </div>


                    <div class="row mb-3">
                      <label for="lastName" class="col-md-4 col-lg-3 col-form-label">Last Name</label>
                      <div class="col-md-8 col-lg-9">
                        <?php echo '<input name = "lastname" type="text" class="form-control" id="lastName" value ="'.$user['lastname'].'"/>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="about" class="col-md-4 col-lg-3 col-form-label">Birthday</label>
                      <div class="col-md-8 col-lg-9">
                    
                      <?php echo '<input name = "birthday" type="date" class="form-control" id="birthDay" value ="'.$user['birthday'].'"/>' 
              ?>
                      </div>
                    </div>

                 


                <div class="row mb-3">
                  <label class="col-md-4 col-lg-3 col-form-label" >Position</label>
                  <div class="col-md-8 col-lg-9">
                    <select class="form-select" aria-label="Default select example" disabled id= "Position">
                      <?php
                        if($user['position'] == 'Admin'){
                          echo '<option selected value ="Admin">Admin</option>
                          <option value="Registar">Registar</option>
                      
                          ';
                        }else{
                          echo '<option selected value ="Registrar">Registrar</option>
                          <option value="Admin">Admin</option>
                        
                          ';
                        }
                      ?>
                    </select>
                  </div>
                </div>

                  
                
                <div class="row mb-3">
                  <label class="col-md-4 col-lg-3 col-form-label">Sex</label>
                  <div class="col-md-8 col-lg-9">
                    <select class="form-select" aria-label="Default select example" id= "Sex">
                      <?php
                        if($user['sex'] == 'Male'){
                          echo '<option selected value ="Male">Male</option>
                          <option value="Female">Female</option>
                          ';
    
                        }else{
                          echo '<option selected value ="Female">Female</option>
                          <option value="Male">Male</option>
                          ';
                        }
                      ?>
                    </select>
                  </div>
                </div>
                    <script>
                      let Sex = document.getElementById('Sex').value;
                      if(Sex == "Male"){
                        document.getElementById('profileCoverPhoto').style.backgroundImage ="url('../img/male-background.png')";
                      }
                      if(Sex == "Female"){
                        document.getElementById('profileCoverPhoto').style.backgroundImage ="url('../img/female-background.png')";
                      }
                    </script>
                    <div class="row mb-3">
                      <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
                      <div class="col-md-8 col-lg-9">
                        <?php echo '<input name="address" type="text" class="form-control" id="Address" value ="'.$user['address'].'"/>' 
              ?>
                      </div>
                    </div>
                  
                    <div class="row mb-3">
                      <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
                      <div class="col-md-8 col-lg-9">
                    
                        <?php echo '<textarea name="about" class="form-control" id="About" style="height: 100px">'.$user['about'].'"</textarea>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Contact" class="col-md-4 col-lg-3 col-form-label">Contact</label>
                      <div class="col-md-8 col-lg-9">
                        <?php echo '<input name="contact" type="text" class="form-control" id="Contact" value ="'.$user['contact'].'"/>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                      <div class="col-md-8 col-lg-9">
                     <?php echo '<input name="email" type="email" disabled class="form-control" id="Email" value ="'.$user['email'].'"/>' 
              ?>  
                    </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Twitter" class="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                      <div class="col-md-8 col-lg-9">
                            <?php echo '<input name="twitter" type="text" class="form-control" id="Twitter" value ="'.$user['twitterprofile'].'"/>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Facebook" class="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                      <div class="col-md-8 col-lg-9">
                      
                            <?php echo '<input name="facebook" type="text" class="form-control" id="Facebook" value ="'.$user['facebookprofile'].'"/>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Instagram" class="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                      <div class="col-md-8 col-lg-9">
                        
                            <?php echo '<input name="instagram" type="text" class="form-control" id="Instagram" value ="'.$user['instagramprofile'].'"/>' 
              ?>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Linkedin" class="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                      <div class="col-md-8 col-lg-9">
                        
                        <?php echo '<input name="linkedin" type="text" class="form-control" id="Linkedin" value ="'.$user['linkedinprofile'].'"/>' 
                          ?>
                      </div>
                    </div>

            
           

                    <div class="text-center">
                    <button class="btn btn-primary" type="button" disabled id ="btnChangeToLoading" hidden>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Updating...
              </button>

                      <button type="submit" id ="btnUpdateProfile"   class="btn btn-primary" >Save Changes</button>
                    </div>

                  </form><!-- End Profile Edit Form -->

              </div>

          
                <div class="tab-pane fade pt-3" id="profile-change-password">
                  <!-- Change Password Form -->
                  
                  <form id ="formUserChangePass">

                    <div class="row mb-3">
                      <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="password" type="password" class="form-control" id="currentPassword" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="newpassword" type="password" class="form-control" id="newPassword" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="renewpassword" type="password" class="form-control" id="renewPassword" required>
                      </div>
                    </div>


                    <div class="text-center">
                    <button class="btn btn-primary" type="button" disabled id ="btnChangeToLoadingPassword" hidden>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Updating...
              </button>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary" id ="btnUserChangePass">Change Password</button>
                    </div>
                  </form><!-- End Change Password Form -->

                </div>

              </div><!-- End Bordered Tabs -->

            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
<footer id="footer" class="footer">
    <div class="copyright">
      &copy; Copyright <strong><span>Footer</span></strong>. All Rights Reserved
    </div>
    
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  

  <!-- my javascript for user-prfile -->
  <script src ="../js/user-profile.js?t=1491313943549"></script>
  <script src="../vendor/jquery-3.6.0.min.js?t=1491313943549"></script>


<!-- end of my javascript for user - profile -->

  <!-- Vendor JS Files -->
  <script src="../vendor/apexcharts/apexcharts.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/chart.js/chart.min.js"></script>
  <script src="../vendor/echarts/echarts.min.js"></script>
  <script src="../vendor/quill/quill.min.js"></script>
  <script src="../vendor/simple-datatables/simple-datatables.js"></script>
  <script src="../vendor/tinymce/tinymce.min.js"></script>
 
  <!-- Template Main JS File -->
  <script src="../js/main.js?t=1491313943549"></script>

</body>

</html>