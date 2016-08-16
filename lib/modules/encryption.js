// Part of https://github.com/chris-rock/node-crypto-examples

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

/**
 * Encrypts *synchronously* text with a password.
 * @param text
 * @param password
 * @returns {*}
 */
function encrypt(text, password){
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * Decrypts *synchronously* given the encrypted text and a password.
 * @param text
 * @param password
 * @returns {*}
 */
function decrypt(text, password){
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};