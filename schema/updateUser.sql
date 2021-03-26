DELIMITER //
DROP PROCEDURE IF EXISTS updateUser //

CREATE PROCEDURE updateUser(IN userIdIn INT, IN firstNameIn VARCHAR(200), IN lastNameIn VARCHAR(200), IN profileUrlIn VARCHAR(500))
BEGIN
    UPDATE User SET firstName=firstNameIn, lastName=lastNameIn, profileImageUrl=profileUrlIn WHERE userId=userIdIn;
END //
DELIMITER ;