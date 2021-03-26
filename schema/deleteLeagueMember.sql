DELIMITER //
DROP PROCEDURE IF EXISTS deleteLeagueMemeber //

CREATE PROCEDURE deleteLeagueMember(IN userIdIn INT)
BEGIN
    DELETE FROM LeagueMember WHERE User_userId=userIdIn;
END //
DELIMITER ;