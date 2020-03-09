---
layout: post
title: Když 1Gbps nestačí… Jak na 10G intranet
date: 2020-03-08T09:00:00.000+02:00
author: Adam Jezek
cloudinary_src: posts/20200308_223407_ty5kyk
lang: cz
tags:
- network
- internet
- 10G
---

Když si dnes koupíte počítač, je tak nějak standardem, že v něm je 1G síťovka, ačkoliv se ještě pořád dají najít stroje,
 do kterých výrobce stále montuje pohých 100M. Ale s chabým stavem přípojek po většině republiky, které si o 100M mohou
  nechat jenom zdát a přístupu většiny ISP, kdy defaultně dodávají levné routery se 100M porty,
   nehrozí, že by si běžný uživatel všimnul rozdílu. Ale co když je 1G málo? A v jakých situacích vůbec může být málo?
    A proč bych měl vůbec utrácet za 10G síťové prvky?


Víc jak giga. Proč?
===
Pokud patříte do té malé skupinky lidí, kteří mají přístup k pořádné přípojce, důvod je jasný: screenshoty ze
 speedtestu a možnost vysmívat se kolegovi na optice, že v jeho speedtestu chybí jedna nebo dvě nuly.


{% include figure.html cloudinary_src='posts/EPLbtv3WoAcCtnX_jt3j8q'  %}

Pokud výsledek výše pro vás není nic neobvyklého, pravděpodobně už máte dispozici rychlejší síť, nebo jí dokonce i
 spravujete - přecijen v českých podmínkách jsou koncové přípojky s rychlostí nad 1G velmi vzácné. V tom případě
 pro vás následující článek nejspíše nepřinese nic nového.

Pokud žijete na vesnici, tak vaše přípojka pravděpodobně nebude dosahovat závratných rychlostí.
 Buď jste připojeni vzduchem z (ne)dalekého města a internet pořádně funguje jenom když neprší.
 Nebo přípojku zajišťuje telefonní vedení z minulého století a internet k vám teče po dvou drátech,
 jejichž elektrické vlastnosti jsou srovnatelné s párem mokrých provázků. To ale ještě nutně nemusí znamenat, 
 že 1G interface bude stačit.


Home, sweet home.
===
Kouzlo rychlých sítí zatím existuje hlavně lokálně. Koupili jste si úžasnou NASku pro uchování vašich záloh, 
 rodinných filmů, obrazů linuxových distribucí a dalších dat náročných na úložiště? Pokud na obou koncích nejsou 
 disky z doby kamenné, už jste pravděpodobně vyhodili 100M router od vašeho poskytovatele a nejspíš i narazili na 
 limity 1G propojů.


A kolik teda potřebuji?
===
Lepší pevný disk zvládá rychlosti okolo 150 MB/s. V případě SSD se bavíme o hodnotách nad 500 MB/s. Samotný disk je ale 
 kvůli zálohování zpravidla nesmysl, a ukládání dat na různá RAID pole může rychlosti ještě dosti zvednout - 4 disky v 
 RAID5 znamenají až trojnásobnou rychlost při čtení. Než začneme míchat jablka a hrušky, je nutno poznamenat, že 
 zatímco při úložišti se zpravidla bavíme o bytech, v síti to jsou zase bity. 
Lepší NAS s vhodnými disky ve správné konfiguraci teoreticky zvládne posílat ven až 3600 Mbps, v případě SSD se 
dostáváme až na teoretických 12000 Mbps. A najednou jsou ty gigové rozvody hodně pozadu.


Ale zpátky na zem…
===
3600 Mbps je opravdu hodně. Ale co s takovou rychlostí? Které zařízení to zvládne a k čemu to využije běžný uživatel?  
 Pokud na NASce máte videa, 4K stream potřebuje okolo 20 Mbps, takže i na gigové síti je zde stále velká rezerva. 
 Rychlé připojení se vyplatí hlavně ve dvou případech - při velkém množství klientů  a pro zkrácení čekání u velkých záloh. 
