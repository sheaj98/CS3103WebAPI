-- -----------------------------------------------------
-- Stored Procedures for LeagueFormat
-- -----------------------------------------------------

DELIMITER //
DROP PROCEDURE IF EXISTS createLeagueFormat //

CREATE PROCEDURE createLeagueFormat(IN nameIn varchar(50), IN descriptionIn varchar(50))
BEGIN
INSERT INTO LeagueFormat (name, description) VALUES
   (nameIn, descriptionIn);
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS getAllLeagueFormats //

CREATE PROCEDURE getAllLeagueFormats()
BEGIN
SELECT * FROM LeagueFormat;
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS getLeagueFormatById //

CREATE PROCEDURE getLeagueFormatById(in leagueFormatIdIn INT)
BEGIN
SELECT * FROM LeagueFormat
    WHERE leagueFormatId = leagueFormatIdIn;
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS deleteLeagueFormat //

CREATE PROCEDURE deleteLeagueFormat(in leagueFormatIdIn INT)
BEGIN
DELETE FROM LeagueFormat
    WHERE leagueFormatId = leagueFormatIdIn;
END//
DELIMITER ;