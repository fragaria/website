---
layout: post
title: Pondělní střípky z 16.1.2017
date: '2017-01-17T18:38:00.000+01:00'
author: Lukáš Marek
tags:
- stripky
- elasticsearch
- mongo
- shift
- elastic
- uber
modified_time: '2017-01-17T18:38:24.809+01:00'
thumbnail: https://2.bp.blogspot.com/-Z7g5Nqp-dKg/WH5Vk0YokMI/AAAAAAAAAx8/Tc3BySqHbp0iAod_ohSQpt5IvSEINdgZQCPcB/s72-c/_ko52yozjtq-john-cobb.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-794134394114307598
blogger_orig_url: http://blog.fragaria.cz/2017/01/pondelni-stripky-z-1612017.html
---

Dnešní střípky jsou samá bezpečnostní chyba.

### Uber otevírá data

Uber oznámil, že se chystá [otevřít
data](https://movement.uber.com/cities) o dopravě, která nasbíral za
dobu svého
fungování.

[![](https://2.bp.blogspot.com/-Z7g5Nqp-dKg/WH5Vk0YokMI/AAAAAAAAAx8/Tc3BySqHbp0iAod_ohSQpt5IvSEINdgZQCPcB/s400/_ko52yozjtq-john-cobb.jpg)](https://2.bp.blogspot.com/-Z7g5Nqp-dKg/WH5Vk0YokMI/AAAAAAAAAx8/Tc3BySqHbp0iAod_ohSQpt5IvSEINdgZQCPcB/s1600/_ko52yozjtq-john-cobb.jpg)

Zatím to vypadá, že budou přístupná pouze přes proprietární prohlížeč a
nikoliv ve formě API. To nás trošku mrzí. Navíc máme obavy o to, zda
budou dostatečně anonymizovaná, protože Uber je s bezpečností
[historicky dost na
štíru](https://nakedsecurity.sophos.com/2016/06/24/uber-under-attack-how-penetration-testers-turn-bugs-into-breaches/).

Rozhodně se ale na výsledek dost těšíme - mrkněte se třeba co se stane,
když [ve Washingtonu přestane jezdit
metro](https://movement.uber.com/use-case/dc). Jestli vás to taky
zajímá, [zaregistrujte se přímo u
Uberu](https://movement.uber.com/cities), dostanete info hned, jak budou
data k dispozici.

A jestli to tu čte někdo z Magistrátu hlavního města Prahy,
[zaregistrujte se teď hned povinně](https://movement.uber.com/cities)\!

PS: Pan [náměstek pro
dopravu](http://www.praha.eu/jnp/cz/o_meste/magistrat/odbory/index.html?divisionId=154)
už nemusí, toho jsem zaregistroval já.

### MongoDB ransomware

Ještě jedno bezpečnostní upozornění. Rozmohl se nám tady takový nešvar -
lidé často vystavují na internety databáze a kašlou na
bezpečnost.

[![](https://3.bp.blogspot.com/-E5KFGs-Q3to/WH5WNxV35MI/AAAAAAAAAyA/Lxn_oe1qhdsBPshyPdWwhMRkZq8oz2KsgCLcB/s400/ocrpjce6gpk-vitaly.jpg)](https://3.bp.blogspot.com/-E5KFGs-Q3to/WH5WNxV35MI/AAAAAAAAAyA/Lxn_oe1qhdsBPshyPdWwhMRkZq8oz2KsgCLcB/s1600/ocrpjce6gpk-vitaly.jpg)

Pak se nemůžou divit, že jim někdo zašifruje data a pak požaduje
výkupné. Minulý týden to postihlo [více
než 10 000](http://arstechnica.co.uk/security/2017/01/more-than-10000-online-databases-taken-hostage-by-ransomware-attackers/)
instalací MongoDB.

My se věnujeme hodně Elasticsearch, takže jsme si udělali malou
statistiku.

A co myslíte? Našli jsme víc než 1 000 volně přístupných Elasticsearch
instancí za jedno odpoledne. Mimochodem Martin na tohle téma připravuje
blog :)

Pokud je to i váš případ, tak se zastyďte a [koukejte si to dát do
pořádku](https://www.elastic.co/blog/protecting-against-attacks-that-hold-your-data-for-ransom).

### Shift

Něco užitečného nakonec. Jestli máte víc e-mailových účtů, mohla by se
vám hodit [aplikace Shift](https://tryshift.com). Umí jedinou věc -
bleskově přepínat mezi jenotlivými účty u GMailu a webového Outlooku. A
to jak mail, tak kalendář a
disk.

<https://cdn3.tryshift.com/static/images/hero-animation@2x.gif?t=1484425476>

Pro lidi, kteří jsou zvyklí používat primárně mail v prohlížeči to může
být zajímavá alternativa ke spoustě otevřených záložek v prohlížeči.
Mrkněte na [podrobnější
popis](http://www.czechcrunch.cz/2017/01/shift-aplikace-ktera-zjednodussi-vasi-praci-s-vice-gmail-ucty-najednou/).
