---
layout: post
title: Chraňte svoje hesla! Aneb kdo si to má všechno pamatovat?
date: '2014-02-03T15:35:00.000+01:00'
author: Martin Bílek
lang: cs
tags:
- open source
- bezpečnost
modified_time: '2014-02-03T16:06:24.023+01:00'
cloudinary_src: posts/2014-02-03-chrante-svoje-hesla-aneb-kdo-si-to-ma__1.gif
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-7303693901715937266
blogger_orig_url: http://blog.fragaria.cz/2014/02/chrante-svoje-hesla-aneb-kdo-si-to-ma.html
---

Před časem jsem řešil s dlouholetým zákazníkem problém v námi dodaném
systému. Abych mohl problém analyzovat, potřeboval jsem do onoho systému
přístup, který jsem však neměl. V rámci zrychlení celé akce došlo k
tomu, že mi zákazník své přihlašovací údaje začal diktovat do telefonu
(ano, ani to není ideální). Pozorně jsem začal psát. *"Uživatelské jméno
je Petr, vše malými písmeny."* *"A heslo je Petr1959, také malými
písmeny,"* sdělil mi pan Petr Novák.

Na první pohled je jasné, že s heslem není něco v pořádku. Nicméně dnes
nechci psát o tom, že heslo typu "petr1959" je úplně k ničemu, ale chci
psát o tom, jak si pamatovat hesla, pokud jich máte opravdu hodně,
chcete je mít stále k dispozici a zároveň chcete, aby tato hesla byla
alespoň trochu v bezpečí.

**Požadavky na "systém", kterému hesla svěřím:**

  - **bezpečnost dat** - nemohu o hesla jednoduše přijít / zálohování
  - **přístupnost** - potřebuji hesla když sedím u počítače, stejně tak
    když jsem někde v terénu jen s mobilním telefonem
  - **opensource** - systém úschovy hesel by neměl být služba typu
    [LastPass](https://lastpass.com/), což není z důvodu, že bych za to
    nechtěl platit :-)
  - **sdílení hesel** - možnost některá hesla sdílet s někým jiným
  - **nezávislost na platformě** - OS X, Windows, Linux, Android, IOS...
  - **integrace do webového prohlížeče** - Nice To Have
:-)

{% include figure.html cloudinary_src='posts/2014-02-03-chrante-svoje-hesla-aneb-kdo-si-to-ma__1.gif' caption='Password Gorilla' %}

Při hledání jsem našel jen několik aplikací pro ukládání "hesel", které
by splňovaly to, co jsem požadoval. Nakonec jsem zvolil aplikaci
[Password Gorilla](https://github.com/zdia/gorilla/wiki) pro desktop a
pro Android aplikaci
[PasswdSafe](https://play.google.com/store/apps/details?id=com.jefftharris.passwdsafe&hl=cs).

### Takže jak jsou na tom mé jednotlivé požadavky vs. realita?

#### Bezpečnost dat

Díky tomu, že jsou "hesla" ukládána v datovém souboru, není nic
jednoduššího, než tento soubor přidat do běžné zálohy. Datový soubor
mám samozřejmě zabezpečen dostatečně dlouhým heslem (30+ znaků).

#### Přístupnost

Datový soubor mám uložen "v cloudu" (Google Drive, Dropbox...), čímž ho
mám přístupný na všech zařízeních, kde ho potřebuji. Na Mac mám soubor
syncovaný přes Insync. Na Android pak otevírám datový soubor přes
standardní Drive aplikaci v readonly režimu, což mi dostačuje.

#### Opensource

Jak Password Gorilla, tak i PasswdSafe jsou opensource projekty.

#### Sdílení hesel

Tam, kde potřebuji hesla sdílet s někým dalším (například všemožné
webové přístupy do různých služeb), mám tato hesla uložena ve vlastním
datovém souboru, který v "cloudu" s dotyčným sdílím.

#### Nezávislost na platformě

Celé řešení mám vyzkoušené pouze na OS X a Android, ale předpokládám, že
vše bude fungovat stejným způsobem i na ostatních platformách, viz.
informace na [GitHubu](https://github.com/zdia/gorilla/wiki).

#### Integrace do webového prohlížeče

Tohle jsem zatím nevyřešil a zatím ani nenalezl nikoho, kdo by ve stacku
mnou vybraných aplikací vyřešil. Zároveň se ale ukazuje, že tento
požadavek pro mě není zásadní a v tuto chvíli mě příliš
nevadí.

{% include figure.html cloudinary_src='posts/2014-02-03-chrante-svoje-hesla-aneb-kdo-si-to-ma__2.png' caption='PasswdSafe' %}

### FAQ - aneb na co je dobré ještě myslet

#### Na Androidu mám nainstalovanou aplikaci PasswdSafe, ale když chci otevřít datový soubor z aplikace Drive, tak ten se nedá otevřít.

Datový soubor je potřeba pojmenovat tak, aby měl příponu ".psafe3".

#### Jaká všechna hesla si tedy reálně musím zapamatovat?

Jednoznačně je potřeba si zapamatovat heslo k datovému souboru. Tím, že
budete datový soubor pravděpodobně "odemykat" poměrně často, neměl by
být problém si složité heslo brzy zapamatovat.

Další heslo, které by bylo dobré si zapamatovat, je do vašeho "cloudu",
ideálně s [dvou úrovňovou
autorizací](http://en.wikipedia.org/wiki/Two-step_verification).
Představte si situaci, kdy budete v zahraničí a přijdete o notebook i
mobilní telefon a záloha bude tisíce kilometrů daleko. V tuto chvíli
musíte být schopni zprovoznit celé řešení na novém zařízení, což bude
předpokládat i to, že jste si schopni stáhnout datový soubor z vašeho
cloudu.

### Závěr

Závěrem už jen budu konstatovat, že jsem s výše popsaným řešením pro
tuto chvíli spokojený. Minimálně jsem se s kvalitou hesel posunul z
*"nuly na sto"*, což považuji za dobrý první krok.

***A co vy? Jak se staráte o svá hesla? Také stále ještě používáte
stejné heslo na všech používaných službách? Co na to Petr Novák?
:-)***

*P.S.: Petr Novák je osoba smyšlená, nicméně příběh ze začátku blogpostu
je skutečný. Nejvíc zarážející na tom pro mě je, že Petr si vylepšil
heslo o rok svého narození po tom, kdy mu před dvěma lety někdo vykradl
databázi klientů (několik desítek tisíc kontaktů). Pravdou ale je, že
tehdy měl uživatelské jméno i heslo stejné 1:1 :-)*
