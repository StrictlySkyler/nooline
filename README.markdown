## What is nooline?

It’s a content management system focused on making managing content
drop-dead simple, super-extra easy. The goal of the platform is to
reduce the time it takes not only to push out new content, but also
update and modify the platform itself to be used in a new context.

## Another CMS? WTF.

There are plenty of other CMS platforms out in the wild today, and even
a few running on node.js (which nooline runs on also), but none that hit
quite the right sweet spot for my taste. Having worked on a number of
these over the years I decided I’d scratch my particular itch myself.

Nooline will attempt to do things that those platforms are unable to
accomplish due to technical reasons, lack of support, divergence in
philosophy, or any number of other reasons.

## The Philosophy

There is a core set of principles which guide my development with nooline.
They are:

1.  **There should be a *near-zero* amount of training time required to
let a content editor use the platform.** All controls should be
blatantly self-evident in use, and naming conventions should be
painstakingly easy to understand. Don’t refresh the page or go to a
new one unless it’s 100% unavoidable.
2.  **Editing and modifying the system should require *minimal* amounts
of work.** Where possible, share code between client and server, and
rely upon native functionality within browsers or node. Store data
in simple structures.
3.  **Push as much work to the *client* as is reasonably possible.**
JavaScript engines in clients are blazingly fast. Save the server
the work, and let the client do as much of it as it can. This should
not compromise the end user experience.
4.  **The End User Experience is *never* compromised to due technical
challenges.** This is the most important part, and it includes web
admins, content editors, and developers as End Users.

For a related and simple set of informing guidelines, see [The Unix
Philosophy][].

## How it works

Nooline is built on a node.js stack using Express. It is built using html5, CSS3, and JavaScript, transmits and stores its data in JSON and flat text files, which are stored and versioned through git.  Most of the work is done on in the browser.

Nooline uses isomorphic javascript to address the needs of web bots, SEO, and RSS, rendering an html page with all necessary content, into which the client-side framework then enables rich features.

### node.js

The asynchronous, fast, JavaScript-based environment of node seemed like
an obvious choice for this platform. Sharing code between client and
server brings the potential to make plugins rapidly and quickly, and
reduces the level of effort or number of people required to modify the
system. Where possible, keeping node as the primary server-side tech is
ideal.

### html5 & Modern Browsers

There’s really no reason not to use html5 nowadays. :-)  There are plenty of polyfills available for anyone who wants to include
out-of-date browsers. The core of nooline, however, should stay current with
the latest browsers, and leave dinosaurs to become extinct where
applicable.  Rawr.

## Theoretical Applications

In theory, much of nooline could be ported to another framework outside of
node (apache, nginx, etc.), or paired with different code (php, java,
etc.). If this means providing a better user experience than the
existing platform nooline would be replacing, then by all means it’s a win.

## Firing it up

The entry point to the app is the `nooline.js` file, and it takes a single argument, which is the port on which nooline should run.  `sudo` where appropriate.

    node nooline.js

The above code will start \n running on port 3000, while outputting to text log files.

For port 80, try:

    node nooline.js -p 80

## Want to contribute?

The following things are officially on the list of things which need
doing:
-   ~~Add a WYSIWYG~~
-   Flesh out the Admin Control Panel
-   Create finer grain “edit statuses” (added vs. edited, preview, etc.)
-   Add user roles & permissions
-   Build better security checks, including credential checking on POST
-   Implement a drop-dead simple, super extra easy plugin system
-   ~~Implement cluster in node~~
-   ~~Add periodic HTML snapshotting, rather than at startup~~
-   Rename process

Fork the repo and submit a pull request!

✌

[“noosphere”]: http://en.wikipedia.org/wiki/Noosphere
[Eric Raymond’s article]: http://www.catb.org/~esr/writings/homesteading/homesteading/
[The Unix Philosophy]: http://en.wikipedia.org/wiki/Unix_philosophy
[the github repo]: https://github.com/StrictlySkyler/nooline
