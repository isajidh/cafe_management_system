CREATE DEFINER=`root`@`localhost` PROCEDURE `add_cafe_sp`(
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
    INSERT INTO Cafe (Id, Name, Description, Logo, Location)
    VALUES (v_uuid, p_name, p_description, p_logo, p_location);

    -- Commit the transaction
    COMMIT;

        SET result_message = CONCAT(p_name, ' cafe created successfully');
		-- Log the insert operation (for debugging purposes)
		SELECT 0 AS result_code, result_message AS result_message;

END