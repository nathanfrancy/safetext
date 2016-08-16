#! /usr/bin/env node
var safetext = require('.');

var userArgs = process.argv.slice(2);
var command = userArgs[0];

if (command == undefined) {
    console.log("No command entered for safetext.");
} else {
    command = command.toString('utf-8');
    var password = null,
        key = null,
        value = null;

    // TODO: Validation here. For now, just use the plugin correctly. :)
    switch(command) {

        case 'init':
            safetext.init(userArgs[1].toString('utf-8'), {});
            break;

        case 'get-all':
            password = userArgs[1].toString('utf-8');

            safetext.getContents(password).then(function (contents) {
                console.log(contents);
            }).catch(function (err) {
                console.log(err);
            });
            break;

        case 'get':
            key = userArgs[1].toString('utf-8');
            password = userArgs[2].toString('utf-8');

            safetext.getKey(key, password).then(function (value) {
                console.log(value);
            }).catch(function (err) {
                console.log(err);
            });
            break;

        case 'add':
            key = userArgs[1].toString('utf-8');
            value = userArgs[2].toString('utf-8');
            password = userArgs[3].toString('utf-8');

            safetext.writeKey(key, value, password).then(function () {
                console.log(`Key '${key}' added.`);
            }).catch(function (err) {
                console.log(err);
            });
            break;

        case 'remove':
            key = userArgs[1].toString('utf-8');
            password = userArgs[2].toString('utf-8');

            safetext.removeKey(key, password).then(function () {
                console.log(`Key '${key}' removed.`);
            }).catch(function (err) {
                console.log(err);
            });
            break;

        case 'change-password':
            password = userArgs[1].toString('utf-8');
            new1 = userArgs[2].toString('utf-8');
            new2 = userArgs[3].toString('utf-8');

            safetext.changePassword(password, new1, new2).then(function () {
                console.log('Password successfully changed.');
            }).catch(function (err) {
                console.log(err);
            });
            break;

        default:
            console.log("The command entered is not part of this plugin.");
    }
}