const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const quiz = require('./routes/quiz');
const key = require('./config');

const app = express()

mongoose
    .connect(key.mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log(`connected to database`)
    })
    .catch(err => {
        console.log(err)
    })

mongoose.Promise = global.Promise

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', quiz)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})