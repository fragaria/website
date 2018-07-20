---
layout: post
title: Analýza? Prototyp? Obojí!
date: '2014-06-09T14:29:00.000+02:00'
author: Lukáš Marek
tags:
- prototyp
- mockup
- angularjs
modified_time: '2014-10-13T14:31:32.709+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-7725471779792435697
blogger_orig_url: http://blog.fragaria.cz/2014/06/analyza-prototyp-oboji.html
---

### Prototyp \> analýza

Je známo, že prototyp/mock up uživatelského rozhraní, pokud je tvořen
správně, dokáže zcela nahradit značnou část úvodní analýzy. Zejména v
případech, kdy je zákazník technikou nepolíben, nemá podle mého valný
smysl předvádět znalosti UML modelování a zahrnovat ho desítkami
diagramů a mnoha stránkami popisu. Ukázaná platí\!

Všichni víme, jak k UML diagramům přistupuje standardní projektový
manažer – v lepším případě přizná, že tomu vůbec nerozumí, v horším vše
schválí a v dalších fázích projektu není o překvapení
nouze.

|                                                                                             |
| :-----------------------------------------------------------------------------------------: |
| ![Entity diagram](http://upload.wikimedia.org/wikipedia/commons/7/72/ER_Diagram_MMORPG.png) |
|                            Takhle si tu aplikaci představujete?                             |

Oproti tomu v případě prototypu zákazník ihned vidí, jak celá aplikace
funguje a velmi rychle je odhalena většina nedomyšleností v zadání,
resp. velmi rychle se zjistí, co je jak drahé na vývoj. Z toho důvodu se
v rámci prototypování ještě výrazně mění zadání, což má hodně pozitivní
dopad na použitelnost výsledného produktu.
Ve Fragarii se tedy snažíme nechat si entitní UML model "pro sebe" a
zákazníkovi představujeme rovnou uživatelské rozhraní aplikace – **UI
prototyp**.

### Bootstrap \> Balsamiq

Standardem pro vytváření prototypů je nástroj [Balsamiq
Mockups](http://balsamiq.com/products/mockups/), s jehož pomocí dokáže
navrhnout uživatelské rozhraní téměř kdokoliv.
Důležitou ~~výhodou~~ ~~nevýhodou~~ **vlastností** Balsamiq je, že
obrázky, které z něho lezou jsou schválně jednoduché a ošklivé
(wireframes). To má odvést zákazníka od nepodstatností jako jsou barvy
tlačítek, fonty a umožnit mu soustředit se na podstatu věci.
Pokud zákazník s wireframes již pracoval, tak to může fungovat. Pokud je
vidí poprvé, míra jeho zmatení je značná.

My jsme od wire-frames v Balsamiqu přešli rovnou k prototypování
frontendu v HTML a CSS. Proč?

#### Rychlost

"Nastřelit" jednoduchou stránku v
[Bootstrapu](http://getbootstrap.com/components/) umím skoro stejně
rychle, jako jí nakreslit v Balsamiqu. A to jsem mezi kolegy spíš z
pomalejších – nepoužívám totiž *vim* :-).

#### Reálnost

Výsledný prototyp vypadá jako reálná webová aplikace, což je z pohledu
zákazníka jistě plus.

#### Interaktivita

Většina moderních webových aplikací používá ve velké míře Javascript a
naše nejsou výjimkou. Problém je, že real time vyhledávání v seznamu
faktur prostě na obrázku neukážeme. A dlouze o tom mluvit je takové –
plytké.
Takže zapojíme Javascript (jasně, [Angular.js](https://angularjs.org/))
a můžeme zákazníkovi rychle ukázat, jak se budou jednotlivé prvky na
stránce chovat.

#### Reálná data

Lorem ipsum a jeho česká verze [Blábot](http://cs.blabot.net/) je určitě
užitečná věc, ale opět – není nad reálná data.
Pokud se nasypou do Google Spreadsheet, dají se jednoduše načíst jako
JSON a zobrazit v prototypu.

#### Budoucí využitelnost

Jsou dvě možnosti, buď se prototyp zahodí s tím, že dobře posloužil jako
zadání/analýza, nebo se "obarví" a frontend aplikace je na světě.

### Takže?

*Nikdy neříkej nikdy*, ale u nás teď děláme prototypy jen interaktivní a
pouze v HTML.
