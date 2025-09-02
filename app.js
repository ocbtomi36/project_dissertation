require("dotenv").config({path: '.env'});
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const loacationRoutes = require('./routes/locationRoutes');

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'OPTIONS ,GET ,POST , PUT , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/cars',carRoutes);
app.use('/locations',loacationRoutes);

app.use((error, req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});
const port = process.env.PORT;

app.listen(port);