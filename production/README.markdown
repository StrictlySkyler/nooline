## What is nooline?

It’s a content management system focused on making managing content
drop-dead simple, super-extra easy. The goal of the platform is to
reduce the time it takes not only to push out new content, but also
update and modify the platform itself to be used in a new context.

## A note on pronunciation

When talking about “\\nooline”, I always tend to pronounce it
phonetically, as in “NEW-line”, and its eponymous character. It’s worth
calling out, however, that there could be a case made for calling it
“NO-align”, as the name is common in structure to [“noosphere”][], and
indeed the idea for the project was influenced by that concept and [Eric
Raymond’s article][] about it.

All of that said, pronunciation isn’t so big a deal as to pick a nit
over it.

## Another CMS? WTF.

There are plenty of other CMS platforms out in the wild today, and even
a few running on node.js (which \\n runs on also), but none that hit
quite the right sweet spot for my taste. Having worked on a number of
these over the years, and being possessed of a desire to dive into and
learn new tech, I decided I’d scratch my particular itch myself.

\\n will attempt to do things that those platforms are unable to
accomplish due to technical reasons, lack of support, divergence in
philosophy, or any number of other reasons.

## The Philosophy

There is a core set of principles which guide my development with \\n.
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
4.  ***As few dependencies as possible* should be needed to stand up and
run and instance.** The platform should remain as agnostic as
possible with regards to other frameworks and modules, and the
number of tightly-coupled platforms should be kept to a minimum.
5.  **The End User Experience is *never* compromised to due technical
challenges.** This is the most important part, and it includes web
admins, content editors, and developers as End Users.

For a related and simple set of informing guidelines, see [The Unix
Philosophy][].

## How it works

\\n is built on a straight node.js stack, and is independent of any
specific frameworks. It is built using html5, CSS3, and JavaScript,
transmits and stores its data in JSON and flat text files, and defers as
much work as is possible on the back-end to the operating system’s
native capabilities. All content loading, updating, and creating is done
via AJAX, and html snapshots are taken to provide support for those web
bots that don’t do it themselves, or aren’t headless browsers.

*"But AJAX means that search bots won't do anything, and SEO is out the window!  No way!"*

Not entirely true.  By providing snapshots of a completed HTML page, gathered by a headless browser, we can still provide all the SEO goodness that any other page might have otherwise.  (Google is already doing this, FWIW; their bot renders the whole page as if it was a browser anyway.)

The following are key components of the \\n stack:

### node.js

The asynchronous, fast, JavaScript-based environment of node seemed like
an obvious choice for this platform. Sharing code between client and
server brings the potential to make plugins rapidly and quickly, and
reduces the level of effort or number of people required to modify the
system. Where possible, keeping node as the primary server-side tech is
ideal.

### html5 & Modern Browsers

There’s really no reason not to use html5 nowadays, in my opinion. :-)
There are plenty of polyfills available for anyone who wants to include
out-of-date browsers. The core of \\n, however, should stay current with
the latest browsers, and leave dinosaurs to become extinct where
applicable.

### Straight-up JS

Frameworks are excellent. You should use one. \\n doesn’t advocate any
one framework in favor of another; this choice should be left up to the
development team. For this reason, any plugins/extensions/core-parts
should be agnostic to any given framework.

## Theoretical Applications

In theory, much of \\n could be ported to another framework outside of
node (apache, nginx, etc.), or paired with different code (php, java,
etc.). If this means providing a better user experience than the
existing platform \\n would be replacing, then by all means it’s a win.

## Firing it up

The entry point to the app is the `nooline.js` file, and it takes a single argument, which is the port on which \\n should run.  `sudo` where appropriate.  You can also output to logs using `stdin` and `stdout`.  For example:

    node nooline.js 8888 1>>debug.log 2>>error.log

The above code will start \n running on port 8888, while outputting to text log files.

The `start.sh` script automatically does this for port 80 (remember to `sudo`):

    sudo ./start.sh

Right now, \\n only runs on POSIX-compliant systems, as I haven't added the ability to check for a Windows file structure yet.  This is an easy fix, for you folks running Windows, in that all you'll need to do is change the paths to reflect your environment.

## Want to contribute?

The following things are officially on the list of things which need
doing:
-   Add a WYSIWYG
-   Flesh out the Admin Control Panel
-   Create finer grain “edit statuses” (added vs. edited, preview, etc.)
-   Add user roles & permissions
-   Build better security checks
-   Implement a drop-dead simple, super extra easy plugin system
-   Implement cluster in node
-   Add periodic HTML snapshotting, rather than at startup
-   Rename process (once working in Mac OS)

Head on over to [the github repo][] and submit a pull request!

✌

[“noosphere”]: http://en.wikipedia.org/wiki/Noosphere
[Eric Raymond’s article]: http://www.catb.org/~esr/writings/homesteading/homesteading/
[The Unix Philosophy]: http://en.wikipedia.org/wiki/Unix_philosophy
[the github repo]: https://github.com/StrictlySkyler/nooline
