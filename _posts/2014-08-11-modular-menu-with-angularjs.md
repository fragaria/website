---
layout: post
title: Creating Modular Menus in AngularJS
date: '2014-08-11T14:48:00.001+02:00'
author: Lukáš Marek
tags:
- menu
- dynamic
- modular
- modules
- angularjs
modified_time: '2014-08-11T14:52:42.400+02:00'
thumbnail: http://3.bp.blogspot.com/-vhRlyVNm9wM/U-TmRNSdkxI/AAAAAAAAAYA/o4H8WBdQHUk/s72-c/Screen+Shot+2014-08-08+at+15.44.22.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-413656719071260947
blogger_orig_url: http://blog.fragaria.cz/2014/08/modular-menu-with-angularjs.html
---

Recently, I had to design an AngularJS application that would be highly
modular. The idea was to let each module to create its own menu items
and its own routes.  
  
<span id="more"></span>  
  
The final application should look like
this:  
  

<http://3.bp.blogspot.com/-vhRlyVNm9wM/U-TmRNSdkxI/AAAAAAAAAYA/o4H8WBdQHUk/s1600/Screen+Shot+2014-08-08+at+15.44.22.png>

  
  
The menu on the left should be generated *on-the-fly*, based on the
requirements of individual modules.  
  
It turned out it's quite easy to do so using AngularJS `provider`.  
  
Wait a minute. What is AngularJS provider? Well, there is [nice
article](https://docs.angularjs.org/guide/providers) in documentation.  
  
For the sake of this article, provider is just a service, which *is
configured at application startup*. And application startup is perfect
time to build the menu. So let's do it.  

###  

### Core module

First of all let us create a module called `app.core`. containing the
`Menu`  service provider which holds application menu items:  
  

Note the `$get()` function. It is used by AngularJS at runtime to get an
instance of `Menu` service.  
  
The `add()` method can be called only at bootstrap (`config` method) by
other modules to add its own menu items.  
  
And finally, `MenuCtrl` is a controller which uses the menu service to
get an instance of menu and render it.  

###  

### Add modules

Let's define another module and add a menu item:  
  

Note that `app.settings` module dependents on `app.core` and during
application bootstrap (`config()` method) it adds menu item and
respective routes.  
  
Also note, that we are now dealing with `MenuProvider`, not the `Menu`
service itself. We will use the service later in `MenuCtrl.`  
  
Now let's define another module with two more menu items:  

  

###  

### Render menu

Menu rendering depends on the frontend framework you are using, so here
is just a simple version for Twitter's Bootstrap:  

Of course you can add icons to achieve extra fanciness. Check [this
demo](http://plnkr.co/edit/6RkqZs0mBcZa3EcGC2op?p=preview) to learn
about icons.  

###  

### Putting it all together

Finally, we need to link all the individual modules into one root
application and add a Home menu item. It's basically just a list of
submodule dependencies and default route handler:  
  

  
The only issue in the example is that Home menu always appears on the
last position because of module loading order. Fix it as your homework
:)  
  
Get the code above [as a
gist](https://gist.github.com/krtek/d74d9157b7bc9b4a21b3) or [see it in
action](http://plnkr.co/edit/6RkqZs0mBcZa3EcGC2op?p=preview).
