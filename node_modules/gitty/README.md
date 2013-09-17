# Gitty

Gitty is a Node.js wrapper for the Git CLI. It's syntax closely resembles the Git command line syntax to asynchronously execute common commands, and parses the output into operable objects - depending on the call.

## Prerequisites

* Node.js 0.8.x (http://nodejs.org)
* Git 1.7.x.x (http://git-scm.com)
* Mac OSX or Linux-based System

## Installation

```
$ npm install gitty
```

**Note**: If you encounter an error during installation on Mac OSX, make sure you have the XCode Command Line Tools installed. Gitty depends on **pty.js** for authenticated operations - which requires GCC compiler.

1. Go to the App store and download the latest version of Xcode for free.
2. Install Xcode (the app store actually downloads the "installer" for Xcode)
3. Start Xcode
4. Go to Preferences
5. Go to Downloads
6. Click on the "install" button after "Command Line Tools"
7. Reboot

## Usage

First, require Gitty.

```javascript
var git = require('gitty');
```

The "meat" of the functionality is encapsulated in instances of a `Repository` object. This object is instantiated with the path to the repository you wish to perform actions on.

```javascript
var myRepo = git('/path/to/repo');
// sugar for --> new git.Repository('/path/to/repo');
```

Now you can call this instance of `Repository`'s methods. For example, to execute `git log` for `myRepo`, you would do:

```javascript
myRepo.log(function(err, log) {
	if (err) {
		// handle error
	} else {
		// do something with `log`	
	}
});
```

A complete list of the available methods is below, as well as other Gitty functions.

## Potential Use Cases

* Writing an exception logger with more insight
* Building a web based Git client
* Integrating automated deployments

## Documentation

### Repository(path)

Creates an instance of `gitty.Repository` from the given `path`. Each instance contains the following properties and has access to the following methods.

#### Repository.graph(callback) - **NEW IN 1.2.1!!!**

Passes a 2-dimensional array to the callback containing data that can be consumed by a UI for generating a network graph

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, graph_data)`

#### Repository.isRepository

**Type**: `Boolean`

Based on the existence of the `.git/` directory under the instance `path`.

#### Repository.name

**Type**: `String`

Directory name of the instantiated `Repository`.

#### Repository.path

**Type**: `String`

Normalized copy of the instance `path`.

#### Repository.init(callback, flags)

Initializes the directory as a Git repository.

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

**flags**
* Type: `Array`
* Description: Command flags like `['--bare','--shared']`

#### Repository.log(callback, useSync)

Passes commit history as array to callback. Optionally do this this synchronously - not recommended

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, log)`

#### Repository.status(callback)

Passes a status object into the callback

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, status)`

#### Repository.add(files, callback, useSync)

Stages the passed array of files for commit. Optionally do this this synchronously - not recommended

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.remove(files, callback)

Removes the passed array of files for commit

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.unstage(files, callback)

Removes passed array of files from staging area

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.commit(message, callback, useSync)

Commits the current staged files. Optionally do this this synchronously - not recommended

**message**
* Type: `String`
* Description: Commit message

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, output)`

#### Repository.branches(callback)

Passes object denoting current branch and array of other branches

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, branches)`

#### Repository.branch(name, callback)

Creates a new branch from the given branch name

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.checkout(branch, callback)

Performs checkout on given branch

**branch**
* Type: `String`
* Description: Name of the branch to checkout

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, branches)`

#### Repository.merge(branch, callback)

Performs a merge of the current branch with the specified one

**branch**
* Type: `String`
* Description: Name of the branch to merge into current

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.remote.add(name, url, callback)

Adds a new remote

**name**
* Type: `String`
* Description: Name of the remote to add

**url**
* Type: `String`
* Description: URL to set for the new remote

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.remote.setUrl(name, url, callback)

Changes url of an existing remote

**name**
* Type: `String`
* Description: Name of the remote to edit

**url**
* Type: `String`
* Description: URL to set for the existing remote

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.remote.remove(name, callback)

Removes the specified remote

**name**
* Type: `String`
* Description: Name of the remote to remove

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err)`

#### Repository.remote.list(callback)

Passes key-value pairs to callback formatted: `remote : url`

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, remotes)`

#### Repository.push(remote, branch, callback, creds)

Pushes the specified branch to the specified remote

**remote**
* Type: `String`
* Description: Name of the remote to push to

**branch**
* Type: `String`
* Description: Name of the branch to push

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, success)`

**creds** (optional)
* Type: `Object`
* Description: Formatted as `{ user : 'username', pass : 'password' }`

> **Note:** This method does not use an instance of `Command()`, see *Authenticated Repositories*

#### Repository.pull(remote, branch, callback, creds)

Pulls the specified branch from the specified remote

**remote**
* Type: `String`
* Description: Name of the remote to pull from

**branch**
* Type: `String`
* Description: Name of the branch to pull

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, success)`

