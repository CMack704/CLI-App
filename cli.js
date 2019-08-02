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
    connection.end();
});

function displayProducts() {
    console.log('Coming right up...')
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log('\n' + response[i].item_id + " " + response[i].product_name + " $" + response[i].price)
        }
    })
}

function start() {
    displayProducts();
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;
        let responseArray = [];
        let priceArray = [];
        for (var i = 0; i < response.length; i++) {
            responseArray.push(response[i].item_id);
            priceArray.push(response[i].price)
        }
        inquirer
            .prompt({
                name: 'products',
                type: 'list',
                message: 'What would you like to purchase?',
                choices: responseArray
            })
            .then(function(answer){
                console.log(answer.products)

                let productId = answer.products;
                inquirer
                    .prompt([
                        {
                            name: 'howMany',
                            type: 'input',
                            message: 'How many would you like?'
                        }
                    ])
                    .then(function(answer) {
                        console.log('Your total is: $' + priceArray[productId - 1] * answer.howMany)
                    })
            })
    })
}
