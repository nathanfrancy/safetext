var safetext = require('./../lib');

safetext.init('password', { hello: 'world' }).then(function() {
    return safetext.getContents('password');
}).then(function(contents) {
    console.log(contents);
    return safetext.getKey('hello', 'password');
}).then(function(value) {
    console.log(value);
}).catch(function(err) {
    console.log(err);
});