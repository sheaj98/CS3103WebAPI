-- -----------------------------------------------------
-- Table `ssulliv2`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`User` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `profileImageUrl` VARCHAR(45) NULL,
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isActive` TINYINT(1) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))


-- -----------------------------------------------------
-- Table `ssulliv2`.`LeagueFormat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`LeagueFormat` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`LeagueFormat` (
  `leagueFormatId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`leagueFormatId`),
  UNIQUE INDEX `leagueFormatId_UNIQUE` (`leagueFormatId` ASC))


-- -----------------------------------------------------
-- Table `ssulliv2`.`League`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`League` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`League` (
  `leagueId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `LeagueFormat_leagueFormatId` INT NOT NULL,
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`leagueId`),
  UNIQUE INDEX `leagueId_UNIQUE` (`leagueId` ASC),
  INDEX `fk_League_LeagueFormat_idx` (`LeagueFormat_leagueFormatId` ASC),
  CONSTRAINT `fk_League_LeagueFormat`
    FOREIGN KEY (`LeagueFormat_leagueFormatId`)
    REFERENCES `ssulliv2`.`LeagueFormat` (`leagueFormatId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- -----------------------------------------------------
-- Table `ssulliv2`.`Match`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`Match` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`Match` (
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `League_leagueId` INT NOT NULL,
  `matchId` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_Match_League1_idx` (`League_leagueId` ASC),
  PRIMARY KEY (`matchId`),
  UNIQUE INDEX `matchId_UNIQUE` (`matchId` ASC),
  CONSTRAINT `fk_Match_League1`
    FOREIGN KEY (`League_leagueId`)
    REFERENCES `ssulliv2`.`League` (`leagueId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- -----------------------------------------------------
-- Table `ssulliv2`.`Result`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`Result` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`Result` (
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resultId` INT NOT NULL,
  `Match_matchId` INT NOT NULL,
  `points` INT NOT NULL,
  `User_userId` INT NOT NULL,
  PRIMARY KEY (`resultId`),
  INDEX `fk_Result_Match1_idx` (`Match_matchId` ASC),
  INDEX `fk_Result_User1_idx` (`User_userId` ASC),
  CONSTRAINT `fk_Result_Match1`
    FOREIGN KEY (`Match_matchId`)
    REFERENCES `ssulliv2`.`Match` (`matchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Result_User1`
    FOREIGN KEY (`User_userId`)
    REFERENCES `ssulliv2`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- -----------------------------------------------------
-- Table `ssulliv2`.`LeagueMember`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssulliv2`.`LeagueMember` ;

CREATE TABLE IF NOT EXISTS `ssulliv2`.`LeagueMember` (
  `lastModified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_userId` INT NOT NULL,
  `League_leagueId` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`User_userId`, `League_leagueId`),
  INDEX `fk_User_has_League_League1_idx` (`League_leagueId` ASC),
  INDEX `fk_User_has_League_User1_idx` (`User_userId` ASC),
  CONSTRAINT `fk_User_has_League_User1`
    FOREIGN KEY (`User_userId`)
    REFERENCES `ssulliv2`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_League_League1`
    FOREIGN KEY (`League_leagueId`)
    REFERENCES `ssulliv2`.`League` (`leagueId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
