var fs = require('fs');

/**
 * Writes contents into safetext file.
 * @param contents
 * @param fileOverride
 * @returns {Promise}
 */
var writeToFile = function(contents, fileOverride = null) {
    var file = fileOverride === null ? 'safetext' : `${process.cwd()}/safetext`;

    return new Promise(function(resolve, reject) {
        fs.writeFile(file, contents, function(err) {
            if(err) reject(err);
            resolve();
        });
    });
};

/**
 * Reads contents of file out.
 * @returns {Promise}
 */
var readFile = function(fileOverride = null) {
    var file = fileOverride === null ? 'safetext' : `${process.cwd()}/safetext`;

    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function (err,data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

module.exports = {
    writeToFile: writeToFile,
    readFile: readFile
};