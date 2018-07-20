---
layout: post
title: Soumrak promises v Javascriptu aneb Pondělní střípky z 2.5.2016
date: '2016-05-03T09:13:00.000+02:00'
author: Lukáš Marek
tags:
- stripky
- async
- nodejs
- promises
modified_time: '2016-05-03T09:23:24.425+02:00'
thumbnail: https://4.bp.blogspot.com/-8plEfspkc7Q/VyhRs8Kci2I/AAAAAAAAAn4/bsY3ynVYj18C4-tdg5B6pLvYOmKqdXDkwCLcB/s72-c/236H.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-3691982208680064191
blogger_orig_url: http://blog.fragaria.cz/2016/05/soumrak-promises-v-javascriptu-aneb.html
---

Dnes si Hynek uzurpoval skoro dvacet minut, aby nám demonstroval jak
nahradit promises *reaktivním programováním* v NodeJS.
I Filip, který jinak rýpe do všeho, sledoval
výklad téměř bez dechu. Zkusím  tedy Hynkovu přednášku převyprávět i
vám.

Callback metody, které komplikovaly Javascriptový kód už jsou dávno za
zenitem. Najdete je možná v JQuery, ale NodeJS i AngularJS už dávno pro
asynchronní volání používají
[promises](https://en.wikipedia.org/wiki/Futures_and_promises). Pokud
nevíte, na co promises jsou, tak vítám do 21. století a doporučuju třeba
[tenhle
článek](http://www.html5rocks.com/en/tutorials/es6/promises/).

|                                                                                                                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![](https://4.bp.blogspot.com/-8plEfspkc7Q/VyhRs8Kci2I/AAAAAAAAAn4/bsY3ynVYj18C4-tdg5B6pLvYOmKqdXDkwCLcB/s400/236H.jpg)](https://4.bp.blogspot.com/-8plEfspkc7Q/VyhRs8Kci2I/AAAAAAAAAn4/bsY3ynVYj18C4-tdg5B6pLvYOmKqdXDkwCLcB/s1600/236H.jpg) |
|                                                                                                        (c) http://www.gratisography.com                                                                                                        |

Anebo možná ne. Vypadá to, že i nad promises se začínají stahovat
mračna. Standard ES6 totiž obsahuje tzv.
[generátory](https://developer.mozilla.org/cs/docs/Web/JavaScript/Guide/Iterators_and_Generators)
a klíčové slovo *yield*, což umožňuje použít [reaktivní
programování.](https://en.wikipedia.org/wiki/Reactive_programming)
Jeho použitím se dají zjednodušit některé use-cases a vyhnout se použití
promises.

Hynek nám to vysvětlil na příkladu unit testu. Následující kus kódu by
mohl být třeba ze systému na prodej bannerové reklamy:

I když je kód super jednoduchý a dobře okomentovaný, stejně je tam těch
promises **prostě moc**. Dá se v tom možná vyznat, ale je to spousta
*boilerplate* kódu a čitelnost trpí.

S použitím (zneužitím?) generátorů a
[couroutine](http://bluebirdjs.com/docs/api/promise.coroutine.html) z
knihovny Bluebird se dostaneme k mnohem čitelnějšímu kódu:

Jak to funguje? Všimněte si, že celý test je napsán jako [generátorová
funkce](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Statements/function*)
(to je to *function\**). A obalen voláním couroutine (to je to
*co()*).

Tady je potřeba malou odbočku – jak fungují generátory? Generátor je ze
strany konzumenta klasický iterátor. Na každé volání funkce *next()* se
vrátí jedna hodnota. Ze strany producenta se používá klíčové slovo
*yield*, což je takový malý *return*. Vrátí další hodnotu v pořadí a
"uspí" provádění funkce, dokud není zavolán znovu *next()*.

A právě tohle uspání je tady zneužito. Každé volání *next()/yield* vrátí
jednu promise, na kterou se v obalovací funkci počká a pak se zavolá
znovu *next()*. Zajímavé, co?

Samozřejmě, že promises umožňují i jiné hrátky, jako třeba
*Promises.all()*, které generátory nahradit nedokáží. Ale pro popsaný
příklad sekvenčního volání jde o elegantní náhradu.

Takže promises se zatím o své místo na slunci bát nemusí.
