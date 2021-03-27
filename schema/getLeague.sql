DELIMITER //
DROP PROCEDURE IF EXISTS getLeague //

CREATE PROCEDURE getLeague(IN leagueIdIn INT)
BEGIN
  SELECT * FROM League where leagueId=leagueIdIn;
END //
DELIMITER ;
