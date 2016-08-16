var safetext = require('./../lib');

safetext.init('password', { hello: 'world' }).then(function() {
    return safetext.getContents('password');
}).then(function(contents) {
    console.log(contents);
});