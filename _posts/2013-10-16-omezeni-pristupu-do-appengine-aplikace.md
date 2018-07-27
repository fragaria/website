---
layout: post
title: Omezení přístupu do AppEngine aplikace
date: '2013-10-16T10:19:00.004+02:00'
author: Lukáš Marek
tags:
- gae
- google app engine
modified_time: '2013-10-21T13:46:27.928+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5701532649425033272
blogger_orig_url: http://blog.fragaria.cz/2013/10/omezeni-pristupu-do-appengine-aplikace.html
---

Poměrně často narážíme na požadavek omezení přístupu uživatelů do
aplikace na AppEngine.

Modelový příklad: Zákazník si přeje omezit přístup do aplikace tak, aby
do ní mohli pouze uživatelé z domény **xxx.cz**, **yyy.cz** a
**fragaria.cz**.

Google nabízí pouze omezení přístupu buď na libovolnou (ale pouze jednu)
Google Apps doménu nebo na jakéhokoliv uživatele z Google Apps domény
bez omezení.

První možnost tedy použít nemůžeme, druhou používáme k vynucení
přihlášení uživatele – omezení na Google Apps domény je pro nás OK.

Postup, který jsme používali dosud je podobný jako například v [tomto
článku](http://blog.abahgat.com/2013/01/07/user-authentication-with-webapp2-on-google-app-engine/).
Připravíme si anotaci `@user_required`, která zkontroluje uživatele a
tu "nalepíme" na všechny metody příslušných HTTP handlerů. To ale
znamená, že máme anotace rozeseté všude a je snadné jí někde
zapomenout.

Dneska [+Robin Gottfried](https://plus.google.com/115351013889485284951)
přišel s mnohem elegantnějším řešením.
Využívá metodu `__call__()` z webapp2, přes kterou procházejí
všechny requesty v aplikaci a kontrolu dělá tam.

Asi takhle:

{% highlight python %}
from utils import SecureApplication

routes = (
    ('/route1', 'app.views.view1'),
)

handler = SecureApplication(routes=routes, debug=settings['DEBUG'])
{% endhighlight %}

Samozřejmě je nutné místo standardní `WSGIApplication`  použít vlastní
podtřídu:

{% highlight python %}
import logging
from google.appengine.api import users
from webapp2 import WSGIApplication
from webob import exc

class SecureApplication(WSGIApplication):
    """ WSGIApplication which checks if user belongs to one of allowed domains. """
    def __call__(self, environ, start_response):
        logging.debug('calling request as %s' % users.get_current_user())
        with self.request_context_class(self, environ) as (request, response):
            try:
                if authorize_user():
                    return super(SecureApplication, self).__call__(environ, start_response)
                else:
                    raise exc.HTTPForbidden(detail="User not allowed to access application!")
            except Exception, e:
                try:
                    # Try to handle it with a custom error handler.
                    rv = self.handle_exception(request, response, e)
                    if rv is not None:
                        response = rv
                except exc.HTTPException, e:
                    # Use the HTTP exception as response.
                    response = e
                except Exception, e:
                    # Error wasn't handled so we have nothing else to do.
                    response = self._internal_error(e)

            try:
                return response(environ, start_response)
            except Exception, e:
                return self._internal_error(e)(environ, start_response)


def authorize_user(allowed_domains):
    """ Checks if user is authorized to use the application. If user is not from one of allowed domains it returns
    false."""
    user = users.get_current_user()
    email_info = user.email().split('@')

    if len(email_info) != 2:
        logging.warning('Cannot resolve domain for current user: %r' % user.email())
        return False

    domain = email_info[1]

    if domain not in allowed_domains:
        return False

    return True
{% endhighlight %}
