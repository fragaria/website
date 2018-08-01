---
layout: post
title: Optimalizace rychlosti webu
date: '2013-11-14T14:26:00.000+01:00'
author: Martin Bílek
lang: cs
tags:
- optimalizace
- page speed
modified_time: '2013-11-14T14:27:05.552+01:00'
cloudinary_src: posts/2013-11-14-optimalizace-rychlosti-webu__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-6490269258106447395
blogger_orig_url: http://blog.fragaria.cz/2013/11/optimalizace-rychlosti-webu.html
---

Na blogu Google vývojářů vyšel [zajímavý
článek](http://googledevelopers.blogspot.cz/2013/11/speeding-up-mobile-pages-with.html)
o tom, jak lze velmi jednoduše a s minimálními náklady (i s minimální
časovou náročností) výrazně zrychlit webové stránky z pohledu rychlosti
načtení stránky pro uživatele i z pohledu zátěže na infrastrukturu.

Problematice optimalizace načítání webový stránek se ve Fragarii
věnujeme dlouhodobě a velmi často dokážeme ohromit naše klienty tím,
čeho lze dosáhnout i minimální úpravou několika řádků v nastavení
webového serveru.

Naposledy jsme například změnou konfigurace webových serverů přední
české banky dosáhli toho, že se o 30% snížil celkový objem přenášených
dat. Tato optimalizace byla velmi vítána zejména ve chvíli, kdy bylo
uvažováno o dvojnásobném navýšení kapacity síťové
konektivity.

{% include figure.html cloudinary_src='posts/2013-11-14-optimalizace-rychlosti-webu__1.png' %}

Zajímalo by Vás, jak je možné optimalizovat rychlost načítání webu? Rádi
připravíme analýzu na míru právě pro Váš projekt a přesvědčíme Vás o
tom, že optimalizovat je někdy velice jednoduché a opravdu se to
vyplatí.
