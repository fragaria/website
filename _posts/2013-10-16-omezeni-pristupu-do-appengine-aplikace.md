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
Připravíme si anotaci **@user\_required**, která zkontroluje uživatele a
tu "nalepíme" na všechny metody příslušných HTTP handlerů. To ale
znamená, že máme anotace rozeseté všude a je snadné jí někde
zapomenout.

Dneska [+Robin Gottfried](https://plus.google.com/115351013889485284951)
přišel s mnohem elegantnějším řešením.
Využívá metodu **\_\_call\_\_()** z webapp2, přes kterou procházejí
všechny requesty v aplikaci a kontrolu dělá tam.

Asi takhle:

Samozřejmě je nutné místo standardní **WSGIApplication**  použít vlastní
podtřídu:
