---
layout: post
title: Debugujeme v Node.js
date: '2015-05-27T09:00:00.000+02:00'
author: Hynek Urban
tags:
- debug
- nodejs
modified_time: '2015-05-27T10:05:07.012+02:00'
thumbnail: http://2.bp.blogspot.com/-4tu1uJoUPkc/VWLQzuJptyI/AAAAAAAAAhc/Isv16Hxfbd4/s72-c/node_inspector.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2944406495491192110
blogger_orig_url: http://blog.fragaria.cz/2015/05/debugujeme-v-nodejs.html
---

Jakožto nově příchozí do světa Node.js jsem se záhy začal zajímat o
způsob, jak efektivně ladit kód v Node.js. Donedávna jsem se pohyboval
především v prostředí Pythonu, kde jsem byl zvyklý používat
[pdb](https://docs.python.org/3/library/pdb.html). Jaké jsou alternativy
pro Node.js?

<span id="more"></span>

### Výpis do konzole

Základní způsob ladění, totiž výpis do konzole, lze s úspěchem použít
asi v jakémkoliv programovacím jazyce a na jakékoli platformě.
Javascript není výjimkou — [CommonJS](http://www.commonjs.org/) definuje
modul console, který lze pro výpis použít, typicky asi pomocí funkce
`console.log`.

V případě Node.js je tento modul rovnou dostupný prostřednictvím
globální proměnné se stejným názvem (tj. "console"). I když je podle
mojí zkušenosti tento způsob debugování dostačující v drtivé většině
případů, je natolik jednoduchý, že asi nemá cenu se mu dále věnovat.

### Command-line debugger

Node (nebo spíše
[V8](https://en.wikipedia.org/wiki/V8_%28JavaScript_engine%29)) obsahuje
i vlastní plnohodnotný debugger, který podporuje breakpointy, krokování
i watchery.
[Dokumentace](https://nodejs.org/api/debugger.html#debugger_watchers)
je, myslím si, docela pěkná, ale i tak zde použití nodovského debuggeru
přiblížím.

#### Jak přistoupit k rozhraní ladícího nástroje

Prvním krokem je spuštění nodovského procesu v debug módu:

    node debug app.js

Pokud náhodou používáte [nodemon](https://github.com/remy/nodemon) pro
automatické načítání změn kódu, i ten lze takto spustit:

    nodemon --debug app.js

(Existuje rovněž způsob, jak se připojit k již běžícímu Node.js procesu,
který můžete najít ve výše zmíněné dokumentaci.)

Vykonávání kódu se zastaví na první řádce (výrazu) vaší aplikace a v
terminálu uvidíte rozhraní debuggeru. I když už teď lze krokovat,
interaktivně vstupovat do běžícího prostředí a podobně, myslím, že
užitečnější je nejdřív definovat breakpointy na místech aplikace,
která nás blíže zajímají.

#### Breakpointy

Řekněme, že máme tuto jednoduchou funkci:

    function foo(bar) {
        return bar.reduce(function (curr, prev) {return curr + prev; }, 0);
    }

Dále si představme, že na nějakém místě v naší aplikaci čekáme, že tato
funkce vrátí konkrétní číslo, třeba 90. Jenže ouha, vrácené číslo je 89.
Nejjednodušší způsob, jak zjistit proč, je podívat se, jaký argument
funkce dostává. To můžeme udělat třeba tak, že na vhodné místo umístíme
breakpoint:

    function foo(bar) {
        debugger; // Definováno v ECMAScript 5.
        return bar.reduce(function (curr, prev) {return curr + prev; }, 0);
    }

Po spuštění aplikace v debug módu (a přeskočení úvodního breakpointu
pomocí příkazu `cont`) se vykonávání kódu zastaví na řádce obsahující
výraz "debugger". Nyní si můžeme prohlédnout, co vlastně funkce dostává
za argumenty:

    break in hele.js:2
      1 function foo(bar) {
      2     debugger; // Definováno v ECMAScript 5.
      3     return bar.reduce(function (curr, prev) {return curr + prev; }, 0);
      4 }
    debug> repl
    Press Ctrl + C to leave debug repl
    > bar
    [ 27, 16, 35, 11 ]

Breakpointy můžeme nastavit buď přímo v kódu (jako v příkladu nahoře),
nebo v rozhraní běžícího debuggeru pomocí příkazu `setBreakpoint`.
Všimněte si také příkazu `repl`, který jsme zadali, abychom se
následně mohli dotázat na obsah proměnné `bar`.

#### REPL (Read-Eval-Print Loop) během ladění

U předchozího příkladu mohlo někoho napadnout, že jednoduchý výpis do
konzole by posloužil stejnému účelu i bez debuggeru — a měl by pravdu.
Faktem nicméně je, že existují výrazně složitější situace, kde jeden
výpis nestačí, a pokud vývojář nemá v zásobě jiný trik, většinou končí
u mnohokrát opakovaného pouštění aplikace s různými výpisy ve snaze
objevit podstatu problému.

To je přesně situace, kde se vyplatí použít příkaz `repl`. Ten umožňuje
vstup do interaktivního módu — vykonávání programu je stále zastaveno na
daném místě (breakpointu), ale přitom můžeme v javascriptové konzoli
přistupovat ke všem proměnným/objektům dostupným v aktuálním rámci.
Objekty můžeme nejen zkoumat, ale i měnit, přičemž změny zůstanou v
platnosti i poté, co se program opět rozběhne (příkaz `cont` debuggeru).
Myslím, že je evidentní, o jak mocný nástroj pro ladění se jedná.

#### Krokování a watchery

Alternativou k vypisování proměnných nebo k jejich interaktivnímu
zkoumání v REPLu je nastavení watcherů spojené s krokováním. Příkazem
`watch("expression")` (např. `watch("bar")`) můžeme debuggeru říci, aby
nám u každého breakpointu (i při každém dalším kroku — příkazy `next`,
`step` a `out`, viz dokumentace) ukázal, jaká je hodnota zadaného
výrazu.

Výhodou oproti obyčejným výpisům je to, že výraz, který nás zajímá,
specifikujeme pouze jednou, a potom už jenom pohodlně sledujeme, jak se
mění během průchodu aplikací.

### node-inspector

Debugger popsaný v předchozí sekci je užitečný, ale ze zkušenosti vím,
že někteří vývojáři považují prostředí příkazové řádky za nekomfortní.
Proto bych chtěl zmínit ještě jeden nástroj, který lze při debugování
použít. Jedná se o
[node-inspector](https://github.com/node-inspector/node-inspector) — npm
modul, který umožňuje ladit nodovský kód v Chrome Developer Tools
debuggeru.

Stačí tento modul nainstalovat (např. `npm install -g node-inspector`) a
následně jej spustit formou `node-debug app.js`. Výsledkem je, že se
spustí aplikace a zároveň se otevře Chrome a jeho debugger. Ten lze
použít na všechno, co bylo popsáno v minulé sekci, s plným pohodlím
grafického uživatelského
rozhraní.

[![](http://2.bp.blogspot.com/-4tu1uJoUPkc/VWLQzuJptyI/AAAAAAAAAhc/Isv16Hxfbd4/s400/node_inspector.png)](http://2.bp.blogspot.com/-4tu1uJoUPkc/VWLQzuJptyI/AAAAAAAAAhc/Isv16Hxfbd4/s1600/node_inspector.png)

Závěrem bych tak snad jen řekl, že se zdá, že ladit kód v Node.js není o
nic těžší nebo jednodušší než na jiných platformách. Alespoň do chvíle,
než začnete používat
[Promises](http://www.html5rocks.com/en/tutorials/es6/promises/), ale o
těch snad zase radši někdy příště.
