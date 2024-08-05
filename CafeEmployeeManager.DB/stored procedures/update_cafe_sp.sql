CREATE DEFINER=`root`@`localhost` PROCEDURE `update_cafe_sp`(
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
END