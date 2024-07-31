CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cafes_sp`(
	IN loc VARCHAR(100)
)
BEGIN
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