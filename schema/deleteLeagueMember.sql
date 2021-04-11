DELIMITER //
DROP PROCEDURE IF EXISTS deleteLeagueMember //

CREATE PROCEDURE deleteLeagueMember(IN userIdIn INT, IN leagueIdIn INT)
BEGIN
    DELETE FROM LeagueMember WHERE User_userId=userIdIn AND League_leagueId=leagueIdIn;
END //
DELIMITER ;