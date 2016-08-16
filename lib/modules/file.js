var fs = require('fs');

var writeToFile = function(contents) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('safetext', contents, function(err) {
            if(err) reject(err);
            resolve();
        });
    });
};

var readFile = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('safetext', 'utf8', function (err,data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

module.exports = {
    writeToFile: writeToFile,
    readFile: readFile
};