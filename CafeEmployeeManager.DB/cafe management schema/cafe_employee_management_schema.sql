-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: cafe_employee_management_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Current Database: `cafe_employee_management_db`
--

/*!40000 DROP DATABASE IF EXISTS `cafe_employee_management_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cafe_employee_management_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `cafe_employee_management_db`;

--
-- Table structure for table `cafe`
--

DROP TABLE IF EXISTS `cafe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafe` (
  `Id` varchar(36) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Logo` varchar(255) DEFAULT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe`
--

LOCK TABLES `cafe` WRITE;
/*!40000 ALTER TABLE `cafe` DISABLE KEYS */;
INSERT INTO `cafe` VALUES ('167d0781-535a-11ef-85fe-04bf1b523bdc','Café 101','A cozy nook where you can enjoy coffee, cakes, and conversation.','cafe-icon-2.png','333 Somerset Rd, S238877'),('40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','Find your cup of joy here, whether it’s a latte or a soothing chamomile tea.','cafe-icon-3.png','555 Clarke Quay, S179020'),('ac908aae-52de-11ef-85fe-04bf1b523bdc','Café Noir','A sophisticated French-inspired cafe offering dark-roast coffee and elegant pastries.','cafe-icon-1.png','101 Robinson Rd, S068902.'),('c99e8a9a-5359-11ef-85fe-04bf1b523bdc','Latte Café','A trendy cafe known for its creative coffee blends, perfect for socializing by the riverside.','cafe-icon-2.png','777 Somerset Rd, S238877'),('cda96dc0-5322-11ef-85fe-04bf1b523bdc','Espresso','For those who appreciate the bold intensity of espresso shots, this cafe delivers a caffeine punch.','cafe-icon-2.png','246 Tanjong Pagar Rd, S088541'),('f80c2a66-5359-11ef-85fe-04bf1b523bdc','Alchemist','Sip leisurely on specialty brews at this serene cafe nestled amidst lush greenery.','cafe-icon-1.png','888 Orchard Turn, S238801');
/*!40000 ALTER TABLE `cafe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Id` varchar(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `EmailAddress` varchar(100) NOT NULL,
  `PhoneNumber` varchar(8) NOT NULL,
  `Gender` enum('Male','Female') NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('UI07f387e','Wei Xiang','weixiang@example.com','86543121','Male'),('UI13e60e9','Li Wei','liwei@example.com','80985434','Female'),('UI25d787c','Yong Le','yongle@example.com','86543123','Male'),('UI3da4427','Si Hui','sihui@example.com','86543122','Female'),('UI41e1433','Xin Hui','xinhui@example.com','80943232','Female'),('UIa62ffbe','Hui Ying','huiying@example.com','98765432','Female'),('UIcf789ce','Jun Jie','junjie@example.com','87654321','Male'),('UIece6757','Mei Ling','meiling@example.com','87654321','Female'),('UIf776775','Kai Ming','kaiming@example.com','80985434','Female');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeecaferelationship`
--

DROP TABLE IF EXISTS `employeecaferelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeecaferelationship` (
  `EmployeeId` varchar(10) NOT NULL,
  `EmployeeName` varchar(45) NOT NULL,
  `CafeId` varchar(36) NOT NULL,
  `CafeName` varchar(45) NOT NULL,
  `StartDate` datetime(6) NOT NULL,
  `DaysWorked` int NOT NULL,
  PRIMARY KEY (`EmployeeId`,`CafeId`),
  UNIQUE KEY `uc_employee_cafe` (`EmployeeId`,`CafeId`),
  KEY `IX_EmployeeCafeRelationships_CafeId` (`CafeId`),
  CONSTRAINT `FK_EmployeeCafeRelationships_Cafes_CafeId` FOREIGN KEY (`CafeId`) REFERENCES `cafe` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_EmployeeCafeRelationships_Employees_EmployeeId` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeecaferelationship`
--

LOCK TABLES `employeecaferelationship` WRITE;
/*!40000 ALTER TABLE `employeecaferelationship` DISABLE KEYS */;
INSERT INTO `employeecaferelationship` VALUES ('UI07f387e','Wei Xiang','40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','2024-03-28 00:00:00.000000',130),('UI13e60e9','Li Wei','40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','2024-06-05 00:00:00.000000',62),('UI25d787c','Yong Le','cda96dc0-5322-11ef-85fe-04bf1b523bdc','Espresso','2024-04-16 00:00:00.000000',111),('UI3da4427','Si Hui','ac908aae-52de-11ef-85fe-04bf1b523bdc','Café Noir','2024-07-11 00:00:00.000000',25),('UI41e1433','Xin Hui','40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','2024-04-30 00:00:00.000000',98),('UIa62ffbe','Hui Ying','40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','2023-08-13 00:00:00.000000',358),('UIcf789ce','Jun Jie','ac908aae-52de-11ef-85fe-04bf1b523bdc','Café Noir','2024-05-08 00:00:00.000000',89),('UIece6757','Mei Ling','cda96dc0-5322-11ef-85fe-04bf1b523bdc','Espresso','2024-03-01 00:00:00.000000',157),('UIf776775','Kai Ming','40172cdc-5355-11ef-85fe-04bf1b523bdc','Cup O’ Joy','2024-07-31 00:00:00.000000',6);
/*!40000 ALTER TABLE `employeecaferelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cafe_employee_management_db'
--
DROP PROCEDURE IF EXISTS `add_cafe_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `add_cafe_sp`(
    IN p_name VARCHAR(255),
    IN p_description TEXT,
    IN p_logo VARCHAR(255),
    IN p_location VARCHAR(255)
)
BEGIN
    DECLARE v_uuid VARCHAR(36);

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    -- Generate a UUID for the Id
    SET v_uuid = UUID();

    -- Start the transaction
    START TRANSACTION;

    -- Insert the new cafe record
    INSERT INTO cafe (Id, Name, Description, Logo, Location)
    VALUES (v_uuid, p_name, p_description, p_logo, p_location);

    -- Commit the transaction
    COMMIT;

        SET result_message = CONCAT(p_name, ' cafe created successfully');
		-- Log the insert operation (for debugging purposes)
		SELECT 0 AS result_code, result_message AS result_message;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `add_employee_with_cafe`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `add_employee_with_cafe`(
    IN p_name VARCHAR(100),
    IN p_email_address VARCHAR(100),
    IN p_phone_number VARCHAR(10),
    IN p_gender ENUM('Male', 'Female'),
    IN p_cafe_id CHAR(36),
    IN p_start_date DATE
)
BEGIN
    DECLARE p_id VARCHAR(10);
	DECLARE v_cafe_name VARCHAR(255);
	DECLARE v_days_worked INT;

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions
    
    -- Validate phone number (starts with 9 or 8)
    IF LEFT(p_phone_number, 1) NOT IN ('9', '8') THEN
        SET result_message = 'Phone number must start with 9 or 8';
        SET result_code = -2;
        SIGNAL SQLSTATE '45000';
    ELSE

	-- Generate a unique employee identifier
	SET p_id = CONCAT('UI', SUBSTRING(REPLACE(UUID(), '-', ''), 1, 7));

	-- Start the transaction
    START TRANSACTION;
-- ------------------------------------------------------------------------------
	-- Fetch the cafe name by cafe id
    SELECT name INTO v_cafe_name
    FROM Cafe
    WHERE id = p_cafe_id;

    -- Check if cafe name was found
    IF v_cafe_name IS NULL THEN
        SET result_code = -1;
        SET result_message = 'Cafe not found';
        SIGNAL SQLSTATE '45000';
    END IF;
-- --------------------------------------------------------------------------
    -- Calculate days worked
    SET v_days_worked = DATEDIFF(CURDATE(), p_start_date);
    
        -- Insert the new employee
        INSERT INTO employee (id, name, emailaddress, phonenumber, gender)
        VALUES (p_id, p_name, p_email_address, p_phone_number, p_gender);

        -- Insert the relationship
        INSERT INTO EmployeeCafeRelationship (employeeid, employeename, cafeid, cafename, startdate, daysworked)
        VALUES (p_id, p_name, p_cafe_id, v_cafe_name, p_start_date, v_days_worked);
        
        -- Commit the transaction
        COMMIT;

        -- Output success message
	SET result_code = 0;
    SET result_message = CONCAT('Employee ', p_name, ' created successfully');
    SELECT result_code AS result_code, result_message AS result_message;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `add_employee_with_cafe_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `add_employee_with_cafe_sp`(
    IN p_name VARCHAR(100),
    IN p_email_address VARCHAR(100),
    IN p_phone_number VARCHAR(10),
    IN p_gender ENUM('Male', 'Female'),
    IN p_cafe_id CHAR(36),
    IN p_start_date DATE
)
BEGIN
    DECLARE p_id VARCHAR(10);
    DECLARE v_cafe_name VARCHAR(255);
    DECLARE v_days_worked INT;

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    -- Validate phone number (starts with 9 or 8)
    IF LEFT(p_phone_number, 1) NOT IN ('9', '8') THEN
        SET result_message = 'Phone number must start with 9 or 8';
        SET result_code = -1;
        SIGNAL SQLSTATE '45000';
    ELSE
        -- Start the transaction
        START TRANSACTION;

        -- Generate a unique employee identifier
        SET p_id = CONCAT('UI', SUBSTRING(REPLACE(UUID(), '-', ''), 1, 7));

        -- Fetch the cafe name by cafe id (if provided)
        IF p_cafe_id IS NOT NULL AND p_cafe_id != '' THEN
            SELECT name INTO v_cafe_name
            FROM cafe
            WHERE id = p_cafe_id;

            -- Check if cafe name was found
            IF v_cafe_name IS NULL THEN
                SET result_code = -1;
                SET result_message = 'Cafe not found';
                SIGNAL SQLSTATE '45000';
            END IF;
        END IF;

        -- Calculate days worked
        SET v_days_worked = DATEDIFF(CURDATE(), p_start_date);

        -- Insert the new employee
        INSERT INTO employee (id, name, emailaddress, phonenumber, gender)
        VALUES (p_id, p_name, p_email_address, p_phone_number, p_gender);

		-- If cafeId is provided, insert the relationship
		IF p_cafe_id IS NOT NULL AND p_cafe_id != '' THEN
			INSERT INTO EmployeeCafeRelationship (employeeid, employeename, cafeid, cafename, startdate, daysworked)
			VALUES (p_id, p_name, p_cafe_id, v_cafe_name, p_start_date, v_days_worked);
		ELSE
			-- If no cafeId is given
			INSERT INTO EmployeeCafeRelationship (employeeid, employeename, cafeid, startdate, daysworked)
			VALUES (p_id, p_name, -1 ,p_start_date, v_days_worked);
		END IF;        

        -- Commit the transaction
        COMMIT;

        -- Output success message
        SET result_message = CONCAT('Employee ', p_name, ' created successfully');
        SELECT 0 AS result_code, result_message AS Message;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `delete_cafe_and_employees_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `delete_cafe_and_employees_sp`(
    IN p_cafe_id VARCHAR(36)
)
BEGIN
	DECLARE v_cafe_name TEXT;
    
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    -- Start the transaction
    START TRANSACTION;
	
	SELECT Name INTO v_cafe_name FROM cafe WHERE id = p_cafe_id;

    -- Check if the employee exists
    IF v_cafe_name IS NULL THEN
        ROLLBACK;
        SET result_message = 'Cafe not found';
        SET result_code = -1;
        SELECT result_code AS result_code, result_message AS result_message;
        SIGNAL SQLSTATE '45000';
    END IF;

    -- Delete employees associated with the cafe
    DELETE FROM EmployeeCafeRelationship
    WHERE CafeId = p_cafe_id;

    -- Delete the cafe
    DELETE FROM Cafe
    WHERE Id = p_cafe_id;
    
    -- Commit the transaction
    COMMIT;

	SET result_message = CONCAT('Cafe ', v_cafe_name, ' deleted successfully');
	-- Log the insert operation (for debugging purposes)
	SELECT 0 AS result_code, result_message AS result_message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `delete_employee_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `delete_employee_sp`(
    IN p_employee_id VARCHAR(10)
)
BEGIN
    DECLARE v_employee_name TEXT;
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    -- Start the transaction
    START TRANSACTION;

    -- Select employee name to check if it exists
    SELECT Name INTO v_employee_name FROM employee WHERE Id = p_employee_id;
    
    -- Check if the employee exists
    IF v_employee_name IS NULL THEN
        ROLLBACK;
        SET result_message = 'Employee not found';
        SET result_code = -1;
        SELECT result_code AS result_code, result_message AS result_message;
        SIGNAL SQLSTATE '45000';
    END IF;

    -- Delete employee-cafe relationships for the employee
    DELETE FROM EmployeeCafeRelationship WHERE EmployeeId = p_employee_id;

    -- Delete the employee
    DELETE FROM employee WHERE Id = p_employee_id;

    COMMIT;

    SET result_message = CONCAT('Employee ', v_employee_name, ' deleted successfully');
    SELECT 0 AS result_code, result_message AS result_message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `get_all_employees_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_all_employees_sp`()
BEGIN

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    SELECT e.id, e.name, e.gender, e.emailAddress, e.phoneNumber,
           ec.startDate, c.id AS cafeId, c.name AS cafeName,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    LEFT JOIN employeecaferelationship ec ON e.id = ec.employeeId
    LEFT JOIN cafe c ON c.id = ec.cafeId
    ORDER BY daysWorked DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `get_cafes_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_cafes_sp`(
	IN loc VARCHAR(100)
)
BEGIN
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    IF loc IS NULL OR loc = '' THEN
        SELECT 
            c.id, 
            c.name, 
            c.description, 
            c.logo, 
            c.location,
            (SELECT COUNT(*) FROM employeecaferelationship ecr WHERE ecr.cafeid = c.id) AS employees
        FROM cafe c
        ORDER BY employees DESC;
    ELSE
        SELECT 
            c.id, 
            c.name, 
            c.description, 
            c.logo, 
            c.location,
            (SELECT COUNT(*) FROM employeecaferelationship ecr WHERE ecr.cafeid = c.id) AS employees
        FROM cafe c
        WHERE c.location = loc
        ORDER BY employees DESC;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `get_employees_by_cafe_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_employees_by_cafe_sp`(
    IN cafeId VARCHAR(36)
)
BEGIN
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions
    
    SELECT e.id, e.name, e.gender, e.emailAddress, e.phoneNumber, e.gender, 
           ec.startDate, c.id AS cafeId, c.name AS cafeName, ec.startDate AS startDate,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    INNER JOIN employeecaferelationship ec ON e.id = ec.employeeId
    INNER JOIN cafe c ON c.id = ec.cafeId
    WHERE (c.id = cafeId OR cafeId IS NULL OR '')
    ORDER BY daysWorked DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `update_cafe_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_cafe_sp`(
    IN p_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_description TEXT,
    IN p_logo VARCHAR(255),
    IN p_location VARCHAR(255)
)
BEGIN
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions
    
    -- Start the transaction
    START TRANSACTION;
    
    UPDATE Cafe
    SET Name = p_name,
        Description = p_description,
        Logo = p_logo,
        Location = p_location
    WHERE Id = p_id;
    
	-- Commit the transaction
    COMMIT;

	SET result_code = 0;
	SET result_message = CONCAT(p_name, ' cafe updated successfully');
	-- Log the insert operation (for debugging purposes)
	SELECT result_code AS result_code, result_message AS result_message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `update_employee_and_cafe_relationship`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_employee_and_cafe_relationship`(
    IN p_employee_id VARCHAR(10),
    IN p_name VARCHAR(100),
    IN p_email_address VARCHAR(100),
    IN p_phone_number VARCHAR(8),
    IN p_gender ENUM('Male', 'Female'),
    IN p_cafe_id VARCHAR(36),
    IN p_start_date DATETIME(6)
)
BEGIN
    DECLARE v_cafe_name VARCHAR(45);
    DECLARE v_days_worked INT;

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions
    
    -- Start the transaction
    START TRANSACTION;
    
    -- Update employee details
    UPDATE Employee
    SET Name = p_name,
        EmailAddress = p_email_address,
        PhoneNumber = p_phone_number,
        Gender = p_gender
    WHERE Id = p_employee_id;

    -- Fetch the cafe name by cafe id
    SELECT Name INTO v_cafe_name
    FROM Cafe
    WHERE Id = p_cafe_id;

    -- Calculate days worked
    SET v_days_worked = DATEDIFF(CURDATE(), p_start_date);

    -- Update employee-cafe relationship
    UPDATE EmployeeCafeRelationship
    SET EmployeeName = p_name,
        CafeId = p_cafe_id,
        CafeName = v_cafe_name,
        StartDate = p_start_date,
        DaysWorked = v_days_worked
    WHERE EmployeeId = p_employee_id;

	-- Commit the transaction
    COMMIT;

	SET result_code = 0;
	SET result_message = CONCAT('Employee ', p_name, ' updated successfully');
	-- Log the insert operation (for debugging purposes)
	SELECT result_code AS result_code, result_message AS result_message;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
DROP PROCEDURE IF EXISTS `update_employee_cafe_relationship_sp`;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_employee_cafe_relationship_sp`(
    IN p_employee_id VARCHAR(10),
    IN p_name VARCHAR(100),
    IN p_email_address VARCHAR(100),
    IN p_phone_number VARCHAR(8),
    IN p_gender ENUM('Male', 'Female'),
    IN p_cafe_id VARCHAR(36)
)
BEGIN
    DECLARE v_cafe_name VARCHAR(45);

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
	DECLARE exit handler for SQLEXCEPTION
	 BEGIN
	  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
	   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	  SELECT @errno as result_code, @text as result_message;
	 END;
    -- End exit handler for SQL exceptions

    -- Start the transaction
    START TRANSACTION;

    -- Update employee details
    UPDATE Employee
    SET Name = p_name,
        EmailAddress = p_email_address,
        PhoneNumber = p_phone_number,
        Gender = p_gender
    WHERE Id = p_employee_id;

    -- Fetch the cafe name by cafe id
    SELECT Name INTO v_cafe_name
    FROM cafe
    WHERE Id = p_cafe_id;

    -- If cafeId is provided, check if the cafe exists, then update the relationship
    IF p_cafe_id IS NOT NULL AND p_cafe_id != '' THEN
        IF v_cafe_name IS NOT NULL THEN
            -- Cafe exists, update the relationship
                UPDATE EmployeeCafeRelationship 
                SET EmployeeId = p_employee_id,
					EmployeeName = p_name,
                    CafeId = p_cafe_id,
                    CafeName = v_cafe_name
				WHERE EmployeeId = p_employee_id;
        ELSE
            -- Cafe does not exist, exit
            SELECT 0 AS result_code, 'Cafe does not exist' AS result_message;
        END IF;
    END IF;

    -- Commit the transaction
    COMMIT;

    SET result_code = 0;
    SET result_message = CONCAT('Employee ', p_name, ' updated successfully');
    -- Log the insert/update operation (for debugging purposes)
    SELECT result_code AS result_code, result_message AS result_message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06  0:15:44
