---
layout: post
title: Náš technologický stack - server
date: '2014-01-02T14:15:00.000+01:00'
author: Lukáš Marek
tags: 
modified_time: '2014-01-02T14:18:25.662+01:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5772322115932454085
blogger_orig_url: http://blog.fragaria.cz/2014/01/nas-technologicky-stack-server.html
---

### Server

Bez diskuse [Google AppEngine](https://developers.google.com/appengine/)
v Python verzi. Ne, že by to byla zase taková pecka, ale většinou je to
požadavek zákazníka.
Ovšem pecka je náš [GAP](https://github.com/czervenka/gap) a
[GAPI](https://github.com/czervenka/gapi).

#### GAP

GAP je naše odpověď na to, že AppEngine neví, co to je
[virtualenv](https://pypi.python.org/pypi/virtualenv). AppEngine dokonce
ani neví, co to je [PIP](https://pypi.python.org/pypi).
To naše pythonáře trochu (víc) zaskočilo, ale naštěstí Robin dal rychle
dohromady náhradu.
Jak funguje? Takhle:

    workon <myvirtualenv>
    pip install gap
    gap start-project <applicationid>
    cd <applicationid>
    vi requirements.gip
    bin/gip install -r requirements.gip

Každý, kdo někdy dělal s virtualenv v Pythonu se zorientuje relativně
rychle - jen místo `pip install` napíše `bin/gip install` a GAP se
postará o stažení knihoven a jejich nalinkování do adresáře se
zdrojákama.
Závislosti se ukládají do `requirements.gip` (místo `requirements.pip`)
a svět je zase veselejší místo k životu.
GAP nám umožnil mít pořádek v knihovnách jednotlivých projektů a
nezas\*rat si instalaci Pythonu.

#### GAPI

Další náš příspěvek světu je GAPI – mimochodem na originálních názvech
GAP/GAPI je vidět, že jsme především programátoři. Copywritera aby
člověk pohledal...
Takže GAPI. Rozhraní (API) Google služeb je navržené šikovně, ale
knihovna pro Python, která ho implementuje, už je na tom hůř. O dost.
GAPI umí navíc:

  - cachovat autorizační tokeny
  - dávkové requesty
  - opakovat requesty v případě chyby
  - **stránkovat** odpovědi
  - a běží v pohodě na AppEngine

Ke GAPu patří i další rozšíření jako
[GAP-Resources](https://github.com/fragaria/gap-resources),
[GAP-Angular](https://github.com/fragaria/gap-angular) (to jsem psal
já\!) a
[GAP-DatastoreAdmin](https://github.com/fragaria/gap-datastoreadmin),
ale o těch až jindy.
