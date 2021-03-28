DELIMITER //
DROP PROCEDURE IF EXISTS createLeagueMember //

CREATE PROCEDURE createLeagueMember(IN userId INT, IN leagueId INT, IN role VARCHAR(100))
BEGIN
    INSERT INTO LeagueMember (User_userId, League_leagueId, role) VALUE (userId, leagueId, role);
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;