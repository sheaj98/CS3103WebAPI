DELIMITER //
DROP PROCEDURE IF EXISTS updateResult //

CREATE PROCEDURE updateResult(IN resultIdIn INT, IN matchId INT, IN pointsIn INT, IN userId INT)
BEGIN
     UPDATE Result SET Match_matchId=matchId, points=pointsIn, User_userId=userId WHERE resultId=resultIdIn;
END //
DELIMITER ;