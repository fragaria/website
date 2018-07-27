---
layout: post
title: Jak jsme počítali New York aneb AWS Lambda v praxi
date: '2016-05-11T12:19:00.000+02:00'
author: Jirka Chadima
tags:
- d21
- ocr
- amazon lambda
- aws
- lambda
modified_time: '2016-05-11T12:21:35.046+02:00'
cloudinary_src: posts/2016-05-11-jak-jsme-pocitali-new-york-aneb-aws__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-7389964546885819327
blogger_orig_url: http://blog.fragaria.cz/2016/05/jak-jsme-pocitali-new-york-aneb-aws.html
---

Na přelomu března a dubna se v New Yorku již popáté konalo [hlasování o
participativních
rozpočtech](http://news.d21.me/en/various/participatory-budgeting-moves-forward-in-new-york-city/) ([\#PBNYC](https://twitter.com/search?q=%23PBNYC))
jednotlivých distriktů (něco jako městské části v Praze). Díky naší
spolupráci s [Demokracií 2.1](https://www.d21.me/) (D21), pro kterou
připravujeme technické řešení, jsme měli možnost se celé akce zúčastnit
a svou troškou přispět k bezproblémovému průběhu hlasování.
Část našeho týmu se v New Yorku dokonce byla podívat na inspekci, ale
cestopisu se bohužel naši čtenáři nedočkají, protože Tibor svou slohovou
práci do uzávěrky nestihl dokončit.

Nejzajímavejší novou úlohou bylo zpracování papírových lístků, které by
ustálo nápor voličů, jejichž odhadované počty se pohybovaly ve vysokých
desetitisících. Stála před námi tedy výzva, jak dostatečně rychle,
přesně a efektivně zpracovat mnoho fyzických hlasovacích lístků.
Rozhodně žádná selanka.

## OCR V Cloudu?

[AWS Lambda](https://aws.amazon.com/lambda/) je bezserverový runtime v
cloudu. Neumíte si to představit? Tak to zkusme takhle: Nemáte servery,
máte jenom funkce, které zpracovávají události. Když nejsou události,
nic neběží, žádná čekající vlákna, žádná naprázdno se točící kolečka.
Když je miliarda událostí, tak se zafrontují a postupně se zpracovávají.
A přesně takhle to funguje: Někde běží nějaké servery, které ví, že když
se něco stane, má se spustit nějaký váš kód.

Jedná se o ideální exekuční model pro vykonávání operací, které mohou
trvat relativně dlouho, ale jejich výsledek vás v danou chvíli vlastně
moc nezajímá. To může být přepočítávání statistik, kontrola konzistence
dat, [generování
PDF](https://www.souki.cz/jak-nepouzivame-v-php-exec) nebo třeba právě
rozpoznávání vyplněných volebních lístků.

Jako runtime jsme zvolili Javascript, který v D21 používáme všude, a tak
jsme začali hledáním OCR knihovny, která by nám usnadnila rozpoznávání
vyplněných nebo nevyplněných checkboxů a QR kódů nebo jiných párovacích
a orientačních značek. Nakonec jsme skončili u kombinace [Document
Vision](https://github.com/creatale/node-dv) a [Form
Vision](https://github.com/creatale/node-fv), které nám umožnily
zpracovávat lístky v následujícím
formátu:

{% include figure.html cloudinary_src='posts/2016-05-11-jak-jsme-pocitali-new-york-aneb-aws__1.jpg' caption='Velmi neoptimalizovaný testovací lístek' %}

Trojice QR kódů nám umožní každý sken zorientovat (klasická translace,
rotace a scaling) a zároveň určuje, co za hlasování daný papírový lístek
reprezentuje. Pomocí předpřipraveného schématu (tj. které checkboxy
patří ke které možnosti) pak na Lambdě rozpoznáváme, jaké konkrétní
možnosti byly na lístku zvoleny.

## Žhavíme železo

Tak rozpoznávat už bychom uměli, ještě potřebujeme Lambdu někudy
dostatečně rychle plnit. Událostí, které spouští Lambda funkci, může
být celá řada, a jednou z nich je i nahrání obrázku do bucketu na S3.
Takže už nám chybí jenom sada vysokorychlostních skenerů...

<blockquote class="twitter-tweet" data-lang="en"><p lang="pt" dir="ltr"><a href="https://twitter.com/Fragariacz?ref_src=twsrc%5Etfw">@Fragariacz</a> I papir umime <a href="https://t.co/xb3aY7FEF3">pic.twitter.com/xb3aY7FEF3</a></p>&mdash; Pavel Vojacek (@pavel_mxsf) <a href="https://twitter.com/pavel_mxsf/status/716067794312413185?ref_src=twsrc%5Etfw">April 2, 2016</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Video není propagační materiál, ale opravdový provoz v průběhu
hlasování. Díky téhle rychlosti a svižnému internetu jsme všech téměř
70 tisíc odevzdaných a oboustranně naskenovaných lístků dostali na S3
jako nic. V původním scénáři jsme je chtěli zpracovávat postupně každý
den, ale kvůli souhře mnoha nedotažeností, nedorozumnění a drobných chyb
jsme se dostali do situace, kdy jsme je museli zpracovat najednou jako
jednu velkou hromadu.

## A jak to dopadlo?

Nakonec vlastně docela dobře. Jak lze vidět v grafu, při ostrém spuštění
po půlnoci Lambdou v absolutní špičce proteklo víc než 3 tisíce skenů za
minutu a během 3 hodin jsme je měli všechny rozpoznané, nebo alespoň
roztříděné podle typu chyby. V následujících hodinách pak probíhalo
ruční dočištění, drobnou část souborů jsme rozpoznáváním prohnali
znovu s trochu jiným nastavením, a bylo
hotovo.

{% include figure.html cloudinary_src='posts/2016-05-11-jak-jsme-pocitali-new-york-aneb-aws__2.png' caption='Velmi neoptimalizovaný testovací lístek' %}

Pro tento typ nárazových a nesynchronních úloh je tedy AWS Lambda
naprosto ideálním řešením, a to i přes to, že teoreticky máte k
dispozici "pouze" 100 paralelně běžících funkcí. V praxi to většinou
bohatě stačí, a zdá se, že bezserverová architektura se dá používat i na
[mnohem složitější úlohy](http://apex.run/).