**creds** (optional)
* Type: `Object`
* Description: Formatted as `{ user : 'username', pass : 'password' }`

> **Note:** This method does not use an instance of `Command()`, see *Authenticated Repositories*

#### Repository.reset(hash, callback)

Resets the repository's HEAD to the specified commit and passes commit log to callback

**hash**
* Type: `String`
* Description: Commit hash identifier to rest to

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, log)`

### Command(path, operation, flags, options)

Creates an instance of `gitty.Command` from the given arguments. This is constructor is used primarily internally, for executing `Repository` methods, however, it is exposed - see *Extending Gitty*. Each instance contains the following properties and has access to the following methods.

#### Command.repo

**Type**: `String`

Directory path for the instantiated `Command` object

#### Command.command

**Type**: `String`

Assembled command string based on the instantiated `operation`, `flags`, and `options`

#### Command.exec(callback)

Executes a `child_process` by the instance's `command` property in the directory specified by the instance's `path` property

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, stdout, stderr)`

> **Note:** This is a wrapper for Node's `child_process.exec` that, first, validates the path as a Git repository before execution. If the path fails validation, an `Error` will be thrown.

### config(key, value, callback)

Does global Git configuration

**key**
* Type: `String`
* Description: Name of configuration property to set

**value**
* Type: `String`
* Description: Value to set to the named configuration property

**callback** (optional)
* Type: `Function`
* Description: Receives argument(s): `(err)`

### clone(path, url, callback, creds)

Clones the repository at `url` into the specified `path`

**path**
* Type: `String`
* Description: Path to directory to clone into

**url**
* Type: `String`
* Description: Url of the Git repository to clone

**callback**
* Type: `Function`
* Description: Receives argument(s): `(err, success)`

**creds** (optional)
* Type: `Object`
* Description: Formatted as `{ user : 'username', pass : 'password' }`

> **Note:** This method does not use an instance of `Command()`, see *Authenticated Repositories*

## Authenticated Repositories

One challenge that was faced while developing Gitty was performing any authenticated operations. Since OpenSSH does not read input from `stdin` for authentication, but rather a psuedo-terminal - Gitty uses *pty.js* (<https://github.com/chjj/pty.js/>) to spawn a pseudo-terminal for operations that may require authentication, such as `pull`, `push`, and `clone`.

Credentials are always passed as the last argument and are optional. Below is an example of an authenticated `Repository.push()`.

```javascript
// do authenticated push to origin
myRepo.push('origin', 'master', function(err, succ) {
	if (err) {
		console.log(err);
	} else {
		console.log(succ);
	}
}, {
	user : 'username',
	pass : 'password'
});
```

This format is consistent for all authenticated operations. Keep this in mind if you are extending Gitty with an operation that requires authentication, and be sure to read the pty.js documentation.

## Extending Gitty

Almost all of the `Repository` methods are simply convenience wrappers around instances of `Command`. This makes extending the `Repository` constructor with custom methods easy as pie! Let's run through a quick example. Let's say we want to add a method for creating a new branch and automatically switching to it. What do we need to do?

1. Extend the `Repository` prototype
2. Create a new instance of `Command`
3. Parse the output and pass to a callback

Three steps is all it should take to add a new method to the `Repository` constructor, and below is how you might do it.

```javascript
// require gitty
var git = require('gitty');

// create new prototype endpoint
// we want to pass a branch name and callback into this method
git.Repository.prototype.branchAndCheckout = function(name, callback) {

	// save the scope of the repository
	var repo = this
	// create a new instance of Command
	  , cmd = new git.Command(repo.path, 'checkout', ['-b'], name);
	  
	// execute the command and determine the outcome
	cmd.exec(function(error, stdout, stderr) {
		var err = error || stderr;
		
		// call the callback function in the repository scope
		// passing it err and stdout
		callback.call(repo, err, stdout);
	});
};
```

It's a simple as that. Now you would be able to use this custom method in your application, like so:

```javascript
myRepo.branchAndCheckout('myBranch', function(err, data) {
	if (err) {
		// throw error
	} else {
		console.log(data);
	}
});
```

## The Output Parser

The output parser is simply a collection of functions that accept the string output of an executed command, and turn it into something that can be operated on. For example, the output from `git log` gets converted to an array of object-literals before being returned back to the callback for `Repository.log()`. 

## Contributing

One of the reasons I have tried to make Gitty so easy to extend is, well, because I want you to extend it! It is not a wrapper for every possible Git operation, but it most certainly could be, and with minimal coding too! Contributions are always welcome and encouraged. However, to keep Gitty clean and healthy, before making additions consider the following:

1. Does my addition follow the conventions already in place?
2. Does my code belong where I have placed it?
3. Does my syntax resemble the Git CLI?

If you can answer "yes" to these 3 questions, then send a pull request!

## Author
Gitty was written by Gordon Hall (gordon@gordonwritescode.com)  
Licensed under MIT license