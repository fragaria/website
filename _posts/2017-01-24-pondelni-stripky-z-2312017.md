---
layout: post
title: Pondělní střípky z 23.1.2017
date: '2017-01-24T11:05:00.002+01:00'
author: Lukáš Marek
tags:
- stripky
- etckeeper
- kalhoty
- report-uri
modified_time: '2017-01-24T13:52:17.028+01:00'
thumbnail: https://1.bp.blogspot.com/-1m372N2IuQ0/WIcSzGbwS3I/AAAAAAAAAy0/bZurnIWrbeslkr0s8CKcUyTGlLtwo2FaQCLcB/s72-c/hy99meknjhm-sandis-helvigs.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4405088734590585560
blogger_orig_url: http://blog.fragaria.cz/2017/01/pondelni-stripky-z-2312017.html
---

Kalhoty jsou na cestě. Ve Fragarii byl opravdový architekt\! Hrajeme si
s RxJS v Angularu 2.0. A další.

### Drby z kanclu

*Drby z kanclu* zařazujeme hlavně pro Denisku, která čte střípky ráda,
ale prográmátorské novinky jí moc nezajímají.
Takže Deniska - první zkoušení kalhot proběhne příští týden a budou mít
na sobě jahodu\! To mi připomíná: *OK, Google. Ulož upomínku: vzít si v
pondělí ráno čistý trenky\!*

### Architekt ve Fragarii

Ve Fragarii jsme měli na návštěvě opravdového architekta. Teda, ne že
bysme tu nebyli samí architekti, ale tohle byl architekt architekt. Je
to jasný?
Ne? No prostě pan [Honza je architekt](http://www.zalskyarchitekt.cz/),
který dostal za úkol zařídit, abysme se do našeho kanclíku vešli i se
stále rostoucím počtem architektů.

Pan architekt se s problémem popasoval dokonale a dokonce každému z
našich architektů navrhl na stůl malou zahrádku.
Architekt a pěstitel Filip už přesně tuší, co na ní bude růst a Mates
připravuje soutěž o zahrádkáře
měsíce.

[![](https://1.bp.blogspot.com/-1m372N2IuQ0/WIcSzGbwS3I/AAAAAAAAAy0/bZurnIWrbeslkr0s8CKcUyTGlLtwo2FaQCLcB/s400/hy99meknjhm-sandis-helvigs.jpg)](https://1.bp.blogspot.com/-1m372N2IuQ0/WIcSzGbwS3I/AAAAAAAAAy0/bZurnIWrbeslkr0s8CKcUyTGlLtwo2FaQCLcB/s1600/hy99meknjhm-sandis-helvigs.jpg)
*Návrh našeho nového kanclu (vizualizace)*

### Observables, RxJS a AngularJS 2.0

Poté si vzal slovo architekt Filip a začal nám vysvětlovat, jak na
[Prezident 21](https://www.prezident21.cz/candidates) používají
[RxJS](http://reactivex.io/rxjs/) a
[Observables](https://en.wikipedia.org/wiki/Observer_pattern).
Popravdě, většinu času jsem čuměl jak bagr na tvrdou hlínu. Ale bacha,
jestli to myslíte s vývojem frontendových aplikací vážně a
[Promises](https://docs.angularjs.org/api/ng/service/$q) z Angularu 1.x
už máte v malíku, koukejte si Observables nastudovat. Za rok se bez toho
neobejdete (a je jedno jestli děláte v Angularu nebo třeba v ReactJS).
Škoda, že zde nemůžu přednášku zopakovat, proto doufám, že o tom Filip
něco napíše. Na závěr jeden dotaz z publika:
\- Co se stane, když zmerguju cold a hot stream?
\- Bude vlažnej.

PS: Dobrý úvod do Observables [je
tady](http://blog.angular-university.io/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/).

### etckeeper

Architekt Jirka nám ukázal
[etckeeper](https://etckeeper.branchable.com/).
Je to nástroj na automatické verzování adresáře `/etc` do Gitu, což se
hodí zejména lidem s Unixem.
Instalační skripty totiž soubory v `/etc` často upravují. Hodí se mít
přehled o tom, co se při instalaci změnilo, případně to umět vrátit
zpátky.
Sice jsme se shodli, že na Macu to potřeba není, ale když teď koukám na
svůj `/etc`, tak už si tak jistej nejsem.

### report-uri

Architekt Jirka tím neskončil a vrhnul se i do vod aplikační
bezpečnosti. Předpokládám, že
[Content-Security-Policy](https://scotthelme.co.uk/content-security-policy-an-introduction/)
(CSP) všichni znáte. Kdo tápe, tak CSP je ta věc, kvůli které vám
prohlížeč odmítne zavolat REST API protože máte blbě nastavené CSP
hlavičky na serveru.
Co se ale tolik neví  (čti: já jsem to nevěděl) je, že prohlížeč můžete
nastavit, aby v případě, že *zařízne* HTTP request, [poslal
zprávu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri)
na předem definovanou adresu.

A proto je tu projekt [report-uri.io](https://report-uri.io/) - stačí se
zaregistrovat, v hlavičkách začít posílat adresu report-uri.io a můžete
si prohlížet, které zdroje prohlížeč zakazuje ve vašem projektu. Na
ladění CSP geniální - a navíc zjistíte, kolik lidí má zavirované
prohlížeče.
A to nejlepší? Je zadarmo\!

Architekt Lukáš se loučí a zase za týden\!
