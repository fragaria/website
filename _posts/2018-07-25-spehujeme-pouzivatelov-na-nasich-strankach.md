---
layout: post
title: Špehujeme používateľov na našich stránkach
date: '2018-07-25T13:00:00.000+02:00'
author: Lukáš Turský
tags:
- google analytics
- hotjar
- loggly
- page uptime
- user monitoring
- user recording
modified_time: '2018-07-25T13:00:00.000+02:00'
cloudinary_src: posts/2018-03-28-blockchain-can-do__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2449955145126440509
blogger_orig_url: http://blog.fragaria.cz/2018/07/spehujeme-pouzivatelov-na-nasich.html
---

Patrím medzi ľudí, ktorí majú radi spätnú väzbu na svoju prácu, no tú je na webe ťažké získať, kedže návštevníci nemajú čas sa k vám vyjadrovať.
Jedine ak spravujete štátny portál. Preto sú tak obľúbené rôzne nástroje na sledovanie návštevnikov na stránkach a ich vyhodnotením sa vieme dostať k nepriamej spätnej väzbe.
A že ich je.

> "Use the right tools to spy on people on your website"

{% include figure.html cloudinary_src="posts/2018-03-28-blockchain-can-do__1.jpg" %}
[Dmitry Ratushny](https://unsplash.com/@ratushny?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge)

Dnes vám preto predstavím pár nástrojov, ktoré používam ja pri sledovaní používateľov na stránkach a zaspomínam v čom mi už za tie roky pomohli. Tému ako aj nástroje by som zahrnul do oblasti User Monitoring či User Profiling.

Zameriam sa na vlastné projekty - menšie appky a prezetačné stránky. E-shopom a iným CMS systémov sa nevenujem (našťastie). Navyše tu sa už očakáva nasadenie marketingových služieb, kam zachádzať nechcem. Na druhej strane väčšie či korporátne appky si často vyžadujú mať časť trackovania in-house (interné logovanie, audit, support centrum).

## EU Cookie law

Než začneme, trošku politiky. Väčšina nástrojov využíva na sledovanie cookies a o tom potrebujeme ľudí na stránke informovať. Cookies slúžia na rôzne účely - funkcionálne, výkonnové, štatistické či marketingové. Niektoré sú potrebné pre správny beh stránky, iné plnia dodatočnú úlohu na zlepšenie používateľského zážitku, čo je náš prípad. Možností je veľa (ako pri všetkom), no ja používam overenú [cookieconsent službu](https://cookieconsent.insites.com/). Fajn je, že je veľmi dobre customizovateľná a pripravená na použitie s GDPR. Podporuje viacero možností získania súhlasu.

Príklad informačného použitia

{% highlight html %}
<!-- Cookie Consent Screen -->
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
<script>
window.addEventListener("load", function(){
    // Customize cookie consent
    window.cookieconsent.initialise({
  "palette": {
      "popup": { "background": "#252e39" },
      "button": { "background": "#14a7d0" }
  },
  "content": {
      "link": "Privacy policy",
      "href": "privacy.html"
  },
  "elements": {
      "messagelink": '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}">{{link}}</a></span>',
      "link": '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}">{{link}}</a>'
  }
    })});
</script>
{% endhighlight %}

## GDPR odbočka než začneme

Čo sa týka GDPR samotného, v skratke musíte používateľa informovať o tom aké osobné údaje o ňom zbierate, ako s nimi nakladáte, potrebujete na to explicitné povolenie, ktoré musí mať možnosť odvolať :)
V našom prípade sa o zabezpečenie údajov starajú nástroje samotné. Na vás zostáva získanie súhlasu v prípade ak zbierate údaje, ktoré môžu slúžiť na identifikáciu, nestačí len upozornenie. Čo vlastne znamená len krok naviac, kedy vám odklikne **Povoliť**. Problémom môže byť zmazanie údajov, ak vám niekto tento súhlas neskôr zruší, keďže tento proces je tažšie automatizovateľný.

Pri mnou opisovaných použitiach však takéto údaje nezbieram - tj. údaje sú anonymné (nemajú povahu osobných údajov) a stačí informovanie ako doposiaľ. Samozrejme nástroje si generujú vlasný anonymný identifikátor používateľa. Každopádne je fajn mať pre každý prípad nasadenú **privacy policy** stránku - [dá sa vygenerovať napr. tu](https://privacypolicies.com/). Pri appkách je samozrejmá aj **terms of service**.

## Nástroje

Každý nástroj vzyšiel z určitej potreby dozvedieť sa:

- či je stránka dostupná (Statuscake)
- koľko ľudí tam chodí a odkiaľ (Google Analytics, skr. GA)
- čo čítajú, ako prechádzajú stránku, v akom momente odídu (Hotjar)
- nastali nejaké chyby počas ich návštevy (Loggly)

Každý nástroj používam vo free variante, ktorá pre vybrané typy projektov postačuje, keď tak firma zaplatí.

Celú konfiguráciu mám schovanú v jednom skripte.

{% highlight js %}
let devMode = document.location.hostname.search("localhost") >= 0;

const GOOGLE_ANALYTICS_KEY = '';
const HOTJAR_ID = '';
const LOGGLY_KEY = '';

if (devMode) {
  console.info('Development mode. Tracking not applied.');

} else {
  /* GOOGLE ANALYTICS - user analytics */
  (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', GOOGLE_ANALYTICS_KEY, 'auto');
  ga('set', 'anonymizeIp', true); // GDPR
  ga('send', 'pageview');

  /* HOTJAR - recordings, heatmaps */
  (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = {hjid: HOTJAR_ID, hjsv: 5};
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
  })(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');

  /* LOGGLY - error logs */
  (function (window, document, src, headElement, logglyScriptElement) {
      headElement = document.getElementsByTagName('head')[0];
      logglyScriptElement = document.createElement('script');
      logglyScriptElement.async = 1;
      logglyScriptElement.src = src;
      headElement.appendChild(logglyScriptElement);

      logglyScriptElement.onload = function() {
          _LTracker = _LTracker || [];
          _LTracker.push({
              'logglyKey': LOGGLY_KEY,
              'sendConsoleErrors' : true,
              'tag' : 'example-logs'
          });
      }
  })(window, document, '//cloudfront.loggly.com/js/loggly.tracker-latest.min.js');
}
{% endhighlight %}

## Google Analytics je základ

Slúži na automatické trackovanie používateľov ako prechádzajú stránky a poskytuje možnosť zaznamenávania udalostí. V podstate poskytuje trackovanie stránok a eventov. Google o vás vie zistiť množstvo vecí, tiez zaujímavejšie pre nás sú napr. vek, lokalita, pohlavie, údaje o zariadení a prehliadači.

Stránky (zmeny v URL) trackuje automaticky, pokiaľ nemáme SPA applikáciu, kde to zostáva na nás - stačí pribaliť wrapper pre danú frontend technológiu, alebo volať priamo. V prípade potreby umožňuje pre dané sledovanie nastaviť dodatočné hodnoty - tzv. dimenzie. Tie použíjeme napr. na internú identifikáciu používateľa - user id, user role atd.

Pekne vysvetlené GDPR pre GA je tu - [Analytika vs. GDPR (André Heller)](https://www.slideshare.net/mediocz/analytika-vs-gdpr-andre-heller)

**Čo ma najčastejšie zaujímava:**

- počet návštevníkov a koľko času tam strávia
- odkiaľ prišli
  - direct - dajú sa trackovať parametre url, prípadne ignorovať príchody crawlerov
  - search - aký názov zadali pri vyhľadávaní?
  - social - redirect z ktorých sociálnych sietí
- ako často a kedy tam chodia resp. nechodia
  - určenie release / patch okien
- rýchlosť načítania stránky
  - na čo sa čaká? je to pomalé? treba optimalizovať zdroje?
- najčastejší hardvér / softvér
  - poskytuje odpovede na otázky responzivity / potvrdenie mobil first prístupu

Pekná vec je možnosť tvorby panelov, kde môžete mať naraz až 12 rôzných widgetov (graf, tabuľka, číslo, mapa ...). Takéto panely je možné zdielať a použit na viacerých projektoch. Je tu [dostupný marketplace](https://analytics.google.com/analytics/gallery/) s množstom používateľských panelov podľa viacerých kritérií. Prípadne ich môžete vykradnúť a vystavať si vlastný.

Super vec je [Page analytics chrome extension](https://chrome.google.com/webstore/detail/page-analytics-by-google/fnbdnhhicmebfgdgglcdacdapkcihcoh), ktorý umožňuje vidieť základné informácie pri príchode na stránku. Navyše umožňuje zobraziť základnú heatmapu s počtom kliknutí na odkazy.

{% include figure.html cloudinary_src="posts/" caption="Náhľad stránky zo zapnutým Page analytics pluginom" %}

{% include figure.html cloudinary_src="posts/" caption="Náhľad stránky zo zapnutým Page analytics pluginom" %}

Pre appky odporúčam mať na projekte pustený na monitore dashboard s real údajmi zo sledovania. Statické stránky podľa potreby prejdem aspoň raz za týždeň.

## Hotjar pre nahrávanie obrazovky

Hotjar je môj naobľúbenejší nástroj, ktorý sa zameriava na sledovanie správania používateľa a poskytuje zber spätnej väzby. Predstavte si, že si môžete pustiť video záznam toho čo používateľ robil na vašej stránke. Vidíte ako hýbe myšou / prstom, kam skroluje po stránke, pauzy, ktoré pravedpodobne využíva na čítanie. Skrátka robí veci úplne inak ako ste si predstavovali. Tak túto top feature vám Hotjar ponúka v rámci nahrávania obrazovky na danej stránke. Samozrejmosťou je zopár ďalších štandardných features, ktoré si v skratke prejdeme. Celkovo má veľmi dobrú free ponuku a výrazné výhody oproti alternatívnym riešeniam.

### Heatmapy

Štandardná feature, ktorá nesmie chýbať pri takomto nástroji.
Podklad pre heatmapu si nástroj spraví sám a ponúka rozdelenie podľa typu zariadenia - mobil / tablet / desktop.

### Recordings

Už spomínané nahrávanie stránky. Je možné nastaviť, či má nahrávať aj text vkladaný do formulárov, pričom ale vždy ignoruje authorizačné inputy pre name a password. Video môžeme triediť, tagovať či pridávať poznámky. To priam nabáda nasadiť na A/B testy, UX testy, či testovanie nových features na vybraných používateľoch.

Čo sa týka GDPR, tak dodatočne pridali možnosť trackovať len whitelistované input fieldy, či úplne ignorovať emailove adresy a numerické inputy.

{% include figure.html cloudinary_src="posts/" caption="Zoznam nahrávok používateľov" %}

### Ďalšie vlastnosti

Toto podľa mňa pridali dodatočne aby toho mali viac v ponuke, no je to jednoduché a robí to čo má. Ďalej tu máme:

- Analýzu formulárov
  - v akom momente ľudia opustia formulár
  - super pre appky s formulármi
- Analýza konverzie medzi stránkami
  - analýza prechodu medzi viacstránkovým formulárom, či viacerými stránkami - typicky jednávka
  - nepoužívam, dá sa riešiť cez Google Analytics
- Feedback
  - automatický pridá feedback štítok na stránku
  - vyber smajlíka podľa nálady + vyber časť stránky + napíš kritiku ak chceš => pošli
- Prieskum spokojnosti
  - možnosť zobraziť pri odchode
- Anketa
  - napr. akú ďalšiu feature máme pridať

### Najčastejšie problémy

- s navigáciou na stránke
  - pochopením menu
- s vypĺňaním formuláru
  - hlavne selektory (datepicker, multiselect)
- častokrát sa snažia klikať na zvýraznený text (následok flat designu)
  - je treba zadefinovať dizajn tlačítok
  - nezvýrazňovať text zároveň farbou a boldom
- s vypĺňaním zložitejších formulárov
  - hlavne selektory (datepicker, multiselect)
- ľudia uprednostňujú mapu na vyhľadávanie

### Pozorovania z personálnej stránky

- veľa ľudí hýbe s myšou ako postupne číta text
  - vidieť čo si prečítali, čo nie, čo je zle rozdelené
- recruiteri chcú všetko vidieť hneď, nechce sa im skrolovať ani zbytočne klikať, hľadajú len - základné info (keywords) a idú na kontakt
  - hneď na začiatku prezentujem aktuálny stav, job description, availability, link na CV a email
- pred pohovorom viem povedať, či sa na mňa ľudia pripravujú
  - vačšina si prezrie profil tak hodinku pred stretnutím
  - hodinku pred termínom prejdem dlhšie nahrávky na webe, väčšinou si čítaju o posledných projektoch - pridajte tam zaujímavosti

## Loggly pre odchytávanie chyb

Toto ma naučili používať chalani v "Spořke". Dovtedy som logovanie chýb neriešil, alebo som si to posielal na vlastný error endpoint na server. Ak viete používať Kibanu a nechce sa vám riešiť Logstash, tak loggly je riešenie. Ja osobne ho používam len na logovanie chýb. Jinde tam o vás logujú celý príbeh. Takže kto čo potrebuje.

Fajn je, že JS knižnica poskytuje v rámci konfigurácie priamo možnosť odchytávať chyby. Samozrejmosťou je aj možnosť custom logovania - napr. v rámci spracovania http requestov. Čo sa mne páči je možnosť pridávania tagov / custom labelov. To mi umožňuje logovať problémy z viacerých stránok do jedného worskpaceu a v rámci query to jednoducho oddeliť.

V rámci free plánu toho neponúka veľa, určite sa nájdu aj zaujímavejšie riešenia, no jeho ohromnou výhodou je podpora a konfigurovateľnosť. Je možné ho využiť aj na backende a v prípade klienta existuje viacero wrapperov pre každý významnejší framework.

> PS: nezabudnite vybuildiť source mapu, ináč zo stacketraceu nič zmysluplné nedostanete.

## StatusCake pre prípad výpadku

StatusCake je jednoduchý tool, ktorý používam na monitorovanie dostupnosti stránok (page uptime). Aktuálne mám nastavených 6 testov, každý zbehne raz za 30 min. Akonáhle nastane výpadok, obdržím email. Všetko v rámci free plánu.

V rámci testov môžem nastaviť:

- typ testu (http, ssh, ping, dns)
- threshold pre upozornenia
- test locations
- frekvenciu (15-30 min, 1hod, 1den)
- pre appky sa hodí - testovanie s basic auth, custom HTTP headers či form data v requeste

 Uptime monitoring je fajn vec, obzvlášť ak máte:

- aplikácie v cloude
  - spôsob ako im zabrániť v uspávaní
  - ľahko odhalíte ak ste prečerpali denní limit
- vám hrozí DDoS útok
  - ak človek robí politický motivovaný web

{% include figure.html cloudinary_src="posts/" caption="Dashboard testu" %}