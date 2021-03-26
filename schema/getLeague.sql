DELIMITER //
DROP PROCEDURE IF EXISTS getLeaguesForUser //

CREATE PROCEDURE getLeaguesForUser(IN leagueIdIn INT)
BEGIN
  SELECT * FROM League where leagueId=leagueIdIn;
END //
DELIMITER ;