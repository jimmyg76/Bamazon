// Require packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password01",
    database: "bamazon_db"
});

// Connect to the database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);

        inquirer
            .prompt([
                {
                    name: "item",
                    message: "Select an item",
                    type: "list",
                    choices: function () {
                        var productsArray = [];
                        for (let i = 0; i < results.length; i++) {
                            productsArray.push(results[i].product_name);
                        }
                        return productsArray;
                    }
                },
                {
                    name: "quantity",
                    message: "Enter the number of items to purchase",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then


    });
}
