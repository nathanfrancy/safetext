var fs = require('fs');

/**
 * Writes contents into safetext file.
 * @param contents
 * @returns {Promise}
 */
var writeToFile = function(contents) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('safetext', contents, function(err) {
            if(err) reject(err);
            resolve();
        });
    });
};

/**
 * Reads contents of file out.
 * @returns {Promise}
 */
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