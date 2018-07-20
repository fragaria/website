---
layout: post
title: Vytvořte si appku v Angularu, aneb výhody frameworku Ionic 2
date: '2017-03-31T09:52:00.000+02:00'
author: Jarda Brchel
tags:
- ionic
- mobily
- javascript
- angularjs
modified_time: '2017-03-31T13:46:15.632+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-1753213749517064295
blogger_orig_url: http://blog.fragaria.cz/2017/03/vytvorte-si-appku-v-angularu.html
---

## 

Chtěl jsem vytvořit mobilní appku. Grafiku jsem měl hotovou, dokonce i
API jsem měl hotové, teď už to zbývalo jen naprogramovat. Můj budget byl
hodně omezený, jen 20 000 Kč na vývoj celé appky, tak jsem se rozhodl
hledat Androidího programátora, protože Android má většinu trhu. 

  
<span id="more"></span>

Když jsem začal hledat programátora, tak s tím začal nekonečný cyklus
výběru programátorů, kde jsem vysvětloval, že se bude zatím jednat o
Minimum Viable Product (první, osekaná verze) a snažil jsem se je ukecat
na tento malý budget. 

  

Nutno podotknout, že do té doby jsem dělal všechno sám - návrh wireframů
i následné grafiky, návrh databáze a následného API. Čas běžel a věci se
nehýbaly, což mě začalo po té vší práci ukrutně s\*át, tak jsem se
rozhodl že si i tu aplikaci naprogramuju sám.

  

Po chvíli googlování jsem zjistil, že je tu řešení v podobě hybridních
mobilních aplikací, konkrétně frameworku
[Ionic 2](https://ionicframework.com/), který je psán v Angularu 2.
Pokud už teď píšete web v Angularu, tak můžete směle začít psát mobilní
appku v Ionicu.

  

## Co je to hybridní mobilní aplikace?

Zatímco nativní aplikace je psaná na míru danému operačnímu systému,
hybridrní mobilní aplikace je psána jako webová stránka a pomocí
[Cordovy](https://cordova.apache.org/) je kompilována do nativní
aplikace, kde běží v komponentě WebView. 

  

Cordova rovněž umožňuje aplikaci využívat [nativní služby
zařízení](https://ionicframework.com/docs/native/), takže i přesto,
že píšete webovou stránku, lze pracovat s GPS, fotoaparátem či
gyroskopem daného zařízení.

Samotný Ionic je nyní již ve verzi 2, je odladěný a poměrně rychlý.
Navíc má velkou uživatelskou základnu a na jeho oficiálním fóru najdete
odpovědi na většinu problémů.  
  

## Kdy hybridní a kdy nativní?

Hlavní výhodou Ionicu je možnost buildu aplikace na platformy iOS,
Android a Windows Phone. Pro vývoj máte tedy jeden kód, což je snažší
pro vývoj, údržbu i testování.

Pokud využíváte aplikaci spíše jako grafický výpis dat z webového API a
od telefonu nepožadujete nijak velký výkon, pak je pro vás hybridní
aplikace vhodné řešení. 

Pokud ale ve vaší aplikaci probíhají složité procesy, nebo pokud chcete
mít offline aplikaci, pak je pro vás lepší naprogramovat appku nativně.

  

## Síla je v komponentách

Ionic nabízí [spoustu
komponent](https://ionicframework.com/docs/components/#overview), které
známe z nativního prostředí, ať už jde o modální okna, seznamy či
navigační lištu. Ionic zašel tak daleko, že podle operačního systému
telefonu zvolí nastylování dané komponenty tak, aby vypadala jako v
nativním prostředí, takže modální okno bude vypadat v iOS jinak než v
Androidu. 

Po vytvoření prázdné aplikace si tak během pár minut můžete vytvořit
appku, která bude vypadat na chlup stejně, jako ta nativní. Stačí
například napsat:

    <ion-header>
        <ion-navbar>
          <ion-title>Login</ion-title>
        </ion-navbar>
      </ion-header>

  

 a hned máte na stránce nativně vypadající již předstylovaný navbar.

  

## Angular tak trochu jinak

Jak jsem psal výše, Ionic se píše v Angularu (konkrétně Ionic 2 v
Angularu 2), ale má pár drobných rozdílů.

  

### Žádné routy

Protože v mobilní aplikaci nás nezajímá URL, tak nepotřebujeme ani
router. Namísto toho pracuje Ionic s NavControllerem, kterému předává
potřebné parametry.

  

### Page namísto Components

Co se struktury týče, tak Ionic využívá Page, což je komponenta pro
celou stránku, takže oproti Angularu neskládáte web z malých komponent,
ale na jedné Page máte vše. Snad jen kromě záložek (Tabs), které jsou v
oddělené komponentě.

  

### CLI

V příkazové řádce vytváříme komponenty, service a další prvky pomocí
Ionic CLI, kde příkaz začíná ionic, a ne ng jako v klasickém Angularu.

  

## Závěr

Cílem tohoto článku bylo vás seznámit s frameworkem Ionic a s hybridními
mobilními aplikacemi, takže jsem tu nepsal moc konkrétních věcí. Vývoj v
Ionicu bych určitě zvážil v případě, kdy váš budget na appku je menší a
kdy nemáte velké požadavky na její výkon.  
Pokud si myslíte, že by vám Ionic mohl sedět, pak bych ho na vašem místě
určitě vyzkoušel.
