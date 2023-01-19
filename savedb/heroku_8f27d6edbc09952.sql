-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20221227.666ba48dc9
-- https://www.phpmyadmin.net/
--
-- Host: us-cdbr-east-05.cleardb.net
-- Generation Time: Dec 28, 2022 at 07:44 AM
-- Server version: 5.6.50-log
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heroku_8f27d6edbc09952`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_academicyear`
--

CREATE TABLE `tbl_academicyear` (
  `id` int(11) NOT NULL,
  `start` year(4) NOT NULL,
  `end` year(4) NOT NULL,
  `academicyear` varchar(50) NOT NULL,
  `status` varchar(10) DEFAULT 'inactive',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_academicyear`
--

INSERT INTO `tbl_academicyear` (`id`, `start`, `end`, `academicyear`, `status`, `added_at`) VALUES
(4, '2022', '2022', '2022 - 2023', 'active', '2022-12-16 03:19:26');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountbalance`
--

CREATE TABLE `tbl_accountbalance` (
  `id` int(11) NOT NULL,
  `studentnumber` varchar(50) NOT NULL,
  `academicyear` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `totalfee` decimal(10,0) NOT NULL DEFAULT '0',
  `totalpaid` decimal(10,0) NOT NULL DEFAULT '0',
  `balance` decimal(10,0) NOT NULL DEFAULT '0',
  `sectionandsemester` varchar(200) NOT NULL,
  `payment` decimal(10,0) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_accountbalance`
--

INSERT INTO `tbl_accountbalance` (`id`, `studentnumber`, `academicyear`, `semester`, `totalfee`, `totalpaid`, `balance`, `sectionandsemester`, `payment`, `added_at`) VALUES
(4, '220001', '2022 - 2023', '1st semester', 11929, 0, 11929, 'BSIT 1-2 2022 - 2023 1st semester', 0, '2022-12-16 03:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountbalancehistory`
--

CREATE TABLE `tbl_accountbalancehistory` (
  `id` int(11) NOT NULL,
  `academicyear` varchar(50) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `totalfee` double NOT NULL,
  `totalpaid` double NOT NULL,
  `balance` double NOT NULL,
  `payment` double NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_addfee`
--

CREATE TABLE `tbl_addfee` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `profile_url` varchar(200) NOT NULL DEFAULT 'default_profile.jpg',
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `sex` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `about` varchar(300) NOT NULL,
  `twitterprofile` varchar(50) NOT NULL,
  `facebookprofile` varchar(50) NOT NULL,
  `instagramprofile` varchar(50) NOT NULL,
  `linkedinprofile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datehired` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `profile_url`, `email`, `username`, `password`, `firstname`, `middlename`, `lastname`, `birthday`, `sex`, `position`, `address`, `contact`, `about`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`, `status`, `added_at`, `datehired`) VALUES
(434, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670204260/tnnaivzgglazd0clnsaf.jpg', 'emmanuel.nocum@cvsu.edu.ph', '', '$2y$10$xkpb6ylX7peGMO9FOfYUgOlLF04U7jD7Da7MmtnLQfMF2/VM0XYhC', 'Emmanuel', '', 'Nocum', '1991-05-31', '', 'Admin', 'Dasmarinas', '09454515451', 'Kahit ano', '', '', '', '', 'active', '2022-11-24 10:34:53', '0000-00-00'),
(444, 'default_profile.jpg', 'admin@gmail.com', '', '$2y$10$96QyNdo6uqBIwFvuK95AtuxzbwwIXwpUwzDQkHkeHLm1OIJc1tRlm', 'Emmanuel', '', 'Nocum', '2022-12-02', '', 'Admin', 'Dasmarinas Cavite ', '09454521155', '', '', '', '', '', 'active', '2022-12-02 04:44:45', '2022-12-02'),
(454, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670294955/ctelbf0o3sxtzosadogf.png', 'ghosthalzion65@gmail.com', '', '$2y$10$NolaAcLi/0BrCZkCfilDz.VKRS9bUHLAYUQvr7BOq1geGH8ongsra', 'Dave', '', 'Baysa', '2022-12-04', '', 'Admin', 'Cavite', '09123456789', '', '', '', '', '', 'active', '2022-12-04 14:18:40', '2022-12-04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `title` varchar(200) NOT NULL,
  `editor` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_announcement`
--

INSERT INTO `tbl_announcement` (`id`, `image_url`, `title`, `editor`, `category`, `message`, `added_at`, `status`) VALUES
(4, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670565811/nt0w4ihw0uxesqxypnd2.jpg', 'Paruparo Festival 2022', 'ghosthalzion65@gmail.com', 'Announcement', 'Tunghayan ang pagbabalik ng AISAT College DasmariÃ±as sa entablado ng Paruparo Festival 2022. Muli nating ibalik ang ganda at sigla ng Paru-parong DasmarineÃ±os!', '2022-12-09 06:04:03', 'active'),
(14, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670565870/uosoyx32rivfspl4f6rj.jpg', 'HAPPY TEACHERS DAY!', 'ghosthalzion65@gmail.com', 'Announcement', 'You are the spark, the inspiration, the guide, the candle to our life. We are deeply thankful to all of you.', '2022-12-09 06:04:41', 'active'),
(24, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670565903/vwj0vu5un5duk7hagsnl.jpg', 'VIRTUAL ORIENTATION', 'ghosthalzion65@gmail.com', 'Announcement', 'SEPTEMBER 9-10, 2022 COLLEGE 2ND YEAR-4TH YEAR / TRANSFEREES', '2022-12-09 06:05:31', 'active'),
(34, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670565959/nn1jojcojcvugru1y85o.jpg', 'URGENT HIRING!', 'ghosthalzion65@gmail.com', 'Announcement', 'Be part of our growing family! Send your RESUME and TRANSCRIPT OF RECORD to aisatcollege.hrd@gmail.com', '2022-12-09 06:06:20', 'active'),
(44, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670565996/puf3ix4f8m3pypgndhzd.jpg', 'NEW INDOOR POOL!', 'ghosthalzion65@gmail.com', 'Announcement', 'WE INVITE YOU TO CHECK OUR NEWLY BUILT INDOOR POOL', '2022-12-09 06:07:02', 'active'),
(54, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670566031/k588ax0t60jxeg1vtckt.jpg', 'NEW AISAT BUILDING!', 'emmanuel.nocum@cvsu.edu.ph', 'Announcement', 'WE INVITE YOU TO CHECK OUR NEWLY BUILT BUILDING ', '2022-12-09 06:07:37', 'inactive'),
(64, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670566031/k588ax0t60jxeg1vtckt.jpg', 'NEW AISAT BUILDING!', 'ghosthalzion65@gmail.com', 'Announcement', 'WE INVITE YOU TO CHECK OUR NEWLY BUILT BUILDING ', '2022-12-09 06:07:37', 'active'),
(74, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670566065/pyoczcyvslhr4nvzzwhr.jpg', 'AISAT LIBRABRY', 'ghosthalzion65@gmail.com', 'Announcement', 'NEW BOOKS AND NEW LOOK COME CHECK IT OUT!', '2022-12-09 06:08:20', 'active'),
(84, 'https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670566112/ekhtietyk8m82xmj6xsp.jpg', 'CRIMINOLOGY DEPARTMENT RISE!', 'ghosthalzion65@gmail.com', 'Announcement', 'Salute to our criminology student serving their LIMITED WARFIGHTING (ROTC)', '2022-12-09 06:09:29', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_audit`
--

CREATE TABLE `tbl_audit` (
  `id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bills`
--

CREATE TABLE `tbl_bills` (
  `id` int(11) NOT NULL,
  `studentid` int(50) NOT NULL,
  `billcode` varchar(100) NOT NULL,
  `billname` varchar(100) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_collectedfee`
--

CREATE TABLE `tbl_collectedfee` (
  `id` int(11) NOT NULL,
  `collectedfees` decimal(10,0) NOT NULL,
  `status` varchar(50) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `id` int(11) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `course_faculty` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`id`, `course_name`, `description`, `course_faculty`, `status`, `added_at`) VALUES
(4, 'BSIT', 'Bachelor of Science in Information Technology', 'Computer Studies', 'active', '2022-12-16 03:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_faculty`
--

CREATE TABLE `tbl_faculty` (
  `id` int(11) NOT NULL,
  `faculty_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_faculty`
--

INSERT INTO `tbl_faculty` (`id`, `faculty_name`, `description`, `status`, `added_at`) VALUES
(4, 'Computer Studies', 'IT, CS', 'active', '2022-12-16 03:23:27'),
(14, 'Tourism Management', 'Tourism', 'active', '2022-12-16 03:23:49'),
(24, 'Criminology', 'Criminology', 'active', '2022-12-16 03:23:59'),
(34, 'Accounting', 'Accounting', 'active', '2022-12-16 03:24:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fee`
--

CREATE TABLE `tbl_fee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'Miscellaneous fee',
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_fee`
--

INSERT INTO `tbl_fee` (`id`, `name`, `type`, `status`, `added_at`, `amount`) VALUES
(4, 'Tuition Fee (per unit)', 'Miscellaneous fee', 'active', '2022-12-02 11:09:07', 323),
(14, 'Miscellaneous Fee', 'Miscellaneous fee', 'active', '2022-12-04 14:00:40', 4500);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feeperstudent`
--

CREATE TABLE `tbl_feeperstudent` (
  `id` int(11) NOT NULL,
  `student_id` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `semester` varchar(50) NOT NULL,
  `academicyear` varchar(100) NOT NULL,
  `sectionandsemester` varchar(200) NOT NULL,
  `sectionandyear` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_feeperstudent`
--

INSERT INTO `tbl_feeperstudent` (`id`, `student_id`, `name`, `amount`, `subtotal`, `added_at`, `semester`, `academicyear`, `sectionandsemester`, `sectionandyear`) VALUES
(4, '220001', 'Miscellaneous Fee', 4500, 4500, '2022-12-16 03:42:15', '1st semester', '2022 - 2023', 'BSIT 1-2 2022 - 2023 1st semester', 'BSIT 1-2 2022 - 2023'),
(14, '220001', 'Tuition Fee (per unit)', 323, 7429, '2022-12-16 03:42:15', '1st semester', '2022 - 2023', 'BSIT 1-2 2022 - 2023 1st semester', 'BSIT 1-2 2022 - 2023');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grades`
--

CREATE TABLE `tbl_grades` (
  `id` int(11) NOT NULL,
  `studentid` varchar(50) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `units` varchar(50) NOT NULL,
  `grade` double NOT NULL,
  `instructor` varchar(50) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gradesperstudent`
--

CREATE TABLE `tbl_gradesperstudent` (
  `id` int(11) NOT NULL,
  `sched_code` varchar(200) NOT NULL,
  `student_id` varchar(200) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `units` int(11) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `schedule_day` varchar(50) NOT NULL,
  `schedule_time` varchar(100) NOT NULL,
  `academic_year` varchar(50) NOT NULL,
  `sectionandacademicyear` varchar(100) NOT NULL,
  `grade` float NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sectionandsemester` varchar(200) NOT NULL,
  `professor_initial` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_gradesperstudent`
--

INSERT INTO `tbl_gradesperstudent` (`id`, `sched_code`, `student_id`, `subject_name`, `section_name`, `description`, `units`, `semester`, `schedule_day`, `schedule_time`, `academic_year`, `sectionandacademicyear`, `grade`, `added_at`, `sectionandsemester`, `professor_initial`) VALUES
(4, '4743', '220001', 'NSTP 1 ', 'BSIT 1-2', 'NATIONAL SERVICE TRAINING PROGRAM 1', 3, '1st semester', 'Mon', '8 - 9am', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 0, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', ''),
(14, '4642', '220001', 'FITT 1', 'BSIT 1-2', 'MOVEMENT ENHANCEMENT ', 2, '1st semester', 'Mon,Tue', '7 - 8am  / 9 - 10am', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 2.75, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(24, '4543', '220001', 'GNED 11', 'BSIT 1-2', 'KOMUNIKASYON SA FILIPINO', 3, '1st semester', 'Tue,Thu', '10 - 11 am', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 1.5, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(34, '4443', '220001', 'COSC 50', 'BSIT 1-2', 'DISCRETE STRUCTURES 1', 3, '1st semester', 'Mon,Fri', '12 -1pm / 2 - 3pm', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 2.5, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(44, '4343', '220001', 'GNED 05', 'BSIT 1-2', 'PURPOSIVE COMMUNICATION', 3, '1st semester', 'Thu,Wed', '3 - 4pm / 5 - 6pm', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 3, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(54, '4243', '220001', 'DCIT 22', 'BSIT 1-2', 'COMPUTER PROGRAMMING 1', 3, '1st semester', 'Wed,Thu', '10 - 11am / 9 - 10am', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 2.25, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(64, '4143', '220001', 'GNED 02', 'BSIT 1-2', 'ETHICS', 3, '1st semester', 'Wed,Tue,Thu', '7 - 8am/ 9 - 10am/ 11 - 12pm', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 1.5, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman'),
(74, '43', '220001', 'DCIT 21', 'BSIT 1-2', 'INTRODUCTION TO COMPUTING', 3, '1st semester', 'Fri,Thu', '12 - 1pm / 2 - 3pm', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 1.25, '2022-12-16 03:42:15', 'BSIT 1-2 2022 - 2023 1st semester', 'Mr. Eman');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_history`
--

CREATE TABLE `tbl_history` (
  `id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `editor_position` varchar(100) NOT NULL,
  `after_edit` longtext NOT NULL,
  `before_edit` longtext NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'active',
  `date_edited` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `editor_email` varchar(200) NOT NULL,
  `edited_email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_history`
--

INSERT INTO `tbl_history` (`id`, `action`, `category`, `editor_position`, `after_edit`, `before_edit`, `status`, `date_edited`, `added_at`, `editor_email`, `edited_email`) VALUES
(4, 'Create', 'AcademicYear', 'Admin', '', '{\"id\":\"4\",\"start\":\"2022\",\"end\":\"2022\",\"academicyear\":\"2022 - 2023\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:19:26\"}', 'active', '2022-12-16 03:19:27', '2022-12-16 03:19:27', 'emmanuel.nocum@cvsu.edu.ph', '2022 - 2023'),
(14, 'Update', 'AcademicYear', 'Admin', '{\"id\":\"4\",\"start\":\"2022\",\"end\":\"2022\",\"academicyear\":\"2022 - 2023\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:19:26\"}', '{\"id\":\"4\",\"start\":\"2022\",\"end\":\"2022\",\"academicyear\":\"2022 - 2023\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:19:26\"}', 'active', '2022-12-16 03:19:34', '2022-12-16 03:19:34', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(24, 'Create', 'Faculty', 'Admin', '', '{\"id\":\"4\",\"faculty_name\":\"Computer Studies\",\"description\":\"IT, CS\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:23:27\"}', 'active', '2022-12-16 03:23:27', '2022-12-16 03:23:27', 'ghosthalzion65@gmail.com', 'Computer Studies'),
(34, 'Create', 'Faculty', 'Admin', '', '{\"id\":\"14\",\"faculty_name\":\"Tourism Management\",\"description\":\"Tourism\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:23:49\"}', 'active', '2022-12-16 03:23:49', '2022-12-16 03:23:49', 'ghosthalzion65@gmail.com', 'Tourism Management'),
(44, 'Create', 'Faculty', 'Admin', '', '{\"id\":\"24\",\"faculty_name\":\"Criminology\",\"description\":\"Criminology\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:23:59\"}', 'active', '2022-12-16 03:23:59', '2022-12-16 03:23:59', 'ghosthalzion65@gmail.com', 'Criminology'),
(54, 'Create', 'Faculty', 'Admin', '', '{\"id\":\"34\",\"faculty_name\":\"Accounting\",\"description\":\"Accounting\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:24:11\"}', 'active', '2022-12-16 03:24:11', '2022-12-16 03:24:11', 'ghosthalzion65@gmail.com', 'Accounting'),
(64, 'Create', 'Course', 'Admin', '', '{\"id\":\"4\",\"course_name\":\"BSIT\",\"description\":\"Bachelor of Science in Information Technology\",\"course_faculty\":\"Computer Studies\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:26:04\"}', 'active', '2022-12-16 03:26:04', '2022-12-16 03:26:04', 'ghosthalzion65@gmail.com', 'BSIT'),
(74, 'Create', 'Section', 'Admin', '', '{\"id\":\"4\",\"section_name\":\"BSIT 1-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:26:20\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:26:21', '2022-12-16 03:26:21', 'ghosthalzion65@gmail.com', 'BSIT 1-1 2022 - 2023'),
(84, 'Create', 'Section', 'Admin', '', '{\"id\":\"4\",\"section_name\":\"BSIT 1-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:26:20\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:26:21', '2022-12-16 03:26:21', 'ghosthalzion65@gmail.com', 'BSIT 1-1 2022 - 2023'),
(94, 'Update', 'Section', 'Admin', '{\"id\":\"4\",\"section_name\":\"BSIT 1-1\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:26:20\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', '{\"id\":\"4\",\"section_name\":\"BSIT 1-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:26:20\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:26:27', '2022-12-16 03:26:27', 'ghosthalzion65@gmail.com', 'BSIT 1-1 2022 - 2023'),
(104, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"DCIT 21\",\"subject_name\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:26:58\"}', 'active', '2022-12-16 03:26:58', '2022-12-16 03:26:58', 'ghosthalzion65@gmail.com', 'DCIT 21'),
(114, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"GNED 02\",\"subject_name\":\"ETHICS\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:27:12\"}', 'active', '2022-12-16 03:27:12', '2022-12-16 03:27:12', 'ghosthalzion65@gmail.com', 'GNED 02'),
(124, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"DCIT 22\",\"subject_name\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:27:37\"}', 'active', '2022-12-16 03:27:37', '2022-12-16 03:27:37', 'ghosthalzion65@gmail.com', 'DCIT 22'),
(134, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"GNED 05\",\"subject_name\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:27:50\"}', 'active', '2022-12-16 03:27:50', '2022-12-16 03:27:50', 'ghosthalzion65@gmail.com', 'GNED 05'),
(144, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"COSC 50\",\"subject_name\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:28:03\"}', 'active', '2022-12-16 03:28:03', '2022-12-16 03:28:03', 'ghosthalzion65@gmail.com', 'COSC 50'),
(154, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"GNED 11\",\"subject_name\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:28:39\"}', 'active', '2022-12-16 03:28:39', '2022-12-16 03:28:39', 'ghosthalzion65@gmail.com', 'GNED 11'),
(164, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"FITT 1\",\"subject_name\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:29:02\"}', 'active', '2022-12-16 03:29:02', '2022-12-16 03:29:02', 'ghosthalzion65@gmail.com', 'FITT 1'),
(174, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"NSTP 1 \",\"subject_name\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:29:29\"}', 'active', '2022-12-16 03:29:29', '2022-12-16 03:29:29', 'ghosthalzion65@gmail.com', 'NSTP 1 '),
(184, 'Create', 'Section', 'Admin', '', '{\"id\":\"14\",\"section_name\":\"BSIT 1-2\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:35\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:31:35', '2022-12-16 03:31:35', 'emmanuel.nocum@cvsu.edu.ph', 'BSIT 1-2 2022 - 2023'),
(194, 'Create', 'Section', 'Admin', '', '{\"id\":\"14\",\"section_name\":\"BSIT 1-2\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:35\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:31:36', '2022-12-16 03:31:36', 'emmanuel.nocum@cvsu.edu.ph', 'BSIT 1-2 2022 - 2023'),
(204, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:31:47', '2022-12-16 03:31:47', 'emmanuel.nocum@cvsu.edu.ph', '74'),
(214, 'Update', 'Section', 'Admin', '{\"id\":\"14\",\"section_name\":\"BSIT 1-2\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:35\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', '{\"id\":\"14\",\"section_name\":\"BSIT 1-2\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:35\",\"course\":\"BSIT\",\"section_year\":\"1st year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:31:49', '2022-12-16 03:31:49', 'ghosthalzion65@gmail.com', 'BSIT 1-2 2022 - 2023'),
(224, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:31:51', '2022-12-16 03:31:51', 'emmanuel.nocum@cvsu.edu.ph', '64'),
(234, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:31:56', '2022-12-16 03:31:56', 'emmanuel.nocum@cvsu.edu.ph', '54'),
(244, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:03', '2022-12-16 03:32:03', 'emmanuel.nocum@cvsu.edu.ph', '44'),
(254, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:08', '2022-12-16 03:32:08', 'emmanuel.nocum@cvsu.edu.ph', '34'),
(264, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:13', '2022-12-16 03:32:13', 'emmanuel.nocum@cvsu.edu.ph', '24'),
(274, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:19', '2022-12-16 03:32:19', 'emmanuel.nocum@cvsu.edu.ph', '14'),
(284, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:24', '2022-12-16 03:32:24', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(294, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:34', '2022-12-16 03:32:34', 'emmanuel.nocum@cvsu.edu.ph', '74'),
(304, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:50', '2022-12-16 03:32:50', 'emmanuel.nocum@cvsu.edu.ph', '64'),
(314, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:32:59', '2022-12-16 03:32:59', 'emmanuel.nocum@cvsu.edu.ph', '54'),
(324, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:33:17', '2022-12-16 03:33:17', 'emmanuel.nocum@cvsu.edu.ph', '44'),
(334, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:33:29', '2022-12-16 03:33:29', 'emmanuel.nocum@cvsu.edu.ph', '34'),
(344, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:33:48', '2022-12-16 03:33:48', 'emmanuel.nocum@cvsu.edu.ph', '24'),
(354, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:05', '2022-12-16 03:34:05', 'emmanuel.nocum@cvsu.edu.ph', '14'),
(364, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:16', '2022-12-16 03:34:16', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(374, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:19', '2022-12-16 03:34:19', 'emmanuel.nocum@cvsu.edu.ph', '64'),
(384, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:23', '2022-12-16 03:34:23', 'emmanuel.nocum@cvsu.edu.ph', '54'),
(394, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:26', '2022-12-16 03:34:26', 'emmanuel.nocum@cvsu.edu.ph', '44'),
(404, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:29', '2022-12-16 03:34:29', 'emmanuel.nocum@cvsu.edu.ph', '34'),
(414, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:34', '2022-12-16 03:34:34', 'emmanuel.nocum@cvsu.edu.ph', '24'),
(424, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:37', '2022-12-16 03:34:37', 'emmanuel.nocum@cvsu.edu.ph', '14'),
(434, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:40', '2022-12-16 03:34:40', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(444, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:44', '2022-12-16 03:34:44', 'emmanuel.nocum@cvsu.edu.ph', '74'),
(454, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"64\",\"sched_code\":\"4642\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"64\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:47', '2022-12-16 03:34:47', 'emmanuel.nocum@cvsu.edu.ph', '64'),
(464, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"54\",\"sched_code\":\"4543\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"54\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:50', '2022-12-16 03:34:50', 'emmanuel.nocum@cvsu.edu.ph', '54'),
(474, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"44\",\"sched_code\":\"4443\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"44\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:53', '2022-12-16 03:34:53', 'emmanuel.nocum@cvsu.edu.ph', '44'),
(484, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"34\",\"sched_code\":\"4343\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"34\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:34:56', '2022-12-16 03:34:56', 'emmanuel.nocum@cvsu.edu.ph', '34'),
(494, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"24\",\"sched_code\":\"4243\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"24\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:35:00', '2022-12-16 03:35:00', 'emmanuel.nocum@cvsu.edu.ph', '24'),
(504, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"14\",\"sched_code\":\"4143\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"14\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:35:04', '2022-12-16 03:35:04', 'emmanuel.nocum@cvsu.edu.ph', '14'),
(514, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"4\",\"sched_code\":\"43\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"4\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:35:07', '2022-12-16 03:35:07', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(524, 'Create', 'Student', 'Admin', '', '{\"profile_url\":\"default_profile.jpg\",\"firstname\":\"David\",\"middlename\":\"\",\"lastname\":\"Baysa\",\"email\":\"david@gmail.com\",\"type\":\"Regular\",\"birthday\":\"2022-12-16\",\"address\":\"Dasmarinas, Cavite\",\"course\":\"BSIT\",\"section\":\"\",\"contact\":\"091454545454\",\"academicyear\":\"\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:36:33\"}', 'active', '2022-12-16 03:36:33', '2022-12-16 03:36:33', 'emmanuel.nocum@cvsu.edu.ph', '220001'),
(534, '', '', 'Student', 'null', '', 'active', '2022-12-16 03:42:15', '2022-12-16 03:42:15', '220001', '220001'),
(544, 'Update', 'StudentRegistration', 'Admin', '{\"id\":\"4\",\"student_id\":\"220001\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"academicyear\":\"2022 - 2023\",\"semester\":\"1st semester\",\"sectionandyear\":\"\",\"status\":\"confirmed\",\"added_at\":\"2022-12-16 03:42:15\"}', '{\"id\":\"4\",\"student_id\":\"220001\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"academicyear\":\"2022 - 2023\",\"semester\":\"1st semester\",\"sectionandyear\":\"\",\"status\":\"pending\",\"added_at\":\"2022-12-16 03:42:15\"}', 'active', '2022-12-16 03:42:37', '2022-12-16 03:42:37', 'emmanuel.nocum@cvsu.edu.ph', '4'),
(554, 'Create', 'Student', 'Admin', '', '{\"profile_url\":\"default_profile.jpg\",\"firstname\":\"Ken\",\"middlename\":\"\",\"lastname\":\"Casulla\",\"email\":\"ken@gmail.com\",\"type\":\"Regular\",\"birthday\":\"2022-12-16\",\"address\":\"Dasmarinas, Cavite\",\"course\":\"BSIT\",\"section\":\"\",\"contact\":\"094556115121\",\"academicyear\":\"\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:44:02\"}', 'active', '2022-12-16 03:44:02', '2022-12-16 03:44:02', 'emmanuel.nocum@cvsu.edu.ph', '220002'),
(564, 'Update', 'Grades', 'professor', '{\"id\":\"14\",\"sched_code\":\"4642\",\"student_id\":\"220001\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"2.75\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"14\",\"sched_code\":\"4642\",\"student_id\":\"220001\",\"subject_name\":\"FITT 1\",\"section_name\":\"BSIT 1-2\",\"description\":\"MOVEMENT ENHANCEMENT \",\"units\":\"2\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Tue\",\"schedule_time\":\"7 - 8am  / 9 - 10am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:46:15', '2022-12-16 03:46:15', 'eman@gmail.com', '');
INSERT INTO `tbl_history` (`id`, `action`, `category`, `editor_position`, `after_edit`, `before_edit`, `status`, `date_edited`, `added_at`, `editor_email`, `edited_email`) VALUES
(574, 'Update', 'Grades', 'professor', '{\"id\":\"24\",\"sched_code\":\"4543\",\"student_id\":\"220001\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"1.5\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"24\",\"sched_code\":\"4543\",\"student_id\":\"220001\",\"subject_name\":\"GNED 11\",\"section_name\":\"BSIT 1-2\",\"description\":\"KOMUNIKASYON SA FILIPINO\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue,Thu\",\"schedule_time\":\"10 - 11 am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:46:23', '2022-12-16 03:46:23', 'eman@gmail.com', ''),
(584, 'Update', 'Grades', 'professor', '{\"id\":\"34\",\"sched_code\":\"4443\",\"student_id\":\"220001\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"2.5\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"34\",\"sched_code\":\"4443\",\"student_id\":\"220001\",\"subject_name\":\"COSC 50\",\"section_name\":\"BSIT 1-2\",\"description\":\"DISCRETE STRUCTURES 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon,Fri\",\"schedule_time\":\"12 -1pm / 2 - 3pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:46:50', '2022-12-16 03:46:50', 'eman@gmail.com', ''),
(594, 'Update', 'Grades', 'professor', '{\"id\":\"44\",\"sched_code\":\"4343\",\"student_id\":\"220001\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"3\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"44\",\"sched_code\":\"4343\",\"student_id\":\"220001\",\"subject_name\":\"GNED 05\",\"section_name\":\"BSIT 1-2\",\"description\":\"PURPOSIVE COMMUNICATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Thu,Wed\",\"schedule_time\":\"3 - 4pm / 5 - 6pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:46:58', '2022-12-16 03:46:58', 'eman@gmail.com', ''),
(604, 'Update', 'Grades', 'professor', '{\"id\":\"54\",\"sched_code\":\"4243\",\"student_id\":\"220001\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"2.25\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"54\",\"sched_code\":\"4243\",\"student_id\":\"220001\",\"subject_name\":\"DCIT 22\",\"section_name\":\"BSIT 1-2\",\"description\":\"COMPUTER PROGRAMMING 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Thu\",\"schedule_time\":\"10 - 11am / 9 - 10am\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:47:06', '2022-12-16 03:47:06', 'eman@gmail.com', ''),
(614, 'Update', 'Grades', 'professor', '{\"id\":\"64\",\"sched_code\":\"4143\",\"student_id\":\"220001\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"1.5\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"64\",\"sched_code\":\"4143\",\"student_id\":\"220001\",\"subject_name\":\"GNED 02\",\"section_name\":\"BSIT 1-2\",\"description\":\"ETHICS\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Wed,Tue,Thu\",\"schedule_time\":\"7 - 8am/ 9 - 10am/ 11 - 12pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:47:11', '2022-12-16 03:47:11', 'eman@gmail.com', ''),
(624, 'Update', 'Grades', 'professor', '{\"id\":\"74\",\"sched_code\":\"43\",\"student_id\":\"220001\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"1.25\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', '{\"id\":\"74\",\"sched_code\":\"43\",\"student_id\":\"220001\",\"subject_name\":\"DCIT 21\",\"section_name\":\"BSIT 1-2\",\"description\":\"INTRODUCTION TO COMPUTING\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Fri,Thu\",\"schedule_time\":\"12 - 1pm / 2 - 3pm\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 1-2 2022 - 2023\",\"grade\":\"0\",\"added_at\":\"2022-12-16 03:42:15\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\",\"professor_initial\":\"Mr. Eman\"}', 'active', '2022-12-16 03:47:16', '2022-12-16 03:47:16', 'eman@gmail.com', ''),
(634, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', '{\"id\":\"74\",\"sched_code\":\"4743\",\"subject_name\":\"NSTP 1 \",\"section_name\":\"BSIT 1-2\",\"description\":\"NATIONAL SERVICE TRAINING PROGRAM 1\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"74\",\"sectionacademicyear\":\"BSIT 1-2 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:31:36\",\"sectionandsemester\":\"BSIT 1-2 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:47:55', '2022-12-16 03:47:55', 'emmanuel.nocum@cvsu.edu.ph', '74'),
(644, 'Create', 'Student', 'Admin', '', '{\"profile_url\":\"default_profile.jpg\",\"firstname\":\"Emmanuel\",\"middlename\":\"\",\"lastname\":\"Nocum\",\"email\":\"eman@gmail.com\",\"type\":\"Irregular\",\"birthday\":\"2022-12-16\",\"address\":\"Dasmarinas, Cavite\",\"course\":\"BSIT\",\"section\":\"\",\"contact\":\"09452562665\",\"academicyear\":\"\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:50:00\"}', 'active', '2022-12-16 03:50:00', '2022-12-16 03:50:00', 'emmanuel.nocum@cvsu.edu.ph', '220003'),
(654, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"ITEC 45\",\"subject_name\":\"ANIMATION\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:55:28\"}', 'active', '2022-12-16 03:55:28', '2022-12-16 03:55:28', 'emmanuel.nocum@cvsu.edu.ph', 'ITEC 45'),
(664, 'Create', 'Subject', 'Admin', '', '{\"subject_code\":\"ITEC 65\",\"subject_name\":\"AUTO CAD\",\"units\":\"3\",\"type\":\"Major\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:55:50\"}', 'active', '2022-12-16 03:55:50', '2022-12-16 03:55:50', 'emmanuel.nocum@cvsu.edu.ph', 'ITEC 65'),
(674, 'Create', 'Section', 'Admin', '', '{\"id\":\"24\",\"section_name\":\"BSIT 2-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"course\":\"BSIT\",\"section_year\":\"2nd year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 2-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:56:01', '2022-12-16 03:56:01', 'emmanuel.nocum@cvsu.edu.ph', 'BSIT 2-1 2022 - 2023'),
(684, 'Create', 'Section', 'Admin', '', '{\"id\":\"24\",\"section_name\":\"BSIT 2-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"course\":\"BSIT\",\"section_year\":\"2nd year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 2-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:56:02', '2022-12-16 03:56:02', 'emmanuel.nocum@cvsu.edu.ph', 'BSIT 2-1 2022 - 2023'),
(694, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:56:09', '2022-12-16 03:56:09', 'emmanuel.nocum@cvsu.edu.ph', '94'),
(704, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:56:13', '2022-12-16 03:56:13', 'emmanuel.nocum@cvsu.edu.ph', '84'),
(714, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am/ 10- 11am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:56:31', '2022-12-16 03:56:31', 'emmanuel.nocum@cvsu.edu.ph', '94'),
(724, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"12- 1pm / 1-2pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:56:42', '2022-12-16 03:56:42', 'emmanuel.nocum@cvsu.edu.ph', '84'),
(734, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am/ 10- 11am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am/ 10- 11am\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:57:04', '2022-12-16 03:57:04', 'emmanuel.nocum@cvsu.edu.ph', '94'),
(744, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"12- 1pm / 1-2pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"12- 1pm / 1-2pm\",\"professor_initial\":\"\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:57:07', '2022-12-16 03:57:07', 'emmanuel.nocum@cvsu.edu.ph', '84'),
(754, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am/ 10- 11am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"94\",\"sched_code\":\"84943\",\"subject_name\":\"ITEC 65\",\"section_name\":\"BSIT 2-1\",\"description\":\"AUTO CAD\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Mon\",\"schedule_time\":\"8 - 9am/ 10- 11am\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"94\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:02\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:57:10', '2022-12-16 03:57:10', 'emmanuel.nocum@cvsu.edu.ph', '94'),
(764, 'Update', 'SectionSchedule', 'Admin', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"12- 1pm / 1-2pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', '{\"id\":\"84\",\"sched_code\":\"4843\",\"subject_name\":\"ITEC 45\",\"section_name\":\"BSIT 2-1\",\"description\":\"ANIMATION\",\"units\":\"3\",\"semester\":\"1st semester\",\"schedule_day\":\"Tue\",\"schedule_time\":\"12- 1pm / 1-2pm\",\"professor_initial\":\"Mr. Eman\",\"academic_year\":\"2022 - 2023\",\"subject_id\":\"84\",\"sectionacademicyear\":\"BSIT 2-1 2022 - 2023\",\"section_id\":\"0\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\"}', 'active', '2022-12-16 03:57:13', '2022-12-16 03:57:13', 'emmanuel.nocum@cvsu.edu.ph', '84'),
(774, 'Update', 'Section', 'Admin', '{\"id\":\"24\",\"section_name\":\"BSIT 2-1\",\"status\":\"active\",\"added_at\":\"2022-12-16 03:56:01\",\"course\":\"BSIT\",\"section_year\":\"2nd year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 2-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', '{\"id\":\"24\",\"section_name\":\"BSIT 2-1\",\"status\":\"inactive\",\"added_at\":\"2022-12-16 03:56:01\",\"course\":\"BSIT\",\"section_year\":\"2nd year\",\"semester\":\"1st semester\",\"year_start\":\"0000\",\"year_end\":\"0000\",\"academic_year\":\"2022 - 2023\",\"sectionandacademicyear\":\"BSIT 2-1 2022 - 2023\",\"sectionandsemester\":\"BSIT 2-1 2022 - 2023 1st semester\",\"maxstudent\":\"40\",\"totalstudent\":\"0\"}', 'active', '2022-12-16 03:57:21', '2022-12-16 03:57:21', 'emmanuel.nocum@cvsu.edu.ph', 'BSIT 2-1 2022 - 2023'),
(784, 'Create', 'Student', 'Admin', '', '{\"profile_url\":\"default_profile.jpg\",\"firstname\":\"Irregular\",\"middlename\":\"\",\"lastname\":\"Student\",\"email\":\"irregular@gmail.com\",\"type\":\"Irregular\",\"birthday\":\"2022-12-17\",\"address\":\"Dasmarinas, Cavite\",\"course\":\"BSIT\",\"section\":\"\",\"contact\":\"09454878545\",\"academicyear\":\"\",\"status\":\"active\",\"added_at\":\"2022-12-17 12:28:18\"}', 'active', '2022-12-17 12:28:18', '2022-12-17 12:28:18', 'emmanuel.nocum@cvsu.edu.ph', '220004');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_loginuser`
--

CREATE TABLE `tbl_loginuser` (
  `ID` int(11) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `contact` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `verified` int(11) NOT NULL,
  `vkey` varchar(25) NOT NULL,
  `is_expired` varchar(25) NOT NULL,
  `profile_image` varchar(25) NOT NULL,
  `Access` varchar(25) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_professor`
--

CREATE TABLE `tbl_professor` (
  `id` int(11) NOT NULL,
  `date_hired` date NOT NULL,
  `profile_url` varchar(200) NOT NULL DEFAULT 'default_profile.jpg',
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `faculty` varchar(100) NOT NULL,
  `professor_username` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_professor`
--

INSERT INTO `tbl_professor` (`id`, `date_hired`, `profile_url`, `firstname`, `middlename`, `lastname`, `email`, `password`, `faculty`, `professor_username`, `status`, `added_at`) VALUES
(4, '2022-12-09', 'default_profile.jpg', 'David', '', 'Baysa', 'david@gmail.com', '$2y$10$N0ru3b2bLhlkQB1gHQsIBOuPvOn1YRb8G7QRBC3GaZOf7tpQucCmm', 'DCS', 'Mr.David', 'active', '2022-12-09 06:06:48'),
(14, '2022-12-09', 'default_profile.jpg', 'Ken', '', 'Casulla', 'ken@gmail.com', '$2y$10$5Sli0j998PkI1H1UPkDE3OEDe25H7iWG4epk7yS8kf4KgqwQgmN76', 'DCS', 'Mr. Ken', 'active', '2022-12-09 06:07:08'),
(24, '2022-12-09', 'default_profile.jpg', 'Emmanuel', '', 'Nocum', 'eman@gmail.com', '$2y$10$Ic5Y4lq5GFl3F.H7Beb.QOEjYX.259WS6WURp1/R8U8jZo18drnJW', 'DCS', 'Mr. Eman', 'active', '2022-12-09 06:07:27');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

CREATE TABLE `tbl_section` (
  `id` int(11) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'inactive',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `course` varchar(100) NOT NULL,
  `section_year` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `year_start` year(4) NOT NULL DEFAULT '0000',
  `year_end` year(4) NOT NULL DEFAULT '0000',
  `academic_year` varchar(50) NOT NULL,
  `sectionandacademicyear` varchar(300) NOT NULL,
  `sectionandsemester` varchar(200) NOT NULL,
  `maxstudent` int(11) NOT NULL DEFAULT '40',
  `totalstudent` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_section`
--

INSERT INTO `tbl_section` (`id`, `section_name`, `status`, `added_at`, `course`, `section_year`, `semester`, `year_start`, `year_end`, `academic_year`, `sectionandacademicyear`, `sectionandsemester`, `maxstudent`, `totalstudent`) VALUES
(14, 'BSIT 1-2', 'active', '2022-12-16 03:31:35', 'BSIT', '1st year', '1st semester', '0000', '0000', '2022 - 2023', 'BSIT 1-2 2022 - 2023', 'BSIT 1-2 2022 - 2023 1st semester', 40, 1),
(24, 'BSIT 2-1', 'active', '2022-12-16 03:56:01', 'BSIT', '2nd year', '1st semester', '0000', '0000', '2022 - 2023', 'BSIT 2-1 2022 - 2023', 'BSIT 2-1 2022 - 2023 1st semester', 40, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_semester`
--

CREATE TABLE `tbl_semester` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'inactive',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_semester`
--

INSERT INTO `tbl_semester` (`id`, `description`, `status`, `added_at`) VALUES
(4, '1st semester', 'active', '2022-12-16 03:18:56'),
(14, '2nd semester', 'inactive', '2022-12-16 03:18:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_setting`
--

CREATE TABLE `tbl_setting` (
  `id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_studentinfo`
--

CREATE TABLE `tbl_studentinfo` (
  `id` int(11) NOT NULL,
  `profile_url` varchar(100) NOT NULL,
  `studentnumber` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'regular',
  `address` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `course` varchar(50) NOT NULL,
  `section` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `academicyear` varchar(200) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `guardian` varchar(200) NOT NULL,
  `guardian_contact` varchar(50) NOT NULL,
  `balance` decimal(10,0) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_studentinfo`
--

INSERT INTO `tbl_studentinfo` (`id`, `profile_url`, `studentnumber`, `firstname`, `middlename`, `lastname`, `email`, `type`, `address`, `password`, `course`, `section`, `birthday`, `academicyear`, `contact`, `semester`, `guardian`, `guardian_contact`, `balance`, `status`, `added_at`) VALUES
(4, 'default_profile.jpg', '220001', 'David', '', 'Baysa', 'david@gmail.com', 'Regular', 'Dasmarinas, Cavite', '$2y$10$RM4d9SCHMLcx/xm/DQhJ1ei3U.6MSa4c31lTgG/SS4OUJ76jVOAbG', 'BSIT', 'BSIT 1-2 2022 - 2023 1st semester', '2022-12-16', '2022 - 2023', '091454545454', '1st semester', '', '', 0, 'active', '2022-12-16 03:36:33'),
(14, 'default_profile.jpg', '220002', 'Ken', '', 'Casulla', 'ken@gmail.com', 'Regular', 'Dasmarinas, Cavite', '$2y$10$Akr./E3/mjpgyNw/KdjT2.gJ9C0AS8Lnwu4HmecH29RvSk4DVIyuy', 'BSIT', '', '2022-12-16', '', '094556115121', '', '', '', 0, 'active', '2022-12-16 03:44:02'),
(24, 'default_profile.jpg', '220003', 'Emmanuel', '', 'Nocum', 'eman@gmail.com', 'Irregular', 'Dasmarinas, Cavite', '$2y$10$l6Ia713SnbGFAYW6X5UBHO.wsL7FPokn09/2/icEc0WIFNzS6rOP2', 'BSIT', '', '2022-12-16', '', '09452562665', '', '', '', 0, 'active', '2022-12-16 03:50:00'),
(34, 'default_profile.jpg', '220004', 'Irregular', '', 'Student', 'irregular@gmail.com', 'Irregular', 'Dasmarinas, Cavite', '$2y$10$KtSynhDOlBjBkBd4/Rs9ZO96pUq/URhRMzVnuBoQ.oEViP5P9DOUK', 'BSIT', '', '2022-12-17', '', '09454878545', '', '', '', 0, 'active', '2022-12-17 12:28:18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_studentregistration`
--

CREATE TABLE `tbl_studentregistration` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `sectionandsemester` varchar(200) NOT NULL,
  `academicyear` varchar(200) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `sectionandyear` varchar(200) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_studentregistration`
--

INSERT INTO `tbl_studentregistration` (`id`, `student_id`, `sectionandsemester`, `academicyear`, `semester`, `sectionandyear`, `status`, `added_at`) VALUES
(4, '220001', 'BSIT 1-2 2022 - 2023 1st semester', '2022 - 2023', '1st semester', '', 'confirmed', '2022-12-16 03:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subject`
--

CREATE TABLE `tbl_subject` (
  `id` int(11) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `units` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'Minor',
  `course_available` varchar(100) NOT NULL DEFAULT 'General',
  `year_available` varchar(20) NOT NULL,
  `semester_available` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_subject`
--

INSERT INTO `tbl_subject` (`id`, `subject_code`, `subject_name`, `units`, `type`, `course_available`, `year_available`, `semester_available`, `status`, `added_at`) VALUES
(4, 'DCIT 21', 'INTRODUCTION TO COMPUTING', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:26:58'),
(14, 'GNED 02', 'ETHICS', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:27:12'),
(24, 'DCIT 22', 'COMPUTER PROGRAMMING 1', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:27:37'),
(34, 'GNED 05', 'PURPOSIVE COMMUNICATION', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:27:50'),
(44, 'COSC 50', 'DISCRETE STRUCTURES 1', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:28:03'),
(54, 'GNED 11', 'KOMUNIKASYON SA FILIPINO', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:28:39'),
(64, 'FITT 1', 'MOVEMENT ENHANCEMENT ', '2', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:29:02'),
(74, 'NSTP 1 ', 'NATIONAL SERVICE TRAINING PROGRAM 1', '3', 'Major', 'BSIT', '1st year', '1st semester', 'active', '2022-12-16 03:29:29'),
(84, 'ITEC 45', 'ANIMATION', '3', 'Major', 'BSIT', '2nd year', '1st semester', 'active', '2022-12-16 03:55:28'),
(94, 'ITEC 65', 'AUTO CAD', '3', 'Major', 'BSIT', '2nd year', '1st semester', 'active', '2022-12-16 03:55:50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subjectpersection`
--

CREATE TABLE `tbl_subjectpersection` (
  `id` int(11) NOT NULL,
  `sched_code` varchar(200) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `units` varchar(50) NOT NULL,
  `semester` varchar(50) NOT NULL DEFAULT '1st semester',
  `schedule_day` varchar(50) NOT NULL DEFAULT ' ',
  `schedule_time` varchar(50) NOT NULL,
  `professor_initial` varchar(100) NOT NULL DEFAULT '-',
  `academic_year` varchar(50) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `sectionacademicyear` varchar(200) NOT NULL,
  `section_id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'inactive',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sectionandsemester` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_subjectpersection`
--

INSERT INTO `tbl_subjectpersection` (`id`, `sched_code`, `subject_name`, `section_name`, `description`, `units`, `semester`, `schedule_day`, `schedule_time`, `professor_initial`, `academic_year`, `subject_id`, `sectionacademicyear`, `section_id`, `status`, `added_at`, `sectionandsemester`) VALUES
(4, '43', 'DCIT 21', 'BSIT 1-2', 'INTRODUCTION TO COMPUTING', '3', '1st semester', 'Fri,Thu', '12 - 1pm / 2 - 3pm', 'Mr. Eman', '2022 - 2023', 4, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(14, '4143', 'GNED 02', 'BSIT 1-2', 'ETHICS', '3', '1st semester', 'Wed,Tue,Thu', '7 - 8am/ 9 - 10am/ 11 - 12pm', 'Mr. Eman', '2022 - 2023', 14, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(24, '4243', 'DCIT 22', 'BSIT 1-2', 'COMPUTER PROGRAMMING 1', '3', '1st semester', 'Wed,Thu', '10 - 11am / 9 - 10am', 'Mr. Eman', '2022 - 2023', 24, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(34, '4343', 'GNED 05', 'BSIT 1-2', 'PURPOSIVE COMMUNICATION', '3', '1st semester', 'Thu,Wed', '3 - 4pm / 5 - 6pm', 'Mr. Eman', '2022 - 2023', 34, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(44, '4443', 'COSC 50', 'BSIT 1-2', 'DISCRETE STRUCTURES 1', '3', '1st semester', 'Mon,Fri', '12 -1pm / 2 - 3pm', 'Mr. Eman', '2022 - 2023', 44, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(54, '4543', 'GNED 11', 'BSIT 1-2', 'KOMUNIKASYON SA FILIPINO', '3', '1st semester', 'Tue,Thu', '10 - 11 am', 'Mr. Eman', '2022 - 2023', 54, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(64, '4642', 'FITT 1', 'BSIT 1-2', 'MOVEMENT ENHANCEMENT ', '2', '1st semester', 'Mon,Tue', '7 - 8am  / 9 - 10am', 'Mr. Eman', '2022 - 2023', 64, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(74, '4743', 'NSTP 1 ', 'BSIT 1-2', 'NATIONAL SERVICE TRAINING PROGRAM 1', '3', '1st semester', 'Mon', '8 - 9am', 'Mr. Eman', '2022 - 2023', 74, 'BSIT 1-2 2022 - 2023', 0, 'active', '2022-12-16 03:31:36', 'BSIT 1-2 2022 - 2023 1st semester'),
(84, '4843', 'ITEC 45', 'BSIT 2-1', 'ANIMATION', '3', '1st semester', 'Tue', '12- 1pm / 1-2pm', 'Mr. Eman', '2022 - 2023', 84, 'BSIT 2-1 2022 - 2023', 0, 'active', '2022-12-16 03:56:01', 'BSIT 2-1 2022 - 2023 1st semester'),
(94, '84943', 'ITEC 65', 'BSIT 2-1', 'AUTO CAD', '3', '1st semester', 'Mon', '8 - 9am/ 10- 11am', 'Mr. Eman', '2022 - 2023', 94, 'BSIT 2-1 2022 - 2023', 0, 'active', '2022-12-16 03:56:02', 'BSIT 2-1 2022 - 2023 1st semester');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_academicyear`
--
ALTER TABLE `tbl_academicyear`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_accountbalance`
--
ALTER TABLE `tbl_accountbalance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_accountbalancehistory`
--
ALTER TABLE `tbl_accountbalancehistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_addfee`
--
ALTER TABLE `tbl_addfee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_audit`
--
ALTER TABLE `tbl_audit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_bills`
--
ALTER TABLE `tbl_bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_collectedfee`
--
ALTER TABLE `tbl_collectedfee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_faculty`
--
ALTER TABLE `tbl_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_fee`
--
ALTER TABLE `tbl_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_feeperstudent`
--
ALTER TABLE `tbl_feeperstudent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_grades`
--
ALTER TABLE `tbl_grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_gradesperstudent`
--
ALTER TABLE `tbl_gradesperstudent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_history`
--
ALTER TABLE `tbl_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_loginuser`
--
ALTER TABLE `tbl_loginuser`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_professor`
--
ALTER TABLE `tbl_professor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_semester`
--
ALTER TABLE `tbl_semester`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_setting`
--
ALTER TABLE `tbl_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_studentinfo`
--
ALTER TABLE `tbl_studentinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_studentregistration`
--
ALTER TABLE `tbl_studentregistration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subjectpersection`
--
ALTER TABLE `tbl_subjectpersection`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_academicyear`
--
ALTER TABLE `tbl_academicyear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_accountbalance`
--
ALTER TABLE `tbl_accountbalance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_accountbalancehistory`
--
ALTER TABLE `tbl_accountbalancehistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_addfee`
--
ALTER TABLE `tbl_addfee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=455;

--
-- AUTO_INCREMENT for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `tbl_audit`
--
ALTER TABLE `tbl_audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_bills`
--
ALTER TABLE `tbl_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_collectedfee`
--
ALTER TABLE `tbl_collectedfee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_course`
--
ALTER TABLE `tbl_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_faculty`
--
ALTER TABLE `tbl_faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_fee`
--
ALTER TABLE `tbl_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_feeperstudent`
--
ALTER TABLE `tbl_feeperstudent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_grades`
--
ALTER TABLE `tbl_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_gradesperstudent`
--
ALTER TABLE `tbl_gradesperstudent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `tbl_history`
--
ALTER TABLE `tbl_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=785;

--
-- AUTO_INCREMENT for table `tbl_loginuser`
--
ALTER TABLE `tbl_loginuser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_professor`
--
ALTER TABLE `tbl_professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_section`
--
ALTER TABLE `tbl_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_semester`
--
ALTER TABLE `tbl_semester`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_setting`
--
ALTER TABLE `tbl_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_studentinfo`
--
ALTER TABLE `tbl_studentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_studentregistration`
--
ALTER TABLE `tbl_studentregistration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `tbl_subjectpersection`
--
ALTER TABLE `tbl_subjectpersection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
