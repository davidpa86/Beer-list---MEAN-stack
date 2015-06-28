var fs = require("fs");

module.exports = function(Beer) {
    var module = {};

    module.includeInit = function(file) {
        fs.readFile(file, "utf8", function(error, data) {
            var beers = JSON.parse(data);
            var fnOnSave = function(err, result) {
                if (err) {
                    console.log("Error adding " + beers[i] + " " + err);
                } else {
                    console.log("Added " + result);
                }
            };
            for (var i = 0; i < beers.length; ++i) {
                var beer = new Beer(beers[i]);
                beer.save(fnOnSave);
            }
        });
    };

    module.writeFile = function(destPath) {
        Beer.find({}, function(err, results) {
            if (!err) {
                fs.writeFile(destPath, results, "utf8", function() {
                    console.log("File created!");
                });
            }
        });
    };

    return module;
};