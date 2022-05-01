DROP DATABASE IF EXISTS todos_db;
CREATE DATABASE todos_db;
USE todos_db;

CREATE TABLE todos (
    id INT AUTO_INCREMENT,
    title VARCHAR(100),
    task VARCHAR(255) NOT NULL,
    color VARCHAR(15),
    date TIMESTAMP,
    is_completed TINYINT default 0,
    is_blacklist TINYINT default 0,
    PRIMARY KEY (id)
);