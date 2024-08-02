CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employees_by_cafe_sp`(
    IN cafeId VARCHAR(36)
)
BEGIN
    SELECT e.id, e.name, e.emailAddress, e.phoneNumber, e.gender, 
           ec.startDate, c.id AS cafeId, c.name AS cafeName,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    INNER JOIN employeecaferelationship ec ON e.id = ec.employeeId
    INNER JOIN cafe c ON c.id = ec.cafeId
    WHERE (c.id = cafeId OR cafeId IS NULL OR '')
    ORDER BY daysWorked DESC;
END