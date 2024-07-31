CREATE DEFINER=`root`@`localhost` PROCEDURE `update_cafe_sp`(
    IN p_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_description TEXT,
    IN p_logo VARCHAR(255),
    IN p_location VARCHAR(255)
)
BEGIN
    UPDATE Cafe
    SET Name = p_name,
        Description = p_description,
        Logo = p_logo,
        Location = p_location
    WHERE Id = p_id;
END