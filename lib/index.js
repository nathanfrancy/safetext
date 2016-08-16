var file = require('./modules/file');
var encryption = require('./modules/encryption');

/**
 * Make a new safetext file with encrypted contents.
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
 * Read object out of safetext, must include master password.
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function getContents(masterPassword) {
    return file.readFile().then(function(encryptedContents) {
        var contents = encryption.decrypt(encryptedContents, masterPassword);
        return JSON.parse(contents);
    });
}

/**
 * Get a specific key value from safetext file.
 * @param key
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function getKey(key, masterPassword) {
    return getContents(masterPassword).then(function(contents) {
        if (contents[key] != undefined) return contents[key];
        else throw new Error(`Unable to find key '${key}' in password safe.`);
    });
}

module.exports = {
    init: init,
    getContents: getContents,
    getKey: getKey
};