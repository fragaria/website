---
layout: post
title: Host a static site on heroku.com
date: '2014-04-29T15:43:00.002+02:00'
author: Tibor Kulčár
tags:
- heroku
- publish site without hosting
- static site
- deployment
modified_time: '2014-10-13T14:36:58.406+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2873498644528916294
blogger_orig_url: http://blog.fragaria.cz/2014/04/host-static-site-on-herokucom.html
---

Recently I needed to publish a simple HTML / CSS / JS GUI prototype
application for our client. Just for them to see how it would look like
with basic workflow.
So I asked our administrator where should I put it. He told me that
despite of it's very easy to have some Apache running on our virtual, we
didn't have something like that because there's no need for it.

After short investigation I've found out that
[heroku.com](http://heroku.com/) provides free app hosting with full git
support for projects based on all modern technologies. So I created my
account, added my app, cloned the project and pushed my HTML site to
heroku.
I expected heroku will magically consider my app to be HTML site and
create apache server for it. But when I tried to push it, heroku
replied: "Push rejected, no Cedar-supported app detected". Heroku also
thinks that nobody needs it.

Luckily, Heroku supports php applications, so all we need to do is to
fool heroku a bit - mimic a php application by simply create empty
index.php file:

`touch index.php `
`  `and turn php engine on apache off:

`echo 'php_flag engine off' > .htaccess`

When you add these two files to the app you have static site hosted on
heroku.com.

Neat, isn't it?
