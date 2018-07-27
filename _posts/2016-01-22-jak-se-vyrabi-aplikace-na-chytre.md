---
layout: post
title: Jak se vyrábí aplikace na chytré hodinky Pebble Time Round
date: '2016-01-22T09:04:00.001+01:00'
author: Jirka Chadima
tags:
- pebble
- javascript
- smartwatch
modified_time: '2016-01-22T11:01:05.189+01:00'
cloudinary_src: posts/2016-01-22-jak-se-vyrabi-aplikace-na-chytre__1.gif
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-486624487688836464
blogger_orig_url: http://blog.fragaria.cz/2016/01/jak-se-vyrabi-aplikace-na-chytre.html
---


Když se v dubnu 2012 na Kickstarteru objevily hodinky
[Pebble](https://www.pebble.com/) s e-ink displayem, za měsíc získaly
částku přesahující deset milionů dolarů. Na jaře 2013 jste si o ně s
námi mohli
[zasoutěžit](http://www.fragaria.cz/o-nas/tiskove-zpravy/2013/5/2/soutez-o-hodinky-pebble/).

Dnes si ukážeme, jak se pro Pebble vyvíjí. Nebude to sice vítězný
[Připomínač léků](http://www.fragaria.cz/soutez/), ale částečně se
přiblížíme jednomu z finalistů, Navigaci na zápěstí.

Místo původního soutěžního modelu se podíváme na
nejnovější kousek, Pebble Time Round, který se poměrně v tichosti
objevil v září letošního roku. Co nabízí? 64barevný kulatý e-ink
display, integraci s Androidem i iOS, při váze necelých 30 gramů výdrž
pohodově přesahující 50 hodin, 4 tlačítka a pár senzorů. A taky
[Maria](https://apps.getpebble.com/en_US/application/55431083b7d4a71c0000003b?section=watchfaces),
[Nyan
Cat](https://apps.getpebble.com/en_US/application/55566afbef1c155748000039?section=watchfaces)
nebo třeba
[Hollyho](https://apps.getpebble.com/en_US/application/565510b84431a2820600000c?&section=watchfaces).

<div class="inline-figure-container">
  {% include figure.html cloudinary_src='posts/2016-01-22-jak-se-vyrabi-aplikace-na-chytre__1.gif' format='gif' %}
  {% include figure.html cloudinary_src='posts/2016-01-22-jak-se-vyrabi-aplikace-na-chytre__2.jpg' %}
  {% include figure.html cloudinary_src='posts/2016-01-22-jak-se-vyrabi-aplikace-na-chytre__3.gif' format='gif' %}
</div>

Pro vývojáře je k dispozici kombinované SDK v C a Javascriptu. Co z
principu nezvládnou hodinky totiž Pebble outsourcuje do telefonu, kde
běží JS engine s přístupem třeba k internetu nebo geolokaci. Nad SDK
existuje i [wrapper kompletně
v Javascriptu](https://github.com/pebble/pebblejs), který je ale trochu
pozadu a Time Round k mému velkému zklamání [zatím ještě
nepodporuje](https://github.com/pebble/pebblejs/issues/116).

Kromě lokální instalace se dá tvořit i v [cloudovém
editoru](https://cloudpebble.net/), jenže to je samozřejmě málo
hardcore, takže využijeme [dodávaného toolu v
Pythonu](https://developer.getpebble.com/sdk/install), který nám kromě
SDK nainstaluje i užitečné blbiny jako emulátor prostředí hodinek,
webový emulátor senzorů nebo nástroj na deployment přímo do fyzického
zařízení.

A co si dnes uvaříme? Uplácáme si [primitivní
aplikaci](https://github.com/JirkaChadima/pebble-csas-nearest), která
nás nasměruje k nejbližšímu bankomatu České spořitelny. Budeme
potřebovat:

  - Data z ČS [WebAPI
    Places](https://developers.csas.cz/html/devs/poi.html),
  - komunikaci mezi C a JS částí aplikace,
  - kreslení grafických primitiv,
  - magnetický kompas z hodinek,
  - geolokaci v mobilu,
  - internet v mobilu.

Celá aplikace bude nakonec vypadat jako na následujícím obrázku. Při
spuštění zjístíme aktuální polohu, získáme nejbližší bankomat,
spočítáme jeho vzdálenost a po naběhnutí magnetometrického kompasu
zobrazíme šipku ve správném směru. Ideálně by se pak šipka a počet metrů
měly v čase měnit podle toho, jak se k bankomatu
přibližujeme.

{% include figure.html cloudinary_src='posts/2016-01-22-jak-se-vyrabi-aplikace-na-chytre__4.jpg' %}

Začneme tím, že potřebujeme data nějak zobrazovat. Pebble pracuje s
konceptem oken (obrazovek) a vrstev různého typu. Aby aplikace nebyla
moc složitá, rozhodl jsem se použít jenom jedno okno a a v něm textovou
vrstvu pro každou řádku informací a jednu vrstvu navíc pro šipku
ukazující směr k bankomatu. Pokud (zatím) nejsou k dispozici žádné
informace, zobrazuje se pouze nápis *Loading...*

Všechna data kromě směru šipky budeme do hodinek pushovat z JS části
aplikace v telefonu. Triggerem pro získání dat v telefonu bude buď
spuštění aplikace, nebo timer, který bude data požadovat každou
minutu. Při každém vrácení dat se pak na hodinkách překreslí celé view.
Nezávisle na JS části aplikace se bude překreslovat navigační šipka.

JS z telefonu si s C aplikací v hodinkách povídá pomocí jednoduchého
obousměrného protokolu zpráv. Množina zpráv je definovaná v
[konfiguračním
souboru](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/appinfo.json#L15),
a na
[obou](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/js/pebble-js-app.js#L73)
[koncích](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/message_callbacks.c#L21)
aplikace je pak zadrátované chování pro jednotlivé zprávy. JS tak
obsahuje následující kód pro zjištění nejbližšího bankomatu, [dopočítání
azimutu](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/js/pebble-js-app.js#L13-L38)
a poslání dat do hodinek. Stejná funkce se volá na obě události
definované v hodinkách, a to jsou spuštění aplikace a pravidelná žádost
o refresh dat.

{% highlight javascript %}
navigator.geolocation.getCurrentPosition(function (position) {
    xhrRequest('https://api.csas.cz/sandbox/webapi/api/v2/places?radius=500&country=CZ&types=ATM&limit=1&lat=' + position.coords.latitude + '&lng=' + position.coords.longitude,
    'GET',
    '7f29f5d5-c9d4-4266-8e6b-3733064da14x',
    function (status, data) {
        var response = {};
        var json = JSON.parse(data).items[0];
        response = {
            'KEY_DISTANCE': json.distance,
            'KEY_DIRECTION': computeBearing(position.coords, { // computes azimuth
                latitude: json.location.lat,
                longitude: json.location.lng
            }),
            'KEY_ADDRESS': json.address + '\n' + json.city,
            'KEY_ACCESS_TYPE': json.accessType
        };
        Pebble.sendAppMessage(response); // send data to Pebble
    });
});
{% endhighlight %}

V hodinkách potom zaslaná událost vyvolá
[překreslení](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/ui.c#L54-L64)
kompletního UI a zobrazí získaná data na display.

{% highlight c %}
static void detail_window_set_place(Place place) {
    if (!detail_window) {
        detail_window = detail_window_init();
    }
    text_layer_set_text(address_layer, place.address);
    snprintf(distance_buffer, sizeof(distance_buffer), "%d m", place.distance);
    place_direction = place.direction;
    text_layer_set_text(distance_layer, distance_buffer);
    text_layer_set_text(hours_layer, place.hours);
    write_direction_to_ui(); // computes orientation of arrow
}
{% endhighlight %}

Ale jak namalovat šipku? A jak s ní točit podle aktuálního směru k
bankomatu? Pebble nabízí přímé kreslení polygonů pomocí definice
[jednotlivých
vrcholů](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/layers.c#L4).
Na definovaný obrys se pak dá aplikovat rotace podle zvoleného úhlu,
nadefinuje se barva výplně a můžeme kreslit. Aktuální natočení šipky pak
spočítáme podle předpočítaného azimutu k bankomatu (KEY\_DIRECTION) a
aktuálního nasměrování hodinek. Překreslení šipky bude vyvoláno i změnou
nasměrování hodinek ze [služby poslouchající
události](https://github.com/JirkaChadima/pebble-csas-nearest/blob/master/src/compass.c#L14)
vyvolané
[magnetometrem](https://developer.getpebble.com/guides/pebble-apps/sensors/magnetometer/)
v hodnikách, který jde při vývoji [simulovat z
browseru](https://developer.getpebble.com/guides/publishing-tools/pebble-tool/#emu-control).

No, a to je všechno, teď by aplikace měla fungovat a měla by se chovat
tak, jak chceme. Můžeme jí pomocí [vývojářského
spojení](https://developer.getpebble.com/guides/publishing-tools/developer-connection/)nahrát
do fyzických hodinek, nebo jí vypublikovat do [Pebble
store](https://apps.getpebble.com/en_US/application/56818e4e94ffb216e400001f).
Podle statistik jsem zatím získal velmi pěkná 3 stažení.

Jak ale doopravdy funguje? Po několika dnech pokusů a testování
v reálném provozu musím říct, že dvakrát spolehlivě se to nechová...
Jako nejproblematičtější se jeví komunikace s GPS v telefonu, která s
Androidem spíš nefunguje než funguje, nicméně s iOS je to trochu lepší.
Taky se mi nepovedlo aplikaci vnutit nějakou hezkou ikonku.

Dalším omezením je relativní roztříštěnost platformy. Ačkoliv jde teprve
o pátý model značky, jedná se už o třetí kompletní iteraci vnitřní
platformy a sjednocování jde poměrně pomalu. Tím pak samozřejmě trpí i
dokumentace a okolní nástroje, zejména pak zmiňovaný JS wrapper. S jeho
pomocí je vývoj na všechny platformy výrazně jednodušší a přímočařejší.
Pokud bychom chtěli aplikaci naportovat na starší modely, musí se ručně
zoptimalizovat celá řada drobností, a to je prostě nuda.

Dává tedy smysl se nyní zabývat hodinkami Pebble, potažmo jakýmikoliv
jinými chytrými hodinkami? **Podle mého názoru to má ještě čas.**

I na stavu a stabilitě vývojářských nástrojů je hrozně vidět, že se
jedná o velmi mladou oblast, která vlastně ještě hledá, k čemu by mohla
být lidstvu užitečná. Očekává se, že v polovině roku představí Apple
novou verzi svých Apple Watch a já se vsadím, že budou z velké části
nekompatibilní s těmi původními. Zatím jedinou extrémně přínosnou funkcí
je to, že při každé notifikaci nemusíte tahat telefon z kapsy.
