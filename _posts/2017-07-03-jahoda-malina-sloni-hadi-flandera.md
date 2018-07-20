---
layout: post
title: Jahoda, malina, sloni, hadi, flanděra, angular
date: '2017-07-03T12:56:00.000+02:00'
author: Jirka Chadima
tags:
- sqlite
- javascript
- python
- flask
- angularjs
- socket.io
- eventlet
- postgresql
- raspberry
modified_time: '2017-07-03T12:56:23.496+02:00'
thumbnail: https://1.bp.blogspot.com/-MP986IuLAmg/WVailx1qfYI/AAAAAAAAAhg/IiqZKrZ7pOYGs5rd4IJzODHPoywnVFaZwCLcBGAs/s72-c/DBkyLKpXoAI7tsr.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5818496784390061288
blogger_orig_url: http://blog.fragaria.cz/2017/07/jahoda-malina-sloni-hadi-flandera.html
---

Přijde takhle klient do kanceláře a povídá: "Máme tady takovou velkou
mašinu a k ní si můžeme koupit příšerně drahý ovládací panel. Nesvedli
byste pro nás udělat něco levnějšího?" Technicky zdatný ředitel
společnosti nesměle dí: "To bychom asi svedli." Klientovi se rozzáří
očka a tichým hlasem dodá: "Ale potřebovali bychom, aby to fungovalo ve
skoro reálném čase a máme tu na to nějaká volná Raspberry Pi."  
<span id="more"></span>  
Kromě výkonnosti Raspberry jsme také podle zadání docela omezeni v
technologickém rozletu: nějaký ten webový frontend, kde se budou data
ukazovat a bude je možné měnit, backend ideálně v Pythonu a jako datové
úložiště bychom rádi použili třeba SQLite. Naše vyprávění ale začneme
od uživatelského konce, tedy od
klienta.  
  

[![](https://1.bp.blogspot.com/-MP986IuLAmg/WVailx1qfYI/AAAAAAAAAhg/IiqZKrZ7pOYGs5rd4IJzODHPoywnVFaZwCLcBGAs/s640/DBkyLKpXoAI7tsr.jpg)](https://1.bp.blogspot.com/-MP986IuLAmg/WVailx1qfYI/AAAAAAAAAhg/IiqZKrZ7pOYGs5rd4IJzODHPoywnVFaZwCLcBGAs/s1600/DBkyLKpXoAI7tsr.jpg)

  

  

## Angular, WebSockets a socket.io

  

Protože ve Fragarii válíme poslední dobou hlavně v Angularu, tak jsme
použili jeho čtvrtou, poslední verzi a místo tradičního pollingu se jako
komunikační protokol přímo nabízí
[WebSockets](https://en.wikipedia.org/wiki/WebSocket). Kdo by neznal,
představí si otevřený tunel mezi prohlížečem a serverem, kudy
obousměrně tečou data. Oproti tradičnímu HTTP, zásadním způsobem
eliminujeme režii spojenou s každým novým požadavkem a tím zvyšujeme
výkon celé aplikace.  
  
Jenže\! Jak se později ukázalo, v Pythonu je jednodušší použít knihovnu
[socket.io](https://socket.io/), která umí kromě WebSocketů spousta
dalších parádních věcí - zejména se tvářit jako WebSockets i tam, kde
tahle technologie nefunguje a taky jednotlivým datovým zprávám
přiřazovat pojmenovaný typ.  
  
Takže si v Angularu podobně jako v [tomhle
návodu](https://www.npmjs.com/package/ng2-socket-io) napíšeme tupoučký
wrapper a službičku...  

  
...a na dalších 20 řádkách si ten tunel ještě pustíme. No, a to je
vlastně všechno. Zbytek aplikace jsou tradiční nezajímavé formulářové
inputy, validace a taky on-screen klávesnice. Třeba trochu upravená
[tahleta](https://github.com/protacon/ng-virtual-keyboard).  
  

  

## Flask a socket.io

  
Webových frameworků v Pythonu jsou samozřejmě tuny. Pojďme ale použít
něco jednoduchého, do čeho se dobře integruje socket.io. Volba padla na
[Flask](http://flask.pocoo.org/), pár lidí ho
[používá](https://hotframeworks.com/languages/python) a socket.io to
[taky umí](https://flask-socketio.readthedocs.io/en/latest/). Přijímat
data z klienta je pak přímo odzbrojujícím způsobem jednoduché.  

  
Jak se data na klienta posílají si ukážeme po krátké odbočce do světa
databází.  
  

## SqLite, PostgreSQL a LISTEN/NOTIFY

  
Když už se pollingem, tedy periodickou kontrolou dat nezabýváme na ose
prohlížeč-server, byla by škoda dělat polling do databáze. Na scénu tak
vstupují SQLite a PostgreSQL, které umí pomocí
[update\_hook](https://www.sqlite.org/c3ref/update_hook.html) respektive
dvojice
[LISTEN](https://www.postgresql.org/docs/9.4/static/sql-listen.html)/[NOTIFY](https://www.postgresql.org/docs/9.4/static/sql-notify.html) při
nějaké události volat uživatelský kód. Pro SQLite se dá použít například
knihovna [karellen-sqlite](https://github.com/karellen/karellen-sqlite),
my si ukážeme, jak se problém řeší v Postgresu a
[psycopg2](http://initd.org/psycopg/).  
  
V PostgreSQL mějme jednoduchou tabulku, z níž chceme zavolat NOTIFY
pokaždé, když do ní přibude nový řádek. Na to se samozřejme nejlépe
používají triggery.  

  
Obsluha v Pythonu je pak dost jednoduchá, ale pro webový server je
blokující smyčka tak, jak je uvedená v dokumentaci, poměrně nevhodná.  
  

  

## Lepíme to celé dohromady

  
Naštěstí máme
[flask-socketio](https://flask-socketio.readthedocs.io/en/latest/) a v
něm zprovozněný [eventlet](http://eventlet.net/), takže se té blokující
smyčky můžeme elegantně zbavit. Použijeme na to dva background tasky (v
podstatě samostatná vlákna) v režii socket.io a asynchronní frontu s
[trampolínou](http://eventlet.net/doc/hubs.html?highlight=trampoline#eventlet.hubs.trampoline)
z arzenálu knihovny eventlet. Celá nádhera tak vypadá následovně:  
  

  
Neumíte si to představit? Podívejte se na následující video, kde je
navíc v provozu i REST API, aby se nemuselo sahat přímo do databáze:  
  

  
  

## Co říci závěrem

Díky menší zoologické zahradě existujících technologií a knihoven jsme
takhle byli schopní během pár dnů dodat firmě na balicí stroje pilotní
ukázku toho, jak by mohl vypadat reálný řídící panel s různými
komponentami. Angular nám pomohl k tomu, že řešení je modulární a z
jednotlivých komponent se dají skládat různé obrazovky. Dostatečně
obecné řešení backendu pomocí PostgreSQL a WebSockets pak umožňuje
snadnou rozšiřitelnost a přizpůsobování podle toho, jaké typy dat
potřebují jednotlivé stroje.

  

Když už frčí to reaktivní programování na frontendu, tímhle relativně
jednoduchým způsobem můžete postavit reaktivní celou aplikaci odshora
dolů. To samozřejmě šetří zdroje, možná to zlepšuje uživatelský
prožitek, ale hlavně to setsakra dobře vypadá.
