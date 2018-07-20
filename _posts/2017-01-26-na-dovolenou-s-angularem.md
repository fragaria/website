---
layout: post
title: Na dovolenou s Angularem
date: '2017-01-26T09:38:00.000+01:00'
author: Lukáš Marek
tags:
- slivovice
- angularjs
- flickr
modified_time: '2017-01-26T09:38:30.291+01:00'
thumbnail: https://1.bp.blogspot.com/-WYKgaZSdXrU/WISTpBpTShI/AAAAAAAAAyc/eNNyFyA9WHUE6tU2fJFdCjQeiqc0LxSrwCLcB/s72-c/Screen%2BShot%2B2017-01-22%2Bat%2B12.11.58.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-2314862756090192575
blogger_orig_url: http://blog.fragaria.cz/2017/01/na-dovolenou-s-angularem.html
---

Jak udělat stránky s dynamickým pozadím, kde bude pokaždé nová fotka
stažená z Flickeru? V Angularu překvapivě jednoduše.

### Proč?

Každý rok na podzim se jezdíme s chlapci na dovolenou. Protože už
jezdíme víc než 10 let, logicky vzniklo několik tradic, které se
snažíme více či méně dodržovat.
Mezi tradice patří každoroční expediční trička, lahev slivovice v
batohu, deníček vždy po ruce, beta karoten, kdyby nás překvapilo slunce
a tak dále.
Důležitou tradicí je také [odletová stránka](https://cartagena.cz/),
která ukazuje počet dní a hodin do
odletu.

[![](https://1.bp.blogspot.com/-WYKgaZSdXrU/WISTpBpTShI/AAAAAAAAAyc/eNNyFyA9WHUE6tU2fJFdCjQeiqc0LxSrwCLcB/s400/Screen%2BShot%2B2017-01-22%2Bat%2B12.11.58.png)](https://1.bp.blogspot.com/-WYKgaZSdXrU/WISTpBpTShI/AAAAAAAAAyc/eNNyFyA9WHUE6tU2fJFdCjQeiqc0LxSrwCLcB/s1600/Screen%2BShot%2B2017-01-22%2Bat%2B12.11.58.png)

Odletovou stránku mám na starosti já a každý rok se snažím, aby na ní
bylo kromě prostého odpočtu i něco zajímavého. Loni mě napadlo, že by
bylo fajn na pozadí stránky střídat fotky z minulých dovolených, které
máme vystavené na
[Flickeru](https://www.flickr.com/photos/79052148@N04/albums). Po chvíli
laborování s Flicker API a Angularem jsem zjistil, že to je docela
jednoduché.

### Jak na to?

Nejdřív je třeba vyřešit byrokracii. K volání Flickeru přes REST je
potřeba API klíč, takže je nutné o něj
[požádat](https://www.flickr.com/services/apps/create/).
Potom je potřeba zjistit ID alb, které se mají zobrazovat. To je snadné,
protože ID alba je to poslední číslo v [URL
alba](https://www.flickr.com/photos/79052148@N04/albums/72157674403312466).
Takže v mém případě, kdy album má adresu
`https://www.flickr.com/photos/79052148@N04/albums/72157674403312466` je
IDčko `72157674403312466`.

### Pozor na autorská práva

Já na *svojí* stránce ukazuju *svoje* fotky, takže jsem v pohodě. Pokud
ale budete chtít použít cizí fotky, zkontrolujte si licenci - ve vetšině
případů musíte alespoň označit autora fotky\!

### Jde se kódovat

Nejdřív je třeba připravit si styl pro element, u kterého se bude měnit
pozadí pomocí `background-url`. Asi nějak takhle:

No a potom už jen do projektu přidat službu a direktivu, která se
postará o vlastní volání Flickeru:

A použití? Jednoduše se k elementu u kterého je třeba měnit pozadí dá
direktiva `flickr-background`:

### Vychytávky

Kód je dost jednoduchý, ale všimněte si pár vychytávek:

  - Služba `Flickr` může dostat víc ID alb a stáhne metadata všech fotek
    ze všech alb a spojí je do jednoho pole.
  - Metoda `next()` ve `flickrDirective` rovnou načte další fotku v
    pořadí pomocí http requestu. Tohle *zbytečné volání* uloží další
    fotku do cache prohlížeče, takže výměna pozadí za další obrázek je
    okamžitá.
  - Directiva poslouchá na událost `next` - po vystřelení této události
    se fotka na pozadí okamžitě změní.
  - Styl je napsaný tak, že všechno funguje i na mobilu.

A celé dohromady to vypadá [asi takhle](https://cartagena.cz/)\!

### Co příště?

Tohle byl asi poslední návod na našem blogu pro AngularJS 1.x. Teď už
totiž [frčí dvojka](https://angular.io/docs/ts/latest/quickstart.html)\!
