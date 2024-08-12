CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_employees_sp`()
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

    SELECT e.id, e.name, e.gender, e.emailAddress, e.phoneNumber,
           ec.startDate, c.id AS cafeId, c.name AS cafeName,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    LEFT JOIN employeecaferelationship ec ON e.id = ec.employeeId
    LEFT JOIN cafe c ON c.id = ec.cafeId
    ORDER BY daysWorked DESC;
END