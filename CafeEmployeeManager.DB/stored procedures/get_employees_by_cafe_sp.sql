CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employees_by_cafe_sp`(
    IN cafeId VARCHAR(36)
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
    
    SELECT e.id, e.name, e.gender, e.emailAddress, e.phoneNumber, e.gender, 
           ec.startDate, c.id AS cafeId, c.name AS cafeName, ec.startDate AS startDate,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    INNER JOIN employeecaferelationship ec ON e.id = ec.employeeId
    INNER JOIN cafe c ON c.id = ec.cafeId
    WHERE (c.id = cafeId OR cafeId IS NULL OR '')
    ORDER BY daysWorked DESC;
END