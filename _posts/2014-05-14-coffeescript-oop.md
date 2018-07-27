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

Když jsem se nadšeně bavil s kolegy, že už jsem taky kafař, že to je
fakt hustý kafe a že teď už konečně píšu „objektivně”, zjistil jsem, že
tuhle - za mě - nejdůležitější vychytávku, většina kafařů v okolí zatím
vůbec nezkusila.

### První třída v CoffeScriptu

Nejjednodušší třída vypadá takto:

{% highlight coffeescript %}
class Person
    constructor: (@name) ->

    toString: ->
        "člověk #{@name}"


person = new Person("Jan Novák")
console.log "%s", person
#> člověk Jan Novák
{% endhighlight %}

 - `toString: () -\>` ... vytvoří metodu Person.prototype.toString.
 - `constructor: ()` ... je speciální metoda konstruktoru objektu.
 - `@` ... zavináč je nejdůležitější znak pro objekty v CS, takže:
  -  `@name` ... odkazuje na `this.name`.
  -  `(@name) -\>` ... zavináč v argumentu funkce zajistí automatické
    uložení do `this.name` před zavoláním metody.

### Statické metody / properties

Ke třídám patří statické metody. Jako vše kolem kafe-objektů i statické
vlastnosti se zapisují pomocí zavináče

{% highlight coffeescript %}
class Person
    # ...

    @fromNames: (names) ->
        return (new @(name) for name in names)

console.log "%s", Person.fromNames(['Honza', 'Michal', 'Zdeněk'])
#> člověk Honza, člověk Michal, člověk Zdeněk
{% endhighlight %}

  - `@` před názvem metody - vytvoří metodu jako statickou (jako metodu
    třídy)
  - Ve statické metodě zastupuje `@` třídu, a protože třída je v JS to
    stejné jako konstruktor, `new @(name)` vytvoří novou instanci aktuální
    třídy.
  - Podobně lze přistupovat ke statickým metodám z instance
    (`@fromNames` zde stoprocentně nefunguje). Jen je třeba si uvědomit,
    že konstruktor je pod `@constructor` a `@constructor is Person`, tedy
    naši metodu můžeme z instance zavolat jako
    `@constructor.fromNames(...)`.

### Dědění

Vlastně největší výhodou tříd v CoffeeScriptu je přehledné dědění:

{% highlight coffeescript %}
class Employee extends Person
    constructor: (@name, @department="Obchodní odd.") ->
        super
    toString: ->
        super() + " z #{@department}"
console.log Employee.__super__.constructor is Person
#> true

honza = new Employee("Honza", "IT")
console.log "%s", honza
#> člověk Honza z IT

# korektně se dědí i statické metody ...

console.log "%s", Employee.fromNames(["Marek", "Matouš"])
#> člověk Maker z Obchodní odd., člověk Matouš z Obchodní odd.
{% endhighlight %}

`extends` - je samozřejmé klíčové slovo CoffeeScriptu

`Employee.__super__.constructor` - uchovává odkaz na předka (v tomto
případě `Person`)

`super `- trochu nesystematicky:

  - bez argumentů a závorek zavolá stejnojmennou metodu nad rodičem a
    přepoužije aktuální argumenty (tj.
    `Employee.__super__.constructor.apply(this, arguments)`)
  - se závorkami nebo s argumenty zavolá metodu předka pouze s těmito
    argumenty

### Vázané metody

Kdo programuje v Java/CoffeeScriptu, setkal se určitě s problémem
vázaných metod. Jednoduchý příklad:

{% highlight coffeescript %}
print = console.log;
print("test");
#> Error: Invalid invocation
{% endhighlight %}

JavaScript u metod neuchová informaci, ke kterému objektu patří, takže
při jejich volání bez plně kvalifikovaného jména přijde metoda o
referenci na `this`.

To je u asynchronního jazyka, kde každý program je plný callbacků,
veliká otrava. Samozřejmě to lze různě obejít a obchází se to (pomocí
`function.bind` či `self = this`), ale CoffeeScript má vlastní pěkné řešení
v podobě konstrukce `=\>`

{% highlight coffeescript %}
class Person
    constructor: (@name) ->

    showMe: ->
        console.log("Person(#{@name})")

    showMeBinded: =>
        console.log("Person(#{@name})")

pavel = new Person("Pavel")
pavel.showMe()
#> Person(Pavel)
setTimeout(pavel.showMe, 0)
#> Person(undefined)
setTimeout(pavel.showMeBinded, 0)
#> Person(Pavel)
{% endhighlight %}

### Použití tříd v AngularJS

AngularJS má vlastní způsob zapouzdření a využití objektového
(prototypového) přístupu pro kolegy není úplně intuitivní. Častá
námitka, kterou slyším, je: *Scope nebo Servisu ale nemůžeš jednoduše
dědit.*

Takže, chlapci, můžeš\! Stačí jen kávu správně dávkovat v injekcích:

{% highlight coffeescript %}
angular.module('app').service 'BaseElement', ($compile, $sce) ->
    class BaseElement
        constructor: (@scope, @element) ->
            @element.append($compile(@constructor.template)(scope))
            scope.$watch 'value', (value) =>
                console.log 'new value %j', scope.value
                @value = value
                scope.html = $sce.trustAsHtml(@generateHtml())

        @template: '<div ng-bind-html="html"></div>'
        @getConfig: () ->
            restrict: 'E'
            scope:
                value: '='
            link: (scope, element) =>
                new @(scope, element)

angular.module('app').directive 'myElement', (BaseElement) ->
    class MyElement extends BaseElement
        generateHtml: () =>
            return "<b>My element: #{@value}</b>"

    return MyElement.getConfig()
{% endhighlight %}
