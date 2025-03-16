const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers.js');

const app = express();
app.use(bodyParser.json()); // middleware body-parser

// Operate
app.get("/api/customers", query.getAllCustomers);
app.get("/api/customers/:id", query.getCustomerById);
app.post("/api/customers", query.addCustomer);
app.delete("/api/customers/:id", query.deleteCustomer);
app.put("/api/customers/:id", query.updateCustomer);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});