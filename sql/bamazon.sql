 DROP DATABASE IF EXISTS bamazon_db;

 CREATE DATABASE bamazon_db;
 USE bamazon_db;

 CREATE TABLE products (
   item_id INT NOT NULL AUTO_INCREMENT,
   product_name VARCHAR(100),
   department_name VARCHAR(60),
   price DECIMAL(10,4) NOT NULL,
   stock_quantity INT(4) NOT NULL,
   PRIMARY KEY (item_id)
 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nicoge Custom Nicolas Cage Pillowcase Standard Size", "Home & Kitchen", "5.59", "500"), 
("Tonsil You're Swell Designer Plush Figure", "Toys & Games", 22.99, 200),
("The Bobcat Mullet", "Toys & Games", 10.19, 750),
("Wallmonkeys Asia Old Man Wall Decal Peel and Stick Graphic", "Home & Kitchen", 21.96, 100),
("Images You Should Not Masturbate To", "Books", 9.95, 50),
("Suture Pad with Wounds Kit", "Health, Household & Baby Care", 19.95, 75),
("Red Rooster G String", "Clothing, Shoes & Jewlery", 13.99, 1000),
("Edible Anus Milk Belgian Chocolate Gift", "Health, Household & Baby Care", 10.18, 10),
("Rubie's Pet Costume Afro Curly Wig", "Pet Supplies", 9.88, 125),
("Set Of Five Finger Hands Finger Puppets", "Toys & Games", 5.84, 800)

