DELIMITER //
DROP PROCEDURE IF EXISTS updateUser //

CREATE PROCEDURE updateUser(IN userIdIn INT, IN firstNameIn VARCHAR(200), IN lastNameIn VARCHAR(200), IN profileUrlIn VARCHAR(500), IN isActiveIn BOOLEAN)
BEGIN
    UPDATE User SET firstName=firstNameIn, lastName=lastNameIn, profileImageUrl=profileUrlIn, isActive=isActiveIn WHERE userId=userIdIn;
END //
DELIMITER ;
