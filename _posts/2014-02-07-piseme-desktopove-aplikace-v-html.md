---
layout: post
title: Píšeme desktopové aplikace v HTML
date: '2014-02-07T12:47:00.001+01:00'
author: Lukáš Marek
lang: cs
tags:
- chrome desktop apps
- bootstrap
- angularjs
- desktop
- chrome
modified_time: '2014-02-07T12:47:22.016+01:00'
cloudinary_src: posts/2014-02-07-piseme-desktopove-aplikace-v-html__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-34108286215423535
blogger_orig_url: http://blog.fragaria.cz/2014/02/piseme-desktopove-aplikace-v-html.html
---

{% include figure.html cloudinary_src='posts/2014-02-07-piseme-desktopove-aplikace-v-html__1.png' %}

Nedávno jsem do mailu (díky Honzo\!), dostal článek o tom, že Chrome
Desktop Apps už [fungují i na
mobilu](http://blog.chromium.org/2014/01/run-chrome-apps-on-mobile-using-apache.html).
Na článku mě upřímně nejvíc zaujalo to, že vůbec nějaké Chrome Desktop
Apps existují. No a samozřejmě jsem to potřeboval vyzkoušet.
Na žádném "pracovním" projektu se to dvakrát nehodilo, tak jsem si řekl,
že moje [vařítko čaje](http://tea-clock.com/) si taky zaslouží trochu
lásky. Netrvalo to ani den a podařilo se mi překlopit webovou stránku
do jednoduché aplikace\!

### Co jsou Chrome Web Apps?

Malá odbočka pro ty z vás, co (stejně jako já) až do dneška netušili, že
něco takového existuje.
Chrome Web Apps jsou webové aplikace, které se ale tváří jako "normální"
Windows/Mac/Linux aplikace. To znamená, že ve Windows je najdete přímo
ve Start menu (v záložce Chrome Apps), můžete si dát zástupce na plochu
atd.
Navíc u nových verzí Chrome je dole na liště tzv. Chrome App Launcher,
což je jednoduchý způsob, jak spustit konkrétní
aplikaci.

### Jak to šlo?

[Zdrojový kód](https://github.com/krtek/Tea-clock) původní aplikace je
relativně jednoduchý – v zásadě jde o jednu HTML stránku a kus
Javascript (popravdě Coffeescript) kódu v AngularJS.
HTML šlo pryč víceméně celé. Ne, že by nešlo použít, ale potřeboval jsem
uživatelské rozhraní aplikace razantně zmenšit – aplikace má rozměr jen
380x380
pixelů.

{% include figure.html cloudinary_src='posts/2014-02-07-piseme-desktopove-aplikace-v-html__2.png' %}

V obou případech jsem použil [Twitter
Bootstrap](http://getbootstrap.com/), nemusel jsem tedy nic vymýšlet a
jen přepsal těch pár `div`ů a výběr čajů dal do `select` boxu místo
`radio` buttonů, co jsou na webu.
Původně jsem si maloval, že v Javascriptu nebudu muset dělat změny
žádné, ale opak byl pravdou. Spoustu kódu jsem naštěstí mohl vyhodit
– webová verze musí kontrolovat, zda je použitý správný prohlížeč a
zda jsou k dispozici webové notifikace. To šlo všechno pryč.

Změnit se musely dvě věci: Ukládání nastavení, protože desktopová
aplikace nemůže použít `localStorage`, ale musí používat
`chrome.storage.*`. Zase ale se nastavení automaticky
(\`chrome.storage.sync\`) sdílí mezi všemi počítači konkrétního
uživatele.
Druhá změněná věc bylo samotné vyvolání notifikace – opět je třeba
použít `chrome` rozhraní. I když tohle asi nebylo 100% nutné.

Poslední věc bylo uklizení kódu, odstranění jednoho zbytečného
kontroleru a vyhození JQuery. Tohle ale asi udělám i ve webové verzi a
budu se snažit kód trochu sjednotit.

Výsledek? Kdybych od začátku počítal s desktopovou verzí, mohl jsem si
ušetřit spoustu práce. Ať už správným použitím kombinace `col-xs-*` a
`col-md-*` tříd v HTML nebo trochou abstrakce v Javascriptu, kdy bych si
obalil volání notifikací a `localStorage` nějakým proxy objektem.
Ale ani takhle nešlo o nic hrozného, zabralo mi to asi 4-5 hodin času.

Jen výsledný zdroják je zatím v [samostatné
větvi](https://github.com/krtek/Tea-clock/tree/desktop), sdílení kódu
mezi webem a desktopem musím teprve vyřešit.

### Hurá do světa

Paradoxně nejvíc času a bádání mi zabralo vydání aplikace do Chrome Web
Store. Nějak jsem nepochopil oficiální postup [zabalení a vydání
aplikace](https://developer.chrome.com/apps/publish_app.html).
Takže pro příští generace (a pro mě za půl roku) tu raději sepíšu svůj
vlastní návod:

1.  Aplikace se "zabalí" pomocí "Pack extension" přímo v prohlížeči
    Chrome. Tento krok je nutný *pouze* pro distribuci aplikace mimo
    Chrome Web Store nebo pro vyzkoušení instalace aplikace.
2.  Celý adresář s aplikací se zabalí do `zip` souboru. Soubor
    **manifest.json** musí být v kořeni `zip`u.
3.  Tento zip soubor se nahraje na Chrome Web Store a vydá.
4.  Zabalená aplikace z prvního kroku se nikam nenahrává, do zipu
    nepatří, prostě je na nic\!

Vydanou aplikaci [můžete samozřejmě
nainstalovat](https://chrome.google.com/webstore/detail/tea-clock-for-desktop/jhflnmgjaehakhchnneijfcnpkigcakn?authuser=1&hl=en).
z Chrome Web Store. A dejte mi vědět, jak chodí?

### Mobilní verze

A běží i na mobilu? No
jéje\!

{% include figure.html cloudinary_src='posts/2014-02-07-piseme-desktopove-aplikace-v-html__3.png' %}

Ale o tom až příště.
