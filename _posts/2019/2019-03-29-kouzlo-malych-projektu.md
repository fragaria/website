---
layout: post
title: Kouzlo malých projektů
date: 2019-03-29T08:00:00.000+01:00
author: Ondřej Šrámek
lang: cz
tags:
- google apps script
- google sheets
- javascript
- dom
- bookmarklet
- parse
- firebase
- wordpress
modified_time: 2019-03-29T08:00:00.000+01:00
cloudinary_src: posts/kouzlo-malych-projektu-hero_n5emzb
---

Měsíce nebo roky vyvíjet nějaký velký propracovaný systém je zábava a tak. Když se ale
zpětně ohlédnu na všechny své projekty, tak mi až překvapivě velkou radost udělali i
drobnosti, jejichž vytvoření zabralo jednotky hodin. V článku se vám pochlubím svým TOP 3
žebříčkem.

{% include figure.html cloudinary_src='posts/kouzlo-malych-projektu-hero_n5emzb' sizing='wide' %}

Aby bylo jasno, nemluvím o naprogramování sto padesátého todo listu s využitím
nejnovějšího frameworku. Myslím případy, kdy mně někdo z okolí řekl o svém reálném
problému a já ho nějak jednoduše softwarově vyřešil. Společnými jmenovateli těchto pár
mini-projektů bylo tedy, že byly určeny pro někoho koho znám, jejich realizace byla
velice rychlá, provoz levný nebo zdarma, a hlavně že v podstatě bez jakékoliv údržby
dobře slouží už několik let.

## Projekt #1: správa revizí

Můj tchán je elektrikář. Ač to není jeho hlavní činnost, tak během roku provede nižší
desítky revizí hromosvodů nebo různých elektrických zařízení.

Revize si eviduje v Excelu, a tak na jednom místě přehledně vidí, co kdy a kde
realizoval. Zadání je triviální: chce aby jej software na základě této tabulky upozornil,
že některá z revizí brzy vyprší. Díky tomu se totiž může zákazníkovi ozvat a nabídnout mu
opětovné provedení revize. 

Moje krátká úvaha:

1. Co si vždy datum vypršení revize poznačit i do kalendáře na mobilu? Ne. Je to ruční
   práce navíc, na kterou se snadno zapomene. 
