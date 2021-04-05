DELIMITER //
DROP PROCEDURE IF EXISTS getLeaguesForUser //

CREATE PROCEDURE getLeaguesForUser(IN userIdIn INT)
BEGIN
    SELECT League.leagueId, League.name, League.LeagueFormat_leagueFormatId, League.lastModified FROM League INNER JOIN LeagueMember ON LeagueMember.League_leagueId = League.leagueId WHERE LeagueMember.User_userId = userIdIn;
END //
DELIMITER ;