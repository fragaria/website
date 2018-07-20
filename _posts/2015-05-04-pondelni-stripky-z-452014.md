---
layout: post
title: Pondělní střípky z 4.5.2014
date: '2015-05-04T13:37:00.000+02:00'
author: Lukáš Marek
tags:
- sprayable
- stripky
- bindonce
- angularjs
- android
modified_time: '2015-05-11T13:09:37.752+02:00'
thumbnail: http://4.bp.blogspot.com/-KgcQ8JceAMQ/VUdZuprHrZI/AAAAAAAAAgk/Z8vnHC1cPo4/s72-c/IMG_20150504_091637.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-6188042518687843419
blogger_orig_url: http://blog.fragaria.cz/2015/05/pondelni-stripky-z-452014.html
---

Prodloužený víkend jsme ve valné většině prožili mimo dosah Wi-Fi
signálu, takže dnes máme střípků opravdu jen pár.

<span id="more"></span>

### Android tool for Mac

První tip se bude hodit programátorům mobilních aplikací. Udělat z
Androidí aplikace screenshot je jednoduché (Volume Down + Power), ale
natočit video už je složitější oříšek.

Vyřešit se ho rozhodl autor aplikace [Android
tool](https://github.com/mortenjust/androidtool-mac). Stačí připojit
(klidně více) Android zařízení k Macu a nahrání videa je otázkou pár
kliků. A jako bonus umožňí “ručně” nahrát novou verzi aplikace nebo
spustit vlastní skript.

Jasně, že tohle všechno jde i pomocí příkazové řádky, ale pokud máte
radši okýnka...

### Bindonce

Největší výhoda Angularu je současně i jeho největší slabinou. Ano,
mluvím o [two-way
binding](https://docs.angularjs.org/tutorial/step_04).

Je super, že změna v datech se okamžitě promítne do stránky, aniž by to
programátor musel jakkoliv řešit. Platíme za to ovšem daň v podobě
výkonnostních problémů u [extrémně dlouhých
seznamů](http://plnkr.co/edit/jwrHVb?p=preview) a rozsáhlých aplikací.

Přitom valná většina dat zobrazených na stránce se měnit nebude – jak to
ale Angularu říct?

Vaší pomalou aplikaci může pomoci zachránit knihovna
[Bindonce](https://github.com/Pasvaz/bindonce). Tagy `ng-cokoliv`
nahradíte `bd-cokoliv`, které se vyhodnotí pouze jednou a na další
změny v datech neberou zřetel.

Knihovny Bindonce si všimli i tvůrci Angularu a inspirovali se. To
znamená, že od Angular 1.3 stačí před jakýkoliv výraz přidat `::` a
vyhodnotí [se pouze
jednou](https://code.angularjs.org/1.3.7/docs/guide/expression#one-time-binding)\!

### Sprayable energy

A rychlá zpráva na závěr. Kofein ve spreji nám už dorazil, právě ho
intenzivně
testujeme.

[![](http://4.bp.blogspot.com/-KgcQ8JceAMQ/VUdZuprHrZI/AAAAAAAAAgk/Z8vnHC1cPo4/s400/IMG_20150504_091637.jpg)](http://4.bp.blogspot.com/-KgcQ8JceAMQ/VUdZuprHrZI/AAAAAAAAAgk/Z8vnHC1cPo4/s1600/IMG_20150504_091637.jpg)
