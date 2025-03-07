const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

// // routing
// app.get("/about", (req, res) => {
// res.send(`About us`);
// })


// // routing paramters
// app.get("/home/user/:name/:age", (req, res) => {
//     res.send(`Welcome ${req.params.name}, you're ${req.params.age} years old`)
// });


// // send response in the data endpoint as the JSON formart
// app.get("/home/user/", (req, res) => {
//     // send the object in the request response in JSOn format
//     res.json({username: 'Rakib', age: 23, city: "Lappeenranta"});
// })

app.get("/home/user/:name/:age", (req, res) => {
    const {name, age} = req.params;
    const int_age = parseInt(age, 10);

    if(int_age >= 18) {
        res.send(`Welcome ${name}, you're ${age} years old`);
    }else {
        res.send(`Hello ${name}, you're too young`);
    }
});
app.listen(port, hostname, () => {
    console.log(`Server is listening at http://localhost:${port}/`);
});

