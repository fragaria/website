---
layout: post
title: Zero knowledge proofs
date: '2016-04-27T10:46:00.000+02:00'
author: pavel vojacek
tags:
- zero knowledge
- kryptografie
- sudoku
modified_time: '2016-04-27T13:39:06.318+02:00'
thumbnail: https://1.bp.blogspot.com/-etUeXi5dXfk/VxU3ivmXC5I/AAAAAAAAOco/On3vq6AD6nooK66rHqUl7c774lNxyWxxACK4B/s72-c/graph-gray.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-6958119050761583574
blogger_orig_url: http://blog.fragaria.cz/2016/04/zero-knowledge-proofs.html
---

Kryptografie je plná fascinujících postupů - Diffie-Hellman výměna
klíčů, šifrování veřejným klíčem. Představa, že komunikující strany
potřebují mít předem sdílený klíč, aby mohli šifrovaně komunikovat
vydržela několik století a podařilo se jí překonat až v polovině
minulého století. O DH výměně i RSA bylo napsáno již mnoho, ale
existují i jiné, zdánlivě neřešitelné problémy.

**Dnes uvádíme: Je možné přesvědčit protistranu o naší znalosti řešení
úlohy, ale zárověn jí neposkytnout sebemenší nápovědu, jaké to řešení
je?**

## Cože?

Velmi jednoduchý příklad: barvoslepý člověk má dvě karty – červenou a
zelenou. Potřebuje zjistit, která má jakou barvu a je dokonce ochotný za
pomoc zaplatit. Já mu umím pomoci, ale on má obavu, že můžu být také
barvoslepý a toužíc po odměně si odpověď vymyslím.

Já bych ho rád přesvědčil o opaku a ještě k tomu mu příliš nevěřím, že
mi potom za pomoc zaplatí. Potřebuji ho tedy přesvědčit, že umím
rozlišit červenou a zelenou a zároveň mu nevyzradit řešení rovnou.

Jak z toho ven? Dohodneme se, že karty schová za záda a může, ale nemusí
je mezi sebou vyměnit. Pak mi je ukáže a já mu řeknu, jestli je prohodil
nebo ne. On stále nebude vědět, která je která, ale mohl by mi začít
alespoň trochu věřit, že rozliším barvy.

Tento pokus můžeme opakovat, až si bude náš klient s velkou
pravděpodobností jistý mojí schopností rozlišovat barvy. Po první
pokusu máme 50% šanci ho oklamat, pokud postup zopakujeme, naše šance
podvádět bude 0.5^n, kde n je počet opakování. Po deseti kolech testů
bude tato pravděpodobnost menší než 1 promile.

## Luštění sudoku

