var Beer = require("../models/beer");
var beersFileController = require('../controllers/beersFileController')(Beer);

module.exports = {
    //get All beers
    getAll: function(req, res) {
        Beer.find({}, function(err, results) {
            res.json(results);
        });
    },

    addBeer: function(req, res) {
        var beer = new Beer(req.body);
        beer.save(function(err, results) {
            console.log("Adding beer... " + results);
            res.json(results);
        });
    },

    removeBeer: function(req, res) {
        var name = req.params.name;
        Beer.remove({
            name: name
        }, function(err, results) {
            console.log("Removing beer... " + name);
            res.json(results);
        });
    },

    checkIfEmpty: function(dbConfig) {
        Beer.find({}, function(err, results) {
            if (results.length === 0) {
                console.log("DB is empty, let's add some init data...");
                beersFileController.includeInit(dbConfig.initDataFile);
            } else {
                console.log("There are " + results.length + " beers in the DB");
            }
        });

        //Only used if needed:
        //beersFileController.writeFile(dbConfig.initDataFile);
    }
};