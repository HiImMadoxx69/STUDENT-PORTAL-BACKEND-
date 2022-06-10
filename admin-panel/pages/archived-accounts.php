<?php
session_start();
if(!isset($_SESSION['ID'])){
  echo header("Location: admin-login.php");
}
include_once("../connections/connection.php");
$con = connection();

$sql = "SELECT * FROM tbl_admin WHERE id = '".$_SESSION['ID']."';";

$user = $con->query($sql) or die ($con->error);//if wrong query kill the connections (students is the query)

$user = $user->fetch_assoc();// for getting the admin credentials it is like a array to access data like profile simply user['profilepic']


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Archived Accounts</title>
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
            
          
<?php

echo '<img src="../../uploads/'.$user['profile_url'].'" alt="Profile" class="rounded-circle"  />';
?>
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

           
            <li>
              <hr class="dropdown-divider">
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


      <li class="nav-item">
        <a class="nav-link collapsed " href="miscellaneous-fee.php">
          <i class="bi bi-currency-dollar"></i>
          <span>Miscellaneous Fee</span>
        </a>
      </li><!-- End Archives Nav -->
      <li class="nav-item">
        <a class="nav-link collapsed " href="announcement.php">
          <i class="bi bi-megaphone-fill"></i>
          <span>Announcement</span>
        </a>
      </li><!-- End Archives Nav -->

    
      
      <li class="nav-item">
        <a class="nav-link collapsed " href="audit.php">
          <i class="bi bi-file-earmark-medical"></i>
          <span>Activity Log</span>
        </a>
      </li><!-- End Archives Nav -->
      <li class="nav-heading">Settings</li>
<li class="nav-item">
  <a class="nav-link collapsed" href="user-profile.php">
    <i class="bi bi-person-circle"></i>
    <span>Profile</span>
  </a>
</li><!-- End Profile Page Nav -->
    </ul>

  </aside><!-- End Sidebar-->

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Archives</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="admin-dashboard.php">Home</a></li>
          <li class="breadcrumb-item">Pages</li>
          <li class="breadcrumb-item active">Archives</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">

        <!-- Left side columns -->
        <div class="col-lg-12">
          <div class="row">
<?php if($_SESSION['Position'] == 'Admin'){
echo '<!-- User Accounts Card -->
<div class="col-xxl-2 col-md-4">
  <div class="card info-card customers-card">

    <div class="card-body">
      <h5 class="card-title">Employee Accounts <span>| Archived</span></h5>

      <div class="d-flex align-items-center">
      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
          <i class="bi bi-people"></i>
        </div>
        <div class="ps-3">
          <h6 id="totalUserArchives"></h6>
          <a href ="archived-user.php" class="text-info small pt-1 fw-bold">View</a> <span class="text-muted small pt-2 ps-1">in table</span>
        </div>
      </div>
    </div>

  </div>
</div><!-- End Sales Card -->';
}?>
            

            <!-- Revenue Card -->
            <div class="col-xxl-2 col-md-4">
              <div class="card info-card customers-card">

                <div class="card-body">
                  <h5 class="card-title">Student Accounts <span>| Archived</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-person-square"></i>
                    </div>
                    <div class="ps-3">
                       <h6 id="totalStudentArchives"></h6>
                      <a href ="archived-students.php" class="text-info small pt-1 fw-bold">View</a> <span class="text-muted small pt-2 ps-1">in table</span>
                     </div>
                  </div>
                </div>

              </div>
            </div><!-- End Revenue Card -->

             <!-- Course Archived Card -->
             <div class="col-xxl-2 col-md-4">
              <div class="card info-card customers-card">

                <div class="card-body">
                  <h5 class="card-title">Course <span>| Archived</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-book"></i>
                    </div>
                    <div class="ps-3">
                       <h6 id="totalCourseArchives"></h6>
                      <a href ="archived-course.php" class="text-info small pt-1 fw-bold">View</a> <span class="text-muted small pt-2 ps-1">in table</span>
                     </div>
                  </div>
                </div>

              </div>
            </div><!-- End Course Archived Card -->


            <!-- Subjects Archived Card -->
            <div class="col-xxl-2 col-md-4">
              <div class="card info-card customers-card">

                <div class="card-body">
                  <h5 class="card-title">Subjects <span>| Archived</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-book"></i>
                    </div>
                    <div class="ps-3">
                       <h6 id="totalSubjectArchives"></h6>
                      <a href ="archived-subjects.php" class="text-info small pt-1 fw-bold">View</a> <span class="text-muted small pt-2 ps-1">in table</span>
                     </div>
                  </div>
                </div>

              </div>
            </div><!-- End Subjects Archived Card -->

            <!-- Results Archived Card -->
            <div class="col-xxl-2 col-md-4">
              <div class="card info-card customers-card">

                <div class="card-body">
                  <h5 class="card-title">Results <span>| Archived</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-file-text"></i>
                    </div>
                    <div class="ps-3">
                       <h6 id="totalResultsArchives"></h6>
                      <a href ="archived-results.php" class="text-info small pt-1 fw-bold">View</a> <span class="text-muted small pt-2 ps-1">in table</span>
                     </div>
                  </div>
                </div>

              </div>
            </div><!-- End Results Archived Card -->

          

  

          </div>
        </div><!-- End Left side columns -->

        <!-- Right side columns -->
  
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
  <script src ="../js/archived-accounts.js?t=1491313943549"  type = "text/javascript"></script>
  <script src="../vendor/jquery-3.6.0.min.js?t=1491313943549"></script>

</script>

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