Dalším příkladem je sudoku
([zdroj](http://blog.computationalcomplexity.org/2006/08/zero-knowledge-sudoku.html)).
Alice zná řešení sudoku, nechce ho Bobovi vyzradit, ale zároveň by ho
ráda přesvědčila, že řešení zná.

Alice nahradí čísla z jejího řešení písmeny ABCDEFGHI v náhodném pořádí,
např. 1 → C, 2 → I, 3 → E, 4 → G atd., dosadí písmena na místo čísel do
tabulky a následně každé políčko zakryje neprůhlednou kartičkou.

Nyní si Bob má možnost vybrat z následujících možností:

\- odkryje jeden řádek (9 možností)
\- odkryje jeden sloupec (9)
\- odkryje jeden z devíti 3x3 čtverců (9)
\- odkryje místa, kde se nacházela čísla původního zadání (1)

Celkem tedy 28 možností.

V prvních třech případech se může Bob přesvědčit, že v daném
řádku/sloupci/čtverci je každé písmeno pouze jednou. Ve čtvrtém
případě ověří, jestli to, co mu Alice ukazuje odpovídá původnímu
zadání (tam, co by měly být stejná čísla jsou stejná písmena).

O řešení se ale nedozví nic, v prvních třech případech neví jaká čísla
odpovídají jakým číslům, vidí jenom, že se neopakují a řešení je možná
správné a ve čtvrtém případě sice ví, které písmeno odpovídá číslu, ale
pouze pro zadání, což stejně zná.

Pokud Alice řešení nezná, mohla si řešení vymyslet a Bob mohl mít smůlu
a vybrat si pro ověření možnost ve které to není vidět. Aby ho Alice
přesvědčila, zvolí jiné přiřazení písmen k číslům, zakryje tabulku a
Bob se zase může podívat na jednu z 28 možností.

S každým opakováním je Bob více a více přesvědčený, že Alice řešení
zná.

A pokud Alice řešení nezná, musí být alespoň v jedné možnosti chyba –
buď alespoň dvě stejná písmena v řádku/sloupci/podčtverci, nebo Alice
ukazuje řešení, které neodpovídá zadání a Bob na tento podvod
pravděpodobně přijde, pokud provede dostatečný počet opakování
protokolu.

Pokud má Alice chybu pouze v jednom z 28 případů, má Bob šanci vybrat
zrovna ten problematický 1:28. Každý další pokus tedy zvyšuje možnost
odhalení Alicina podvodu 27/28krát. Např. po 10 opakováních má Alice 70%
šanci ((27/28)^10), že jí podvod vyjde, po 100 opakováních je to asi
2,6% a po 150 opakováních méně než 0,5%. Což už by mohlo Boba
přesvědčit.

## Trochu teorie

*Zero knowledge protocol* musí splňovat tři podmínky, nastíněné výše:

1\. *Completeness* – Bob bude přesvědčen o správnosti Alicina řešení.
Neexistuje nějaký temný kout řešení (např. podmínka, která nejde danými
pravidly vyzkoušet - je potřeba mít liché číslo v levém horním rohu), na
který by nemohl při testování narazit.

2\. *Soundness* – Pokud Alice řešení nezná, Boba velmi pravděpodobně
nepřesvědčí, musela by mít ohromné štěstí a Bob velkou smůlu.

3\. *Zero knowledge* – Bob se o skutečném řešení nic nedozví.

Zkusme ještě pouvažovat, co by se stalo, kdyby se Bob dotázal na jinou
otázku, než jednu z těch 28. Například na čísla z různých řádků. Byl by
to problém? Bob by se dozvěděl, zda jsou tyto čísla shodná nebo ne a to
mu poskytuje cennou nápovědu k řešení.

Pro zájemce postup na ZKP sudoku u [kterého se nedá
podvádět](http://www.cs.berkeley.edu/~luca/lunch/minutes/naor05.html).
(Obdobně by se dala prokázat znalost řešení libovolně rozměrného
sudoku.)

## Hrátky s grafy

Další problém na kterém můžeme ukázat zero knowledge proof je barvení
grafu.
([zdroj](http://blog.cryptographyengineering.com/2014/11/zero-knowledge-proofs-illustrated-primer.html))
Představte si - jsme majiteli telekomunikační společnosti a hodláme
vystavět novou mobilní síť. Víme, kde budou umístěny naše vysílače a
máme tři různé frekvence a potřebujeme určit, který vysílač bude
používat jako frekvenci, tak aby žádné dva sousední nevysílali na
stejné frekvenci, docházelo by tak k rušení.

Situaci si můžeme nakreslit jako následující graf, vrcholy jsou pozice
vysílaců a hrany označují možné
rušení:

[![](https://1.bp.blogspot.com/-etUeXi5dXfk/VxU3ivmXC5I/AAAAAAAAOco/On3vq6AD6nooK66rHqUl7c774lNxyWxxACK4B/s320/graph-gray.png)](http://1.bp.blogspot.com/-etUeXi5dXfk/VxU3ivmXC5I/AAAAAAAAOco/On3vq6AD6nooK66rHqUl7c774lNxyWxxACK4B/s1600/graph-gray.png)

Potřebujeme vrcholy tohoto grafu obarvit třemi barvami tak, aby žádní
dva sousedé neměli stejnou barvu. V případě těchto několika málo vrcholů
není až takový problém řešení vymyslet, ale pokud budeme mít graf o
desítkách nebo stovkách vrcholů může být řešení velmi složité
(NP-hard). V tomto případě není ani jisté, že řešení existuje.
\[<https://en.wikipedia.org/wiki/Graph_coloring>\]

[![](https://1.bp.blogspot.com/-6IIzHV3iF0s/VxU3rq3LKUI/AAAAAAAAOcw/L94T1xc28LUOCcqLiKI6Lf_c2P37mqp2wCK4B/s320/graph-color.png)](http://1.bp.blogspot.com/-6IIzHV3iF0s/VxU3rq3LKUI/AAAAAAAAOcw/L94T1xc28LUOCcqLiKI6Lf_c2P37mqp2wCK4B/s1600/graph-color.png)

Zadáme tedy tento problém k řešení našemu IT oddělení, ale máme příliš
mnoho vysílačů a řešení se nedaří nalézt. Na obědě se náhodou potkáme s
managerem Google a ten se nabídne, že nám s problémem pomůže. Pustí na
to tedy jejich výpočetní oddělení.

Chvilku to trvá, ale mají přeci jenom o něco více CPU a za týden nám
volá, že znají řešení. Nechtějí ho ovšem dát zadarmo a my jim nevěříme
– přeci jen šlo o velmi složitý výpočet. Rádi sice zaplatíme za
korektní řešení, ale nejsme si jisti, zda ho dostaneme a jestli nám
vrátí peníze, pokud se ukáže neplatnost řešení. A Google se zase bojí,
že když nám řešení pošle, tak mu nepošleme peníze a chce tedy zaplatit
předem.

Opět zdánlivě neřešitelný problém. Naštěstí máme zero-knowledge a
dokonce ho můžeme provést bez použití počítače.

Pronajmeme stodolu a uvnitř na podlahu nakreslíme náš graf vysílačů.
Potom do stodoly pustíme pracovníky Googlu a ti obarví pozice vysílačů
třemi barvami (libovolnou permutací barev), tak aby žádné dvě stejné
nespojovala hrana (tnz. platné řešení) a vrcholy zakryjí
klobouky.

|                                                                                                                                                                                                                                                                                 |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![](https://1.bp.blogspot.com/-Q4jYlwfBk_E/VxU5aBWxcAI/AAAAAAAAOc4/aIIwu1hJH0Itb0z9SVvcpT2w-tmxrr8ngCK4B/s400/graph-colors-examples.png)](http://1.bp.blogspot.com/-Q4jYlwfBk_E/VxU5aBWxcAI/AAAAAAAAOc4/aIIwu1hJH0Itb0z9SVvcpT2w-tmxrr8ngCK4B/s1600/graph-colors-examples.png) |
|                                                                                                               Dva příklady obarvení - oba jsou správným řešením.                                                                                                                |

Následně můžou opět do stodoly vstoupit naši pracovníci a odstranit
právě dva klobouky spojené hranou. Přesvědčí se, že odkryté vrcholy
mají různou barvu. Následně opustí stodolu, Google smaže barvu ze všech
vrcholů a opět nabarví vrcholy třemi barvami v jiném, náhodném
pořadí.

|                                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![](https://4.bp.blogspot.com/-84FDOR4uBU8/VxU6iFyww7I/AAAAAAAAOdE/H5ywpEbRF80CUZhoKk7Mv8mfuz006gxyACK4B/s320/graph-covered.png)](http://4.bp.blogspot.com/-84FDOR4uBU8/VxU6iFyww7I/AAAAAAAAOdE/H5ywpEbRF80CUZhoKk7Mv8mfuz006gxyACK4B/s1600/graph-covered.png) |
|                                                                                My máme možnost vidět pouze toto. Situace odpovídá platnému řešení, ale vůbec nám nic nenapovídá.                                                                                |

Zase vstoupíme my, odkryjeme dva klobouky a přesvědčíme se, že barvy pod
nimi jsou různé. Tento proces opakujeme dostatečně dlouho, než si budeme
dostatečně jisti, že Google zná správné řešení.

Prvních několik pokusů může mít Google štěstí, ale pokud řešení nezná a
některé dva sousední vrcholy mají stejnou barvu, tak po mnoha pokusech
máme slušnou šanci, že podvod odhalíme. Pravděpodobnost odhalení
neplatného řešení je ((E-1)/E)^n, kde a je počet hran grafu a n počet
provedených testů.

Google na druhou stranu nic neriskuje, jediné co se dozvídáme, je že
sousední vrcholy nemají stejnou barvu (což víme už ze zadání), ale díky
prohazování barev mezi pokusy nemáme žádnou další souvislost.

Vyzkoušet můžete zde:
\[<http://web.mit.edu/~ezyang/Public/graph/svg.html>\]

## Ověřujeme online

Nyní je na místě otázka, jak podobné dokazování provést elektronicky na
dálku. Jednak musíme zajistit, aby dokazující nemohl změnit svoji
odpověď v moment, kdy se dozví jakou možnost má odkrýt. Pouhý dotaz a
odpověď by byla k ničemu, Google by mohl posílat náhodné dvě barvy.

Proto dokazující (Google) nejprve pošle *commitment* (česky snad
závazek) – v našem případě by to mohl být třeba seznam barev vrcholů
grafu ve známém pořadí, každý zašifrovaný zvlášť symetrickou šifrou.
Klíče si ponechá v tajnosti a na žádost ověřujícího mu pošle klíče od
dvou vrcholů spojených hranou. Protože commitment už má ověřující a
ověřovaný neví jaké dva klíče bude muset poslat, nemá možnost upravit
svoje řešení, tak aby se zdálo pravdivé.

Pozor: šifra musí být vhodně zvolená, nesmí umožnit ověřovanému volbou
klíče určit výsledek dešifrování. Což by se snadno mohlo stát např. s
[Vigenèrovou
šifrou](https://cs.wikipedia.org/wiki/Vigen%C3%A8rova_%C5%A1ifra).

## I offline

Dalším nepříjemným problém výše nastíněného protokolu je velké množství
komunikace mezi oběma stranami a obě strany musí být ve stejný moment
online.

I tento problém má řešení – [non-interactive zero knowledge
proof](https://en.wikipedia.org/wiki/Non-interactive_zero-knowledge_proof)
(NIZK). Vhodně zvoleným postupem se totiž může dotazující otestovat sám
a vystavit výsledek sebetestování. Každý si potom může kdykoli později
ověřit, že postupoval správně. Toto testování bývá založeno na náhodném
orákulu (random oracle) – černá skříňka/funkce (všem přístupná a známá)
vracející pro konkrétní vstup vždy stejný náhodný výstup. Výběr
odkrývaných prvků, tak neurčuje dokazující strana, ale nezávislý zdroj
náhody. Vstupem do orákula je postup všech předchozích testů (řetěz
jejich hashů).

Nejběžnějším využitím ZKP je při SSH autentifikaci pomocí asymetrické
šifry. Na server uložíme náš veřejný klíč. Při požadavku na autentizaci
nejprve server vygeneruje náhodná data, ty zašifruje a pošle k nám. My
dešifrujeme a odešleme zpět. Server ověří, že dostal původní data a mi
musíme znát privátní klíč z páru. Náhodná data jsou použita pouze jednou
a případnému útočníkovi i v případě odposlechu moc nepomohou.

Další praktické využití nachází NIZK např. v
[ring-signature](https://en.wikipedia.org/wiki/Ring_signature) a
[group-signature](https://en.wikipedia.org/wiki/Group_signature)
schématech, podobné klasickému použití digitálního podepisování, ovšem
bez možnosti zjistit, kterým podpisem ze skupiny vydaných klíčů byl
dokument podepsán. Je tak možné například uskutečnit opravdu anonymní
hlasování na internetu. (v případě group-signature může vydavatel klíčů
konkrétní držitele odtajnit, u ring-signature to možné
není).

## Doporučené čtení

[wikipedia](https://en.wikipedia.org/wiki/Zero-knowledge_proof#Discrete_log_of_a_given_value) s
příklady na diskrétní logaritmus a ověření znalosti Hamiltonovy kružnice

[Crypton](https://crypton.io/) js framework
[Advanced Cryptography
lectures](http://cs.nyu.edu/courses/fall09/G22.3220-001/index.html) na
NYU

[Anonize](http://anonize.org/assets/anonize-oak-camera.pdf) - anonymní
hlasovací systém

[Fiat-Shamir
heuristic](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic) -
diskrétní logaritmus
[Feige–Fiat–Shamir identification
scheme](https://en.wikipedia.org/wiki/Feige%E2%80%93Fiat%E2%80%93Shamir_identification_scheme) -
faktorizace čísla
