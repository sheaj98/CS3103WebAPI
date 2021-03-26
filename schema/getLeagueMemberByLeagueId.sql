DELIMITER //
DROP PROCEDURE IF EXISTS getLeag //

CREATE PROCEDURE getLeagueMembers(IN leagueId INT)
BEGIN
    SELECT * FROM LeagueMember where League_leagueId=leagueId;
END //
DELIMITER ;