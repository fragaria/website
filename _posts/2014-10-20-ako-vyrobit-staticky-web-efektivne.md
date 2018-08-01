---
layout: post
title: Ako vyrobiť statický web efektívne
date: '2014-10-20T13:37:00.002+02:00'
author: Tibor Kulčár
lang: sk
tags:
- npm
- less
- handlebars
- gruntjs
- generate static site
- assemble.io
- rsync
- twitter bootstrap
- static site
- bower
- i18n
modified_time: '2014-10-20T16:52:24.284+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4137923843146277797
blogger_orig_url: http://blog.fragaria.cz/2014/10/ako-vyrobit-staticky-web-efektivne.html
---

Jedna z mojich posledných úloh v práci bola vytvoriť web prezentáciu pre
[nášho klienta](http://akroubik.com/). Žiadna server-side funcionalita,
čisté HTML stránky. Je to jednoduchá vec - nie je potrebný programátor,
žiadna databáza dá sa to nasadiť na ktorýkoľvek hosting.

Celé to zvládne jeden človek za pár dní. Háčik je ale v tom, že ak máme
takýto statický web, každá stránka má v sebe z väčšej časti opakujúci sa
kód a pri každej zmene je potrebné upraviť všetky stránky. Vec sa ešte
komplikuje ak má byť web vo viacerých jazykoch. Riešením je napríklad
vyhľadávanie a premenovávanie nad všetkými súbormi, to ale môže spôsobiť
veľa problémov, ak sa človek pomýli a nevie už niektoré zmeny vrátiť
späť. A mýli sa každý.

Hľadal som riešenie, ktoré by bolo pre tento prípad vhodné a chcel som
si vyskúšať niečo nové, niečo čo to naozaj rieši. Chcel som použiť
moderný prístup, s využitím **Gruntjs, Bower** technológie, ktoré som si
veľmi obľúbil a ušetrili mi už veľa času. Takisto som chcel ako základ
použiť **Twitter Bootstrap** s tým, že si pomocou **Less** skompilujem
iba komponenty, ktoré potrebujem a pre písanie javascriptu použijem
prehľadný **CoffeeScript**.

Našiel som **[assemble.io](http://assemble.io/)**. Je to presne to, čo
som chcel už dávno aby existovalo. Assemble je nástroj na generovanie
statických stránok pomocou šablónovacieho systému **handlebars **(no je
možné nastaviť aj iný). Projekt s takýmto prístupom sa stáva prehľadným,
väščinu zmien človek robí len na jednom mieste a grunt, ktorý číha na
zmeny v zdrojových súboroch, celý web automaticky pregeneruje. Takisto
nie je potrebné inštalovať HTTP server, aby si tvorca webu mohol
výsledok priebežne kontrolovať - opäť grunt má na to riešenie pomocou
pluginu, ktorý vám takýto server poskytne.

Pripravil som ukážkový projekt na github s názvom [Assemble
Seed](https://github.com/tibor-kulcar/assemble-seed), ktorý sa dá použiť
ako základ pre vytvorenie statického webu vo viacerých jazykoch. Po
vyklonovaní projektu je potrebné spustiť
`npm install`ktorý nainštaluje lokálne všetky závislosti, nakoniec
spustí `bower install`, ktorý stiahne twitter bootstrap.

Následne stačí použiť grunt task `grunt dev`ktorý vygeneruje stránky,
skompiluje \*.less a \*.coffee zdrojové súbory, nakopíruje statické
súbory na svoje miesto a nakoniec spustí HTTP server na porte 3000.
 Projekt máte pripravený na vaše zmeny. Jedinou podmienkou je mať na
svojom počítači nainštalovaný nodejs a jeho balíkovací systém **npm**.

Štruktúra projektu je myslím vypovedajúca sama za seba:

```
src/
   assets/
       coffee/
       less/
   templates/
       layouts/
       pages/
       partials/
   i18n/
   data/
   Gruntfile.coffee
   .bower.json
  package.json
```

V `layouts` sa nachádza hlavná šablóna, ktorá je použitá pri generovaní
každej stránky.
Samotná štruktúra webu je definovaná štruktúrou v `pages` adresári.
Jazyková verzia je určená v šablóne pomocou premennej `language `a obsah
webu v každom jazyku osobitne sa nachádza v adresári `i18n`.

Pre grunt som nadefinoval ešte 3 publikačné tasky:
`grunt gh_pages` - publikovať web ako github pages
`grunt rsync_deploy` - nakopírovať web na hosting pomocou ssh prístupu
`grunt lfpt_deploy` - upload webu na hosting pomocou ftp účtu

Tento projekt som stihol použiť aj na wireframe prototyping pri našich
dvoch posledných projektoch a verte, že mi ušetril veľa času. [Skúste to
aj vy](https://github.com/tibor-kulcar/assemble-seed)\!
