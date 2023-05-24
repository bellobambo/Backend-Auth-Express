const mongoose = require("mongoose");


mongoose
    .connect("mongodb+srv://bellobambo21:bambo@cluster0.rpf4jyq.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to database")
    }).catch(() => {
        console.log('unable to connect to database')
    })

