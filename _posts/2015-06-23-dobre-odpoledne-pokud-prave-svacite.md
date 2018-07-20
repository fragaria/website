---
layout: post
title: Pondělní střípky z 22.6.2015
date: '2015-06-23T22:14:00.000+02:00'
author: Lukáš Marek
tags:
- stripky
- infer
- angularjs
- critical css
- gr
modified_time: '2015-06-23T22:14:49.514+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-6945578139555467301
blogger_orig_url: http://blog.fragaria.cz/2015/06/dobre-odpoledne-pokud-prave-svacite.html
---

Dobré odpoledne, pokud právě svačíte. Uplynuly tři týdny, než jsem se
odvážil opět [převzít žezlo po
Martinovi](http://blog.fragaria.cz/2015/06/pondelni-stripky-z-162015.html).

Zkusím to tedy opět trochu na vážnější notu..

## Facebook Infer

Facebook má poslední dobou pěkně našlápnuto.
[ReactJS](http://facebook.github.io/react/) určitě znáte, takže na něj
ani neupozorňujeme. *Navíc je to pořád jen chudší brácha AngularJS*.

Nejnovějším z projektů, které Facebook uvolnil je
[Infer](http://fbinfer.com/) – nástroj pro statickou analýzu Java, C a
Objective-C kódu.

Zatím je proti známému [PMD](http://pmd.sourceforge.net/) dost v
plenkách, ale slibuje, že bude provádět kontrolu kódu [pěkně
vědecky](http://fbinfer.com/docs/separation-logic-and-bi-abduction.html).

Jako obvykle: držíme palečky\!

## gr

Dalším z řady ne-úplně-nezbytných nástrojů pro příkazovou řádku je
[gr](http://mixu.net/gr/). Slouží pro správu více gitových repository
najednou. Související repository se označí tagem (třeba \#work) a tím
pádem stačí napsat: `gr #work status` a dozvíte se informace o všech
projektech najednou.

Když jsem gr představoval, tak Robin začal z z paměti sypat Bashový
skript, který umí to samé. Pro Robina to tedy není, pro nás ostatní to
stojí za pokus.

## Critical CSS

Jestli nečtete [blog Martina Michálka](http://www.vzhurudolu.cz/), tak
to rychle napravte. Začít můžete třeba článkem o [critical
CSS](http://www.vzhurudolu.cz/blog/35-critical-css).

Je to docela zajímavý nápad – vložit přímo do HTML nejzásadnější kousky
CSS, aby úvodní vykreslení proběhlo co nejrychleji. Fonty, styly
nepoužité na titulní stránce a ostatní *zbytečnosti* jsou v kompletním
CSS souboru, který se načte *normálně* pomocí tagu `<link>`.

Taky máte pocit, že to už tady [jednou
bylo](http://www.w3.org/Style/Examples/011/firstcss.en.html)? :)

## Alan Turing

Jo a dnes by měl narozeniny [Alan
Turing](https://en.wikipedia.org/?title=Alan_Turing), tak si na něj
vzpomeňme\!
