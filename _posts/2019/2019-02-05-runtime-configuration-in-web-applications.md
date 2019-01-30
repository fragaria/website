---
layout: post
title: Runtime configuration in web applications
date: '2019-02-05T09:59:00.001+02:00'
author: Jirka Chadima
lang: en
tags:
- javascript
- webpack
- configuration
modified_time: '2019-02-05T09:59:00.001+02:00'
cloudinary_src: posts/cargo-cargo-container-clouds-1427541_f5dhrn
---

Every time you start to develop a new frontend application,
you are happy with a single instance. But then it gains traction
and suddenly you are in need of multiple separate installations
&mdash; be it for [QA](https://en.wikipedia.org/wiki/Quality_assurance),
demonstrations or other purposes. And you are suddenly facing a new
problem: How do I inject the instances with configuration values
that are different for each environment?

{% include figure.html cloudinary_src='posts/cargo-cargo-container-clouds-1427541_f5dhrn' sizing='wide' %}

## Traditional way

In the early days, these values, such as an URL of your API,
used to be hardcoded in your application and it was a pain to change
them all.

```js
fetch('http://api.example.com')
  .then((response) => {
    // do stuff
  });
```

Then it became quite common to put them into a separate file.
That led to multiple environment-specific files.

```js
let config;
if (process.env.ENVIRONMENT === 'production') {
  config = require('./config');
// } else if (process.env.ENVIRONMENT === 'staging') {
// } else if (process.env.ENVIRONMENT === 'qa') {
} else {
  config = require('./config-dev');
} 
fetch(config.API_URL)
  .then((response) => {
    // do stuff
  });
```

Then somebody figured out that having multiple files does not really
scale well. If you need a new environment, you need to commit a new
file and particularly for short-lived environments that became an
unwanted overhead.

So the environment variables started to be used directly and the
apps became full of calls to `process.env.VARIABLE` which is seemingly
great and works really well.

```js
fetch(process.env.API_URL)
  .then((response) => {
    // do stuff
  });
```

And if you combine these things, you end up with something like
[dotenv](https://www.npmjs.com/package/dotenv), which is a really
nice, portable solution that scales well. There are of course many
other flavours of this and an exhaustive list of them can be found in
[this article](https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6).

## Docker comes into play

Unfortunately, there is one common issue with all these solutions:
**All of the options are resolved during build time.**

Modern Javascript applications are distributed as optimized packages
(built by [Webpack](https://webpack.js.org/) or
[Parcel](https://parceljs.org/)) and that's perfectly fine. But the
`process.env` statements get replaced by the actual values during
build phase and that's it.

Why is that a problem? Well, if you have many environments and your
application is run as, let's say [Docker](https://www.docker.com)
containers, you need to have as many builds as there are environments.

And that is hell.

The typical `Dockerfile` for a frontend Javascript application might
look like this:

```sh
FROM mhart/alpine-node:10
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG NODE_ENV
ARG API_URL
RUN npm run build
CMD ["npm", "run", "start"]
```

So you install your dependencies, *build the application bundle* with
variables provided by `ARG` statements and then start some basic
webserver that serves the built artifact to the public.

The problem here is, that only the `CMD` statement is run during the
container startup. Everything else is done during build time. So you have
no way of injecting anything into the resulting bundle. That does not really
help, does it?

*Sidenote: There are of course some environment variables common to all
of your environments such as commit hash, version number etc. Keep them hardcoded
with `process.env` calls, there is no harm in that.*

## Environment-agnostic builds

So how can this be solved? We apparently have to populate the configuration
during the `CMD` statement. But how?

The answer is simple: **Don't include your configuration into your builds.**
Cool. But can you give me a simple checklist?

{% include figure.html cloudinary_src='posts/change-choices-choose-277615_gnx2al' caption='Many environments ahead of you' sizing='wide' %}

1. Change all calls to `process.env` to `window.env` (Yes, I know that globals
are ugly. Deal with it.) or anything you want such as `window.myShinyUnicorn`.
The only important thing is that it's something that is provided **by the browser
and not your build tool**.
1. Create a config file with defaults, such as `env.js`.

    ```js
    window.env = {
      API_URL: 'https://api.example.com'
    };
    ```

1. Load this file *before* everything else in your HMTL. Check with your build
system where it injects the compiled Javascript files. The config file has to
be the first thing your application loads.

    ```html
    ...
    <script type="text/javascript" src="/env.js"></script>
    </head>
    ...
    ```

1. Change your startup script used in a `Dockerfile` so that it replaces the
contents of the config file and only **after that** runs the application. We are
for instance using a trivial shell script called `build-env-file.sh` for that.
Make sure that you replace the config file in the actual location that is
served by your webserver.

    ```sh
    echo "window.env = {
      API_URL: \"$API_URL\"
    };" > ./public/env.js
    ```

1. Run your docker images like this:

    ```sh
    $ docker run -e API_URL=https://production-api.example.com my-docker-image
    $ docker run -e API_URL=https://staging-api.example.com my-docker-image
    ```

And that's it. You have just prepared your application for a happy future-proof
multi-environment life.

## Why is this even a thing?

Of course this is not a new problem, it has been around at least since
[Java](https://stackoverflow.com/questions/5018456/environment-specific-build-vs-loading-environment-specific-properties)
and basically all other programs that need to be built before they are
used by the consumers.

In the web community, I believe this has become a topic only after
[Heroku](https://www.heroku.com/)
[published](https://blog.heroku.com/twelve-factor-apps) their
[12 factor methodology](https://12factor.net) in 2013. The methodology
basically leads developers towards building reusable artifacts and external
configuration is one of the important factors in that venture.

Heroku itself [supports a variant](https://github.com/mars/create-react-app-buildpack#compile-time-vs-runtime)
of a solution described in this article for React based app with
[`@mars/heroku-js-runtime-env`](https://github.com/mars/heroku-js-runtime-env) package.
It does not use a special file, but rather injects the variables
directly into your code. I personally have not used it before,
but this approach might be a safer option for you than exposing
configuration on a special endpoint.

In the end, I really believe that if your applications are running
in multiple environments and somewhere in the clouds, you should aspire
for single application builds that can be run over and over with
different configurations.