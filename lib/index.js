var file = require('./modules/file');
var encryption = require('./modules/encryption');

/**
 *
 * @param masterPassword
 * @param map
 * @returns {Promise.<TResult>}
 */
function init(masterPassword, map) {
    var fileContents = JSON.stringify(map);
    var encryptedFileContents = encryption.encrypt(fileContents, masterPassword);
    return file.writeToFile(encryptedFileContents);
}

/**
 *
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function getContents(masterPassword) {
    return file.readFile().then(function(encryptedContents) {
        var contents = encryption.decrypt(encryptedContents, masterPassword);
        return JSON.parse(contents);
    });
}

module.exports = {
    init: init,
    getContents: getContents
};