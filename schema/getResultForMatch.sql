DELIMITER //
DROP PROCEDURE IF EXISTS getResultsForMatch //

CREATE PROCEDURE getResultsForMatch(IN matchIdIn INT)
BEGIN
    SELECT * FROM Result WHERE Match_matchId=matchIdIn;
END //
DELIMITER ;