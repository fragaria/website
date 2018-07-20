---
layout: post
title: Co je nového v Ionic 3
date: '2017-05-26T13:24:00.001+02:00'
author: Jarda Brchel
tags:
- ionic
- mobily
- javascript
- angularjs
modified_time: '2017-05-26T13:59:33.233+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-1154381845397780530
blogger_orig_url: http://blog.fragaria.cz/2017/05/co-je-noveho-v-ionic-3_26.html
---

Jak jsme si ukázali
[minule](http://blog.fragaria.cz/2017/03/vytvorte-si-appku-v-angularu.html),
Ionic je oblíbený framework na tvorbu hybridních mobilních aplikací.
Nyní je již k dipozici Ionic ve verzi 3. Co přinesl nového?

### Změny pod kapotou

  - Změny ve verzi 3 nejsou nijak dramatické. Po vzoru Angularu se ruší
    číslování verzí a framework bude označován jen jako “Ionic”.
  - Framework by měl mít rychlejší start a celkově být stabilnější. Jeho
    celková velikost se také změnšila.
  - Stěžejní a pro nás nejvýraznější změnou je podpora Angularu 4.

Při přechodu z verze 1 na verzi 2 u příkazu ionic start pro vytvoření
nového projektu přibyl argument --v2, který definoval vytvoření projektu
ve verzi 2. Pokud chceme vytvořit projekt verze 3, pak stačí zadat jen
ionic start s tím, že se nainstaluje ta nejnovější dostupná verze (platí
od Ionic CLI v2.2.3, ve staších verzích CLI musíte pro nejnovější verzi
Ionicu zadat argument --v2).
 

### Dekorátor IonicPage

Ionic nepoužívá Router, namísto něj má tzv. *deep link system*, kdy se o
přechod mezi Pages stará NavController, který má metody Push a Pop.
Do funkce Push se vkládá název komponenty, na kterou chceme přesměrovat,
například:
this.navCtrl.push('MyPage');

Pokud bychom si komponentu chtěli označit jinak, můžeme využít parametru
name v dekorátoru IonicPage, díky kterému pak linkujeme na komponentu
díky vlastní proměnné: 

@IonicPage({
 name: 'my-page'
})

@Component({
 ...

})
export class MyPage {...}

Následně na tuto komponentu můžeme linkovat přes proměnnou nastavenou v
dekorátoru:
this.navCtrl.push('MyPage');

Další vlastností dekorátoru IonicPage je atribut segment, který definuje
URL parametr pro danou komponentu v případě, že je zrovna aktivní:
@IonicPage({
 name: 'my-page',
 segment: 'some-path'
})

V URL se daná komponenta zobazí následovně:
http://localhost:8101/\#/some-path

Do proměnné *segment* se dá vložit i dynamická proměnná, a to ve formátu
:variable, příklad:
@IonicPage({
 name: 'detail-page',
 segment: 'detail/:id'
})

Samotná proměnná se předává v metodě Push, odkazující na naší
komponentu.
Více o IonicPage dekorátoru se můžete dozvědět v [oficiální
dokumentaci](http://ionicframework.com/docs/api/navigation/IonicPage/).

### Lazy loading

Jednou z features nového Ionicu je i možnost nastavit si lazy loading,
který znatelně zrychlí celou aplikaci. Lazy loading však není plně
odladěn a stále má nedostatky. Autoři Ionicu se na svém
[blogu](https://blog.ionic.io/ionic-3-0-has-arrived/) dokonce zmiňují,
že hledají testery a ocenili by pomoc komunity při testování lazy
loadingu.

### Vhozená rukavice

Nic není perfektní a nová verze Ionicu není vyjímkou. Mezi nedostatky,
které si zaslouží péči patří:

  - Chybné updatování URL adres při pushnutí se do komponenty nejvyšší
    úrovně, která využívá nav-tabs.
  - Deep linking funguje zatím jen v jednom navigačním zásobníku, což
    znamená že při použití rozdělených panelů (tzv. Ionic split pane)
    nebude URL navigace fungovat správně.

### Co bude dál

Vývojáři z Ionicu se chtějí zaměřit především na zrychlení startu
aplikace a na zvýšení rychlosti. Průběžně budou zpracovávat uživatelský
feedback k sekci lazy loadingu. Samozřejmostí je další oprava bugů v
celém frameworku.
Vývojáři z Ionicu se chtějí zaměřit především na rychlost celé aplikace,
především pak její start. Ionic není dokonalý, ale jak jsem psal výše,
vývojáři Ionicu budou rádi za vaše náměty a pomoc. Třeba pak budete mít
dobrý pocit, že jste něco vrátili opensource komunitě.

Koho by zajímal další progres Ionicu, může je sledovat na
[Twitteru](https://twitter.com/ionicframework) nebo se mrknout na jejich
[blog](https://blog.ionic.io/).
