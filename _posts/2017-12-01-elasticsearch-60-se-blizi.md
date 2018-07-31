---
layout: post
title: Elasticsearch 6.0 se blíží
date: '2017-12-01T13:24:00.000+01:00'
author: Lukáš Marek
tags:
- elasticsearch
- pivo
- elastic
modified_time: '2017-12-01T13:24:21.349+01:00'
cloudinary_src: posts/2017-12-01-elasticsearch-60-se-blizi__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-1732240598242685769
blogger_orig_url: http://blog.fragaria.cz/2017/12/elasticsearch-60-se-blizi.html
---

V říjnu mi přistála do mailu pozvánka na výlet do do Mnichova s firmou
Elastic. Docela jsem se těšil, než jsem zjistil, že Octoberfest se
navzdory jménu konal už v září. Sice to tedy bylo bez piva, ale aspoň si
většinu představených novinek pamatuju.

Mimochodem, Elasticsearch verze 6.0 bude představen 6. prosince 2017 v
17.00 hodin. Pokud máte chuť, můžete celou událost [sledovat
online](https://www.elastic.co/live/v6?elektra=home&storm=banner).

{% include figure.html cloudinary_src="posts/2017-12-01-elasticsearch-60-se-blizi__1.jpg" sizing='wide' %}

Protože jsme Elasticsearch na blogu chvíli zanedbávali, vypíchnu tu pár
novinek verze 6.0 (a někdy i 5.0).

## Šifrování (5.x)

Pokud ukládáte do Elasticsearch citlivá data, existuje nepodporovaná
(ale vyzkoušená) cesta, jak zašifrovat celý index na disku.

Jestli se smíříte s cca 5% poklesem výkonnosti, můžete celý index
zašifrovat pomocí standardního
[dm-cryptu](https://en.wikipedia.org/wiki/Dm-crypt).

## Painless (5.x)

Skriptování v Elasticsearch je sice mocná zbraň, ale také zdroj
bezpečnostních problémů. V minulosti Elastic používal jako defaultní
skriptovací jazyk Groovy, který se jim ovšem nikdy nepodařilo pořádně
sandboxovat.

Problém se spíše obcházel pomocí pojmenovaných skriptů definovaných v
konfiguraci Elasticsearch a odkazovaných pouze jménem, což bylo dost
nepraktické.

Řešením je nový jazyk
[Painless](https://www.elastic.co/guide/en/elasticsearch/painless/master/painless-getting-started.html),
který je v podstatě totožný s Groovy, ale neobsahuje "nebezpečné"
metody.

## Elastic Cloud Enterprise (X-Pack)

Několik našich zákazníků provozuje víc Elasticsearch clusterů.
Koneckonců, sám Elastic doporučuje monitoring umístit do samostatného
clusteru - takže i pro základní použití jsou potřeba dva clustery.

Spravovat pár takových clusterů může být klidně práce na plný úvazek. To
by ale znamenalo, že provozovat [vlastní cloudové
řešení](https://www.elastic.co/cloud) bude práce na pár desítek
úvazků?

![cluster
management](https://www.elastic.co/assets/bltf1e9537b10e91151/cluster-optimized.gif)

Ne. Celý Elastic Cloud spravuje 5 lidí. Proč? Protože mají vymakaný
administrační nástroj, který je teď nově k dispozici i pro zákazníky
Elasticu.

Elastic Cloud Enterprise je vlastně virtualizační nástroj. Jednotlivé
clustery a nody jsou vytvářeny a spouštěny podle potřeby, je možné
jednoduše měnit jejich umístění, velikost a dokonce bezodstávkově
updatovat cluster na novější verzi Elasticsearch.

Samozřejmě je možné mít clustery s různou verzí Elasticsearch vedle
sebe.

## Machine learning (X-Pack)

Osobně považuji strojové učení za největší pecku v novém Elasticsearch a
mrzí mě, že jsem ho ještě nestihl vyzkoušet.

Je to totiž první "strojové učení pro blbé" - není třeba vytvářet žádné
neuronové sítě, prostě přidáváte data do Elasticsearch a ten si průběžně
vytváří model a dokáže upozornit na anomálie.

![machine
learning](https://www.elastic.co/assets/blt484d90d927bee30d/machine-learning-anomaly.jpg)

Strojovému učení v Elasticsearch se budu určitě ještě tady na blogu
věnovat.

## Predictions API (X-Pack, 6.2)

Když už máme strojové učení, další logický krok je predikce. K dispozici
bude asi až ve verzi 6.2.

## Performance monitoring (X-Pack, 6.X)

Elastic poslední dobou hojně nakupuje další firmy. Strojové učení je
výsledkem akvizice, výsledkem [dalšího
nákupu](https://opbeat.com/blog/posts/welcome-opbeat-to-the-elastic-family/)
je vstup na pole [performance
monitoringu](https://techcrunch.com/2017/06/22/elastic-enters-apm-space-with-opbeat-acquisition/).

![performance-monitoring](https://opbeat.com/blog/posts/welcome-opbeat-to-the-elastic-family/opbeat-timeline-ui.png)

Mrkněte na stránky firmy [opbeat](https://opbeat.com), kde si uděláte
obrázek, co se chystá.
