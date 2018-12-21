-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2018 at 10:50 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ms`
--

-- --------------------------------------------------------

--
-- Table structure for table `main`
--

CREATE TABLE `main` (
  `row` int(11) NOT NULL,
  `Work Title` text NOT NULL,
  `Type 1` text NOT NULL,
  `Type 2` text NOT NULL,
  `Description` text NOT NULL,
  `Location` text NOT NULL,
  `Status` text NOT NULL,
  `Company` text NOT NULL,
  `SAP#` text NOT NULL,
  `Request By` text NOT NULL,
  `Request Date` date NOT NULL,
  `Closed By` text NOT NULL,
  `Completion Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `main`
--

INSERT INTO `main` (`row`, `Work Title`, `Type 1`, `Type 2`, `Description`, `Location`, `Status`, `Company`, `SAP#`, `Request By`, `Request Date`, `Closed By`, `Completion Date`) VALUES
(1, 'A', 'PM', 'R&S', 'B', 'C', 'Open', 'D', 'S', 'E', '2018-09-03', 'E', '2018-09-04'),
(2, 'AD', 'RM', 'HK', 'BE', 'CW', 'Closed', 'DQ', 'SS', 'EE', '2018-09-05', 'EW', '2018-09-06'),
(3, 'A', 'PM', 'VI', 'B', 'C', 'Open', 'D', '23', 'E', '2018-09-04', 'F', '2018-09-05'),
(4, 'Real', 'RM', 'HK', 'This is a simulation of real input by user. Please brace yourself and standby for any bugs encountered. Although it is just a mark up bug. But still looks does kill.', 'Aywhere', 'Open', 'Petro Chemical', '872', 'KillerBee', '2018-09-07', 'RedditBee', '2018-09-08'),
(5, 'ds', 'RM', 'HK', 'a saaaa', 'g', 'Closed', 's', 'b', 'a', '2018-10-15', 'w', '2018-10-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`row`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `main`
--
ALTER TABLE `main`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
