---
layout: post
title: Jednoduché filtrování seznamů v AngularJS
date: '2013-10-22T11:53:00.000+02:00'
author: Lukáš Marek
lang: cs
tags:
- javascript
- angularjs
modified_time: '2013-10-22T11:53:34.626+02:00'
cloudinary_src: posts/2013-10-22-jednoduche-filtrovani-seznamu-v__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-7814781869769008535
blogger_orig_url: http://blog.fragaria.cz/2013/10/jednoduche-filtrovani-seznamu-v.html
---

V našem posledním projektu chceme (čistě v Javascriptu) mít vyhledávací
filtr nad seznamem objektů. Asi nějak
takhle:

{% include figure.html cloudinary_src='posts/2013-10-22-jednoduche-filtrovani-seznamu-v__1.png' %}

Jenže objekty můžou obsahovat vnořené objekty, které obsahují vnořené
objekty s dalšími vnořenými objekty – chápete, kam mířím?

V první verzi jsme si hráli s rekurzí, procházeli properties objektu,
přeskakovali funkce atd. atd. 

Ne že by to nefungovalo, ale je to spousta kódu, který se špatně čte,
určitě je v něm nějaká chyba a jistě se už našel někdo, kdo to napsal
líp.

No jasně – a byl to ten chlápek co psal `JSON.stringify()`\!

Když se postavíme na ramena obrů a použijeme JSON (a
[Underscore.JS](http://underscorejs.org/)), tak se s vyhledáváním
dostaneme na 5 řádek jednoduchého kódu.

Když přidáme vyhledávání podle více klíčových slov, validace vstupů a
možnost ignorovat některé properties objektu, tak jsme pořád na 22.
řádcích:

{% highlight coffeescript %}
angular.module("filters", [])
    .filter('matchAllToProperties', () ->
        return (input, query, exclude) ->
            if not input or not query
                return input

            bits = (b.toLowerCase() for b in query.split(' ') when b isnt ' ')

            filtered = []

            for item in input
                item_copy = angular.copy(item)

                #Remove fields in which we don't want to search
                _.each(exclude, (prop)-> delete item_copy[prop])

                json = JSON.stringify(item_copy).toLowerCase()
                if _.every(bits, (bit) -> json.indexOf(bit) > 0)
                    filtered.push(item)

            return filtered
    )
{% endhighlight %}

Řídíme se zásadou, že
jedno [demo](http://plnkr.co/edit/vDzh0i?p=preview) řekne víc než tisíc
slov. Hezké hraní.

A kdyby náhodou, tak zbytek kódu je na
[Githubu](https://gist.github.com/krtek/7010022).
