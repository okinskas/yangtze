-- MySQL mysql-dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: yangtze
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS yangtze;
USE yangtze;

--
-- Table structure for table `eareadings`
--

DROP TABLE IF EXISTS `eareadings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eareadings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlId` varchar(150) NOT NULL,
  `dateTime` datetime NOT NULL,
  `measure` varchar(150) NOT NULL,
  `value` decimal(10,3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `easensorId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `urlId` (`urlId`),
  KEY `easensorId` (`easensorId`),
  CONSTRAINT `eareadings_ibfk_1` FOREIGN KEY (`easensorId`) REFERENCES `easensors` (`notation`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eareadings`
--

LOCK TABLES `eareadings` WRITE;
/*!40000 ALTER TABLE `eareadings` DISABLE KEYS */;
INSERT INTO `eareadings` VALUES (1,'http://environment.data.gov.uk/flood-monitoring/data/readings/E3951-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E3951-level-stage-i-15_min-mASD',0.235,'2019-04-12 16:15:00','2019-04-12 16:15:00','E3951'),(2,'http://environment.data.gov.uk/flood-monitoring/data/readings/E4370-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E4370-level-stage-i-15_min-mASD',0.197,'2019-04-12 16:15:00','2019-04-12 16:15:00','E4370'),(3,'http://environment.data.gov.uk/flood-monitoring/data/readings/E3966-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E3966-level-stage-i-15_min-mASD',0.221,'2019-04-12 16:15:00','2019-04-12 16:15:00','E3966'),(4,'http://environment.data.gov.uk/flood-monitoring/data/readings/E4330-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E4330-level-stage-i-15_min-mASD',0.157,'2019-04-12 16:15:01','2019-04-12 16:15:01','E4330'),(5,'http://environment.data.gov.uk/flood-monitoring/data/readings/E2500-level-tidal_level-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E2500-level-tidal_level-i-15_min-mASD',0.716,'2019-04-12 16:15:01','2019-04-12 16:15:01','E2500'),(6,'http://environment.data.gov.uk/flood-monitoring/data/readings/E4321-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E4321-level-stage-i-15_min-mASD',0.241,'2019-04-12 16:15:01','2019-04-12 16:15:01','E4321'),(7,'http://environment.data.gov.uk/flood-monitoring/data/readings/E4341-level-stage-i-15_min-mASD/2019-04-12T12-00-00Z','2019-04-12 12:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E4341-level-stage-i-15_min-mASD',0.200,'2019-04-12 16:15:02','2019-04-12 16:15:02','E4341'),(8,'http://environment.data.gov.uk/flood-monitoring/data/readings/E4230-level-groundwater-i-1_h-mAOD/2019-04-12T06-00-00Z','2019-04-12 06:00:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E4230-level-groundwater-i-1_h-mAOD',72.130,'2019-04-12 16:15:02','2019-04-12 16:15:02','E4230'),(9,'http://environment.data.gov.uk/flood-monitoring/data/readings/E3826-level-stage-i-15_min-mAOD/2019-04-12T04-15-00Z','2019-04-12 04:15:00','http://environment.data.gov.uk/flood-monitoring/id/measures/E3826-level-stage-i-15_min-mAOD',1.378,'2019-04-12 16:15:02','2019-04-12 16:15:02','E3826');
/*!40000 ALTER TABLE `eareadings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easensors`
--

DROP TABLE IF EXISTS `easensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `easensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlId` varchar(150) NOT NULL,
  `RLOIid` varchar(20) DEFAULT NULL,
  `catchmentName` varchar(70) DEFAULT NULL,
  `dateOpened` datetime DEFAULT NULL,
  `easting` varchar(70) DEFAULT NULL,
  `label` varchar(70) NOT NULL,
  `lat` decimal(10,7) DEFAULT '0.0000000',
  `long` decimal(10,7) DEFAULT '0.0000000',
  `northing` int(11) DEFAULT NULL,
  `notation` varchar(20) NOT NULL,
  `riverName` varchar(50) DEFAULT NULL,
  `stageScale` varchar(150) DEFAULT NULL,
  `datum` decimal(10,3) DEFAULT NULL,
  `scaleMax` decimal(10,3) DEFAULT NULL,
  `typicalRangeHigh` decimal(10,3) DEFAULT NULL,
  `typicalRangeLow` decimal(10,3) DEFAULT NULL,
  `stationReference` varchar(40) NOT NULL,
  `status` varchar(150) DEFAULT NULL,
  `town` varchar(70) DEFAULT NULL,
  `wiskiID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `urlId` (`urlId`),
  UNIQUE KEY `notation` (`notation`),
  UNIQUE KEY `stationReference` (`stationReference`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easensors`
--

LOCK TABLES `easensors` WRITE;
/*!40000 ALTER TABLE `easensors` DISABLE KEYS */;
INSERT INTO `easensors` VALUES (1,'http://environment.data.gov.uk/flood-monitoring/id/stations/E3951','1135','Stour','1967-01-01 00:00:00','611520','Horton weir',51.2577850,1.0300790,155320,'E3951','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E3951/stageScale',12.050,2.000,0.750,0.151,'E3951','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Chartham',654400001,'2019-04-12 16:10:25','2019-04-12 16:10:25'),(2,'http://environment.data.gov.uk/flood-monitoring/id/stations/E4370','1132','Stour','2000-01-01 00:00:00','595800','Brown Mill',51.1716090,0.7995080,145100,'E4370','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E4370/stageScale',49.650,2.000,0.750,0.077,'E4370','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Hothfield',654110002,'2019-04-12 16:10:25','2019-04-12 16:10:25'),(3,'http://environment.data.gov.uk/flood-monitoring/id/stations/E3966','1143','Stour','2003-07-15 00:00:00','616632','Vauxhall Bridge',51.2966930,1.1059830,159867,'E3966','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E3966/stageScale',2.690,3.000,1.200,0.106,'E3966','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Hales Place',654500003,'2019-04-12 16:10:25','2019-04-12 16:10:25'),(4,'http://environment.data.gov.uk/flood-monitoring/id/stations/E4330','1133','Stour','1980-01-01 00:00:00','599232','Chart Leacon',51.1450630,0.8469760,142276,'E4330','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E4330/stageScale',37.790,2.000,0.610,0.103,'E4330','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Great Chart',654110001,'2019-04-12 16:10:26','2019-04-12 16:10:26'),(5,'http://environment.data.gov.uk/flood-monitoring/id/stations/E2500','1134','Stour','2003-01-01 00:00:00','623500','GroveFerry',51.3239630,1.2064210,163200,'E2500','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E2500/stageScale',0.580,3.000,1.770,0.367,'E2500','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Upstreet',654802006,'2019-04-12 16:10:26','2019-04-12 16:10:26'),(6,'http://environment.data.gov.uk/flood-monitoring/id/stations/E4321','1137','Stour','1998-01-01 00:00:00','596955','Hothfield Upstream',51.1576880,0.8151850,143594,'E4321','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E4321/stageScale',44.160,4.000,2.340,0.066,'E4321','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Hothfield',654110004,'2019-04-12 16:10:27','2019-04-12 16:10:27'),(7,'http://environment.data.gov.uk/flood-monitoring/id/stations/E4341','1145','Stour','1967-01-01 00:00:00','604900','Wye',51.1845880,0.9305290,146900,'E4341','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E4341/stageScale',28.900,2.000,1.000,0.106,'E4341','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Wye',654306001,'2019-04-12 16:10:27','2019-04-12 16:10:27'),(8,'http://environment.data.gov.uk/flood-monitoring/id/stations/E4230','9134','London','1993-10-01 00:00:00','612276','Upper Petham Bourne',51.1826710,1.0359670,146986,'E4230','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E4230/stageScale',87.330,NULL,84.647,58.329,'E4230','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive',NULL,644422003,'2019-04-12 16:10:27','2019-04-12 16:10:27'),(9,'http://environment.data.gov.uk/flood-monitoring/id/stations/E3826','9148','Stour','2000-01-01 00:00:00','618274','Fordwich River Level',51.2964610,1.1295250,159911,'E3826','Great Stour','http://environment.data.gov.uk/flood-monitoring/id/stations/E3826/stageScale',0.000,NULL,2.750,1.341,'E3826','http://environment.data.gov.uk/flood-monitoring/def/core/statusActive','Fordwich, Canterbury',654803002,'2019-04-12 16:10:27','2019-04-12 16:10:27');
/*!40000 ALTER TABLE `easensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floodareas`
--

DROP TABLE IF EXISTS `floodareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floodareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlId` varchar(150) NOT NULL,
  `county` varchar(200) NOT NULL,
  `description` varchar(700) NOT NULL,
  `eaAreaName` varchar(150) NOT NULL,
  `floodWatchArea` varchar(150) DEFAULT NULL,
  `fwdCode` varchar(40) NOT NULL,
  `label` varchar(300) NOT NULL,
  `lat` decimal(10,7) DEFAULT NULL,
  `long` decimal(10,7) DEFAULT NULL,
  `notation` varchar(50) NOT NULL,
  `polygon` geometry DEFAULT NULL,
  `quickDialNumber` varchar(20) DEFAULT NULL,
  `riverOrSea` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `urlId` (`urlId`),
  UNIQUE KEY `fwdCode` (`fwdCode`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floodareas`
--

LOCK TABLES `floodareas` WRITE;
/*!40000 ALTER TABLE `floodareas` DISABLE KEYS */;
INSERT INTO `floodareas` VALUES (1,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6Hothfield','Kent','The Great Stour downstream of Hothfield Flood Storage Area to South Ashford including Great Chart','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6UpStour','064FWF6Hothfield','Great Stour from Hothfield to Ashford',51.1480205,0.8452274,'064FWF6Hothfield',NULL,'317029','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(2,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6UpStour','Kent','Communities on the Great Stour from Charing Heath to the A2070 including Ashford, communities on the East Stour, communities on the Whitewater and Ruckinge Dykes and the Aylesford Stream','Kent S London and E Sussex',NULL,'064WAF6UpStour','Upper River Stour',51.1364643,0.8736944,'064WAF6UpStour',NULL,'217028','Great Stour, East Stour, Aylesford Stream, Ruckinge Dyke, Whitewater Dyke, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(3,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6Fordwich','Kent','The Great Stour at Fordwich and Sturry','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6LowStour','064FWF6Fordwich','Fordwich and Sturry',51.2971411,1.1224019,'064FWF6Fordwich',NULL,'317027','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(4,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6LowStour','Kent','The River Stour from the A2070 at Conningbrook Manor to Fordwich, including Wye, Godmersham, Shalmsford Street, Chartham, Canterbury and Sturry','Kent S London and E Sussex',NULL,'064WAF6LowStour','Lower River Stour',51.2188897,0.9855439,'064WAF6LowStour',NULL,'217027','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(5,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6LenHeath','Kent','The Great Stour from Lenham Heath to Hothfield including Charing Heath, Little Chart and the Hothfield Flood Storage Area','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6UpStour','064FWF6LenHeath','Great Stour from Lenham Heath to Hothfield',51.1810909,0.7837921,'064FWF6LenHeath',NULL,'317030','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(6,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6Chartham','Kent','The Great Stour from Shalmsford Street to Thanington including Chartham','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6LowStour','064FWF6Chartham','Shalmsford Street, Chartham and Thanington',51.2607807,1.0230668,'064FWF6Chartham',NULL,'317025','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(7,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6Canterbury','Kent','The Great Stour at Canterbury','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6LowStour','064FWF6Canterbury','River Great Stour at Canterbury',51.2865837,1.0881636,'064FWF6Canterbury',NULL,'317024','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(8,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6NorthAsh','Kent','The Great Stour from Ashford to Kennington','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6UpStour','064FWF6NorthAsh','Great Stour at North Ashford',51.1545499,0.8969881,'064FWF6NorthAsh',NULL,'317033','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40'),(9,'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064FWF6Wye','Kent','The Great Stour from Wye to Chilham including Godmersham','Kent S London and E Sussex','http://environment.data.gov.uk/flood-monitoring/id/floodAreas/064WAF6LowStour','064FWF6Wye','Wye, Godmersham and Chilham',51.2153546,0.9538919,'064FWF6Wye',NULL,'317036','Great Stour, Stour','2019-04-12 12:39:40','2019-04-12 12:39:40');
/*!40000 ALTER TABLE `floodareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floodwarnings`
--

DROP TABLE IF EXISTS `floodwarnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floodwarnings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlId` varchar(150) NOT NULL,
  `description` varchar(700) NOT NULL,
  `eaAreaName` varchar(150) NOT NULL,
  `eaRegionName` varchar(150) DEFAULT NULL,
  `isTidal` tinyint(1) NOT NULL,
  `message` varchar(3000) DEFAULT NULL,
  `severity` varchar(30) NOT NULL,
  `severityLevel` int(11) NOT NULL,
  `timeMessageChanged` datetime NOT NULL,
  `timeRaised` datetime NOT NULL,
  `timeSeverityChanged` datetime NOT NULL,
  `hasBroadcast` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `floodareaId` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `urlId` (`urlId`),
  KEY `floodareaId` (`floodareaId`),
  CONSTRAINT `floodwarnings_ibfk_1` FOREIGN KEY (`floodareaId`) REFERENCES `floodareas` (`fwdCode`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floodwarnings`
--

LOCK TABLES `floodwarnings` WRITE;
/*!40000 ALTER TABLE `floodwarnings` DISABLE KEYS */;
/*!40000 ALTER TABLE `floodwarnings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localsensorreadings`
--

DROP TABLE IF EXISTS `localsensorreadings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `localsensorreadings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `counter` int(11) NOT NULL,
  `value` decimal(10,3) NOT NULL,
  `dateTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `localsensorId` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `localsensorId` (`localsensorId`),
  CONSTRAINT `localsensorreadings_ibfk_1` FOREIGN KEY (`localsensorId`) REFERENCES `localsensors` (`devId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localsensorreadings`
--

LOCK TABLES `localsensorreadings` WRITE;
/*!40000 ALTER TABLE `localsensorreadings` DISABLE KEYS */;
/*!40000 ALTER TABLE `localsensorreadings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localsensors`
--

DROP TABLE IF EXISTS `localsensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `localsensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appId` varchar(150) NOT NULL,
  `devId` varchar(150) NOT NULL,
  `hardwareSerial` varchar(150) NOT NULL,
  `port` int(11) NOT NULL,
  `latitude` varchar(150) NOT NULL,
  `longitude` varchar(150) NOT NULL,
  `altitude` varchar(150) NOT NULL,
  `locationSource` varchar(30) NOT NULL,
  `units` varchar(30) NOT NULL,
  `distanceSensorFromRiverBed` decimal(10,3) NOT NULL,
  `distanceFloodPlainFromRiverBed` decimal(10,3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `devId` (`devId`),
  UNIQUE KEY `hardwareSerial` (`hardwareSerial`),
  UNIQUE KEY `latitude` (`latitude`),
  UNIQUE KEY `longitude` (`longitude`),
  UNIQUE KEY `altitude` (`altitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localsensors`
--

LOCK TABLES `localsensors` WRITE;
/*!40000 ALTER TABLE `localsensors` DISABLE KEYS */;
/*!40000 ALTER TABLE `localsensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subscriptions` (
  `email` varchar(150) NOT NULL,
  `floodareaId` varchar(70) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`email`,`floodareaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-12 16:28:44
