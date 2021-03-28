DELIMITER //
DROP PROCEDURE IF EXISTS getLeagueMember //

CREATE PROCEDURE getLeagueMember(IN userId INT, IN leagueId INT)
BEGIN
    SELECT * FROM LeagueMember where League_leagueId=leagueId AND User_userId=userId;
END //
DELIMITER ;