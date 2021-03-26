DELIMITER //
DROP PROCEDURE IF EXISTS createResult //

CREATE PROCEDURE createResult(IN matchId INT, IN pointsIn INT, IN userId INT)
BEGIN
    INSERT INTO Result (Match_matchId, points, User_userId) VALUE (matchId, pointsIn, userId);
END //
DELIMITER ;