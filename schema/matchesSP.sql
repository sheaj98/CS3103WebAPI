-- -----------------------------------------------------
-- Stored Procedures for LeagueFormat
-- -----------------------------------------------------

-- create
DELIMITER //
DROP PROCEDURE IF EXISTS createMatch //

CREATE PROCEDURE createMatch(IN leagueIdIn int)
BEGIN
INSERT INTO `Match` (League_leagueId) VALUES
   (leagueIdIn);
   SELECT LAST_INSERT_ID();
END//
DELIMITER ;

-- delete
DELIMITER //
DROP PROCEDURE IF EXISTS deleteMatch //

CREATE PROCEDURE deleteMatch(IN matchIdIn INT)
BEGIN
DELETE FROM `Match` 
    WHERE matchId = matchIdIn;
END//
DELIMITER ;


-- get
DELIMITER //
DROP PROCEDURE IF EXISTS getMatchById //

CREATE PROCEDURE getMatchById(IN matchIdIn INT)
BEGIN
SELECT * FROM `Match` 
    WHERE matchId = matchIdIn;
END//
DELIMITER ;

-- getForLeague
DELIMITER //
DROP PROCEDURE IF EXISTS getMatchesForLeague //

CREATE PROCEDURE getMatchesForLeague(IN leagueId INT)
BEGIN
SELECT * FROM `Match` 
    WHERE League_leagueId = leagueId;
END//
DELIMITER ;

-- getForUser