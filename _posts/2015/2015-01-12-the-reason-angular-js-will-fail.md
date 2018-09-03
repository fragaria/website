---
layout: post
title: The reason Angular JS will fail. Revisited!
date: '2015-01-12T09:00:00.000+01:00'
author: Lukáš Marek
lang: en
tags:
- jquery
- angularjs
modified_time: '2015-01-12T09:20:11.858+01:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-3713673443852028943
blogger_orig_url: http://blog.fragaria.cz/2015/01/the-reason-angular-js-will-fail.html
---

Recently, I found in my RSS reader George Butiri’s article named [The
reason Angular JS will
fail](http://okmaya.com/2014/03/12/the-reason-angular-js-will-fail/). Go
ahead and [read
it](http://okmaya.com/2014/03/12/the-reason-angular-js-will-fail/) –
it’s quite interesting. Naturally, I do not agree with George’s
conclusions, but that is not the reason why I wrote this blogpost.

What really struck me was the quality of provided code samples. I do not
want anyone to read the article and think: *„So this is supposed to be
the Angular way of doing things? No wonder this shit is doomed.“*

The provided code shows that George is really proficient with vanilla
Javascript and jQuery but lacks (no offense) deeper understanding of
AngularJS and its principles.

Thats why I decided to go on and fix the code to be more Angularish.
Lets skip the first example – it’s easy enough – and start directly with
more advanced stuff.

### DOM Manipulation

George tries to do an simple example of two boxes which should move when
clicked. This is indeed quite simple task. Let’s have a look at the code
from the article ([original
JSFiddle](http://jsfiddle.net/simpulton/E7xER/)):

{% highlight javascript %}
var myApp = angular.module('myApp', []);

myApp.directive('myWidget', function() {
    var linkFn;
    linkFn = function(scope, element, attrs) {
        var animateDown, animateRight, pageOne, pageTwo;
        pageOne = angular.element(element.children()[0]);
        pageTwo = angular.element(element.children()[1]);

        animateDown = function() {
            $(this).animate({
                top: '+=50'
            });
        };

        animateRight = function() {
            $(this).animate({
                left: '+=50'
            });
        };

        $(pageOne).on('click', animateDown);
        $(pageTwo).on('click', animateRight);
    };
    return {
        restrict: 'E',
        link: linkFn
    };
});
{% endhighlight %}

Notice something awkward? Yes, you’re right. This is not AngularJS, this
is just bunch of jQuery code wrapped in *directive* for no obvious
reason.

As I read the article I thought: „There has to be better way to achieve
such simple result.“ Of course there is one and quite straightforward:

{% highlight javascript %}
var myApp = angular.module('myApp', []);

myApp.directive('box', function () {
    var linkFn;
    linkFn = function (scope, element, attrs) {

        scope.click = function () {
            var opts = {};
            if (attrs.move.indexOf('right') != -1) {
                opts.left = '+=50px';
            }

            if (attrs.move.indexOf('down') != -1) {
                opts.top = '+=50px';
            }

            $(element.children()[0]).animate(opts, "slow");
        };

    };
    return {
        restrict: 'EA',
        link: linkFn,
        template: '<div class="box" ng-click="click()"></div>',
        scope: {}
    };
});

//see JS Fiddle at http://jsfiddle.net/3rom9aoz/36/
{% endhighlight %}

See? Why not unleash AngularJS *directives* to their full potential and
use them exactly how they are supposed to be used in the first place?
There is no need for element searching and attaching *click* handlers
via jQuery.

Notice that jQuery is still being used on line 17 for animation itself.
Yes. Because AngularJS is not a low-level manipulation library – jQuery
truly rocks at this field.

What is the main difference then? **Readability.** Let’s compare source
HTML:

{% highlight html %}
<my-widget>
    <div id="one" class="box"></div>
    <div id="two" class="box"></div>
</my-widget>
{% endhighlight %}

{% highlight html %}
<box move="down"></box>
<box move="right"></box>
<box move="down right"></box>
{% endhighlight %}

In AngularJS case, HTML speaks for itself. You can understand its
purpose without even looking at the Javascript code.
See complete [JSFiddle](http://jsfiddle.net/3rom9aoz/36/).

### Ajax

What about George’s second task? Let’s quote him:

> *For the purpose of simplicity, here’s the requirements:*
> * Two links, and two output elements on the page.
> * One link loads a random number in the first element.
> * The second link loads today’s date in the second element.

This simple requirement is followed by two paragraphs explaining why
it’s impossible to achieve this in AngularJS. Ok, pal, here you go:

{% highlight javascript %}
var myApp = angular.module('myApp', []);

var MainCtrl = function ($http) {
    main = this;
    this.load = function (what) {
        if (what == 'ip') {
            $http.get('http://ip.jsontest.com/').then(function (result) {
                main.ip = result.data.ip;
            });
        }
        if (what == 'date') {
            $http.get('http://date.jsontest.com/').then(function (result) {
                main.date = result.data.date;
            });
        }
    }
};

myApp.controller('MainCtrl', MainCtrl);

//see JS Fiddle at http://jsfiddle.net/5xm4yqvL/25/
{% endhighlight %}

([Complete JSFiddle](http://jsfiddle.net/5xm4yqvL/25/) – I couldn’t find
online service that would return random number, so I replaced it with IP
address. Hope that is not a problem.)

But I see the point here. The original article shows how to build a
generic system to replace various elements (identified by IDs) with
values sent from server. I hope that this example is not taken from real
world application. Maintaining such application must be a real pain in
the ass.

Although I think it is not really an AngularJS way, it’s still perfectly
achievable. For example like this:

{% highlight javascript %}
var myApp = angular.module('myApp', []);

myApp.directive('serverData', function ($http) {
    var linkFn = function (scope, element, attrs) {
        attrs.$observe('load', function (value) {
            if (value == "true") {
                $http.get('http://' + attrs.id + '.jsontest.com/').then(function (result) {
                    scope.data = result.data;
                });
            }
        });
    };

    return {
        restrict: 'EA',
        link: linkFn,
        template: '<span>{{data}}</span>',
        scope: {}
    }
});

//see JS Fiddle at http://jsfiddle.net/v7Lhh384/22/
{% endhighlight %}

{% highlight html %}
<div>
    <a href="#" ng-click="loadIp = true">Load IP</a>
    <a href="#" ng-click="loadDate = true">Load date</a>
    <p>Your IP:
        <server-data id="ip" load="{{loadIp}}"></server-data>
    </p>
    <p>Today is:
        <server-data id="date" load="{{loadDate}}"></server-data>
    </p>
</div>
{% endhighlight %}

See? This is where directives really rock. One really just have to
resist to urge to sprinkle \#IDs all over the HTML code and create
unreadable spaghetti.

### That's it

At least for today. AngujarJS might not be perfect, but it's really
helpfull in creating readable, maintainable and extendable Javascript
applications.
