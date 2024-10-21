-- Create the library database
CREATE DATABASE library;

-- Use the library database
USE library;

-- Create the login table
CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert sample values into the login table
INSERT INTO login (email, password) VALUES ('abc@example.com', 'pass123');
INSERT INTO login (email, password) VALUES ('def@example.com', 'pass456');
INSERT INTO login (email, password) VALUES ('hij@example.com', 'pass789');


-- Create a table to store available books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- Create a table to store user borrowed books
CREATE TABLE borrowed_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Insert sample books into the books table
INSERT INTO books (title, image) VALUES
('The Girl on the Train', 'path/to/Book1.png'),
('Sherlock Holmes', 'path/to/Book2.png'),
('War and Peace', 'path/to/Book3.png'),
('It Ends With Us', 'path/to/Book4.png');

-- Insert borrowed books for a user
-- Example: Assuming user_id 1 borrowed book with ID 1
INSERT INTO borrowed_books (user_id, book_id) VALUES
(1, 1);  -- User ID 1 borrowed Book ID 1
