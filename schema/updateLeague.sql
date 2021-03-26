DELIMITER //
DROP PROCEDURE IF EXISTS updateLeague //

CREATE PROCEDURE updateLeague(IN leagueIdIn INT, IN leagueNameIn VARCHAR(200), IN formatIdIn VARCHAR(200))
BEGIN
     UPDATE League SET name=leagueNameIn, LeagueFormat_leagueFormatId=formatIdIn WHERE leagueId=leagueIdIn;
END //
DELIMITER ;