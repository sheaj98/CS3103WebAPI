DELIMITER //
DROP PROCEDURE IF EXISTS createLeague //

CREATE PROCEDURE createLeague(IN leagueNameIn VARCHAR(200), IN descriptionIn VARCHAR(2000), IN leagueFormatIdIn INT)
BEGIN
    INSERT INTO League (name, description, LeagueFormat_leagueFormatId) VALUE (leagueNameIn, descriptionIn, leagueFormatIdIn);
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;