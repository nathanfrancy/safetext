# safetext
Node module allowing you to more safely store and use strings in node apps.

## What's the point?
Storing, managing, accessing, etc. passwords is hard. Wouldn't it be great if there was a tool that allowed you to keep them in one place, safely?

`safetext` is a tool that does not only that, but provides facilities for your app to access these passwords easily, without causing you headache.

The whole idea here is that most of the time you have connection string variables, access tokens or keys, or other sensitive text that would be super convenient to store and access in plain text, but you really shouldn't do that per security best practices.

`safetext` allows you to create one file in your current working directory, that stores all of these for you, encrypted in json format. You first initialize the file, and can interact with it (adding, getting, removing, etc.) values. Once this is done, you are free to check the file into version control, and you will have access to these keys in your application using the `safetext` library.

## What's the catch?
The bummer about this, is you still end up with one "master" password that everything can be accessed with. You still need to handle/protect this with care as anyone with it could decrypt your safetext file and get your private data.

## Setting Up
Install this package globally:

```bash
npm install safetext --global
```

If you install `safetext` globally, it will be symlinked into your system, and you'll have access to it from anywhere in your file system.

### Create the safetext file

```bash
cd /path/to/your/project
safetext init <master password>
```

You should see a `safetext` file in your working directory now. Keep the password in a safe place. Once you create this file, it's almost impossible to decrypt the file without the master.

### Add a key
This should show you a success message. If so, your key value is now added to the store.

```bash
safetext add <key> <value> <master password>
```

### Get contents
This will print out all the contents of the file, decrypted. Assuming you provide the correct master password.

```bash
safetext get-all <master password>
```

### Get value by key
This will do the same thing as above, but will only print one value out depending on which key you give it. This is case sensitive and will error if you give it a key that isn't in the object. You obviously have to provide the correct password too.

```bash
safetext get <key> <master password>
```

### Remove a value by key
This will read from the safetext file, remove the provided key value out (if it exists), and give you a success message.

```bash
safetext remove <key> <master password>
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

You can read up on how to interact with the `safetext` api below.

## API
Please refer to the below documentation on how to interact with the `safetext` api. All of these functions return promises.

### `init( <master password> )`

### `getContents( <master password> )`

### `getKey( <key>, <master password> )`

### `writeKey( <key>, <value>, <master password> )`

### `removeKey( <key>, <master password> )`

### `changePassword( <master password>, <new password>, <new password confirm> )`