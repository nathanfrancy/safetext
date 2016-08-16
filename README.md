# safetext
Node module allowing you to more safely store and use strings in node apps.

## What's the point?
Storing, managing, accessing, etc. passwords is hard. Wouldn't it be great if there was a tool that allowed you to keep them in one place, safely?

`safetext` is a tool that does not only that, but provides facilities for your app to access these passwords easily, without causing you headache.

The whole idea here is that most of the time you have connection string variables, access tokens or keys, or other sensitive text that would be super convenient to store and access in plain text, but you really shouldn't do that per security best practices.

`safetext` allows you to create one file in your current working directory, that stores all of these for you, encrypted in json format. You first initialize the file, and can interact with it (adding, getting, removing, etc.) values. Once this is done, you are free to check the file into version control, and you will have access to these keys in your application using the `safetext` library.

For the command line tool for `safetext`, please visit here: [safetext-cmd](https://www.npmjs.com/package/safetext-cmd)

## What's the catch?
The bummer about this, is you still end up with one "master" password that everything can be accessed with. You still need to handle/protect this with care as anyone with it could decrypt your safetext file and get your private data.

## Setting Up
Install this package into your project:

```bash
npm install safetext --save
```

### Create the safetext file
Initialize a safetext file with a master password.

```
safetext.init( <master password> ).then(...)
```

Note: after you execute this, you should see a `safetext` file in your working directory. Keep the master password in a safe place. Once you create this file, it's almost impossible to decrypt the file without the master.

## API
Please refer to the below documentation on how to interact with the `safetext` api. All of these functions return promises.

### Get contents

```javascript
safetext.getContents( <master password> ).then(...)
```

### Get keys

```javascript
safetext.getKeys( <master password> ).then(...)
```

### Add a key

```javascript
safetext.writeKey( <key>, <value>, <master password> ).then(...)
```

### Get value by key

```javascript
safetext.getKey( <key>, <master password> ).then(...)
```

### Remove a value by key

```javascript
safetext.removeKey( <key>, <master password> ).then(...)
```

### Change master password

```javascript
safetext.changePassword( <master password>, <new password>, <new password confirm> ).then(...)
```

## Using in your app
Once you've created your `safetext` file in your project, it's ready to use in your application.

You can access the contents of your file through the `safetext` api like this:

```javascript
var safetext = require('safetext');

safetext.getContents('pw').then(function(safestore) {
  console.log(safestore);
}).catch(function(err) {
  console.log(err);
});
```

Note: `getContents` returns a promise, so you will have to access the contents with the callback you provide to the `then` function.