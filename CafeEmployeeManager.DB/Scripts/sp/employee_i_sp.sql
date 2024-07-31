CREATE DEFINER=`root`@`localhost` PROCEDURE `employee_i_sp`(
    IN p_name VARCHAR(100),
    IN p_email_address VARCHAR(100),
    IN p_phone_number VARCHAR(8),
    IN p_gender ENUM('Male', 'Female')
)
BEGIN
    DECLARE p_id VARCHAR(10);

    -- Validate phone number (starts with 9 or 8)
    IF LEFT(p_phone_number, 1) NOT IN ('9', '8') THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Phone number must start with 9 or 8';
    END IF;

    -- Generate a unique employee identifier
    SET p_id = CONCAT('UI', SUBSTRING(REPLACE(UUID(), '-', ''), 1, 7));

    -- Start the transaction
    START TRANSACTION;

    -- Insert the new employee
    INSERT INTO Employee (id, name, emailaddress, phonenumber, gender)
    VALUES (p_id, p_name, p_email_address, p_phone_number, p_gender);

    -- Commit the transaction
    COMMIT;

    -- Log the insert operation (for debugging purposes)
    SELECT 'Employee inserted successfully' AS message, p_id AS inserted_id;
END