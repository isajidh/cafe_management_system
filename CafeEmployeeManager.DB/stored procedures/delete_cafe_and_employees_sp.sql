CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_cafe_and_employees_sp`(
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
	
	SELECT Name INTO v_cafe_name FROM Cafe WHERE id = p_cafe_id;

    -- Check if the employee exists
    IF v_cafe_name IS NULL THEN
        ROLLBACK;
        SET result_message = 'Cafe not found';
        SET result_code = -1;
        SELECT result_code AS result_code, result_message AS result_message;
        SIGNAL SQLSTATE '45000';
    END IF;

    -- Delete employees associated with the cafe
    DELETE FROM employeecaferelationship
    WHERE cafeid = p_cafe_id;

    -- Delete the cafe
    DELETE FROM cafe
    WHERE Id = p_cafe_id;
    
    -- Commit the transaction
    COMMIT;

	SET result_message = CONCAT('Cafe ', v_cafe_name, ' deleted successfully');
	-- Log the insert operation (for debugging purposes)
	SELECT 0 AS result_code, result_message AS result_message;
END