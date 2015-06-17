var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var dbConfig = require('./server/config/dbConfig.js');
var beersController = require('./server/controllers/beersController');
var mongoose = require('mongoose');

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use('/libs/', express.static(__dirname + '/public/libs/'));
app.use('/js/', express.static(__dirname + '/public/js/'));
app.use('/css/', express.static(__dirname + '/public/css/'));
app.use('/img/', express.static(__dirname + '/public/img/'));
app.use('/views/', express.static(__dirname + '/public/views/'));


//REST API
app.get('/api/beers', beersController.getAll);
app.post('/api/beers', beersController.addBeer);
app.delete('/api/beers', beersController.removeBeer);

app.listen(3000, function () {
    console.log("Server running in http://localhost:3000...");
});


mongoose.connect(dbConfig.url, function (err) {
  if (err) {
	  console.log ('ERROR connecting to: ' + dbConfig.url + '. ' + err);
  } else {
	  console.log ('Succeeded connected to: ' + dbConfig.url);
	  if (dbConfig.includeInitData){
		  beersController.checkIfEmpty(dbConfig);
	  }
  }
});

/**var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(dbConfig.url, function(err, db) {
  if(!err) {
    console.log("DB connected!");
  }
	else{
		console.error("Error connecting to db");
	}
});*/