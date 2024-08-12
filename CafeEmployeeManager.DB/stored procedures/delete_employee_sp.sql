CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_employee_sp`(
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
    SELECT Name INTO v_employee_name FROM Employee WHERE Id = p_employee_id;
    
    -- Check if the employee exists
    IF v_employee_name IS NULL THEN
        ROLLBACK;
        SET result_message = 'Employee not found';
        SET result_code = -1;
        SELECT result_code AS result_code, result_message AS result_message;
        SIGNAL SQLSTATE '45000';
    END IF;

    -- Delete employee-cafe relationships for the employee
    DELETE FROM employeecaferelationship WHERE employeeid = p_employee_id;

    -- Delete the employee
    DELETE FROM employee WHERE Id = p_employee_id;

    COMMIT;

    SET result_message = CONCAT('Employee ', v_employee_name, ' deleted successfully');
    SELECT 0 AS result_code, result_message AS result_message;
END