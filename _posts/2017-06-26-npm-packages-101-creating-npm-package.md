---
layout: post
title: 'NPM packages 101: Creating npm package'
date: '2017-06-26T11:52:00.000+02:00'
author: Jakub Podlaha
lang: en
tags:
- npm
- package
- publish
- javascript
- typescript
modified_time: '2017-06-26T11:55:25.385+02:00'
cloudinary_src: posts/2017-06-26-npm-packages-101-creating-npm-package__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4829889913533734686
blogger_orig_url: http://blog.fragaria.cz/2017/06/npm-packages-101-creating-npm-package.html
---

Going down the path of node package creator - guide to create npm
package and publish it to npm
repository.

{% include figure.html cloudinary_src='posts/2017-06-26-npm-packages-101-creating-npm-package__1.jpg' caption='Tim Gouw' %}

As I couldn’t find any Javascript package for handling [Czech and Slovak
National identification
number](https://en.wikipedia.org/wiki/National_identification_number#Czech_Republic_and_Slovakia),
aka *rodné číslo*, I’ve decided to publish my own. As this was my first
time going down the path of npm package maintainer, I’d like to share
how it feels these days.

## NVM to the rescue

Before diving into the package creation I’d like to recommend
[nvm](https://github.com/creationix/nvm), a tool for managing separate
node versions/environments on your local computer. I especially like it
for storing my global npm packages like [yeoman](http://yeoman.io/) or
even npm itself under `~/.nvm/...` directories and not under
`/usr/lib/node_modules` which I like to keep simple and
su-rights-protected.

{% highlight shell %}
# install nvm
nvm install node
nvm use node
{% endhighlight %}

Ok, nvm is installed let's dive into package creation.

## Creating package from scratch? No. Yo\!

Shall I use ES5? ES6? ES7? Babel? Coffeescript? Typescript? How to
configure them?
What version of compiler? Why the heck are we compiling Javascript
anyway?
Shall I use `import` or `require`?
And what's this badge ![generator-np build
status](https://img.shields.io/travis/kub1x/rodnecislo.svg)?
Automated building? Cool, how do I configure it?
And how about test framework? And mocks?\!
Wait and what license should i choose?\!

You got it. Creating a npm package is a process of overwhelming amount
of decisions. Decisions someone else must’ve already undertaken. And
luckily some of them shared their effort in a form of [yeoman
generator](http://yeoman.io/generators/).

## So let’s generate the package

At the time of starting my package the
[generator-np](https://github.com/d4rkr00t/generator-np) seemed
promising, though it is a bit out of date today: ![generator-np
issues](https://img.shields.io/github/issues/d4rkr00t/generator-np.svg).
It solved most of the questions above for me. As written in the
description of the generator:

> Generator for npm module with ES6+,
> [Babel](https://github.com/babel/babel),
> [Ava](https://github.com/sindresorhus/ava),
> [ESlint](https://github.com/eslint/eslint),
> [Travis](https://travis-ci.org/), and npm scripts

So we'll write ES6 javascript, babel compilled, ava tested and use
travis for CI.
Now let's have an empty github repo
[`kub1x/rodnecislo`](https://github.com/kub1x/rodnecislo) cloned in
`rodnecislo` directory and start the generator as follows:


{% highlight shell %}
git clone git@github.com:kub1x/rodnecislo.git
cd rodnecislo
nvm use node
npm install -g yeoman generator-np
yo np
{% endhighlight %}

The generator-np still asks some questions, which need to be answered.
Following are my answers and the reasoning behind them.

**What is the URL of your
website?**`https://kub1x.github.io/rodnecislo/`
Go to [github pages](https://pages.github.com/), scroll under the video
tutorial, click “Project page” and follow the instructions. Your url
will have this form:
`https://your_user_name.github.io/your_repo_name/`

**Do you need .travis.yml?***Yes.*
Got to [Travis-ci](https://travis-ci.org/). Create an account. Enable
for your github repository. Get emails whenever you push to master
something, that breaks your build, lint or tests.

**Do you need setup for coveralls?***Yes.*
You don’t need to do anything (except writing your tests...) to see
beautiful visualisation of your test coverage on your [coveralls
page](https://coveralls.io/github/kub1x/rodnecislo).

**Do you need setup for commitizen?***Yes.*
It feels really neat to have standardized format of commit messages.
Better for cooperation, readability, confidence, automated tools...
simply better. Using commitizen you basically do `git cz` and follow a
short wizard instead of doing `git commit -m “some messy message”`. The
resulting message looks like this: `build(travis): Add node version 7 to
.travis.yml`.
See [commitizen page](http://commitizen.github.io/cz-cli/) on how the
system actually works. It defaults to angular commit standard, that is
[described
here](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).
Tough I find it much more helpful to get the notion from the actual
commit messages in the [angular
repo](https://github.com/angular/angular.js/commits/master).

**Do you need automatic github releases?***Yes.*
This gives us a great benefit of [generated
releases](https://github.com/kub1x/rodnecislo/releases). The tool for
it, `conventional-github-releaser`, tells you exactly what to do to,
which itself helps so much, that I can’t resist repeating it here (just
a little more specific).
Going from version `0.0.1` to `0.0.2`:

1.  Make a change
2.  `npm run verify`
3.  `git cz` the change
4.  Make sure Travis CI turns green
5.  Repeat until enough changes to call it a version ;P
6.  Do `npm login` with your npmjs.org account. I failed to do this and
    accidentally published my package as a wrong user ;)
7.  `npm run major` OR `minor` OR `patch` - does all the following for
    you:
      - Run tests, verifications, etc.
      - Bump version in package.json, commit, create git tag and push it
      - `npm publish` to [npmjs
        repo](https://www.npmjs.com/package/rodnecislo)
8.  `npm run github-release` - creates the nice release report on github
    mentioned earlier
9.  Celebrate… and maintain.

**Do you need CLI?***No.*
As I’m writing npm library rather than console tool, I don’t expect it
being used from command line. But for the sake of completeness the `cli`
option of the generator creates [this
file](https://github.com/d4rkr00t/generator-np/blob/master/app/templates/src/cli.js)
in your package’s `src` directory and adds `meow` to your deps. That’s
it.

## Aaaand we’re done... Almost

After the generation process finishes the whole project is automatically
being set up. The template itself takes care of `npm install`, running
your first build, lint, tests, and checking for outdated dependencies
using [npm outdated](https://docs.npmjs.com/cli/outdated). I recommend
reading the output of the generation process as there is practically
everything you need to know about your newly generated package,
especially the npm scripts being called.
At the time of writing, some of the packages are outdated downright
after the generation due to [inactivity of the
maintainer](https://github.com/d4rkr00t/generator-np/pulls) (perhaps
someone could offer him a hand ;)). To fix this use
[npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
tool:

{% highlight shell %}
npm install -g npm-check-updates
ncu -a
{% endhighlight %}

Now this is just the beginning. Even the first version of the module
took quite some time on research, programming and writing. I’m kinda
wondering how maintaining of it will go, so about it later.

Cheers, `npm install rodnecislo` and go opensource.
