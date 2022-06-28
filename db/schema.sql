CREATE TABLE player (
    player_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_user_name VARCHAR(30) NOT NULL
);

CREATE TABLE cards (
    card_id INTEGER PRIMARY KEY,
    card_prompts description TEXT,
    items_id INTEGER FOREIGN KEY,
);

CREATE TABLE items (
    items_id INTEGER,
    items_name VARCHAR(30),
    items_description description TEXT,    
)