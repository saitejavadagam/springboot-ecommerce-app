-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2fypguoq8qc1uigt9i6em0t07` (`cart_id`,`product_id`),
  KEY `FKqkqmvkmbtiaqn2nfqf25ymfs2` (`product_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKqkqmvkmbtiaqn2nfqf25ymfs2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `bought` int DEFAULT NULL,
  `mrp` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `reviews` int DEFAULT NULL,
  `sponsored` bit(1) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (500,2999,1999,4.2,146,_binary '',1,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop','Wireless Bluetooth Headphones'),
                              (1200,4999,3499,4.5,312,_binary '\0',2,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=400&fit=crop','Smart Watch AMOLED Display'),
                              (350,1499,999,4.1,98,_binary '\0',3,'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&h=400&fit=crop','Apple iMac'),
                              (670,3999,2499,4.4,221,_binary '\0',4,'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&h=400&fit=crop','Mechanical Keyboard'),
                              (430,11999,8999,4.3,189,_binary '\0',5,'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400&h=400&fit=crop','1080p Full HD Monitor'),
                              (210,2499,1499,4,76,_binary '\0',6,'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=400&h=400&fit=crop','Portable Bluetooth Speaker'),
                              (1800,1999,1199,4.6,540,_binary '',7,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&h=400&fit=crop','Laptop Backpack Waterproof'),
                              (2200,1299,699,4.3,410,_binary '\0',8,'https://images.unsplash.com/photo-1629131726692-1accd0c93fd0?q=80&w=400&h=400&fit=crop','USB-C Fast Charger'),
                              (900,3999,2799,4.2,305,_binary '\0',9,'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&h=400&fit=crop','Noise Cancelling Earbuds'),
                              (1500,5999,4599,4.5,620,_binary '\0',10,'https://images.unsplash.com/photo-1531284895878-8284cb680fa2?q=80&w=400&h=400&fit=crop','External Hard Drive 1TB'),
                              (480,3499,2299,4.1,155,_binary '\0',11,'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&h=400&fit=crop','Wireless Router Dual Band'),
                              (500,85965,69990,4.4,146,_binary '',12,'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&h=400&fit=crop','Gaming Laptop 16GB RAM'),
                              (740,15999,12999,4.2,201,_binary '\0',13,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&h=400&fit=crop','Tablet 10-inch Display'),
                              (3200,22999,18999,4.3,890,_binary '\0',14,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&h=400&fit=crop','Smartphone 5G 128GB'),
                              (460,1799,1199,4,133,_binary '\0',15,'https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=400&h=400&fit=crop','Wireless Charging Pad'),
                              (620,10999,7999,4.2,258,_binary '\0',16,'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=400&h=400&fit=crop','Action Camera 4K'),
                              (2700,32999,24999,4.5,1120,_binary '\0',17,'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&h=400&fit=crop','Smart LED TV 43-inch'),
                              (1100,2499,1599,4.1,340,_binary '\0',18,'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&h=400&fit=crop','Fitness Band Tracker'),
                              (850,54999,45999,4.6,520,_binary '\0',19,'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=400&fit=crop','DSLR Camera 24MP'),
                              (960,8999,6999,4.4,310,_binary '\0',20,'https://images.unsplash.com/photo-1599507591144-66b1628181bb?q=80&w=400&h=400&fit=crop','Portable SSD 512GB');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
