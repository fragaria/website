---
layout: post
title: Jak sobě Liftago s jistotou přivolati?
date: '2016-02-17T10:49:00.000+01:00'
author: Lukáš Marek
tags:
- elasticsearch
- liftago
- elastic
modified_time: '2016-02-17T10:49:58.860+01:00'
thumbnail: https://4.bp.blogspot.com/-896XV5frRmc/VsCw-5YBySI/AAAAAAAAAmQ/aFHYxvz2wMQ/s72-c/Screen%2BShot%2B2016-02-14%2Bat%2B17.52.37.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-1469978181235135253
blogger_orig_url: http://blog.fragaria.cz/2016/02/jak-sobe-liftago-s-jistotou-privolati.html
---

*Jest třeba státi v čase půlnočním, za úplňku, na rynku Staroměstském,
ne dále než dva kroky od poledníku pražského. V levici jest třeba
černého kohouta držeti, v pravici pak aparát Bellův, anténou směrem k
smrtce na orloji natočený.*  
  
Když jsem se dozvěděl, že [Liftago uvolňuje
data](http://try.liftago.com/info-wants-to-be-free/) o uskutečněných i
neuskutečněných jízdách, zaradoval jsem se. Rád totiž láduji do
Elasticsearch cokoliv zajímavého s cílem zjistit něco zásadního.  
<span id="more"></span>  

## Jak to vidí jinde?

Samozřejmě, že data z Liftaga zkoušelo analyzovat více lidí. Hezky to
udělal [Marek
Lutonský](https://paper.dropbox.com/doc/Jak-se-jezd-s-Liftago-v-grafech-a-mapch-1cmweog4ARFMLmuZ3bSVG)
– určitě si jeho článek přečtěte, nemá smysl tu znovu kreslit stejné
grafy.  
Zajímavé výsledky mají i [chlapci z
Infinaria](https://cloud.infinario.com/shared/dashboard/8dcebc55-0503-4345-bb47-051afa92140e/#/).  
  

## Proč Elasticsearch?

Velkou výhodou Elasticsearch je, že umí analyzovat data v realtime.
Takže kdybych já pracoval v Liftagu, udělal bych si v Kibaně jednoduchý
dashboard, který by mi sledoval základní parametry (čas dojezdu,
průměrný počet nabídek atd.) a případně by mě mohl varovat, jakmile
některý z parametrů bude signalizovat problém.  
  
Vypadalo by to třeba
takhle:  

[![](https://4.bp.blogspot.com/-896XV5frRmc/VsCw-5YBySI/AAAAAAAAAmQ/aFHYxvz2wMQ/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.52.37.png)](https://4.bp.blogspot.com/-896XV5frRmc/VsCw-5YBySI/AAAAAAAAAmQ/aFHYxvz2wMQ/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.52.37.png)

No ale, protože v Liftagu nepracuji, musím se spokojit s analýzou dat
ex-post.  
  

## Základy

Ochota taxikářů vás svézt, prudce a logicky roste se vzdáleností, na
kterou jedete. Hezky je to vidět z grafu, který srovnává průměrný počet
nabídek, se vzdáleností na kterou chcete
jet:  

[![](https://2.bp.blogspot.com/-fYMLtIDcbNM/VsCYuk848pI/AAAAAAAAAkk/pSQUiWmsSII/s640/Screen%2BShot%2B2016-02-14%2Bat%2B16.08.43.png)](https://2.bp.blogspot.com/-fYMLtIDcbNM/VsCYuk848pI/AAAAAAAAAkk/pSQUiWmsSII/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B16.08.43.png)

Zub na začátku ukazuje, že pokud jedete na vzdálenost kratší než 3 km,
je výhodnější cíl vůbec nezadávat. Pokud jedete dále než 5 km, určitě
cílovou adresu zadejte – šoféři se o vás poperou\!  
  
Další graf ukazuje, jak daleko je taxikář ochotný pro vás dojet – a to
zvlášť v denních a zvlášť v nočních
hodinách:  

[![](https://1.bp.blogspot.com/-iq2sX7uJC9U/VsCorI4YRAI/AAAAAAAAAls/RX0FeYagI_A/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.16.39.png)](https://1.bp.blogspot.com/-iq2sX7uJC9U/VsCorI4YRAI/AAAAAAAAAls/RX0FeYagI_A/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.16.39.png)

*Osa X je vzdálenost cíle, osa Y průměrná dojezdová vzdálenost
taxíku.*  
  
Potvrzuje se tedy že, čím dále se pojede, tím větší je ochota drožkáře
pro zakázku "dojet". Zvlášť ve dne.  
  

## Co když nezadám cíl?

Elasticsearch disponuje celkem zajímavou funkcí, která [vyhledává
anomálie mezi
daty](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html).
Zkusil jsem jí použít na zakázky, kde zákazník nezadá
cíl:  

[![](https://3.bp.blogspot.com/-Qqn9LvhLzfw/VsCd2zKwdsI/AAAAAAAAAk0/aQ0XgEvG6NQ/s640/Screen%2BShot%2B2016-02-14%2Bat%2B16.26.53.png)](https://3.bp.blogspot.com/-Qqn9LvhLzfw/VsCd2zKwdsI/AAAAAAAAAk0/aQ0XgEvG6NQ/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B16.26.53.png)

Je vidět, že pokud nezadáte cíl ve všední den, máte celkem slušnou
šanci, že domů přeci jen pojedete – abnormálně často se vyskytuje stav
F. Naopak o víkendu se poveze jen ten, kdo cíl prozradí (NO znamená No
Offer).  
  
Nabídnu ještě jeden pohled na stejná data. Rozdělil jsem zakázky na ty
bez zadaného cíle, s cílem do 3 km a s cílem delším než 3 km. Výsledkem
je graf s průměrným počtem nabídek v závislosti na denní
době:  

[![](https://1.bp.blogspot.com/-OarpiYdupNg/VsCgKDsLfEI/AAAAAAAAAlA/SaSFVwAKEaY/s640/Screen%2BShot%2B2016-02-14%2Bat%2B16.39.24.png)](https://1.bp.blogspot.com/-OarpiYdupNg/VsCgKDsLfEI/AAAAAAAAAlA/SaSFVwAKEaY/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B16.39.24.png)

A hle\! Mezi 20:00 a 24:00 má člověk, který nezadá cíl, poloviční šanci,
že sežene taxíka.  
  

## V kolik se vydat domů?

Na obdobném grafu je vidět, že domů se vyplatí vyrazit do 23.00 – pak
průměrný počet nabídek prudce klesá. Takže doporučuji respektovat
zavíračku většiny pražských restaurací.  
  
Protože jeden graf nahradí tři odstavce, přidávám počet pokusů o
zavolání odvozu v průběhu
dne:  

[![](https://2.bp.blogspot.com/-uvViikq_lpw/VsClVY_bAcI/AAAAAAAAAlQ/MjQzTAa481U/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.02.28.png)](https://2.bp.blogspot.com/-uvViikq_lpw/VsClVY_bAcI/AAAAAAAAAlQ/MjQzTAa481U/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.02.28.png)

Vidíte, že po půlnoci nastává největší špička, kterou taxikáři
nezvládají.  
  
Další srovnání počtu uskutečněných jízd (stav F) a počtu lidí, kteří
nedostali žádnou nabídku (stav NO) v průběhu
dne:  

[![](https://3.bp.blogspot.com/-sCKvEXRccGE/VsCm2FRgu4I/AAAAAAAAAlg/IASSgO4fmYE/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.07.45.png)](https://3.bp.blogspot.com/-sCKvEXRccGE/VsCm2FRgu4I/AAAAAAAAAlg/IASSgO4fmYE/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.07.45.png)

Počet uskutečněných jízd je zhruba stejný před půlnocí i po půlnoci, ale
počet odmítnutých zákazníků je po půlnoci několikanásobný. V grafu jsem
zanedbal počet odmítnutých nabídek (NA), který je přibližně stejný.  
  
S tím koresponduje i vzdálenost, na kterou je taxík ochotný přijet. Opět
v průběhu
času:  

[![](https://1.bp.blogspot.com/-QW3xK9_vZMo/VsCs2g8GzBI/AAAAAAAAAl4/TtNh0k_olIk/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.33.54.png)](https://1.bp.blogspot.com/-QW3xK9_vZMo/VsCs2g8GzBI/AAAAAAAAAl4/TtNh0k_olIk/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.33.54.png)

Vidíte, že přes den si pro vás šofér přijede průměrně z o kilometr větší
vzdálenosti než v noci.  
  

## Kde se v Praze paří?

Znalci nočního života v Praze se nedozví nic nového, ale srovnal jsem
místa, odkud se volají taxíky ve dne a v noci. Ve dne hezky svítí
office centra – hlavně Anděl, Křižíkova v Karlíně, I.P. Pavlova a Hlavní
nádraží:  

[![](https://2.bp.blogspot.com/-pWKc7DERRrY/VsCtWrvKqDI/AAAAAAAAAl8/6k7c6TCaCCo/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.37.05.png)](https://2.bp.blogspot.com/-pWKc7DERRrY/VsCtWrvKqDI/AAAAAAAAAl8/6k7c6TCaCCo/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.37.05.png)

  
A v noci? Nejvýraznější bod na mapě je bermudský trojúhelník v Dlouhé –
zlatá mládež se vrací z Kozičky, Jamese Deana, případně z Bombaye.
Zajímavé je, že Václavské náměstí je oproti Dlouhé poloviční. Napadá mě
jedině, že turisti Liftago neznají a používají
konkurenci:  

[![](https://4.bp.blogspot.com/-zDLifwBVZ5w/VsCtluTUwlI/AAAAAAAAAmA/MiDOZxFLUDI/s640/Screen%2BShot%2B2016-02-14%2Bat%2B17.38.16.png)](https://4.bp.blogspot.com/-zDLifwBVZ5w/VsCtluTUwlI/AAAAAAAAAmA/MiDOZxFLUDI/s1600/Screen%2BShot%2B2016-02-14%2Bat%2B17.38.16.png)

  

## Napadá vás něco dalšího?

Liftago neuvolnilo všechna data – zejména ceny. Nedá se tedy například
porovnat cenu za kilometr ve dne a v noci, závislost pravděpodobnosti
odmítnutí nabídky na ceně apod.  
  
Pokud by vás napadlo něco, co by bylo zajímavé srovnat, dejte prosím
vědět\! Už nyní připravuji další díl.  
  
PS: Liftagu moc díky za data a za odvahu.
