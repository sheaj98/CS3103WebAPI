DELIMITER //
DROP PROCEDURE IF EXISTS deleteLeague //

CREATE PROCEDURE deleteLeague(IN leagueIdIn INT)
BEGIN
    DELETE FROM League WHERE leagueId=leagueIdIn;
END //
DELIMITER ;