CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_employee_sp`(
    IN p_employee_id VARCHAR(10)
)
BEGIN
    DECLARE v_employee_name TEXT;
    DECLARE result_code INT DEFAULT 0;
    DECLARE result_message TEXT DEFAULT '';

    -- Declare the exit handler for SQL exceptions
    DECLARE exit handler FOR SQLEXCEPTION
    BEGIN
        -- Rollback if needed
        ROLLBACK;
        SET result_code = -1;
        SET result_message = 'An error occurred';
        SELECT result_code AS result_code, result_message AS result_message;
    END;

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
    DELETE FROM EmployeeCafeRelationship WHERE EmployeeId = p_employee_id;

    -- Delete the employee
    DELETE FROM Employee WHERE Id = p_employee_id;

    COMMIT;

    SET result_code = 0;
    SET result_message = CONCAT('Employee ', v_employee_name, ' deleted successfully');
    SELECT result_code AS result_code, result_message AS result_message;

    proc_exit: BEGIN END;
END