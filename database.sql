DROP DATABASE IF EXISTS bloodbank;
CREATE DATABASE bloodbank;
USE bloodbank;

CREATE TABLE donar (
	donar_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    address VARCHAR(20),
    contact VARCHAR (10),
    bloodtD VARCHAR(10)
);

CREATE TABLE blood (
	blood_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bloodtV VARCHAR(20),
    location VARCHAR(20),
    donar_id INTEGER NOT NULL,
    FOREIGN KEY (donar_id) REFERENCES donar (donar_id) ON DELETE CASCADE
);