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
    file.writeToFile(encryptedFileContents);
}

/**
 * Read object out of safetext, must include master password.
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function getContents(masterPassword) {
    var encryptedContents = file.readFile();
    try {
        var contents = encryption.decrypt(encryptedContents, masterPassword);
        return JSON.parse(contents);
    } catch(err) {
        console.log(err);
        throw new Error("Error reading file contents. This most likely means the provided password is wrong.");
    }
}

/**
 * Returns an array of key values in the safetext file.
 * @param masterPassword
 * @returns
 */
function getKeys(masterPassword) {
    var encryptedContents = file.readFile();
    try {
        var contents = JSON.parse(encryption.decrypt(encryptedContents, masterPassword));
        return contents.keys();
    } catch(err) {
        console.log(err);
        throw new Error("Error reading file contents. This most likely means the provided password is wrong.");
    }
}

/**
 * Get a specific key value from safetext file.
 * @param key
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function getKey(key, masterPassword) {
    var contents = getContents(masterPassword);
    if (contents[key] != undefined) return contents[key];
    else throw new Error(`Unable to find key '${key}' in password safe.`);
}

/**
 * Writes a key to the safetext file.
 * @param key
 * @param value
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function writeKey(key, value, masterPassword) {
    var contents = getContents(masterPassword);
    contents[key] = value;
    var fileContents = JSON.stringify(contents);
    var encryptedFileContents = encryption.encrypt(fileContents, masterPassword);
    file.writeToFile(encryptedFileContents);
}

/**
 * Removes a key from the safetext password file.
 * @param key
 * @param masterPassword
 * @returns {Promise.<TResult>}
 */
function removeKey(key, masterPassword) {
    var contents = getContents(masterPassword);
    if (contents[key] != undefined) delete contents[key];

    var fileContents = JSON.stringify(contents);
    var encryptedFileContents = encryption.encrypt(fileContents, masterPassword);
    file.writeToFile(encryptedFileContents);
}

/**
 * Changes the password of the safetext file.
 * @param masterPassword
 * @param newPassword1
 * @param newPassword2
 */
function changePassword(masterPassword, newPassword1, newPassword2) {
    if (newPassword1 !== newPassword2) throw new Error("New passwords must match.");
    else {
        var contents = getContents(masterPassword);
        init(newPassword1, contents);
    }
}

module.exports = {
    init: init,
    getContents: getContents,
    getKey: getKey,
    writeKey: writeKey,
    removeKey: removeKey,
    changePassword: changePassword
};