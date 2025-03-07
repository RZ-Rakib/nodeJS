const express = require('express');

const app = express();

const port = 3030;

app.get("/home/user/:name/:age", (req, res) => {
    const {name, age} = req.params;
    const int_age = parseInt(age, 10);

    if (int_age >= 18){
        res.send(`Welcome ${name}, you're ${age} years old`);
    }else {
        res.send(`Hello ${name}, you're too young`)
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    
});