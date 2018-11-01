---
layout: post
title: Povídání o hyperkrychlích
date: '2016-01-06T12:28:00.000+01:00'
author: David Pěgřímek
tags:
- hyperkrychle
- off-topic
modified_time: '2016-01-06T21:28:56.017+01:00'
cloudinary_src: posts/2016-01-06-povidani-o-hyperkrychlich__5.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-8688357239949204146
blogger_orig_url: http://blog.fragaria.cz/2016/01/povidani-o-hyperkrychlich.html
---

Dnešní článek bude na rozdíl od těch předcházejících laděn na poněkud
matematičtější notu. Budeme se zabývat hyperkrychlí, což je objekt známý
z teorie grafů.

### Zní to složitě, ale těžké to není

Na začátek si zkusíme poněkud tajemně znějící pojem trošku rozpitvat a
ukázat jakou má souvislost s tradiční třírozměrnou krychlí v prostoru. U
hyperkrychle je vždy potřeba říct jakou má dimenzi. Podívejme se
kupříkladu na Obrázku 1 na hyperkrychli dimenze dvě.

{% include figure.html cloudinary_src='posts/2016-01-06-povidani-o-hyperkrychlich__1.png' caption='Obrázek 1: Hypekrychle dimenze dvě.' %}

Nic objevného se tady nekoná, vypadá jako obyčejný čtverec. Dle
očekávání hyperkrychle dimenze tři na Obrázku 2 vypadá jako krychle,
ale zdání může klamat.

{% include figure.html cloudinary_src='posts/2016-01-06-povidani-o-hyperkrychlich__2.png' caption='Obrázek 2: Hypekrychle dimenze tři.' %}


U hyperkrychle nás nezajímá fyzikální interpretace rozměrů, tedy zda
jsou prostorové, časové nebo jiné. Zajímá nás pouze propojení vrcholů
hranami mezi sebou. Proto je v pořádku že hyperkrychle dimenze tři může
vypadat i jako na Obrázku 3.

{% include figure.html cloudinary_src='posts/2016-01-06-povidani-o-hyperkrychlich__3.png' caption='Obrázek 3: Stále hypekrychle dimenze tři, jen jinak nakreslená.' %}

Kde takovou hyperkrychli vzít? Hyperkrychli dimenze tři vytvoříme tak,
že vezmeme dvě hyperkrychle dimenze dvě a spárujeme protější vrcholy
novými hranami. Stejně tak vytvoříme hyperkrychli dimenze čtyři -
spárováním vrcholů dvou hyperkrychlí dimenze 3 jak je vidět na Obrázku


{% include figure.html cloudinary_src='posts/2016-01-06-povidani-o-hyperkrychlich__4.png' caption='Obrázek 4: Hypekrychle dimenze čtyři s vyznačeným propojením dvou hyperkrychlí dimenze tři.' %}

