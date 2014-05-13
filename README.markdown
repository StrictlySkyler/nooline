# What's It All About?
Nooline is a platform built for making content management utterly, starkly simple.  It supports multiple users and multiple sites right out of the box.
It's scalable, fast, extensible, and written entirely in JavaScript.

It is currently in a "stable alpha" development phase.

## Content Management is Dead, Long Live Content Management
The era of page redirects, mandatory admin dashboards, and content "previews" is over.  Today's content demands that we be able to edit content where it exists on a page, as it looks when it's live, without barriers.  It demands that we shouldn't sacrifice SEO concerns for rich, asyncronous web interactions.  It demands that the framework shouldn't require a learning curve.

An efficient framework doesn't need to sacrifice good architecture for extensibility or user experience, and vice-versa.

Our time is too important to be mucking around with a framework's specific details.  We should be creating new things instead.

## The Principles
There is a core set of principles which guide how Nooline is built:
- There should be a near-zero amount of training time required to let a content editor use the platform. All controls should be blatantly self-evident in use, and naming conventions should be painstakingly easy to understand.
- Don't refresh the page or go to a new one unless it's 100% unavoidable.  Maintain the user's context if at all possible.
- Modifying the system should require minimal amounts of work.  Store data in simple structures.
- Share code between client and server where possible.  This will keep the codebase smaller and lead to better technical design.
- Push as much work to the client as is reasonably possible. This must not impact user experience.
- Build components with "Offline-First" in mind.  Follow that with "Mobile-First".  Finally, address wider screens.
For a related and simple set of informing guidelines, see The [Unix Philosophy](http://en.wikipedia.org/wiki/Unix_philosophy).

## How It Works
Nooline is built Isomorphically – that is to say, much of its code can execute both on in the browser and on the server.  It follows patterns found in many MV* frameworks, and relies upon a core set of components with wide-spread community use.
Under the hood, Nooline uses a simple, extensible stack: Express, Backbone, and RequireJS.

## Want to contribute?
The following things are officially on the list of things which need doing, in no particular order:

- Abstract the Timeline into a plugin
- Create a plugin-management panel
- Add behavior for editing and creating sites
- Enable content creation on a page which has none currently
- Finer grain edited controls (added vs. edited, preview, etc.)
- Wire up widgets for user creation and management
- User roles & permissions
- Published/Unpublished for snippets
- Better timeout & security checks
- Broadcast events when content is loading at various points
- Content editing incrementing bug

## ✌
