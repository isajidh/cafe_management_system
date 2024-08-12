CREATE DEFINER=`root`@`localhost` PROCEDURE `update_employee_cafe_relationship_sp`(
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
    UPDATE employee
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
                UPDATE employeecaferelationship 
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
END