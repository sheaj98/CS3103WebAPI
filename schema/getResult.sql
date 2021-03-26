DELIMITER //
DROP PROCEDURE IF EXISTS getResult //

CREATE PROCEDURE getResult(IN resultIdIn INT)
BEGIN
    SELECT * FROM Result WHERE resultId=resultIdIn;
END //
DELIMITER ;