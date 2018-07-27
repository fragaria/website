---
layout: post
title: Angular.js daterangepicker
date: '2014-03-13T15:50:00.000+01:00'
author: Lukáš Marek
tags:
- open source
- javascript
- bootstrap
- angularjs
modified_time: '2014-10-13T14:37:51.414+02:00'
cloudinary_src: posts/2014-03-13-angularjs-daterangepicker__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-587030779503436220
blogger_orig_url: http://blog.fragaria.cz/2014/03/angularjs-daterangepicker.html
---

Filip a Tibor při posledním projektu narazili na to, že pro Angular
neexistuje žádný pořádný **daterange picker** – tedy komponenta, která
umožní vybrat rozsah dvou datumů. Protože jsou to kluci šikovní, tak se hned pustili do nápravy tohoto
smutného stavu :)

Výsledek vypadá docela hezky, co?

{% include figure.html cloudinary_src='posts/2014-03-13-angularjs-daterangepicker__1.png' %}

### Použití

Komponenta se používá dost jednoduše:

{% highlight html %}
<div ng-controller="TestCtrl">
    <input date-range-picker class="form-control date-picker" type="text" ng-model="date" />
</div>
{% endhighlight %}

Samozřejmě je možné nastavit minimum, maximum.

### Instalace

Pokud si chcete náš **daterange picker** vyzkoušet, tak mrkněte na
[dokumentaci](https://github.com/fragaria/angular-daterangepicker) nebo
si ho rovnou přidejte do projektu:

    bower install angular-daterangepicker --save
