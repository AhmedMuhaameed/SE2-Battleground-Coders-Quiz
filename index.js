var express = require('express');
var todoController = require('./controllers/quizController');
const mongoose = require('mongoose');

var app = express();
//set up template engine
app.set('view engine', 'ejs');

//static files
app.use( express.static('./public'));

// connect to mongodb
mongoose.connect('mongodb://localhost/quizdb');
mongoose.Promise = global.Promise;

//fire controllers
todoController(app);

//listen to port 3000
var port = 3000
app.listen(port);
console.log('You are listening to port ' + port);