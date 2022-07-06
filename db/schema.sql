DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS player;
DROP DATABASE IF EXISTS blog_db;

CREATE DATABASE blog_db;

CREATE TABLE player (
    player_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_user_name VARCHAR(30) NOT NULL
);

CREATE TABLE items (
    items_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    items_name VARCHAR(30) NOT NULL,
    items_description TEXT
);

CREATE TABLE cards (
    card_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    card_prompts TEXT,
    item_id INTEGER,
    CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES items(items_id) ON DELETE SET NULL
);

