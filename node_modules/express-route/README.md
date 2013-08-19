# express-route

express-route is a library that let you organize the routes for the express applications.

## Features

* single method API to read and apply the routes
* ability to read routes synchronously or asynchronously
* versatile format of the route definition to support all cases

## Usage

Firstly, you need to define the routes. The route can be a function, an object or an array of objects. They can be in one file or in many files.

The simplest definition may look like this:

```javascript
module.exports = {
	'/home': function (req, res, next) {
		res.end('Hello!');
	}
};
```

This definition is simply translated to the following code:

```javascript
app.get('/', function (req, res, next) {
	res.end('Hello!');
});
```

`get` is a default HTTP method. You can change it using an object definition:

```javascript
module.exports = {
	'/home': {
		methods: ['post'],
		fn: function (req, res, next) {
			res.end('Hello!');
		}
	}
};
```

To apply the routes to the express application you need to call `route` with valid parameters:

```javascript
var route = require('express-route');

// app is a reference to the express application
// './routes' is a path to the directory with the routes
// the third parameter is a configuration object
route(app, './routes', {
	// retrieve routes synchronously
	sync: true,

	// action to invoke when route is marked as restricted: true
	ensureRestriction: function (req, res, next) {
		if (!user.authorized()) {
			res.status(403).end('Forbidden');
			return;
		}
		next();
	}
});
```

## Route definition examples

The definition of the route may be slightly more complicated:

```javascript
'use strict';

module.exports = {

	// route with restricted setting on

	'/user': {
		fn: function (req, res) {
			res.end('user');
		},
		restricted: true
	},

	// route that accepts several methods

	'/user/categories': {
		fn: function (req, res) {
			res.end('method ' + req.method + ' post #' + req.params.id);
		},
		methods: ['get', 'post']
	},

	// several actions with different HTTP methods for one route

	'/user/posts/:id': [
		{
			fn: function (req, res) {
				res.end('method ' + req.method + ' post #' + req.params.id);
			},
			restricted: true,
			methods: ['get', 'delete']
		},
		{
			fn: function (req, res) {
				res.end('method ' + req.method + ' post #' + req.params.id);
			},
			restricted: true,
			methods: ['post']
		}
	]
};
```

## API

#### **`route(app: Object, path: String, settings: Object)`**

Apply routes to the express application.

* `app` - reference to the express application,
* `path` - path to the folder or the file with the routes,
* `settings` - a configuration object,
	* `sync: Boolean` - whether the load of the routings is synchronous or not (optional, `true` by default),
	* `ensureRestriction: Function` - middleware which check if the request is authenticated (optional, by default it's a function that accepts all requests),
	* `ext: Array` - array with valid file extensions, e.g. `['.route']` (optional, `['.js']` by default).




