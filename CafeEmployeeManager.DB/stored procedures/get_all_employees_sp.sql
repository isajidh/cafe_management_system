CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_employees_sp`()
BEGIN
    SELECT e.id, e.name, e.gender, e.emailAddress, e.phoneNumber,
           ec.startDate, c.id AS cafeId, c.name AS cafeName,
           DATEDIFF(CURDATE(), ec.startDate) AS daysWorked
    FROM employee e
    LEFT JOIN employeecaferelationship ec ON e.id = ec.employeeId
    LEFT JOIN cafe c ON c.id = ec.cafeId
    ORDER BY daysWorked DESC;
END