DELIMITER //
DROP PROCEDURE IF EXISTS createLeague //

CREATE PROCEDURE createLeague(IN leagueNameIn VARCHAR(200), IN leagueFormatIdIn INT)
BEGIN
    INSERT INTO League (name, LeagueFormat_leagueFormatId) VALUE (leagueNameIn, leagueFormatIdIn);
END //
DELIMITER ;