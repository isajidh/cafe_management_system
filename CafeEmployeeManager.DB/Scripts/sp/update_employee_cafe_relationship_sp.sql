CREATE DEFINER=`root`@`localhost` PROCEDURE `update_employee_cafe_relationship_sp`(
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

-- --------------------------------------------------------------------------------------
    -- Declare variables for error handling
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

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
-- ---------------------------------------------------------------------
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

END