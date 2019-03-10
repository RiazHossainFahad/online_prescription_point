-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2019 at 06:18 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opp`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_info`
--

CREATE TABLE `additional_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_hospital` varchar(30) NOT NULL,
  `user_degree` varchar(30) NOT NULL,
  `user_license_no` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `additional_info`
--

INSERT INTO `additional_info` (`id`, `user_id`, `user_hospital`, `user_degree`, `user_license_no`) VALUES
(5, 16, 'Appollo hospital', 'MBBS', 'lic-0301'),
(7, 18, 'admin hosapital', 'MBChB', '1234'),
(16, 21, 'Moon hospaital', 'MBBS', 'lic-1100'),
(17, 22, 'Save Life', '', 'lic-1101');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(20) NOT NULL,
  `contact_us_email` varchar(20) NOT NULL,
  `contact_us_comment` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `contact_us_email`, `contact_us_comment`) VALUES
(1, 'mdfahad@gmail.com', 'this is a check'),
(3, 'final@gmail.com', 'Hello check.');

-- --------------------------------------------------------

--
-- Table structure for table `prescription_info`
--

CREATE TABLE `prescription_info` (
  `p_id` int(10) NOT NULL,
  `doctor_id` int(30) NOT NULL,
  `p_name` varchar(30) NOT NULL,
  `p_email` varchar(30) NOT NULL,
  `p_age` int(10) NOT NULL,
  `p_phone` varchar(20) NOT NULL,
  `p_gender` varchar(6) NOT NULL,
  `p_location` varchar(30) NOT NULL,
  `p_problem` varchar(1000) NOT NULL,
  `p_medicine` varchar(1000) NOT NULL,
  `v_date` varchar(30) NOT NULL,
  `r_message` varchar(1000) NOT NULL,
  `r_status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescription_info`
--

INSERT INTO `prescription_info` (`p_id`, `doctor_id`, `p_name`, `p_email`, `p_age`, `p_phone`, `p_gender`, `p_location`, `p_problem`, `p_medicine`, `v_date`, `r_message`, `r_status`) VALUES
(4, 16, 'xyz', 'xyz@gmail.com', 20, '01521448961', 'Male', 'Gulsan-2', 'Nothing', 'Napa Extra 500mg.', '08/03/2019', '', 1),
(5, 16, 'new patient', 'new@gmail.com', 12, '01521448961', 'Male', 'Banani', 'lkj', '1.Napa', '09/03/2019', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `user_relationship_status` varchar(30) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_location` varchar(20) NOT NULL,
  `user_gender` varchar(8) NOT NULL,
  `user_dob` varchar(20) NOT NULL,
  `user_account_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`user_id`, `user_name`, `user_email`, `user_type`, `user_relationship_status`, `user_password`, `user_location`, `user_gender`, `user_dob`, `user_account_status`) VALUES
(16, 'Doctor', 'doctor@gmail.com', 'Doctor', 'Married', '1234', 'Airport', 'Male', '09/09/1980', 1),
(18, 'Master Admin', 'admin@gmail.com', 'Admin', 'In a Relationship', '1234', 'Airport', 'Male', '01/04/1995', 1),
(21, 'New Doctor', 'new@gmail.com', 'Doctor', 'Single', '1234', 'Khilkhet', 'Male', '25/03/1990', 1),
(22, 'Pharmacy Man', 'pharmacy@gmail.com', 'Pharmacy', 'Single', '1234', 'Banani', 'Male', '12/01/1990', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_info`
--
ALTER TABLE `additional_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription_info`
--
ALTER TABLE `prescription_info`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additional_info`
--
ALTER TABLE `additional_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `prescription_info`
--
ALTER TABLE `prescription_info`
  MODIFY `p_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users_info`
--
ALTER TABLE `users_info`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