2. Přidat do Excelu makro. Jak ale zajistit aby se spouštělo samo? 
3. [Google Sheets](https://www.google.com/sheets/about/) aneb Excel v cloudu. Bez práce
   zajištěné zálohování a pohodlná dostupnost z nativní mobilní aplikace. Ač to nebylo
   vlastně úkolem, tak tohle chceme nezávisle na tom, co bude dál. 

Teď už tedy jen zkusit zjistit jestli by šlo “makro” vytvořit i v Google Sheets, jak jej
automaticky spouštět, a jak z makra v případě potřeby poslat mail.

Po chvilce zjišťuji, že vše jde velice snadno. [Google Apps
Script](https://developers.google.com/apps-script/) je platforma v níž jde JavaScriptem
programovat a rozšiřovat většina Google služeb. Skript se uloží přímo na Google Drive, k
načtení tabulky se použije třída
[SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app),
automatické spouštění umí zařídit něco co se jmenuje [Time-driven
triggers](https://developers.google.com/apps-script/guides/triggers/installable), mail se
snadno pošle pomocí
[MailApp.sendEmail](https://developers.google.com/apps-script/reference/mail/mail-app).

Zbytek už je jen trocha práce s datumy a textem. Výsledkem je tedy tabulka úplně stejná
jako ta původní, pouze uložená v jiném "programu". Skript se každý den spustí, projde
datumy revizí a zkontroluje zda některá z nich v následujících 10 dnech nevyprší. Pokud
ano, tak se údaje o ní pošlou v mailovém upozornění. A je hotovo.

{% include figure.html cloudinary_src='posts/sprava-revizi_rplnya' %}

Pro zajímavost odkazuji na
[řešení](https://gist.github.com/osramek/6bf407660e64079031424d6f681fce4b). Kód je
napsaný spíše rychle než pěkně, a trochu jej komplikuje rozdělení na revize hromosvodů a
elektrických zařízení (kontrolují se tedy 2 sloupečky). I tak má ale všeho všudy 90
řádků.

*Pozn.* V dnešní době bych při stejném zadání zvážil, zda by nešlo použít nějakou službu
typu [IFTTT](https://ifttt.com/).

## Projekt #2: nákupní pomocník

Kamarádka v jistém zahraničním e-shopu nakupuje zboží, které pak přeprodává v ČR. E-shop
trochu ve velkoobchodním stylu nabízí formulář na hromadné ověření dostupnosti zboží.
Zboží je často vyprodáno, a dotazování přes formulář je nejlepší možný způsob, jak
nepřijít o zajímavé nákupy.

Ručním vyplňováním formuláře kamarádka trávila spoustu času a nabízelo se zkusit tento
úkon pomocí nějakého software automatizovat. Jako první krok, jsme se domluvili, že
vytvořím program, který bude umět vyplněný formulář uložit a někdy později jedním klikem
zpět načíst.

Z programátorského pohledu tedy potřebuji spustit JavaScript, který poběží v kontextu
stránky třetí strany, a bude tak mít možnost z
[DOMu](https://en.wikipedia.org/wiki/Document_Object_Model) údaje vytáhnout, případně DOM
modifikovat. 

Toho by šlo dosáhnout vlastním rozšířením do prohlížeče, ale toto řešení mě tehdy nejspíš
ani nenapadlo. Automaticky jsem sáhl dle mého názoru po lepší variantě, a tou je
[bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet). Co na tom, že tato
“technologie” má už vrchol své slávy nejspíše za sebou, dovolí mi lehce vyřešit můj úkol.
A proč si myslím, že to byla lepší varianta? Snadnější vytvoření, triviální "instalace" a
nezávislost na prohlížeči. Později kamarádka opravdu ocenila, že program jde spouštět i
na iOS zařízení v mobilním Safari. Kód samotného bookmarkletu je triviální, v podstatě
jen načítá a spouští externí JS soubor se samotným programem. Tímto trikem totiž
dosáhneme bezproblémové aktualizace. Kód bookmarkletu zůstává pořád stejný, a přesto
pouhou změnou externího JS změníme chování bookmarkletu. Vše bez jakéhokoliv zásahu
uživatele.

Zbývalo vyřešit kam ukládat data, tj. jednotlivá vyplnění formuláře. Data nemohla být
uložena lokálně, takže jako cestu nejmenšího odporu jsem tehdy vybral platformu
[Parse](https://en.wikipedia.org/wiki/Parse_(platform)). Později když byla služba
zrušena, jsem ji snadno nahradil pomocí [Firebase](https://firebase.google.com/).

V krátkosti ještě shrnu projekt z uživatelského pohledu. Až bylo hotovo, tak jsem
kamarádce poslal mail s odkazem na statickou www stránku. Tam byl umístění samotný
bookmarklet s popisem jak si jej přidat do prohlížeče (obyčejným přetažením na lištu
záložek, kouzlo!). Pak kamarádka přešla na stránky e-shopu a klikla na svou novou
záložku. Do horní části stránky se přidalo rozhraní pro ovládání programu, tak jak je
znázorněno na screenshotu níže. Existuje tedy 80 různých pozic z nichž každá obsahuje
jedno konkrétní vyplnění celého formuláře. Vyplněné formuláře se tak dají velice
jednoduše ukládat, načítat a případně i přepisovat.

{% include figure.html cloudinary_src='posts/nakupni-pomocnik_kdtcpr' sizing='wide' %}

Tento projekt jsme pak společně ještě trochu rozvíjeli, ale toto byl ten funkční základ.
Přestože vytvoření trvalo jednotky hodin a jednalo se zhruba o 110 řádků kódu, byl
prográmek svému novému majiteli hodně užitečný a ušetřil spoustu času.

## Projekt #3: web školky

Tohle někomu bude asi připadat divné, ale klidně se přiznám. Jeden z projektů co mi
udělal radost byl úplně obyčejný web na WordPressu.

Školka mých dětí potřebovala webové stránky, tak jsem se nabídl, že je udělám. Koupil
jsem doménu a dal se do průzkumu trhu. Už si přesně nepamatuju detaily, ale vím jistě, že
se to hodně zvrtlo. Hostované služby typu [Webnode](https://www.webnode.cz/) se mi
nelíbily nebo nechtěly platit, WordPress je přece starý pomalý moloch, statické
generátory byly cool, ale šablony byly mizerné a jak by vlastně školka web aktualizovala?
Matně si vzpomínám že původně zamýšlený průzkum se neskutečně protáhl. Jen jako ve
flashbacku vidím scénu, kdy pomocí nějakého minimalistického CSS frameworku kóduju
responzivní menu...

Naštěstí mě pak něco osvítilo, a přestal jsem řešit blbosti. Během pár hodin jsem na svůj
běžící VPS nainstaloval [WordPress](https://wordpress.org/), zapnul standardní šablonu
[Twenty Fifteen](https://wordpress.org/themes/twentyfifteen/), na fotobance koupil za pár
dolarů pěkně barevnou ilustraci na pozadí a bylo hotovo. Nějakou dobu zabrala struktura
webu a plnění obsahem, ale vše šlo rychle a hlavně naprosto hladce. Další požadavky ze
školky vždy už byly jen otázkou krátkého hledání a několika kliků v adminu. 

A že jsem si při tomhle mini-projektu vůbec nezaprogramoval? Nevadí. Myslím že právě díky
tomu, se dostal i na tento můj TOP 3 seznam. S minimálním úsilím jsem totiž vyřešil
předložený problém. Web vypadá pěkně, bezproblémově funguje na jakémkoliv zařízení,
administrace je snadná, vedení školky nadšené.

{% include figure.html cloudinary_src='posts/web-skolky_kq2qhn' sizing='wide' %}

## Závěr

Bez jakékoliv diskuze velké nebo složité projekty mají něco do sebe. Na druhou stranu se
někdy za sebou člověk ohlédne a zjistí, že za uplynulý týden projekt zas tak moc
neposunul. 

Projekty popsané v tomto článku jsou opravdu miniaturní. První dva mají jediného
uživatele a web školky v malém městě taky netrhá rekordy v návštěvnosti. 

Přesto mám z projektů radost. Pokud bych to sečetl, tak jsem totiž během zhruba 2 dnů
dokázal realizovat 3 projekty pro 3 různé "zákazníky". A uznejte, koho z nás netěší
pohled na spokojeného zákazníka?