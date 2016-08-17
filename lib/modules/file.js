var fs = require('fs');

/**
 * Writes contents into safetext file.
 * @param contents
 * @param fileOverride
 */
var writeToFile = function(contents, fileOverride = null) {
    var file = fileOverride === null ? 'safetext' : `${process.cwd()}/safetext`;
    fs.writeFileSync(file, contents);
};

/**
 * Reads contents of file out.
 * @param fileOverride
 */
var readFile = function(fileOverride = null) {
    var file = fileOverride === null ? 'safetext' : `${process.cwd()}/safetext`;
    return fs.readFileSync(file, 'utf8');
};

module.exports = {
    writeToFile: writeToFile,
    readFile: readFile
};