DELIMITER //
DROP PROCEDURE IF EXISTS createUser //

CREATE PROCEDURE createUser(IN emailIn VARCHAR(200), IN firstNameIn VARCHAR(200), IN lastNameIn VARCHAR(200))
BEGIN
    INSERT INTO User (email, firstName, lastName, profileImageUrl, isActive) VALUE (emailIn, firstNameIn, lastNameIn, "", 0);
END //
DELIMITER ;