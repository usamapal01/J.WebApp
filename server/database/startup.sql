-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-03-12 01:08:16.81
CREATE DATABASE IF NOT EXISTS test_db;


-- tables
-- Table: category
CREATE TABLE IF NOT EXISTS category (
    name varchar(50)  NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY (name)
);

-- Table: customer
CREATE TABLE IF NOT EXISTS customer (
    id int  NOT NULL AUTO_INCREMENT,
    full_name varchar(30)  NOT NULL,
    email varchar(30)  NOT NULL,
    phone varchar(11)  NOT NULL,
    enrollment_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sale_notification bool  NOT NULL,
    stock_notification bool  NOT NULL,
    CONSTRAINT customer_pk PRIMARY KEY (id)
);

-- alter statement
ALTER TABLE customer
ADD COLUMN date_created DATE NOT NULL,
ADD COLUMN time_created TIME NOT NULL;

-- customer table created by pal
CREATE TABLE `customer_notifications`.`customer` (
  `cust_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(12) NOT NULL,
  `sale_notification` TINYINT(1) NOT NULL,
  `newstock_notification` TINYINT(1) NOT NULL,
  PRIMARY KEY (`cust_id`, `phone_number`),
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE);

  -- customer_request table created by pal
  CREATE TABLE `customer_notifications`.`customer_request` (
  `request_id` INT NOT NULL AUTO_INCREMENT,
  `phone_number` VARCHAR(12) NOT NULL,
  `request_text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`request_id`),
  INDEX `fk_customer_request_customer_idx` (`phone_number` ASC),
  CONSTRAINT `fk_customer_request_customer`
    FOREIGN KEY (`phone_number`)
    REFERENCES `customer_notifications`.`customer` (`phone_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- Table: login
CREATE TABLE IF NOT EXISTS login (
    username varchar(20)  NOT NULL,
    password varchar(64)  NOT NULL,
    role varchar(20)  NOT NULL,
    email varchar(20)  NOT NULL,
    CONSTRAINT login_pk PRIMARY KEY (username,password)
);

-- Table: preference
CREATE TABLE IF NOT EXISTS preference (
    customer_id int  NOT NULL,
    category varchar(50)  NOT NULL,
    CONSTRAINT preference_pk PRIMARY KEY (customer_id,category)
);

-- foreign keys
-- Reference: Preferences_Categories (table: preference)
ALTER TABLE preference ADD CONSTRAINT Preferences_Categories FOREIGN KEY Preferences_Categories (category)
    REFERENCES category (name);

-- Reference: Preferences_Customer (table: preference)
ALTER TABLE preference ADD CONSTRAINT Preferences_Customer FOREIGN KEY Preferences_Customer (customer_id)
    REFERENCES customer (id);

-- End of file.