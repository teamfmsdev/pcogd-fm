-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2018 at 09:47 AM
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
(4, 'NotReal', 'RM', 'HK', 'This is a simulation of real input by user. Please brace yourself and standby for any bugs encountered. Although it is just a mark up bug. But still looks does kill.', 'Aywhere', 'Open', 'Petro Chemical', '872', 'KillerBee', '2018-09-07', 'RedditBee', '2018-09-08'),
(7, 'Nlue', 'PM', 'VI', 'Testinh on phone', 'F', 'Open', 'Is', 'Going', 'On', '2018-09-04', 'Here!', '2018-09-05'),
(9, 'PhoneInput', 'PM', 'VI', 'The', 'PhoneInput', 'Open', '', '', 'PhoneInput', '2018-09-04', 'Here!', '2018-09-05'),
(10, 'Nlue', 'PM', 'VI', 'The', 'F', 'Open', 'Is', 'Going', 'On', '2018-09-04', 'Here!', '2018-09-05'),
(12, 'My Name is Eminem', 'RM', 'R&S', 'My Name is Eminem', 'My Name is Eminem', 'In Progress', 'My Name is Eminem', '420', 'My Name is Eminem', '2018-11-15', 'My Name is Eminem', '2018-11-16'),
(14, 'MEME', 'RM', 'RP', 'MEME', 'MEME', 'New', 'TTTTT', 'TTTTT', 'TTTTT', '2018-11-01', 'TTTTT', '2018-11-03'),
(15, 'WTF', 'PM', 'UC', 'WTF', 'WTF', 'In Progress', 'WTF', 'WTF', 'Deaddddd', '2018-11-05', '', '0000-00-00'),
(24, 'NotReal', 'RM', 'HK', 'This is a simulation of real input by user. Please brace yourself and standby for any bugs encountered. Although it is just a mark up bug. But still looks does kill.', 'Aywhere', 'Closed', 'Petro Chemical', '872', 'KillerBee', '2018-09-07', 'TESTTT', '2018-11-01');

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
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
