const db = require('./dbconfig.js');

// Fetch all customers
const getAllCustomers  = (req, res) => {
    const query = {
        text: 'SELECT * FROM customers', 
    }

    db.query(query, (err, result) => {
        if (err) {
            console.error("Database query error", err.stack);
            return res.status(500).json({error: 'Internal server error'});
        }

        res.json(result.rows);
    });
};

// 	Fetch customer by id. Id is sent in the route parameter
const getCustomerById = (req, res) => {
    const customerID = req.params.id;
    if (!customerID) {
        return res.status(404).json({error: "Customer id required"});
    }
    const query = {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err) {
            console.error("Database query error", err.stack);
            return res.status(500).json({error: "Internal server error"});
        }
        if (result.rows.length === 0){
            return res.status(404).json({error: "Customer not found"});
        }

        res.status(200).json(result.rows[0]);
    });
};

// 	Add new customer- New customer is send inside the request body.
const addCustomer = (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
     if (!firstname || !lastname || !email || !phone) {
        return res.status(404).json({error: "Customers information required ( firstname, lastname, email, phone)"});
     }

    const query  = {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [firstname, lastname, email, phone],
    }
    db.query(query, (err, result) => {
        if (err) {
            console.error("Database query error", err.stack);
            return res.status(500).json({error: "Internal server error"});
        }

        res.status(201).json(result.rows[0]);
    });
};

//Delete customer by id. Id is sent in the route paramete
const deleteCustomer = (req, res) => {
    const deletionID = req.params.id;
    const query = {
        text: 'DELETE FROM customers WHERE id = $1 RETURNING *',
        values:[deletionID],
    }

    if (!deletionID) {
        return res.status(404).json({error: "Customer id requiured"});
    }

    db.query(query, (err, result) => {
        if (err) {
            console.error("Database query error", err.stack);
            return res.status(500).json({error: "Internal server error"});
        }
        if (result.rowCount === 0) {
            return res.status(404).json({error: "Customer not found"});
        }

        res.status(204).end();
    });
};

// Edit customer by id. Id is sent in the route parameter and updated customer inside the request body.
const  updateCustomer = (req, res) => {
    const updateID = req.params.id;
    const {firstname, lastname, email, phone} = req.body;
    const query = {
        text: 'UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5 RETURNING *',
        values: [firstname, lastname, email, phone, updateID]
    }

    if (!updateID) {
        return res.status(404).json({error: "Invalid customer id"});
    }

    db.query(query, (err, result) => {
        if (err) {
            console.error("Database query error", err.stack);
            return res.status(500).json({error: "Internal server error"});
        }
        if (result.rowCount === 0) {
            return res.status(404).json({error: "Customer not found"})
        }

        res.status(200).json(result.rows[0]);
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    updateCustomer,
};