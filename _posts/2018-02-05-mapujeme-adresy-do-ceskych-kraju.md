---
layout: post
title: Mapujeme adresy do českých krajů
date: '2018-02-05T09:56:00.000+01:00'
author: Jirka Chadima
tags:
- geodata
- openstreetmap
- javascript
modified_time: '2018-02-05T09:56:15.586+01:00'
cloudinary_src: posts/2018-02-05-mapujeme-adresy-do-ceskych-kraju__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2947207121541021275
blogger_orig_url: http://blog.fragaria.cz/2018/02/mapujeme-adresy-do-ceskych-kraju.html
---

Občas potkáte jako vývojář zábavné a jednoduché zadání, jako třeba
"**Vím, že lidé platí v mých prodejnách po celé republice. Chtěl bych
vědět, kolik se toho děje v každém kraji.**" Zkušený borec si řekne, že
prostě vezme mapu krajů, na ně napáruje adresy prodejen a hotovo... V tu
chvíli ale netuší, že před ním leží křivolaká cesta plná slepých uliček,
nezrušených zákonů, neúplných datových zdrojů a zajímavých
algoritmů.

{% include figure.html cloudinary_src="posts/2018-02-05-mapujeme-adresy-do-ceskych-kraju__1.png" %}

## Hledáme data

Na úvod se sluší říct, co všechno o prodejně víme:

  - Ulice, město, PSČ, stát - to se píše na obálky, to známe
  - GPS souřadnice - to se píše do mobilů, to známe
  - RUIAN ID - Cože?

[RUIAN](https://vdp.cuzk.cz/) (Registr územní identifikace, adres a
nemovitostí) je státní katalog, který se používá zejména pro katastrální
účely a hodí se při práci s mapovými podklady, adresními místy a dalšími
prvky, které se týkají fyzického umístění nějakého objektu v krajině. To
zní skvěle, tam určitě budou kraje\! No, nejsou.

## Slepá ulička?

PSČ všichni běžně používáme pro adresování dopisů, a asi také každý
víme, že specifické PSČ přísluší specifické poště, která obsluhuje
nějaké území. To by mohlo pasovat s kraji\! No, nepasuje.

Na webu České pošty se k seznamu všech PSČ samozřejmě
[dostanete](https://www.ceskaposta.cz/ke-stazeni/zakaznicke-vystupy)
(*Seznam PSČ částí obcí a obcí bez částí*), ale když se do něj podíváte,
zjistíte, že nejvyšší celek, který se k PSČ dozvíte, je okres. Moment,
my ještě máme okresy? Ano, máme. A stejně tak máme **dvoje** kraje.
Cože? Skutečně, dle zákonných norem u nás stále rozlišujeme kraje
[územní a
samosprávní](https://cs.wikipedia.org/wiki/Okresy_v_%C4%8Cesku).

Nicméně s tím už se dá pracovat, takže si vesele vyrobíte mapování PSČ
-\> okres -\> kraj a myslíte si, že máte hotovo. Chyba lávky\! Ukazuje
se totiž (a vzhledem k často diskutovanému rušení a slučování vesnických
pošt se to dalo čekat), že jedno PSČ může sahat klidně do třech okresů.
Těch případů je zhruba 10 %, a to se bohužel zanedbat nedá, potřebujeme
pro tyhle případy náhradní řešení.

## Hledáme data podruhé

Takže přichází na řadu GPS souřadnice, s nimi to musí být brnkačka.
Kraje nejsou nic jiného než polygony, a algoritmů na párování bodu do
polygonu existuje [celá
řada](http://erich.realtimerendering.com/ptinpoly/). Ale kde vzít ty
polygony? Katastrální úřad? Tam už jsme byli a našli RUIAN. Ministerstvo
vnitra? Jestli taková data poskytují, tak je mají pečlivě schovaná.
Jednotlivé kraje? Spíš ne. Český statistický úřad? Do nich jsem vkládal
velkou naději, a taky nic. My si snad budeme muset obkreslit mapu\!

Naštěstí po chvíli googlení najdete přesně to, [co
potřebujete](https://navigovat.mobilmania.cz/clanky/navod-pro-gsak-jak-rozdelit-ceske-geokese-podle-kraju/sc-265-a-1313623/default.aspx).
V 10 let starém článku. Tak si s tím chvíli hrajete, začnete psát testy,
a najednou vám zcela náhodně vybraná souřadnice nefunguje. Co to?
Hranice krajů se totiž [můžou](https://www.czso.cz/csu/xb/uzemni_zmeny)
měnit\! Třeba když se rozpustí nějaký ten vojenský újezd. Takže data
jsou to sice pěkná, ale zastaralá. Co teď? Vážně jdeme obkreslovat
mapu?

## Open Street Map zachraňuje

Není třeba, na záchranu přispěchá Open Street Map a jejich
[Overpass](https://overpass-turbo.eu/). Se [správně formulovaným
dotazem](https://overpass-turbo.eu/s/vAm) je získání hranic krajů
hračka. Mimochodem povšimněte si, že zdrojem dat je náš národní
katastrální úřad a jeho dataset s povědomým jménem RUIAN. No prostě
Koucourkov. Odtud už je jen krůček k automatizaci celého našeho
datasetu.

A jeho hezké vizualizaci přímo na githubu (samozřejmě bez těch PSČ, ale
zase si můžete všimnout hraničních kamenů):

V samotné aplikaci už je to pak jen otázka načtení
[dvou](https://github.com/JirkaChadima/cz-region-boundaries/blob/master/data/gps/all.txt)
[souborů](https://github.com/JirkaChadima/cz-region-boundaries/blob/master/data/zip/zip-region.csv)
a můžeme vesele párovat: Kvůli výkonu to zkusíme samozřejmě nejdřív
podle PSČ a když se zrovna trefíme do nejednoznačně určitelného, tak
použijeme jeden z algoritmů pro hledání bodu v polygonu.

## A přitom taková blbost

Ano, snad jen slovy klasika lze uzavřít tuhle odyseu. Na druhou stranu
možná jenom neumím hledat ve státních datech a některý z mnoha úřadů má
krasný portál s open-geodaty týkajícími se nejen krajů, ale třeba i měst
a dalších územních ploch. Jestli o něm víte, napište nám\!

Věřím tomu, že se někomu tahle data mohou hodit, takže všechny zdrojáky
a data najdete na
[GitHubu](https://github.com/JirkaChadima/cz-region-boundaries),
nepravidelně je aktualizuju.
