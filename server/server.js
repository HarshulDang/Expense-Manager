//server/server.js

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var dbRoute = 'mongodb://user:user123@ds119113.mlab.com:19113/expense_manager';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect(dbRoute, { useNewUrlParser: true } );

var db = mongoose.connection;

//check connection
db.once('open',function() {
    console.log('connected to mongodb: ');
});

// check for DB errors
db.on('error', function(err) {
    console.log('db error: ', err);
}); 

app.use('/', router);


module.exports=app;