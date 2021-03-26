DELIMITER //
DROP PROCEDURE IF EXISTS getLeaguesForUser //

CREATE PROCEDURE getLeaguesForUser(IN userIdIn INT)
BEGIN
    SELECT League_leagueId FROM LeagueMember where User_userId=userIdIn;
END //
DELIMITER ;