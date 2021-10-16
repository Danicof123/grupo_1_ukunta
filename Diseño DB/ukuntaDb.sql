CREATE DATABASE  IF NOT EXISTS `ukuntadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ukuntadb`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: ukuntadb
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(100) NOT NULL,
  `streetNumber` int NOT NULL,
  `description` varchar(100) NOT NULL,
  `country` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a589a7f3-f0d6-48fc-922a-e059c618843b` (`userId`),
  CONSTRAINT `FK_a589a7f3-f0d6-48fc-922a-e059c618843b` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Avenida',123,'San Luis','Argentina','Buenos Aires','Campana',5),(2,'Calle',1234,'Descripción domicilio','Argentina','Buenos Aires','CABA',6),(3,'Av Siempreviva',1284,'Springfield','Argentina','Buenos Aires','CABA',7),(4,'Pasaje',8989,'Nordelta','Argentina','Santa Fe','Rosario',8),(5,'9 de Julio',1000,'Obelisco','Argentina','Buenos Aires','CABA',9);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel`
--

LOCK TABLES `carousel` WRITE;
/*!40000 ALTER TABLE `carousel` DISABLE KEYS */;
INSERT INTO `carousel` VALUES (1,'headerMain-1.jpg'),(2,'headerMain-2.jpg'),(3,'headerMain-3.jpg'),(4,'headerMain-4.jpg'),(5,'headerMain-5.jpg');
/*!40000 ALTER TABLE `carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `date` date NOT NULL,
  `paymentId` int DEFAULT NULL,
  `total` int NOT NULL,
  `discount` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7106b644-d2a7-4b8a-88e2-7f84cf19e157` (`userId`),
  KEY `FK_a5d4c0d8-a367-41c3-9102-c5aaac9accd0` (`paymentId`),
  CONSTRAINT `FK_7106b644-d2a7-4b8a-88e2-7f84cf19e157` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_a5d4c0d8-a367-41c3-9102-c5aaac9accd0` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartproduct`
--

DROP TABLE IF EXISTS `cartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartproduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `units` int NOT NULL,
  `productId` int NOT NULL,
  `cartId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79be3f3c-4cd8-46bb-ab21-ec6c26f86d1e` (`productId`),
  KEY `FK_d50a75b8-9c70-472f-a278-af894c1cdff1` (`cartId`),
  CONSTRAINT `FK_79be3f3c-4cd8-46bb-ab21-ec6c26f86d1e` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_d50a75b8-9c70-472f-a278-af894c1cdff1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartproduct`
--

LOCK TABLES `cartproduct` WRITE;
/*!40000 ALTER TABLE `cartproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'cerveza'),(2,'hidromiel'),(3,'merchandising');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_003eafc3-efcd-4ba8-a3e2-1b7552dd5e3d` (`productId`),
  CONSTRAINT `FK_003eafc3-efcd-4ba8-a3e2-1b7552dd5e3d` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'Ale-stout-Negra-305x368.jpg',1),(2,'extra-picante-305x368.jpg',2),(3,'destapador01-305x368.jpg',3),(11,'1632429918032_img.jpg',11),(12,'1632430570177_img.jpg',12),(13,'1632430751482_img.jpg',13),(16,'1632431244936_img.jpg',16),(17,'1632780314696_img.jpg',17),(18,'1632780386158_img.jpg',18),(19,'1632780440065_img.jpg',19),(20,'1632780551340_img.jpg',20),(21,'1632780657171_img.jpg',21);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `method` varchar(45) NOT NULL,
  `cardNumber` int NOT NULL,
  `cardOwner` varchar(45) NOT NULL,
  `expireDate` date NOT NULL,
  `securityCode` int NOT NULL,
  `dni` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8a3fc591-9564-434c-8071-777adf443f6f` (`userId`),
  CONSTRAINT `FK_8a3fc591-9564-434c-8071-777adf443f6f` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `size` varchar(15) DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `stock` int NOT NULL,
  `expire` date DEFAULT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cd71704d-87d0-4ea8-a69d-f5d9fe43a6f5` (`categoryId`),
  CONSTRAINT `FK_cd71704d-87d0-4ea8-a69d-f5d9fe43a6f5` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ale Stout Negra','Cerveza negra','300cc',150.00,25,NULL,1),(2,'Extra Picante','Hidromiel Extra Picante','300cc',185.00,20,'2022-09-25',2),(3,'Destapador','Destapador estilo Vikingo','13cmx10cm',300.00,3,NULL,3),(11,'Soporte para Cuerno','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type',NULL,399.00,60,'2022-09-23',3),(12,'Jarra Editada','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','1000 ml.',999.00,90,'2021-09-24',3),(13,'Petalo Rosa','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','300 ml.',189.00,50,'2022-09-23',2),(16,'Tapaboca Blanco','Te protege del covid-19 y covid-9/12/18','S, M, L y XL',249.00,400,'2022-09-23',3),(17,'Ale Porter Negra','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','300 ml.',399.00,20,'2022-09-27',1),(18,'IPA Negra','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','300 ml.',299.00,50,'2022-09-27',1),(19,'IPA Rubia','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','300 ml.',399.00,60,'2023-09-27',1),(20,'Fresa','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','300 ml.',499.00,100,'2025-09-27',2),(21,'Cannabica','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','300 ml.',266.00,90,'2022-01-01',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `datebirth` date NOT NULL,
  `dni` int NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `rol` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Danicof','Address','danicof@ukunta.com','$2a$10$88JenEVgVy0KoyzmlwIdsezq1RSm9oReq7TOuGuEZwObM.3G20lZu','2002-02-02',22555999,'1632544936228-undefined.jpg','admin','1112345678'),(6,'Emanuel','Romero','emanuel@ukunta.com','$2a$10$ftLadZuvx2Nj2XLBBMUHIefoC0wISU1CC9csnMwgWG3disvOTPzxK','1989-01-24',34372366,'default.png','guest','1151042755'),(7,'Homero','Simpsons','homero@ukunta.com','$2a$10$Ce6N2v1LkaPBWuy3bWn.Te3cDkq.TpZIO0Ufcou7FkL9RcgccHMrS','1999-12-31',14200300,'default.png','guest','1151042755'),(8,'Marge','Simpsons','marge@ukunta.com','$2a$10$tGeZ39LuqwQUuBdT4sOChOSvDtKDvMkLcLM9Y.AV8nNkq6sVvrXei','1934-02-02',22444999,'1633032947969-undefined.jpg','guest','1122228888'),(9,'Robert','Veintemilla','robert@ukunta.com','$2a$10$Y90wuVRG5GMy4E.kHj8Js.rY/w9M7eptB6WfADxwNx0XAmabHO7za','2000-10-13',30555888,'default.png','admin','1147475858');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15 21:02:17
