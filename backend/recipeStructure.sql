CREATE DATABASE recipe_app;

USE recipe_app;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    recipe_description VARCHAR(900) NOT NULL,
    recipe_rating FLOAT NOT NULL,
    recipe_prepare_time INT NOT NULL,
    recipe_cook_time INT NOT NULL,
    recipe_total_time INT NOT NULL,
    recipe_image_url VARCHAR(250) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    recipe_id INT NOT NULL,
    ingredient_name VARCHAR(255) NOT NULL,
    ingredient_quantity VARCHAR(100) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
