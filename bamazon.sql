DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamins", "Health", 10, 100), ("XBox One X", "Electronics", 400, 20), ("TV", "Electronics", 600, 50), ("Protein", "Health", 20, 500), ("MIcrowave", "Kitchen", 120, 80),
 ("Coffee Table", "Furniture", 100, 35), ("Computer Desk", "Furniture", 250, 5), ("Towels", "Bath", 15, 300), ("IPhone", "Electronics", 750, 300), ("Plates", "Kitchen", 50, 800);