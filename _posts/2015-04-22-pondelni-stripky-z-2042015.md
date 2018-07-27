---
layout: post
title: Pondělní střípky z 20.4.2015
date: '2015-04-22T18:28:00.000+02:00'
author: Lukáš Marek
tags:
- stripky
- lodash
- underscore
- cst-01
- ibm
- python
- watson
modified_time: '2015-05-11T13:11:22.825+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5710455784489276737
blogger_orig_url: http://blog.fragaria.cz/2015/04/pondelni-stripky-z-2042015.html
---

Je tu opět pondělí (no dobře, středa) a tedy čas na pravidelné střípky.
Tentokrát díky hlavně Hynkovi, který hned napoprvé přidal celé dva
příspěvky.

### git-po-merge

(Nejen) Python používá pro lokalizaci [formát
gettext](http://en.wikipedia.org/wiki/Gettext).

Gettext může být šikovný, ale vzniklé `*.po` soubory se dost těžko
udržují v Gitu – protože jsou automaticky generované a nezáleží na
pořadí položek, tak mergeování je peklo.

[git-po-merge](https://www.npmjs.com/package/git-po-merge) je plugin do
Gitu, který tohle peklo řeší. Zkuste\!

### Řetězení v lo-dash

[lodash](https://lodash.com/) je náhrada
[Underscore](http://underscorejs.org/) což nebudu rozebírat víc, abyste
si nemysleli, že se píše rok 2009.

Ale víte, že jednotlivé operace v lodash se dají
řetězit?


    _(records).filter('user').map('user').filter('email').map('email').value();

Příklad tady:

<iframe width="100%" height="300" src="//jsfiddle.net/eyvy22kr/1/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Watson kuchtík

IBM už neví jak propagovat svůj superpočítač Watson. Aktuálně to [zkouší
přes jídlo](https://www.ibmchefwatson.com/). Watson má dle dostupných
ingrediencí vytvořit nový, neotřelý pokrm.

Soudě podle zatím zveřejněných receptů to funguje podobně jako
[Studentská
kuchařka](http://www.studentskakucharka.cz/?recept=648-pizza-raz-dva-tri)
– obsah ledničky hodím na pánev a vhodně pojmenuji.

### Sprayable energy

Občas si do práce objednáme nějakou blbost. Tenhle měsíc je to
jednoznačně [Sprayable
energy](http://sprayable.co/products/sprayable-energy/)\!

Až dorazí, dáme vědět, jak funguje.

### CST–01 \#fail

Když už jsme u těch objednávek. [Tyhle
hodinky](https://www.kickstarter.com/projects/1655017763/cst-01-the-worlds-thinnest-watch/description)
jsem si na Kickstarteru chtěl pořídil v roce 2012.

Vypadá to, že se jich [už
nedočkám](https://www.kickstarter.com/projects/1655017763/cst-01-the-worlds-thinnest-watch/posts/1203110?ref=backer_project_update).
Článek si ale přečtěte – vybrat milión dolarů a bydlet v dodávce, to
chce srdce.
