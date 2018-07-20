---
layout: post
title: Jak vyhrát Prostřeno?
date: '2015-03-05T10:55:00.000+01:00'
author: Lukáš Marek
tags:
- npm
- elasticsearch
- nodejs
- prostreno
modified_time: '2015-05-13T18:50:33.770+02:00'
thumbnail: http://3.bp.blogspot.com/-dE37yw9kiTc/VPMxPANTwfI/AAAAAAAAAe4/wduKmRTPMm8/s72-c/Screen%2BShot%2B2015-03-01%2Bat%2B15.40.31.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-3484533274118889772
blogger_orig_url: http://blog.fragaria.cz/2015/03/jak-vyhrat-prostreno.html
---

Jak uspět v populární soutěži? Analýza dat s použitím Elasticsearch
ukazuje, že uspějete s českou klasikou: **domácí hovězí vývar s nudlemi,
kuře s bramborem a koláč**. Ale taky se hodí někoho **milovat**,
jmenovat se **Lucie** a hrát **hokej**.
Jak jsem na to přišel?

Moje drahá polovička je velká fanynka pořadu
Prostřeno. Dost často se tak vrátím z práce domů a z obýváku zrovna
nadšeně hýká Vašek Vydra.
Pro neznalé – [Prostřeno](http://www.iprima.cz/prostreno/o-poradu) je
pořad televize Prima, ve kterém:

> „Pětice amatérských kuchařů, milovníků dobrého jídla a pití, během
> jednoho týdne postupně předvede, jak si představuje perfektní večeři
> včetně zábavy pro hosty, kteří se dříve neznali.“

Při nedobrovolném sledování mě napadlo, jestli existuje něco jako
**ideální menu** – tedy zda *lze sestavit večeři s velkou
pravděpodobností výhry?*
Show běží už pět let a po celou tu dobu udržuje webové stránky, na
kterých lze nalézt recepty jednotlivých účastníků. To už je spousta
dat, ze kterých se dá ledacos vyčíst.
Nejdřív ovšem ta data musíme dostat do použitelné podoby. Prima bohužel
neposkytuje API (proč taky), takže to je třeba zrobit ručně.

### Příprava

Než se pustíme do samotného programování, je potřeba se podívat, jak
stránky Prostřeno vůbec vypadají. Začneme na [stránce s nejstarším
vysíláním](http://www.iprima.cz/prostreno/soutezici?day=1267448067).

[![](http://3.bp.blogspot.com/-dE37yw9kiTc/VPMxPANTwfI/AAAAAAAAAe4/wduKmRTPMm8/s400/Screen%2BShot%2B2015-03-01%2Bat%2B15.40.31.png)](http://3.bp.blogspot.com/-dE37yw9kiTc/VPMxPANTwfI/AAAAAAAAAe4/wduKmRTPMm8/s1600/Screen%2BShot%2B2015-03-01%2Bat%2B15.40.31.png)

Vidíme pět soutěžících, z nichž František je označen korunkou – vítěz
kola. Je poznat, že stránky dělal někdo zodpovědný – obrázek každého
účastníka je obalen v `div`u s třídou `prostreno-contestant`. Vítěz má
ještě navíc třídu `tvwinner`.
S tím už se dá pracovat.

### Sbíráme data

Pro sběr dat jsem si připravil jednoduchý skript v NodeJS, který, který
načte data ze stránek Primy a uloží je ve formátu JSON do databáze
Elasticsearch. Formát uložených dat je následující:

    {
      "predkrm": "Kuřecí salát v broskvi",
      "hlavni": "Candát s mandlovou nádivkou a šťouchané brambory",
      "zakusek": "Líná hospodyňka",
      "id": "jiri-mueller",
      "winner": true,
      "gender": "M",
      "desc": "\n       Je ženatý, má čtyři děti ... atd."
    }

Nebudu se tady pouštět do detailů a případného zájemce odkážu na
[kompletní zdrojové
kódy](https://gist.github.com/krtek/a3d9d68081ec629a5a16).

### Agregujeme data

Data se mi úspěšně podařilo nacpat do Elasticsearch, který mám nastavený
podle [Filipova
návodu](http://blog.fragaria.cz/2014/11/fulltext-cesky-pomoci-djanga.html)
tak, aby uměl pracoval s češtinou. Teď nastává ta nejzábavnější část –
analýza dat. Elasticsearch poskytuje mocné API pro [agregace
dat](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-aggregations.html).
Pojďme si pro začátek zjistit nejčastější vítězné polévky. Dotaz do
Elasticsearch bude vypadat následovně:

``` 
  {
    "query": {
      "match": {
        winner: true
      }
    },
    "aggregations": {
      "polevka": {
        "terms": {
          "field": "polevka",
          "size": 10
        }
      }
    }
  }
```

a odpověď Elasticsearch serveru bude:

``` 
  {
    ...
    },
    "aggregations": {
      "polevka": {
        "doc_count_error_upper_bound": 5,
        "sum_other_doc_count": 276,
        "buckets": [{
          "key": "polevka",
          "doc_count": 69
        }, {
          "key": "vyvar",
          "doc_count": 32
        }, {
          "key": "nudle",
          "doc_count": 20
        }, {
          "key": "hovezi",
          "doc_count": 18
        }, {
          "key": "kremova",
          "doc_count": 18
        }, ...
        ]
      }
    }
  }
```

Nejčastějším slovem mezi vítěznými polévkami je překvapivě **polévka**.
To se dalo čekat. Ale hned na dalších místech je **vývar**, **nudle** a
**hovězí**. Už tušíte, co se vyplatí vařit?
Můžeme se zkusit jiný dotaz. Elasticsearch nově podporuje tzv. [agregaci
podstatných
výrazů](http://www.elasticsearch.org/blog/significant-terms-aggregation/).
Pod tímhle šíleným pojmem se skrývá užitečná pomůcka. Dokáže zjistit,
jaká slova se **vyskytují mezi vítěznými polévkami** a naopak **nejsou
mezi ostatními**. Příklad? Tady je:

``` 
  {
    "query": {
      "match": {
        winner: true
      }
    },
    "aggregations": {
      "polevka_odchylky": {
        "terms": {
          "field": "polevka",
          "size": 10
        }
      }
    }
  }
```

a odpověď?

``` 
  {
    ...
    },
    "aggregations": {
      "polevka_odchylky": {
        "doc_count": 245,
        "buckets": [{
          "key": "domacim",
          "doc_count": 4,
          "score": 0.05084548104956269,
          "bg_count": 4
        }, {
          "key": "kremova",
          "doc_count": 18,
          "score": 0.037570060094008456,
          "bg_count": 49
        }, {
          "key": "cibulova",
          "doc_count": 4,
          "score": 0.037411078717201174,
          "bg_count": 5
        }, {
          "key": "celestynskymi",
          "doc_count": 5,
          "score": 0.026239067055393583,
          "bg_count": 9
        }, {
          "key": "spenatova",
          "doc_count": 3,
          "score": 0.025539358600583092,
          "bg_count": 4
        }...
        ]
```

Tady je vidět, že z celkem 4 polévek označených jako **domácí** všechny
vyhrály. **Cibulové** polévky mají taky slušné skóre: čtyři z pěti.
Pokud neumíte cibulačku, vyplatí se zkusit polévku **krémovou**,
**špenátovou** nebo aspoň nasypat do polévky **celestýnské** nudle.
Dá se zkusit i obrácený dotaz. Která polévka je téměr zárukou prohry?
Zkuste si dotaz sami (hint `match {winner: false}`) a zjistíte, že s
**zelňačkou** nebo **dýňovou** polévkou se ani nemá smysl dělat. A
rozhodně do ní nesypejte **krutony\!**

### Má vůbec smysl se hlásit?

Překvapivě zajímavé výsledky dává analýza textu, kterým se soutěžící
prezentují. Typická výherkyně (Ano, výherkyně. Dam soutěží celkově víc,
ale muži mají o trochu větší šanci na výhru).
Takže typická výherkyně se používá v popisu jako **ráda**, **vaření**,
**vztah** a **rodina**. A jmenuje se **Lucie** – 7 z 9 Lucií vyhrálo.
Oproti tomu typická nevýherkyně **žije**, **sama** a zmiňuje **peníze**.
Zajímavé, co? Pokud se navíc zmíní, že je **rozvedená**, tak už ani
nemusí zapínat sporák (36 z 38 nevyhrálo).

### Takže jaké menu?

Nejčastější vítězné menu vypadá nějak takhle:

**Kuřecí salát**
**Hovězí vývar**
**Kuře s bramborem**
**Koláč**

Ale černým koněm soutěže bude následují menu:

**Pancetta** (nebo salát s rajčátky)
**Domácí cibulová polévka** (pozor na to domácí\!)
**Marinovaná vepřová pečeně s bramborem**
**Čokoládové sufflé** (nebo palačinka nebo medovník)

Proč? Agregace podstatných výrazů říká, že když se jakékoliv z těchto
jídel objevilo v soutěži, tak bylo součástí vítězného menu.
Navíc se hodí být **muž**, jmenovat se **Lucie** a mít v oblibě
**hokej**.

A taky trochu umět vařit.
