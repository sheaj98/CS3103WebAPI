DELIMITER //
DROP PROCEDURE IF EXISTS registerUser //

CREATE PROCEDURE registerUser(IN emailIn VARCHAR(200), IN firstNameIn VARCHAR(200), IN lastNameIn VARCHAR(200))
BEGIN
    INSERT INTO User (email, firstName, lastName, profileImageUrl, isActive) VALUE (emailIn, firstNameIn, lastNameIn, '', 1);
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;