Při běžné práci na počítači se se svým průměrným NVMe SSD dostávám na rychlost zápisu okolo 700 MB/s (5600 Mbps), 
takže pro kopírování objemných dat už zde jsou znatelné rozdíly. Využití se najde i při zálohování z více disků 
najednou, nebo při datově náročných operacích, například pro střih videa. Zvláště, pokud zpracováváme záznam z více 
kamer a třeba ještě ve 4K, potřebujeme velké a rychlé úložiště. Do běžného desktopu se vejde jen pár disků, takže 
vhodné řešení je mít data na velkém diskovém poli, ideálně s RAIDem pro zálohu. A pokud chceme využít plný potenciál 
takového řešení, je 10G propoj nutnost.
Při více klientech dává smysl mít 10G alespoň na cestě od NASky do posledního switche, a do klientských PC přivést 
jenom 1G. Varianta je to značně levnější a na velkých pracovištích může zlepšit user experience.

A co cena?
===
Rozumný 1G switch se dá pořídit kolem tisícovky. Na rozvody stačí CAT5e kabely za 5 korun/metr a pokud náhodou není v 
počítači 1G síťová karta, do PCIe se dá pořídit už od pár stovek. S 10G sítí už je to trochu nákladnější… Logicky 
jsou zde větší požadavky na hardware, což je dobře vidět například na větší ceně NAS s 10G portem. Switch s několika 1G 
porty a dvojicí 10G portů pro uplink už vyjde nad 5 tisíc. Pokud budeme chtít mít všech 8 portů 10G, je už cena okolo 
15 tisíc. S více porty ceny dále rostou. Síťová karta do počítače už je v řádu jednotek tisíc. Možnost, jak ušetřit na
 switchích a síťových kartách existuje, nakupujte  použité. Například na eBayi se jich dá najít  za rozumnou cenu hromada.

U těchto prvků se kromě známých RJ45 konektorů objevují také SFP sloty. Ceny obou řešení jsou si dosti podobné, 
nicméně v druhém případě je cena ještě navýšena o SFP moduly. Jeden případ za všechny by v případě PCIe karet mohly 
být například karty od Asusu - model XG-C100C s metalikou a XG-C100F s SFP šachtou.

{% include figure.html cloudinary_src='posts/20200308_224536_v6r3ea' caption='XG-C100F s optickým modulem' %}
{% include figure.html cloudinary_src='posts/20200308_223407_ty5kyk' caption='SPF switch s optickými moduly a metalické switche' %}


Ve většině případů je lepší pořídit prvky pro metaliku. Jenže ani ty nemusí nutně fungovat na aktuální infrastruktuře -
 většina rozvodů dnes zpravidla bývá z CAT5e kabeláže. Ačkoliv 1G internet po ní zvládá fungovat až na vzdálenosti 100m,
 u 10G tomu tak nebude. Na krátkých spojích do deseti metrů zpravidla problémy nebudou, u delších rozvodů už ale můžeme
 očekávat problémy. Spoj nemusí mít 10G link, někdy se naváže pouze 5G, 2.5G, nebo jenom 1G spoj, občas se link nemusí
 navázat vůbec. 10G síť vyžaduje CAT6A kabely, které stojí dvojnásobek a při předělávání rozvodů už je vhodné myslet 
 dopředu a rovnou použít CAT7. Není to zase tak dávno, kdy nám stačily dial-up modemy a kam jsme se za tu dobu dostali. 
 V případě prvků s SFP sloty máme větší flexibilitu v zapojení, ale za nějaké kompromisy.  SFP moduly na sobě mohu mít 
 buď metalický konektor, a nebo optický LC konektor, který sice nabízí větší vzdálenosti, jen nemusí vždy fungovat. 
 Optické 10G SFP moduly na eBayi najdete v cenovém rozmezí od několika stovek po několik tisíc korun, podle toho od 
 jakého výrobce jsou. A různí výrobci v různých zařízeních podporují různé SFP moduly, a je zpravidla nutné si přečíst 
 dokumentaci, než nějaký koupíte. Ještě obtížnější je to s optikou, která se dělí na single mode a multimode, 
 které mezi sebou nejsou kompatibilní, a proto není od věci si před koupí nastudovat pár článků o tom, jak to vlastně funguje.

Hodně štěstí s nakupováním!
