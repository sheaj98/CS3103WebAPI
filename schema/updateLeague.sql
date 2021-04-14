DELIMITER //
DROP PROCEDURE IF EXISTS updateLeague //

CREATE PROCEDURE updateLeague(IN leagueIdIn INT, IN leagueNameIn VARCHAR(200), IN leagueDescriptionIn VARCHAR(2000))
BEGIN
     UPDATE League SET name=leagueNameIn, description=leagueDescriptionIn WHERE leagueId=leagueIdIn;
END //
DELIMITER ;