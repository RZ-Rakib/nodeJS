const express = require('express');

const app = express();
app.use(express.json()); // middleware library body-parser(POST and PUT)

let customers = [
  {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
  {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
  {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// Fetch all customers by /api/customers/ endpoint
app.get("/api/customers", (req, res) => {
    res.json(customers);
})

// Fetch customer by id.ID is sent to the route parameter
app.get("/api/customers/:id", (req, res) => {
    const customer_id = req.params.id;

    const selected_customer = customers.filter(customer => customer.id === customer_id);

    if(selected_customer.length > 0){
        res.status(200).json(selected_customer);
    }else {
        res.status(404).json({message: "Customer not found"});
    }
})

// 	Add a new customer - New customer is send inside the request body.
app.post("/api/customers", (req, res) => {
    // extract the customer from req body and generate new id
    const new_customer = {'id': Date.now().toString(), ...req.body};
    
    customers = [...customers, new_customer];
    res.status(200).json(customers);
})

// 	Delete customer by id. Id is sent in the route parameter
app.delete("/api/customers/:id", (req, res) => {
    const deletion_id = req.params.id;

    // filter the customer who's id is not match and store it
    const filtered_customer = customers.filter(customer => customer.id !== deletion_id);

    if(customers.length === filtered_customer.length){
        res.status(404).json({message: "No movie found"});
    }
    customers = filtered_customer;
    res.status(200).json(customers);
})

// 	Edit customer by id. Id is sent in the route parameter and updated customer inside the request body.
app.put("/api/customers/:id", (req, res) => {
    const updateable_id = req.params.id;
    const updated_customer = {'id': updateable_id, ...req.body};

    // find the index number of updateable customer
    const index = customers.findIndex(customer => customer.id === updateable_id);

    if (index === -1) {
        res.status(404).json({message: "Customer not found "});
    }
    customers.splice(index, 1, updated_customer);
    res.status(200).json(updated_customer);
})


const port = 3000;
const hostname = "localhost";
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
    
})