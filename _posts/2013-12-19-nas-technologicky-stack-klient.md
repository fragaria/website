---
layout: post
title: Náš technologický stack - klient
date: '2013-12-19T12:08:00.000+01:00'
author: Lukáš Marek
tags: 
modified_time: '2013-12-19T12:08:33.948+01:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-796362602360585435
blogger_orig_url: http://blog.fragaria.cz/2013/12/nas-technologicky-stack-klient.html
---

Množí se nám dotazy (teda... byly dva), jaké technologie používáme na
jednotlivých vrstvách aplikací, které tvoříme.  
Ani se nedivím. Než jsme si jednotlivé technologie sladili dohromady,
tak to chvíli trvalo, ale výsledek stojí za to. Posuďte sami:  
  

### Klient

V prohlížeči nedáme dopustit na
[Bootstrap](http://getbootstrap.com/ "nastřelit"). Konečně i my
prográmatoři dokážeme "nastřelit" rozhraní, které vypadá k světu a dá
se s ním pracovat.  
Kde nestačí vzhled čistého Bootstrapu, koukáme primárně po šablonách z
[WrapBootstrap](https://wrapbootstrap.com/). Většinou jde o hodně
designu za málo peněz.  
No a kde to trochu drhne, tam pomůže Tibor a doladí CSSka. Tedy – neladí
CSSka, ale [LESSka](http://lesscss.org/). To je snad jasné, ne?  

#### 

####   

#### Angular.js

Naší velkou láskou je [Angular.js](http://angularjs.org/). Nejdřív jsme
s ním udělali mobilní aplikaci pro Investiční web
([Android](https://play.google.com/store/apps/details?id=cz.fragaria.iw3),
[iPhone](https://itunes.apple.com/cz/app/investicniweb.cz/id592380883?mt=8))
a teď v něm píšem i všechny desktopové aplikace.  
  
Nevíte, co to je Angular? Mrkněte na článek na
[Zdrojáku](http://www.zdrojak.cz/clanky/zaciname-s-angularjs/).  
  
V kostce jde o MVC framework (představte si Grails, Django, Roo, ...)
napsaný kompletně v Javascriptu.  
Takhle na první pohled to nevypadá jako pecka, ale je\! Server (o kterém
se pobavím příště) je vlastně degradován jen na posílání dat ve formátu
JSON a o jejich zobrazování se komplet stará frontend.  
  
Konečně to tedy vypadá jak v příručkách. Server řeší pouze data – jejich
validaci, ukládání, vyhledávání atd. Klientský javascript pak šablony,
zobrazení a interakci s uživatelem. A navíc –
[SPI](http://en.wikipedia.org/wiki/Single-page_application) zadarmo\!  

#### 

####   

#### Coffeescript

Na Angularu nám (teda mě určitě) vadila vlastně jen jediná věc:
Javascript. Nechápejte mě špatně. Ten jazyk je mocný, ale strašně
ukecaný.  
[Coffescript](http://coffeescript.org/) je něco jako Groovy pro Javu.
Konečně můžu napsat:  

    for x in [1, 2, 3]:
     console.log("Number: #{x}")

a nemusím počítat indexy pole jak trotl.  
  
Tohle je samozřejmě jen jedna z výhod Coffeescriptu, je jich ještě
záhon.  
  
Na druhou stranu, nešikovný "bastlič" dokáže v Coffeescriptu kód dost
zašmodrchat. Ale to platí asi ve všech jazycích.  

#### 

####   

#### Testování

Angular má docela hezky propracovanou podporu pro unit testy, integrační
testy a různé další testy.  
My testy píšeme v [Jasmine](http://pivotal.github.io/jasmine/) a
spouštíme [Karmou](http://karma-runner.github.io/0.10/index.html).  

#### 

####   

#### Build aplikace

Ptáte se, jak tohle všechno skládáme dohromady? Lidi okolo Javascriptu
se v tomhle směru poučili ve světě Javy a vznikl
[Grunt](http://gruntjs.com/) a [Bower](http://bower.io/).  
Bower slouží pro správu závislosti (v Javě Maven, Apache Ivy) a Grunt
pro sestavení finální aplikace (spíš Gradle než Maven).  
  
S Bowerem se neztratíte v použitých knihovnách. Už se nestahují z webu,
ale instalují se pomocí:  

    bower install jquery
    bower install angular

a závislosti se ukládají do `bower.json` v pěkně čitelné podobě:  

    "dependencies": {
        "angular": "v1.2.0-rc.2",
        "bootstrap": "v3.0.0",
        "jquery": "~2.0.3",
        "jquery-ui": "~1.10.3"
    }

No a Grunt pěkně zkompiluje Coffeescripty do Javascriptů, prožene je
testy, zmenší je, z LESS souborů udělá CSS soubory a vůbec připraví
aplikaci na nasazení.  
  
Tak takhle my to děláme :)  
V příštím díle: Server\!  
  
PS: Jestli vás něco zajímá detailněji, tak se klidně ptejte...
