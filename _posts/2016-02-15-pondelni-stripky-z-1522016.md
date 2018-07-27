---
layout: post
title: Pondělní střípky z 15.2.2016
date: '2016-02-15T16:38:00.000+01:00'
author: Lukáš Marek
tags:
- volby
- oclazyload
- babel
- angularjs
- vim
- nwjs
modified_time: '2016-02-15T16:39:29.768+01:00'
cloudinary_src: posts/2016-02-15-pondelni-stripky-z-1522016__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-1731258635387998818
blogger_orig_url: http://blog.fragaria.cz/2016/02/pondelni-stripky-z-1522016.html
---

Opět se hlásím s pravidelnými pondělními střípky.

Dnes: Velká prosba, volby na Slovensku, dobrodužství s Vimem, dynamické
moduly v Angularu, Webpack a NW.js. A navíc Babel.

## Sháníme skener

Hledáme firmu, která nám zapůjčí nebo poskytne přístup k
vysokorychlostnímu dokumentovému skeneru.

​V rámci příprav na hlasování [volebním systémem
Demokracie 2.1](https://d21.me) si potřebujeme otestovat naši
infrastrukturu pro automatické rozpoznání hlasovacích lístků.

**Požadavky na skener**
Rychlost: cca 100ppm; 10 000/den
Formát papíru: A3
Minimální rozlišení: 200dpi
Barevný/černobílý: stačí černobílý

**Příklady vhodných skenerů**
Canon imageFORMULA DR-G1100 (preferovaný)
Fujitsu fi-5900C
Panasonic KV-S2026C

Pokud máte, nebo o někom víte – dejte nám, prosím, vědět. Moc nám
pomůžete. Díky.

## Volby.digital

A šup od [našich
voleb](http://www.fragaria.cz/reference/reseni-na-miru/2015/4/14/demokracie-21/)
k těm slovenským. Možná jste zaregistrovali, že na Slovensku se blíží
parlamentní volby (5.3.2015).

Co jste ale zaregistrovat nemuseli je [šikovný
nástroj](https://volby.digital/) pro expaty, který po na pár kliknutí
vygeneruje oficiální žádost o voličský průkaz. Tu pak stačí podepsat
(klidně i na displeji mobilu), dát do obálky a poslat. A pak odvolit buď
na ambasádě nebo v libovolném slovenském městě.

Takže bratia a sestry (Deniska\!), žádné výmluvy, pořiďte si *Hlasovací
preukazy* a pošlete Fica do důchodu.

## NW.js

Po tom, co si Tibor odeslal žádost o volební průkaz, ukázal nám ještě
[NW.js](http://nwjs.io/).

Jde o nástroj pro psaní desktop aplikací v Javascriptu, HTML a CSS – prý
ho používá desktopová verze Spotify nebo Slacku.

Jak se liší od známějšího [Electronu](http://electron.atom.io/), na
kterém běží třeba editor [Atom](https://atom.io/)? Těžko říct.

[Porovnání
existují](https://www.xplatform.rocks/2016/02/09/nw-js-vs-electron/),
ale my jsme ještě nezkusili ani jeden.

## Vim adventures

Když jsem se učil s editorem Vi(m), musel jsem si pořídit [hrnek na
kafe](http://www.cafepress.com/mf/10388170/vi-reference_mugs) a příkazy
opisovat z něj. A podle toho to se mnou a Vičkem vypadá.

Dneska mají mladí už úplně jiné možnosti – například [Vim
adventures](http://vim-adventures.com/). Jde vlastně o jednoduchou
“chodičku” v prohlížeči, která by se dala celá dohrát maximálně za 10
minut – kdyby se nemusela ovládat jako Vim. Takhle jsem po hodině na
konci prvního levelu a mám chuť se
zabít.

{% include figure.html cloudinary_src='posts/2016-02-15-pondelni-stripky-z-1522016__1.png' %}

Pokud máte chuť na trochu sebetrýznění, hurá do toho.

## ocLazyLoad

Jeden z problémů AngularJS je absence modulů, které se nahrávají až v
případě potřeby – něco jako [RequireJS](http://requirejs.org/).

Filip našel [ocLazyLoad](https://oclazyload.readme.io/) – asi jedinou
jakžtakž použitelnou *lazy load* knihovnu pro Angular.

## Webpack

No a když už jsme se bavili o *lazy loadingu* a balíčkování, ukázal nám
Filip ještě [Webpack](http://webpack.github.io/), což je nástroj na
vytváření balíčků z Javascript a CSS kódu.

Představte si něco jako Grunt, kde ale děláte komplet balíček včetně
závislostí pro každý modul v projektu.

Pro větší projekty to – třeba i v kombinaci s ocLazyLoad – může znamenat
značné zpřehlednění kódu a zjednodušení údržby.

## Babel

No a když už jsme se bavili o Javascriptu obecně, apeloval na nás Filip,
že už je čas začít používat ECMAScript (tak se říká Javascriptu
správně\!) verze 6.

No jo. Ale ECMAScript 6 nefunguje ještě všude\! A teď nemám na mysli jen
Internet Explorer. Některé kousky neumí ani Firefox nebo Chrome.

Naštěstí existuje projekt
[Babel](https://babeljs.io/docs/learn-es2015/), který zdrojáky v *novém*
Javascriptu přeloží do *starého* Javascriptu, aby fungovaly i ve starší
browserech.

Takže bez výmluv: *Nové* projekty v *novém* roce už jen v *novém*
Javascriptu\!
