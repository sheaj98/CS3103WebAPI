DELIMITER //
DROP PROCEDURE IF EXISTS getLeagueMembers //

CREATE PROCEDURE getLeagueMembers(IN leagueId INT)
BEGIN
    SELECT * FROM LeagueMember INNER JOIN User ON LeagueMember.User_userId = User.userId WHERE LeagueMember.League_leagueId = leagueId;
END //
DELIMITER ;