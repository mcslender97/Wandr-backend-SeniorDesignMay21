-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: wandr1
-- ------------------------------------------------------
-- Server version	8.0.23


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `CityID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `StateProvince` varchar(255) DEFAULT NULL,
  `Country` varchar(255) NOT NULL,
  `CountryCode` varchar(2) NOT NULL,
  PRIMARY KEY (`CityID`),
  UNIQUE KEY `CityID` (`CityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Erie','Pennsylvania','United States','US'),(2,'Tokyo','Kantō','Japan','JP');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `EventId` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `EventStartTime` datetime NOT NULL,
  `EventEndTime` datetime NOT NULL,
  `PlaceID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`EventId`),
  KEY `FKEvent178252` (`UserID`),
  KEY `FKEvent576748` (`PlaceID`),
  CONSTRAINT `FKEvent178252` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  CONSTRAINT `FKEvent576748` FOREIGN KEY (`PlaceID`) REFERENCES `place` (`PlaceID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Archery practice','2021-01-01 17:00:00','2021-01-02 12:00:00','0000-00-00 00:00:00',1,1),(2,'West 8th Str community grocery shopping','2021-02-24 00:31:00','2021-02-28 16:00:00','0000-00-00 00:00:00',2,1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventmessages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventmessages` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `time_stamp` timestamp NULL DEFAULT NULL,
  `content` int DEFAULT NULL,
  `User_Event_ID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKEventMessa797465` (`User_Event_ID`),
  CONSTRAINT `FKEventMessa797465` FOREIGN KEY (`User_Event_ID`) REFERENCES `user_event` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventmessages`
--

LOCK TABLES `eventmessages` WRITE;
/*!40000 ALTER TABLE `eventmessages` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `PlaceID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Location` varchar(1024) NOT NULL,
  `CityID` int NOT NULL,
  `PictureURI` varchar(1024) NULL,
  PRIMARY KEY (`PlaceID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `wandr1`.`place` 
ADD COLUMN `PictureURI` VARCHAR(1024) NULL AFTER `CityID`;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'Hanamura Temple','Temple','Have a big bell','1 Hanamura Str, Tokyo Japan',2,''),(2,'Walmart Supercenter Erie','Shopping','Walmart shopping center ','2711 Elm Str,Erie, PA, USA',1,''),(3,'Erie Art Museum','Museum','Dedicated to promotion and advancement of visual arts','20 E 5th Str, Erie, PA, USA',1,'');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_chatgroup`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_chatgroup` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_chatgroup`
--

LOCK TABLES `private_chatgroup` WRITE;
/*!40000 ALTER TABLE `private_chatgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `private_chatgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_user_chatgroup`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_user_chatgroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `Chat_Group_ID` int NOT NULL,
  `create_date` timestamp NOT NULL,
  `IsAdmin` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UniqueUserIDChatGroupID` (`UserID`,`Chat_Group_ID`),
  KEY `FKPrivate_Us293924` (`Chat_Group_ID`),
  CONSTRAINT `FKPrivate_Us107770` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  CONSTRAINT `FKPrivate_Us293924` FOREIGN KEY (`Chat_Group_ID`) REFERENCES `private_chatgroup` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_user_chatgroup`
--

LOCK TABLES `private_user_chatgroup` WRITE;
/*!40000 ALTER TABLE `private_user_chatgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `private_user_chatgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privatemessage`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privatemessage` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `time_stamp` timestamp NOT NULL,
  `User_Chat_group_ID` int NOT NULL,
  `content` varchar(2048) DEFAULT NULL,
  `EventID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKPrivateMes585484` (`User_Chat_group_ID`),
  KEY `FKPrivateMes874839` (`EventID`),
  CONSTRAINT `FKPrivateMes585484` FOREIGN KEY (`User_Chat_group_ID`) REFERENCES `private_user_chatgroup` (`id`),
  CONSTRAINT `FKPrivateMes874839` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privatemessage`
--

LOCK TABLES `privatemessage` WRITE;
/*!40000 ALTER TABLE `privatemessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `privatemessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Fullname` varchar(512) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` bigint DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Dob` date DEFAULT NULL,
  `Gender` varchar(32) DEFAULT NULL,
  `Pfp` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Hanzo Shimada','hanzomain','hanzomain@gmail.com',8881234567,'$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56','1990-12-08','Male',NULL),(2,'Hana Song','Dva','dvamain@gmail.com',18134223334,'$2b$10$aHAXcOgNSsJvL91U3kSqGerIGXNSMgUy0T27De6Ppt0e4x00eghNG','1998-11-21','Female',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_event`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_event` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EventId` int NOT NULL,
  `UserID` int NOT NULL,
  `JoinedAt` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UniqueEventIDUserID` (`EventId`,`UserID`),
  KEY `FKUser_Event339658` (`UserID`),
  CONSTRAINT `FKUser_Event339658` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  CONSTRAINT `FKUser_Event526452` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `user_event`
--

LOCK TABLES `user_event` WRITE;
/*!40000 ALTER TABLE `user_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'deptrai2X';
-- flush privileges;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-11 13:49:26
