CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cafes_sp`(
	IN loc VARCHAR(100)
)
BEGIN
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
    IF loc IS NULL OR loc = '' THEN
        SELECT 
            c.id, 
            c.name, 
            c.description, 
            c.logo, 
            c.location,
            (SELECT COUNT(*) FROM employeecaferelationship ecr WHERE ecr.cafeid = c.id) AS employees
        FROM cafe c
        ORDER BY employees DESC;
    ELSE
        SELECT 
            c.id, 
            c.name, 
            c.description, 
            c.logo, 
            c.location,
            (SELECT COUNT(*) FROM employeecaferelationship ecr WHERE ecr.cafeid = c.id) AS employees
        FROM cafe c
        WHERE c.location = loc
        ORDER BY employees DESC;
    END IF;
END