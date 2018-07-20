---
layout: post
title: CoffeeScript a OOP
date: '2014-05-14T10:43:00.000+02:00'
author: Robin Gottfried
tags:
- oop
- javascript
- angularjs
- coffeescript
modified_time: '2014-10-13T14:32:32.488+02:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-390344130544827557
blogger_orig_url: http://blog.fragaria.cz/2014/05/coffeescript-oop.html
---

Dlouho jsem nemohl přijít CoffeeScriptu na chuť. Přišlo mi, že za málo
muziky nabízí hodně potíží. Co mě nakonec přesvědčilo, byla schopnost,
po které jsem v JavaScriptu přímo prahnul: **Psát skutečné třídy a
objekty**.  
<span id="more"></span>  
Když jsem se nadšeně bavil s kolegy, že už jsem taky kafař, že to je
fakt hustý kafe a že teď už konečně píšu „objektivně”, zjistil jsem, že
tuhle - za mě - nejdůležitější vychytávku, většina kafařů v okolí zatím
vůbec nezkusila.  
  

### První třída v CoffeScriptu

Nejjednodušší třída vypadá takto:  

  

toString: () -\> ... vytvoří metodu Person.prototype.toString.

 constructor: () ... je speciální metoda konstruktoru objektu.

 @ ... zavináč je nejdůležitější znak pro objekty v CS, takže:

  -  @name ... odkazuje na this.name.
  -  (@name) -\> ... zavináč v argumentu funkce zajistí automatické
    uložení do this.name před zavoláním metody.

  

### Statické metody / properties

Ke třídám patří statické metody. Jako vše kolem kafe-objektů i statické
vlastnosti se zapisují pomocí zavináče  

  

  - @ před názvem metody - vytvoří metodu jako statickou (jako metodu
    třídy)
  - Ve statické metodě zastupuje @ třídu, a protože třída je v JS to
    stejné jako konstruktor, new @(name) vytvoří novou instanci aktuální
    třídy.
  - Podobně lze přistupovat ke statickým metodám z instance
    (@fromNames zde stoprocentně nefunguje). Jen je třeba si uvědomit,
    že konstruktor je pod @constructor a @constructor is Person, tedy
    naši metodu můžeme z instance zavolat jako
    @constructor.fromNames(...).

  

### Dědění

Vlastně největší výhodou tříd v CoffeeScriptu je přehledné dědění:  

  

extends - je samozřejmé klíčové slovo CoffeeScriptu

Employee.\_\_super\_\_.constructor - uchovává odkaz na předka (v tomto
případě Person)

super - trochu nesystematicky

  - bez argumentů a závorek zavolá stejnojmennou metodu nad rodičem a
    přepoužije aktuální argumenty (tj.
    Employee.\_\_super\_\_.constructor.apply(this, arguments))
  - se závorkami nebo s argumenty zavolá metodu předka pouze s těmito
    argumenty

  

### Vázané metody

Kdo programuje v Java/CoffeeScriptu, setkal se určitě s problémem
vázaných metod. Jednoduchý příklad:  

JavaScript u metod neuchová informaci, ke kterému objektu patří, takže
při jejich volání bez plně kvalifikovaného jména přijde metoda o
referenci na this.  
To je u asynchronního jazyka, kde každý program je plný callbacků,
veliká otrava. Samozřejmě to lze různě obejít a obchází se to (pomocí
function.bind či self = this), ale CoffeeScript má vlastní pěkné řešení
v podobě konstrukce =\>  

  

### Použití tříd v AngularJS

AngularJS má vlastní způsob zapouzdření a využití objektového
(prototypového) přístupu pro kolegy není úplně intuitivní. Častá
námitka, kterou slyším, je: *Scope nebo Servisu ale nemůžeš jednoduše
dědit.*  
  
Takže, chlapci, můžeš\! Stačí jen kávu správně dávkovat v injekcích:
