---
layout: post
title: Pondělní střípky z 9.3.2015
date: '2015-03-09T13:20:00.002+01:00'
author: Lukáš Marek
tags:
- stripky
- nativescript
- divshot
- charlieapp
modified_time: '2015-03-09T13:25:57.678+01:00'
cloudinary_src: posts/2015-03-09-pondelni-stripky-z-932015__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4958115397799822342
blogger_orig_url: http://blog.fragaria.cz/2015/03/pondelni-stripky-z-932015.html
---

Stejně jako [minulý
týden](http://blog.fragaria.cz/2015/03/pondelni-stripky.html) i dnes
jsme si ukázali pár zajímavých věcí.

### Charlie

Za první tip děkujeme [@jirifabian](https://twitter.com/jirifabian) na
Twitteru. [Charlie](https://charlieapp.com) je osobní asistent, který se
napojí na váš pracovní kalendář (umí zatím jen Google Calendar) a před
každou plánovanou schůzkou pošle krátký briefing o lidech, se kterými se
máte setkat.

V briefingu se kromě fotky dozvíte pár základních faktů o dotyčném a
jeho firmě. Navíc Charlie zkusí zjistit, jestli máte společné zájmy a
ukáže pár posledních
tweetů.

{% include figure.html cloudinary_src='posts/2015-03-09-pondelni-stripky-z-932015__1.png' %}

### Nativescript

Tibor si momentálně hraje s
[NativeScript](https://www.nativescript.org/). Na první pohled to vypadá
jako další [Phonegap/Cordova](http://phonegap.com/) – tedy framework pro
tvorbu mobilních aplikací v HTML a CSS.

Na druhý pohled se ovšem ukáže, že to není úplně pravda. NativeScript
tvrdí, že nevyužívá webový prohlížeč v mobilu, ale že aplikace překládá
přímo do nativního kódu konkrétní platformy.

[Ukázky](https://www.nativescript.org/showcases) vypadají zajímavě (a
nativně). Pokud to někdo vyzkoušíte v praxi, dejte vědět\!

### Divshot

I za poslední tip jde dík mimo Fragarii. Konkrétně
[@adam\_mika](https://twitter.com/adam_mika) za
[Divshot](https://divshot.com).

Divshot je takové [Heroku](http://heroku.com/) pro statické stránky.
Nasazení probíhá pomocí jednoho příkazu (`divshot push`) a o CDN,
cachování a škálování se už nemusíte starat.

Jasně, Amazon S3 umí to samé, koneckonců Divshot je na něm postavený.
Ale správně zkonfigurovat S3 přece jen zabere víc času.

Cena? $20 za tři weby.

To je pro dnešek všechno. Kdyby vám to bylo málo, můžete si počíst [jak
designovat REST
API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api).
