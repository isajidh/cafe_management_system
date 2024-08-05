CREATE DEFINER=`root`@`localhost` PROCEDURE `add_employee_with_cafe`(
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
        INSERT INTO Employee (id, name, emailaddress, phonenumber, gender)
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
END