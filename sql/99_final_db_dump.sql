-- database update script
-- #1 creates user table and inserts the data from user_home table
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE
) AS
SELECT
  DISTINCT username,
  email
FROM
  user_home;

-- #2 creates home table and inserts the data from user_home table
DROP TABLE IF EXISTS `home`;

CREATE TABLE `home` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) NOT NULL UNIQUE,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) AS
SELECT
  DISTINCT street_address,
  state,
  zip,
  sqft,
  beds,
  baths,
  list_price
FROM
  user_home;

-- #3 creates user, home relation table
DROP TABLE IF EXISTS `user_home_rel`;

CREATE TABLE `user_home_rel` (
  `user_id` INT,
  `home_id` INT,
  PRIMARY KEY (user_id, home_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (home_id) REFERENCES home(id) ON DELETE CASCADE
);

-- #4 inserts data from user_home table
INSERT INTO
  user_home_rel (user_id, home_id)
SELECT
  user.id AS user_id,
  home.id AS home_id
FROM
  user
  JOIN user_home ON user_home.username = user.username
  JOIN home ON user_home.street_address = home.street_address;

-- #5 deletes the user_home table 
DROP TABLE IF EXISTS `user_home`;

ALTER TABLE
  `user`
ADD
  `created_at` TIMESTAMP,
ADD
  `last_updated` TIMESTAMP;


ALTER TABLE
  `home`
ADD
  `created_at` TIMESTAMP,
ADD
  `last_updated` TIMESTAMP;