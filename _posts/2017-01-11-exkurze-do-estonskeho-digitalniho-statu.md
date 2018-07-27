---
layout: post
title: Exkurze do estonského digitálního státu
date: '2017-01-11T12:40:00.000+01:00'
author: Jirka Chadima
tags:
- egon
- estonsko
- e-government
- x-road
modified_time: '2017-02-01T11:44:29.168+01:00'
cloudinary_src: posts/2017-01-11-exkurze-do-estonskeho-digitalniho-statu__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2297671821493286568
blogger_orig_url: http://blog.fragaria.cz/2017/01/exkurze-do-estonskeho-digitalniho-statu.html
---

Díky spolupráci s [Demokracií 21](https://www.d21.me/) jsme získali
možnost jet se na pár dní podívat do Estonska, jak že tam za posledních
víc než 20 let vyrobili a řídí elektronický stát a místní, evropské i
parlamentní volby. Vedle mne a Pavla z Fragarie tvořili výpravu kolegové
z D21, členové senátního Výboru pro územní rozvoj, veřejnou správu a
životní prostředí a zástupce Ministerstva vnitra, které má obdobnou
agendu v ČR pod palcem.

Po přistání v půl třetí odpoledne se pokocháme západem slunce a hurá do
nedalekého [e-Estonia
showroom](https://e-estonia.com/e-estonia-showroom/), kde se dozvídáme
základní parametry estonského e-Governmentu a několik zajímavých - pro
českého posluchače až šokujících - informací. Estonci ve státní správě
například povinně vyměňují všechny technologie a programy ve
třináctiletém cyklu.

Kdyby tak věděli, že
náš [ADIS](http://hlidacipes.org/technicke-reseni-pro-eet-ministerstvo-financi-je-blizko-k-vaznemu-rozporu-se-zakonem-o-verejnych-zakazkach/) za [pár
drobných](http://michalblaha.cz/2017/01/10x-predrazene-eet-skutecne-naklady-na-eet/) už
slouží [dvě taková
období](http://www.lupa.cz/clanky/system-pro-eet-s-podminkou-zavislost-na-ibm-musi-skoncit-do-roku-2021/) a
ani se
nezadýchá\!

{% include figure.html cloudinary_src='posts/2017-01-11-exkurze-do-estonskeho-digitalniho-statu__1.jpg' %}

Dotkli jsme se také čerstvého
programu [e-Residency](https://e-estonia.com/e-residents/about/), který
umožňuje komukoliv na světě získat elektronický průkaz obsahující
certifikát pro identifikaci a certifikát pro podepisování dokumentů, a
tím se efektivně zúčastnit estonského elektronického státu.

[Za necelý rok od spuštění je v evidenci zhruba 15000
lidí](https://app.cyfe.com/dashboards/195223/5587fe4e52036102283711615553) z
celého světa, kteří založili stovky firem. Podobnou kartičku pak už
dlouho mají i estonští občané a od září roku 2018 jí mají mít také
všichni [občané států EU](https://en.wikipedia.org/wiki/EIDAS), přičemž
Češi by se měli přidat již o pár měsíců dříve. Kartička slouží jako
občanka a podpis certifikátem na ní uloženým, má dle zákona stejnou
platnost a účinnost jako podpis klasický, tedy tužkou na papíře.

Ke každé kartičce dostanete taky USB čtečku, která umí číst čip na
kartě. Díky ní a malému softwarovému ovladači pak můžete prokazovat
svou identitu a podepisovat transakce z každého normálního počítače. V
posledních letech se Estonci také snaží tlačit podobný mechanismus s
[mobilními telefony](https://e-estonia.com/component/mobile-id/), aby
odpadla nutnost vydávat plastové kartičky.

## Království za normalizovaná data

Všemi dalšími schůzkami se ale jako červená nit táhla datová páteř
celého Estonska zvaná **X-Road**. Na ní jsou připojené banky,
telekomunikační operátoři, lékaři, autoservisy, a samozřejmě úřady
veřejné správy a mohou (podle pevně daných pravidel) číst data
ostatních účastníků systému. Když tedy občan něco zařizuje, prokáže se
pouze svojí občankou a systém si postahuje potřebná data z  míst, kde
jsou k dispozici.

Správce sběrnice má ze zákona povinnost zaručit, že žádná data se v
Estonsku nikde neukládají duplikovaně. Pokud se tedy přestěhujete,
všichni účastníci systému se o tom nejpozději při příštím dotazu na
vaše osobní údaje dozví. Zapomenňte tedy na výměnu občanky při
stěhování. Přesměrování doručování pošty je na pár kliknutí atd. atd.
Mimochodem [web estonské pošty](https://www.omniva.ee/private/post) je
napsaný v AngularJS, což je i naše [oblíbená
technologie](http://kariera.fragaria.cz/)\!

X-Road přitom není nic jiného než centralizovaná datová sběrnice, taková
velká dálnice pro data. Estonský stát do ní přispěl certifikační
autoritou, veřejnými portály a nezbytným monitoringem a správou. Všichni
ostatní se na X-Road připojují pomocí Security Serverů, které zajišťují
převážně jednotné šifrování a podepisování veškerého provozu, a také
jeho auditování pomocí varianty blockchainu.

Díky těmto serverům je pak možné používat jako komunikační síť normální
internet a ne nějakou podivnou privátní
zběsilost.

{% include figure.html cloudinary_src='posts/2017-01-11-exkurze-do-estonskeho-digitalniho-statu__2.png' caption='X-Road vypadá fakt jednoduše...' %}

Jako bonus nabízí tato architektura vcelku jednoduché propojování více
X-Roadů dohromady. Když totiž vezmete dvě infrastruktury z obrázku výše
a položíte je vedle sebe, můžete na obou stranách říct, že si
certifikační autority navzájem důvěřují a nic vám nebrání obě sběrnice
propojit. To ušetří spoustu času a peněz.

Pokud například jako občan jednoho státu pracujete ve státě jiném,
nepotřebujete speciální programy pro výměnu dat mezi státy. Zní to jako
utopie? Ani ne. Na jaře 2017 se přesně tímhle způsobem má Estonsko
propojit s Finskem.

## Zvířátka? Daně? Volby? Všechno máme

Správce X-Roadu má v gesci i registr dotazů, které lze proti X-Road
podávat. Když pak třeba jako zvířecí hotel chcete svým klientům
zjednodušit veškerou agendu na recepci, zažádáte si o právo vykonávat
dotazy vracející seznam mazlíčků daného občana z národního registru.

A když do vašeho hotelu dorazí paní Kadrnožková, mávne na recepci svojí
občankou a během pár pikosekund víte, že je to ona a že přivedla pejska
Jonatána, kterému za tři roky propadne očkování. Stejně tak může paní
Kadrnožková mávnout svojí občankou doma a hotel pro Jonatána si objednat
z pohodlí svého gauče.

Podobně pohodlným způsobem a na dálku můžete obsloužit i drtivou většinu
běžné komunikace se státem, respektive s úřady veřejné správy. Na dálku
se nedá pouze ženit, rozvádět a prodávat nemovitosti. Což docela dává
smysl, protože i na chladném severu platí, že kdo se ráno nestydí, ten
se večer nebavil.

Velkou reklamou pro celý systém jsou volby po internetu (kterým se
budeme věnovat [v samostatném
článku](http://blog.fragaria.cz/2017/02/bude-se-nekdy-po-internetu-volit-i-v.html))
a také podávání daňového přiznání. Po nedůvěřivém a opatrném počátečním
startu se už v roce [2012 podíl elektronických přiznání vyšplhal
na 94%](http://estonia.eu/about-estonia/economy-a-it/e-estonia.html) a
průměrný čas takového úkonu jsou vyloženě skandální tři minuty ...
zkuste si to představit ... **tři minuty**\!\!\!

Opět to umožňuje zejména X-Road, která daňovému systému dává přístup k
bankovním záznamům, pracovním smlouvám a dalším podkladům potřebným pro
vypočítání daňového výměru. Na vás pak zbyde už jenom kontrola
zjištěných údajů a potvrzení, že vše souhlasí. Když máte přeplatek,
stát vám ho vrátí do pěti dnů. Inu, proč
ne...

{% include figure.html cloudinary_src='posts/2017-01-11-exkurze-do-estonskeho-digitalniho-statu__3.jpg' caption='Jak rychle byste si zvykli na podání daňového přiznání po internetu vy?' %}

Samozřejmě lze namítat, že státním organizacím tímto dávate neskutečně
mocný šmírovací nástroj a kdokoliv se správnými oprávněními o vás dokáže
získat informace použitelné třeba pro vydírání nebo jinou pochybnou
zábavu. A je to pravda, je to počítačový systém jako každý jiný a jeho
bezpečnost samozřejmě není absolutní.

Svým návrhem a pečlivým auditováním se ale celý systém snaží zneužívání
bránit a v první řadě si každý občan může zkontrolovat kdo, kdy a v
jakém rozsahu si jeho údaje prohlížel. Zároveň je provoz monitorován a
každá nezvyklá aktivita je velmi brzy podrobena důkladné analýze. V
případě nekalostí (a už se jich pár stalo) pak není těžké odhalit a
zastavit konkrétní osoby, které neoprávněně zkouší zjišťovat osobní
údaje.

Logický závěr z celé krátké návštěvy bylo zjištění, že prostým Estoncům
riziko zneužívání tolik nevadí. Akceptují ho a jsou ochotní jej
dobrovolně vyměnit za neskutečnou úroveň pohodlí a rychlost, se kterou
mohou komunikovat s byrokratickým aparátem v každodenním životě.

Koneckonců... Když se dozvíte, že náš průvodce byl poslední čtyři roky v
bance přesně nulakrát, ačkoliv za tu dobu dvakrát změnil zaměstnání,
založil tři firmy, koupil auto na leasing a vyřídil dvě hypotéky - ani
se jim nedivíte.

A když se na to podíváme z druhé strany - tušíte kolik úředníků má k
vašim osobním údajům přístup u nás a nikdo jejich přístupy
nemonitoruje? Třeba na městském úřadě? Na katastru? Ve vaší bance?

Výhoda X-Road je, že když už si vás někdo "lustruje", dozvíte se to a
můžete si stěžovat, případně podat trestní oznámení.

## A co Češi? Mají si kde hrát?

V naší kotlině je situace v této oblasti, kulantně řečeno, o pár
světelných let pozadu. Nezpochybnitelným důvodem je jistě odlišná
výchozí situace. Estonsko se po rozpadu Sovětského svazu ocitlo v
situaci, kdy nemělo žádné nerostné bohatství, žádnou státní
infrastrukturu a technologii, žádný přehled o lidech, žijících na jejich
území a žádné velké peníze ve státní kase. Snažili se tedy s co
nejmenšími náklady vybudovat univerzální prostor, kde by se mohly
realizovat soukromé společnosti za soukromé peníze.

Vznikly tak elektronické občanky a X-Road, přičemž obojí bylo od počátku
navrženo a myšleno jako veřejná záležitost dostupná komukoliv. Postupně
se povedlo u velké části veřejnosti vybudovat důvěru v tento systém a
přesvědčit lid, že u tak skvělé věci odpustí státu i drobný přešlap.

Na našem Ministerstvu vnitra již mnoho let (zárodky se datují
minimálně [do
roku 2008](http://www.mvcr.cz/docDetail.aspx?docid=21730568&doctype=ART))
pracují na základních registrech a [eGON service
busu](http://www.mvcr.cz/clanek/ministerstvo-vnitra-chysta-dalsi-rozvoj-centralniho-mista-sluzeb.aspx).
Sice pomalu, ale pracují. Není totiž politická vůle zabývat se
elektronickým státem a budováním jednotného státního datového systému.
Ministerstva často mezi sebou o moc nad kritickými systémy bojují a vše
se tak hýbe po velmi křehkých a nestabilních stezkách.

Přitom eGON service bus je estonskému X-Roadu svým návrhem velice
podobný a při správném uchopení a našlápnutí by nás velmi rychle
dokázal posunout dopředu. Bohužel je od začátku vymýšlen a
implementován z perspektivy paranoidní babičky, takže má běžet na
izolované zabezpečené vládní síti, ke které se žádný privátní subjekt  -
alespoň v první fázi - nedostane. Takže žádné zvířecí hotely, žádné
autoservisy.

Akorát zvýšené náklady na hardware, zvýšené riziko v případě útoku a
centralizace celé infrastruktury a datové základny. V roce 2017 docela
fail.
