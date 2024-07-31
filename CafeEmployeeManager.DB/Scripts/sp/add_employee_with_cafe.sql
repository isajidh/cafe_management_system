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

    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';
    DECLARE success_message VARCHAR(255) DEFAULT 'Procedure executed successfully.';

    -- Declare the exit handler for SQL exceptions
    DECLARE exit handler FOR SQLEXCEPTION
    BEGIN
        -- Rollback if needed
        ROLLBACK;

        -- Retrieve error details
        GET DIAGNOSTICS CONDITION 1
            result_code = MYSQL_ERRNO,
            result_message = MESSAGE_TEXT;

        -- Output general error message and error code
        SELECT -1 AS result_code, CONCAT('Error: ', result_message) AS Message;
    END;

    -- Validate phone number (starts with 9 or 8)
    IF LEFT(p_phone_number, 1) NOT IN ('9', '8') THEN
        SET result_message = 'Phone number must start with 9 or 8';
        SET result_code = -2;
        SIGNAL SQLSTATE '45000';
    ELSE
        -- Start the transaction
        START TRANSACTION;
        
        -- Generate a unique employee identifier
        SET p_id = CONCAT('UI', SUBSTRING(REPLACE(UUID(), '-', ''), 1, 7));

        -- Insert the new employee
        INSERT INTO Employee (id, name, emailaddress, phonenumber, gender)
        VALUES (p_id, p_name, p_email_address, p_phone_number, p_gender);

        -- Insert the relationship
        INSERT INTO EmployeeCafeRelationship (employeeid, cafeid, startdate)
        VALUES (p_id, p_cafe_id, p_start_date);
        
        -- Commit the transaction
        COMMIT;

        -- Output success message
        SELECT 0 AS result_code, success_message AS Message;
    END IF;
END