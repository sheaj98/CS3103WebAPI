DELIMITER //
DROP PROCEDURE IF EXISTS getResultsForUser //

CREATE PROCEDURE getResultsForUser(IN userIdIn INT)
BEGIN
    SELECT * FROM Result WHERE User_userId=userIdIn;
END //
DELIMITER ;