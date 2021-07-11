const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
// import Routes
const authRoute = require('./routes/auth');
const cors = require('cors')

const app = express();
dotenv.config();

//db connect 
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) console.log(err);
    console.log("database is connected");
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Referer");
    next();
});

//middelware
app.use(express.json())

//Routh Midelware
app.use('/api/user', authRoute);

const port = process.env.PORT || 300
app.listen(port, () => {
    console.log(`port ${port}`)
})