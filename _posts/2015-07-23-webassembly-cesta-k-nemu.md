---
layout: post
title: WebAssembly a cesta k němu
date: '2015-07-23T12:31:00.000+02:00'
author: Hynek Urban
tags:
- javascript
- webassembly
- asm.js
modified_time: '2015-07-23T12:50:42.325+02:00'
thumbnail: http://4.bp.blogspot.com/-HRuz6pT1KDo/VawKmZseNgI/AAAAAAAAAAY/KMdIChZwKss/s72-c/Diagram1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-6543258345287958170
blogger_orig_url: http://blog.fragaria.cz/2015/07/webassembly-cesta-k-nemu.html
---

Je to asi měsíc, co Brendan Eich (autor JavaScriptu) [zveřejnil na svém
blogu](https://brendaneich.com/2015/06/from-asm-js-to-webassembly/)
oznámení o WebAsembly, binárním formátu pro vykonavatelný kód, který by
měl v budoucnu koexistovat v prohlížečích vedle JavaScriptu. Pokud
projekt nevyzní do ztracena (a zdá se, že má všechny předpoklady pro to,
aby se to nestalo), jedná se zřejmě o poměrně velkou novinku.

Tato novinka ovšem nepřichází jako blesk z čistého nebe, předcházela jí
víceletá snaha různých stran o to, aby prohlížeče podporovaly i jiné
jazyky než JavaScript - ať už nativně (vzpomeňme třeba ve své době velké
ambice jazyka [Dart](https://www.dartlang.org/) od Googlu) nebo pomocí
kompilace. Je to právě současný přístup ke kompilaci do JavaScriptu,
konkrétně [asm.js](http://asmjs.org/), ze kterého WebAssembly vychází, a
který se snaží posunout zase o krok dále. Pojdme si tedy o asm.js říci
něco bližšího.

### LLVM a Emscripten

Než se dostaneme k samotnému asm.js, je třeba se zmínit ještě o projektu
[LLVM](http://llvm.org/), což je sada nástrojů pro optimalizaci během
kompilace a generování nativního kódu. Klasická kompilace jazyků jako je
C nebo C++ do binární formy (v tomto případě pomocí LLVM) zjednodušeně
funguje nějak
takhle:

[![](http://4.bp.blogspot.com/-HRuz6pT1KDo/VawKmZseNgI/AAAAAAAAAAY/KMdIChZwKss/s640/Diagram1.png)](http://4.bp.blogspot.com/-HRuz6pT1KDo/VawKmZseNgI/AAAAAAAAAAY/KMdIChZwKss/s1600/Diagram1.png)

  - Frontend je komponenta zodpovědná za převod původního jazyka (např.
    C, C++, ale i jiných) do jakéhosi mezijazyka, tzv. Intermediate
    Representation (IR). Každý zdrojový jazyk má typicky svůj frontend.
  - Optimizer optimalizuje program; na vstupu i na výstupu je IR.
  - Backend je zodpovědný za převod IR do nativního kódu. Každá CPU
    architektura má svůj backend.

Je nutné, aby backend generoval nativní kód? Ukazuje se, že není - pro
LLVM je možné napsat jakýkoli backend, který přeloží IR do libovolné
jiné formy. Takovým backendem je i
[Emscripten](http://kripken.github.io/emscripten-site/), který místo
nativního kódu generuje JavaScript. To znamená, že můžeme vzít program
napsaný, dejme tomu, v C++, přeložit ho pomocí Emscripten do JavaScriptu
a pustit v prohlížeči. Schematicky
znázorněno:

[![](http://1.bp.blogspot.com/-V3DVwO6_7Gc/VawKor0ZtFI/AAAAAAAAAAg/Eya3ghISLs4/s640/Diagram2.png)](http://1.bp.blogspot.com/-V3DVwO6_7Gc/VawKor0ZtFI/AAAAAAAAAAg/Eya3ghISLs4/s1600/Diagram2.png)

A zde již do hry vstupuje asm.js.

### Asm.js

Jak již bylo řečeno, LLVM backendy typicky generují strojový kód, který
se v zásadě skládá z jednoduchých aritmetických operací. Emscripten sice
generuje JavaScript, ale ani tento kód neobsahuje nic než relativně
jednoduché instrukce. Jinými slovy, celá škála dynamických vlastností
JavaScriptu, dynamickým typováním počínaje a garbage collection konče,
není v kódu, který vytvoří Emscripten, vůbec využita.

Toho si všimli v Mozille a napadlo je - pokud bychom mohli počítat s
tím, že kus Javascriptu nevyužívá dynamické vlastnosti jazyka, mohli
bychom výrazně zrychlit jeho vykonávání. V tom případě totiž
javascriptový engine může přeskočit velké množství různých runtime
kontrol, a dokonce si může kusy kódu předkompilovat.

Výsledkem byl projekt asm.js - jasně definovaná podmnožina JavaScriptu,
která nevyužívá dynamických vlastností jazyka, a může proto běžet
výrazně rychleji než "obvyklý" JavaScript, pokud je tomu daný
javascriptový engine uzpůsoben. Díky tomu, že se stále jedná o platný
JavaScript, odpadají problémy se zpětnou kompatibilitou - prohlížeče,
které asm.js nepodporují, mohou asm.js kód zpracovávat stejně jako
jakýkoli jiný JavaScript.

Podobně jako jsme zvyklí používat 'use strict' direktivu, je možné na
začátku modulů a funkcí deklarovat použití asm.js pomocí direktivy 'use
asm'.

Narazí-li prohlížeč podporující asm.js na tuto direktivu, ověří, zda se
jedná o validní asm.js kód, a následně jej vykoná s příslušnými
optimalizacemi. Asm.js dnes podporuje především Mozilla Firefox, ale do
jisté míry (čti: dojde ke zrychlení, ale k méně dramatickému) i Chrome a
[výhledově i Internet
Explorer](http://blogs.msdn.com/b/ie/archive/2015/02/18/bringing-asm-js-to-the-chakra-javascript-engine-in-windows-10.aspx).
Podle
[benchmarků](http://arewefastyet.com/#machine=28&view=breakdown&suite=asmjs-apps)
se zdá, že ve Firefoxu běží asm.js kód jen asi 1,5x pomaleji než nativní
verze.

Shrnuto: dnes tedy můžeme psát kód pro web v různých jazycích (při
využtí asm.js asi nejsnáz stále v C/C++), který v prohlížeči poběží
téměř tak rychle jako by běžel nativně. Dá se to ještě zlepšit?

### WebAssembly

Asm.js má i nevýhody:

  - Z koncepčního hlediska se zdá přinejmenším podezřelé "schovávat"
    nízkoúrovňový jazyk do JavaScriptu.
  - Výsledek pořád ještě není tak rychlý jak by mohl být. Brendan Eich
    ve svém úvodním příspěvku píše, že dekomprese a parsování asm.js
    kódu jsou tím, co výsledný uživatelský zážitek momentálně nejvíce
    zpomaluje.
  - Sémantika JavaScriptu jakožto kompilačního cíle může být z hlediska
    některých zdrojových jazyků omezující.

Tyto problémy by měl řešit nový standard nazvaný
[WebAssembly](https://github.com/WebAssembly). Jedná se o binární formát
pro nízkoúrovňový kód, který v první fázi bude koexpresivní s asm.js
(aby umožnil konverzi WebAssembly do asm.js v prohlížečích, které web
assembly třeba nebudou zpočátku podporovat), ale v budoucnu se
předpokládá jeho další rozvoj za hranice možností sémantiky
JavaScriptu.

První výsledky vypadají slibně - viz [tento
článek](http://blogs.unity3d.com/2015/06/18/webgl-webassembly-and-feature-roadmap/),
kde se mimo jiné dočteme:

> *Experimenting with a prototype WebAssembly format on a build of our
> AngryBots demo, we saw the size of the generated JavaScript code go
> from 19.0 MB of asm.js code (gzip-compressed to 4.1 MB) down to 6.3 MB
> of WebAssembly code (gzip-compressed to 3.0 MB). This means that the
> amount of data the browser needs to process gets reduced by 3.0x, and
> the compressed download size gets reduced by 1.4x.*

Připočtěme k tomu fakt, že na standardu WebAssembly údajně spolupracují
Mozilla, Google i Microsoft, a myslím, že je jasné, že potenciál
posunout web zase o krok dál má tento projekt opravdu velký.

Pokud vás to zaujalo, můžete si přečíst [tento
článek](http://www.2ality.com/2015/06/web-assembly.html), který o
WebAssembly pojednává o něco podrobněji.
