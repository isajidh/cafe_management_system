CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_cafe_and_employees_sp`(
    IN p_cafe_id VARCHAR(36)
)
BEGIN
	DECLARE v_cafe_name TEXT DEFAULT '';
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
	
	SELECT Name INTO v_cafe_name FROM Cafe WHERE id = p_cafe_id;

    -- Delete employees associated with the cafe
    DELETE FROM EmployeeCafeRelationship
    WHERE CafeId = p_cafe_id;

    -- Delete the cafe
    DELETE FROM Cafe
    WHERE Id = p_cafe_id;
    
    -- Commit the transaction
    COMMIT;

	SET result_code = 0;
	SET result_message = CONCAT('Cafe ', v_cafe_name, ' deleted successfully');
	-- Log the insert operation (for debugging purposes)
	SELECT result_code AS result_code, result_message AS result_message;
END