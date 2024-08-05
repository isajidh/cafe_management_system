CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cafes_sp`(
	IN loc VARCHAR(100)
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