Opačným způsobem (tedy řezáním) snadno dostaneme z hyperkrychle dimenze
dva hyperkrychli dimenze jedna a z ní hyperkrychli dimenze nula. Zkuste
si to :). Obecně hyperkrychli dimenze
![](http://www.codecogs.com/gif.latex?n) budeme označovat jako
![](http://www.codecogs.com/gif.latex?Q_n) kde
![](http://www.codecogs.com/gif.latex?n) je číslo větší nebo rovno nule.
A když už víme jak hyperkrychle vypadá, zkusme se zamyslet nad tím,
kolik má taková hyperkrychle dimenze
![](http://www.codecogs.com/gif.latex?n) vrcholů. Snadno spočítáme že
![](http://www.codecogs.com/gif.latex?Q_0) má jen jeden vrchol,
![](http://www.codecogs.com/gif.latex?Q_1) dva vrcholy,
![](http://www.codecogs.com/gif.latex?Q_2) má čtyři a
![](http://www.codecogs.com/gif.latex?Q_3) osm. Protože každá
![](http://www.codecogs.com/gif.latex?Q_n) je vytvořena spojením dvou
hyperkrychlí ![](http://www.codecogs.com/gif.latex?Q_%7Bn-1%7D) (tedy
dimenzí o jednu menší), musí mít
![](http://www.codecogs.com/gif.latex?Q_n) má dvakrát tolik vrcholů než
![](http://www.codecogs.com/gif.latex?Q_%7Bn-1%7D), čtyřikrát tolik
vrcholů než ![](http://www.codecogs.com/gif.latex?Q_%7Bn-2%7D), osmkrát
tolik vrcholů než ![](http://www.codecogs.com/gif.latex?Q_%7Bn-3%7D) a
tak dále. Tedy počet vrcholů ![](http://www.codecogs.com/gif.latex?Q_n)
je
![](http://latex.codecogs.com/gif.latex?$\\underbrace%7B2&space;\\cdot&space;2&space;\\cdot&space;2&space;\\cdots&space;2%7D_%7Bn&space;\\times%7D$
"$\\underbrace{2 \\cdot 2 \\cdot 2 \\cdots 2}_{n \\times}$") a to je
![](http://www.codecogs.com/gif.latex?2%5En) vrcholů.

Vrcholy to nejsou jen tak obyčejné a není náhodou, že je na obrázcích
kreslíme různě. Vrcholy každé hyperkrychle lze totiž rozdělit na černé a
bílé vrcholy a to takovým způsobem, že jsou hranami spojeny jen černé
vrcholy s bílými. Nikdy nejsou mezi sebou spojené žádné dva černé
vrcholy a stejně tak nejsou nikdy mezi sebou spojené ani žádné dva bílé
vrcholy. Této vlastnosti se říká bipartita. Například graf se třemi
vrcholy který vypadá jako trojúhelník bipartitní není.

Poslední pojem který si představíme bude Hamiltonovskost. Je to jakási
varianta kreslení domečku jedním tahem. Položíme tužku na jeden
libovolný vrchol hyperkrychle a budeme chtít bez zvednutí tužky z
papíru projít všechny vrcholy hyperkrychle, skončit na místě kde jsme
začali, ale zároveň žádný vrchol nechceme projít dvakrát. Útvaru který
tímto nakreslíme se říká Hamiltonovský cyklus a graf kde takový cyklus
umíme najít se nazývá Hamiltonovský. Hyperkrychle dimenze čtyři je
Hamiltonovská, jak můžeme vidět na Obrázku
5.

{% include figure.html cloudinary_src='posts/2016-01-06-povidani-o-hyperkrychlich__5.png' caption='Obrázek 5: Hyperkrychle dimenze čtyři s červeně vyznačeným Hamiltonovským cyklem.' %}

Protože Hamiltonovský cyklus v
![](http://www.codecogs.com/gif.latex?Q_n) obsahuje všechny vrcholy
hyperkrychle, musí mít ![](http://www.codecogs.com/gif.latex?2%5En) hran
a ![](http://www.codecogs.com/gif.latex?2%5En) vrcholů. Není těžké
ukázat že každá hyperkrychle dimenze aspoň dva je Hamiltonovská.

Zajímavější problém nastává, pokud začneme nějaké vrcholy mazat. Bude
mít hyperkrychle s nějakými vrcholy smazanými stále Hamiltonovský
cyklus? To záleží nejen na tom jaké vrcholy smažeme, ale také kolik.
Dovolíme-li v hyperkrychli ![](http://www.codecogs.com/gif.latex?Q_n)
smazat až ![](http://www.codecogs.com/gif.latex?n) vrcholů, pak můžeme
jednomu vrcholu smazat všechny jeho sousedy a nebudeme jej tak moc na
Hamiltonovský cyklus nijak napojit. Dále si musíme dát pozor na to,
abychom mazali stejný počet bílých vrcholů jako černých, jinak by nám
vždycky nějaké vrcholy zbyly. V roce 2001 Locke vyslovil hypotézu že
pokud v hyperkrychli ![](http://www.codecogs.com/gif.latex?Q_n) smažeme
nejvýše ![](http://www.codecogs.com/gif.latex?k) černých a
![](http://www.codecogs.com/gif.latex?k) bílých vrcholů (ale stejně
bílých jako černých) kde
![](http://www.codecogs.com/gif.latex?$k&space;\\leq&space;n-2$) pak je
taková otrhaná hyperkrychle stále Hamiltonovská. Tato hypotéza nebyla
zatím dokázána (ani vyvrácena). Jsou však známy různé částečné
výsledky.

### No a k čemu je to všechno dobré?

Představme si například, že vrcholy hyperkrychle jsou procesory a hrany
hyperkrychle jakési "dráty" kterými mezi sebou ony procesory komunikují.
Po několika návrzích byl tento koncept realizován a v roce 1983 spatřil
na Caltechu světlo světa první hyperkrychlový počítač jménem CosmicCube.
Měl 64 procesorů propojených do topologie šestirozměrné hyperkrychle. Ve
stejné době vyvíjeli na MIT vlastní hyperkrychlový počítač jménem
Connection Machine, na kterém pracoval mimo jiné i známý fyzik Richard
Feynman (o jeho patáliích s Connection Machine byl napsán moc hezký
[článek](http://longnow.org/essays/richard-feynman-connection-machine/)).
O pár let později začal Intel nabízet hyperkrychlové počítače i
komerčně. Avšak po dalších pokusech o jejich zdokonalování byly
nakonec pro svoji špatnou škálovatelnost opuštěny. I přesto hyperkrychle
nacházejí využití i v současnosti. Zmiňme alespoň P2P síť HyperCup,
bluetooth síť BlueCube či hyperkrychlovou topologii pro dynamicky
distribuované databáze zvanou HyperD, která byla představena v roce
2011.

### Pro pozorné čtenáře

Bonusová otázka na závěr. V článku jsme zmínili, že hyperkrychle dimenze
![](http://www.codecogs.com/gif.latex?n) má
![](http://www.codecogs.com/gif.latex?2%5En) vrcholů. Kolik má hran?
