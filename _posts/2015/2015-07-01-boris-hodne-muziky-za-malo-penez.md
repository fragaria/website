---
layout: post
title: BorIS - hodně muziky za málo peněz
date: '2015-07-01T10:44:00.000+02:00'
author: Martin Burián
lang: cs
tags:
- boris
- open source
- sociální odpovědnost
- django
modified_time: '2015-07-01T10:58:00.641+02:00'
cloudinary_src: posts/2015-07-01-boris-hodne-muziky-za-malo-penez__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4633371177603778213
blogger_orig_url: http://blog.fragaria.cz/2015/07/boris-hodne-muziky-za-malo-penez.html
---

O tom, že [BorIS](http://www.bor-is.cz/) je elektronická databáze pro
evidenci výkonů v terénních programech drogových služeb jsem tu psal v
[říjnu 2013](http://blog.fragaria.cz/2013/10/boris-nase-svedomi-je-zase-o-trochu.html)
a v
[březnu 2014](http://blog.fragaria.cz/2014/03/boris-moderni-system-pro-nepopularni.html).
BorIS nyní slaví tři roky provozu, hodilo by se proto v krátkosti
poděkovat, zhodnotit a tak.

{% include figure.html cloudinary_src='posts/2015-07-01-boris-hodne-muziky-za-malo-penez__1.png' %}

Děkuji všem organizacím působících v drogových službách, které se nebojí
přejít k systému Boris a také všem, kteří se na vývoji a rozvoji Borise
podílí (bez nároku na honorář). Pro tyto všechny mám dobrou zprávu,
Boris jede a vedle terénních programů se na něj mohou po prázdninách
těšit i pracovníci K-center.

Je pro nás velmi obtížné vysedávat na poradách, pojídat chlebíčky
(hlavně ty s vajíčkovou polevou) a plkat o tom, jak je co složité, jak
to má spoustu aspektů, dopadů a legislativních omezení. Ačkoliv nemáme
podporu shora, Boris už tři roky bez výpadku funguje, a i když to někdy
bolí, je pravidelně aktualizován.

Doufáme, že jednou zlomíme představy, že:

  - Software doporučovaný státním úředníkem je ten nejlepší.
  - Přechod na nový systém je masakr. 

Věřím, že tři roky fungování jsou již dostatečnou garancí, že Borise
stojí za to alespoň vyzkoušet.

Borise aktuálně používá šest organizací v šesti krajích ČR. Získáváme
tak velmi cenná statistická data, která se někomu nemusí líbit, ale
uživatelé drog tu jsou a budou a my si myslíme, že se jim má pomáhat.

Jak jsem již uvedl, po prázdninách spustíme verzi pro K-centra, dalších
plánů máme spoustu a budeme rádi, pokud je i s Vaší pomocí budeme moci
realizovat. Zapojit se může každý.

Na konec ještě pár důležitých informací pro:

#### Zájemce:

[Boris](http://www.bor-is.cz/) je neziskový
[opensource](http://cs.wikipedia.org/wiki/Otev%C5%99en%C3%BD_software)
projekt. Licence je tedy zdarma. Organizace, která používá Borise
hostovaného u nás, platí Kč 1.000,00 měsíčně na provoz a drobný rozvoj.
Pokud byste si chtěli Borise nainstalovat k Vám na server a pak se o
provoz starat, neplatíte nic. Zkušenost říká, že to není dobré
rozhodnutí (problémy se zálohováním a zabezpečením dat máme vyřešeny v
rámci naší infrastruktury).

Pro používání systému tedy nepotřebujete vlastní hardware, vše běží na
našich zabezpečených a zálohovaných serverech, podepíšeme smlouvu,
dostanete přístupy a můžete pracovat.

Systém komunikuje i se státní správou, pro níž generuje nejrůznější
výstupy. Je navržen přímo terénními pracovníky, nikoliv úředníky.
Věříme proto, že práce s přechodem na nový systém budou velmi brzy
vyváženy úsměvy na tvářích pracovníků Vaší organizace.

#### Techniky:

  - Programování: [Python](http://python.cz/),
    [Django](https://www.djangoproject.com/),
    [Grapelli](http://grappelliproject.com/) a
    [Git](http://git-scm.com/)
  - Design: [Bootstrap](http://getbootstrap.com/) a
    [template](https://wrapbootstrap.com/theme/the-story-flat-business-template-WB05N1SL7)
  - Provoz aplikace: [Nginx](http://wiki.nginx.org/),
    [MySQL](http://www.mysql.com/), [Gunicorn](http://gunicorn.org/)
  - Komunikace a řízení:
[Trello](http://trello.com/)
