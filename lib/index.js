var file = require('./modules/file');
var encryption = require('./modules/encryption');

init('password', { hello: 'world' }).then(function() {
    return getContents('password');
}).then(function(contents) {
    console.log(contents);
});

function init(masterPassword, map) {
    var fileContents = JSON.stringify(map);
    var encryptedFileContents = encryption.encrypt(fileContents, masterPassword);
    return file.writeToFile(encryptedFileContents);
}

function getContents(masterPassword) {
    return file.readFile().then(function(encryptedContents) {
        var contents = encryption.decrypt(encryptedContents, masterPassword);
        return JSON.parse(contents);
    });
}

module.exports = {
    init: init
};