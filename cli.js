const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
    
});

function displayProducts() {
    console.log('\nProducts for Sale...')
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log('\n' + response[i].item_id + ": " + response[i].product_name + " $" + response[i].price + '\n')
        }
    })
}

function start() {
    displayProducts();
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;
        let responseArray = [];
        let priceArray = [];
        let quantityArray = [];
        for (var i = 0; i < response.length; i++) {
            responseArray.push(response[i].item_id);
            priceArray.push(response[i].price);
            quantityArray.push(response[i].stock_quantity)
        }
        inquirer
        .prompt({
                name: 'products',
                type: 'list',
                message: 'What would you like to purchase?',
                choices: responseArray
            })
            .then(function (answer) {
                let productId = answer.products;
                howMany();
                function howMany() {
                    inquirer
                    .prompt([
                            {
                                name: 'howMany',
                                type: 'input',
                                message: 'How many would you like?'
                            }
                        ])
                        .then(function (answer) {
                            let quantity = quantityArray[productId - 1] - answer.howMany;
                            function update(){
                                connection.query("UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: quantity
                                        },
                                        {
                                            item_id: productId
                                        }
                                    ],
                                    function (err, result) {
                                        if (err) throw err;
                                        //console.log(result.affectedRows + ' product updated...\n');
                                    }
                                );
                            };
                            if (answer.howMany > quantityArray[productId - 1]) {
                                howMany();
                            } else {
                                update();
                                console.log('\nYour total is: $' + priceArray[productId - 1] * answer.howMany + '\n');
                                connection.end();
                            }
                        })
                }
            })
    })
}
