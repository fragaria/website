---
layout: post
title: Jak děláme open source
date: '2014-01-27T13:24:00.000+01:00'
author: Martin Bílek
lang: cs
tags:
modified_time: '2014-05-20T14:37:41.940+02:00'
cloudinary_src: posts/2014-01-27-jak-delame-open-source__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4020185454233508416
blogger_orig_url: http://blog.fragaria.cz/2014/01/jak-delame-open-source.html
---

Dnes jsem se v rámci úklidu (především duševního :-)) zamyslel krom
jiného i nad tím, co vše z naší práce publikujeme jako "open source" a
co jsme nad tímto open source vystavěli.

### Ella - Django powered CMS

Co je [Ella](http://www.ellaproject.cz/)? [Oficiální
popis](http://pyvec.org/projekty/) říká: *"Ella je open source CMS
založené na Django frameworku. Původně vznikala jako CMS pro magazíny
společnosti [CentrumHoldings](http://www.centrumholdings.com/)
(především [Žena.cz](http://zena.centrum.cz/)) s ambicemi stát se
hlavním CMS pro všechny obsahové weby od lifestylových e-časopisů se
střední návštěvností až po zpravodajské servery s návštěvností v řádech
miliónů zobrazení denně."*

V CentrumHoldings bohužel nečekala na Ellu příliš dlouhá budoucnost,
zejména z důvodu celkového odklonu CentrumHoldings od Pythonu. My jsme
naštěstí Elle nikdy nepřestali důvěřovat a zůstali jsme v kontaktu s
jejími původními vývojáři. S těmi jsme na její záchranu založili
občanské sdružení [Pyvec](http://pyvec.org/), které však velmi brzy
Ellu přerostlo. O tom ale až někdy jindy.

Časem se nám podařilo Ellu prosadit i do společnosti Sanoma, kde nad ní
bylo spuštěno několik zajímavých webů - [Květy](http://kvety.kafe.cz/),
[Vlasta](http://www.vlasta.cz/), [Dům a
zahrada](http://www.dumazahrada.cz/)...

Náš největší projekt na Elle je
[Investičníweb.cz](http://www.investicniweb.cz/). Ella pohání
například i [Věrnostní program společnosti
Mountfield](http://muj.mountfield.cz/).

Naši přátelé ze společnosti [BermanBraun](http://bermanbraun.com/)
(bývalé Whiskey Media) pak na té stejné Elle provozují weby s výrazně
větší návštěvností převyšující počet obyvatel ČR -
[Tested.com](http://www.tested.com/), [Mom.me](http://mom.me/), [Anime
Vice](http://www.animevice.com/)...

Zdrojové kódy Elly naleznete na [GitHubu](https://github.com/ella/ella)
a pokud vás zajímají čísla, tak [zde je i několik
grafů](https://github.com/ella/ella/graphs). Instalační balíček najdete
na [Pypi](https://pypi.python.org/pypi/ella/), kde má Ella každý měsíc
tisíce
stažení.

{% include figure.html cloudinary_src='posts/2014-01-27-jak-delame-open-source__1.png' %}
{% include figure.html cloudinary_src='posts/2014-01-27-jak-delame-open-source__2.png' %}

### GAP a GAPI

V minulém blogu jsme již o [knihovně GAP a
GAPI](http://blog.fragaria.cz/2014/01/nas-technologicky-stack-server.html)
psali, takže zde přidám již jen několik čísel z
[GitHubu](https://github.com/czervenka/gap) a
[Pypi](https://pypi.python.org/pypi/gap).

{% include figure.html cloudinary_src='posts/2014-01-27-jak-delame-open-source__3.png' %}

### BorIS

[BorIS](http://www.bor-is.cz/) je projekt našich zaměstnanců, kteří na
něm pracují většinou ve volném čase. [I o tomto projektu jsme již
psali](http://blog.fragaria.cz/2013/10/boris-nase-svedomi-je-zase-o-trochu.html),
takže uvedu jen odkaz na [GitHub](https://github.com/fragaria/BorIS) a
informaci o tom, že BorISe používá již cca 10 zařízení z ČR. Tím však
ambice projektu zdaleka nekončí a těšíme se na to, až hranice ČR
překročíme.

{% include figure.html cloudinary_src='posts/2014-01-27-jak-delame-open-source__4.png' %}

### A co ještě máme?

Dál už toho "moc" není, jen [několik malých
knihoven](https://github.com/fragaria), pár komitů do knihoven někoho
jiného a samozřejmě také řadu plánů do budoucna. Tím nejsmělejším je asi
dostat naší HTML5/JS/CSS aplikaci jako výchozí "example" aplikaci v
projektu [Apache Cordova](http://cordova.apache.org/). Tak uvidíme
jestli se nám to povede.

No a to je asi vše. Až budu příště zas "uklízet", zkusím o tom něco
napsat.
