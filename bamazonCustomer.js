// Require packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// Connect to the database
connection.connect(function (err) {
    if (err) throw err;
});

function start() {

    // Displaying all products from the database  (need to be prettier!)    
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        console.log('----------------------------------------------------------------------------------------------------')
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " +
                "Product: " + results[i].product_name + " | " +
                "Department: " + results[i].department_name + " | " +
                "Price: " + results[i].price + " | " +
                "QTY: " + results[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }

        // Prompt user for item and quantity
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "Enter the ID of the item you would like to purchase:",
                    validate: function (value) {
                        if (isNaN(value) === false && (value < 11)) {    
                            return true;
                        }
                        return false;
                    } 
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Enter the number of items you would like to purchase:",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                let itemSelected = answer.item - 1;
                let productName = results[itemSelected].product_name;
                let itemQuantity = answer.quantity;
                let finalCost = results[itemSelected].price * itemQuantity;

                // If stock is available, print cost of purchase
                if (itemQuantity < results[itemSelected].stock_quantity) {
                    console.log("Your total for " + itemQuantity + " x '" + productName + "' is: $" +
                    finalCost.toFixed(2));

                // Update the database based on user purchase
                    connection.query("UPDATE products SET ? WHERE ?",
                        [{stock_quantity: results[itemSelected].stock_quantity - itemQuantity },
                        {item_id: results[itemSelected].item_id }],
                        function (err, results) {
                            if (err) throw err;
                        });
                    connection.end();
                // If not enough stock, notify user
                } else {
                    console.log("Unfortunately, there is not enough stock.")
                    connection.end();

                }
            })
    });
}

start();
