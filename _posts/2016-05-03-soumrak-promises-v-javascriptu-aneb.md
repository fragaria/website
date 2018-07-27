---
layout: post
title: Soumrak promises v Javascriptu aneb Pondělní střípky z 2.5.2016
date: '2016-05-03T09:13:00.000+02:00'
author: Lukáš Marek
tags:
- stripky
- async
- nodejs
- promises
modified_time: '2016-05-03T09:23:24.425+02:00'
cloudinary_src: posts/2016-05-03-soumrak-promises-v-javascriptu-aneb__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-3691982208680064191
blogger_orig_url: http://blog.fragaria.cz/2016/05/soumrak-promises-v-javascriptu-aneb.html
---

Dnes si Hynek uzurpoval skoro dvacet minut, aby nám demonstroval jak
nahradit promises *reaktivním programováním* v NodeJS.
I Filip, který jinak rýpe do všeho, sledoval
výklad téměř bez dechu. Zkusím  tedy Hynkovu přednášku převyprávět i
vám.

Callback metody, které komplikovaly Javascriptový kód už jsou dávno za
zenitem. Najdete je možná v JQuery, ale NodeJS i AngularJS už dávno pro
asynchronní volání používají
[promises](https://en.wikipedia.org/wiki/Futures_and_promises). Pokud
nevíte, na co promises jsou, tak vítám do 21. století a doporučuju třeba
[tenhle
článek](http://www.html5rocks.com/en/tutorials/es6/promises/).

{% include figure.html cloudinary_src='posts/2016-05-03-soumrak-promises-v-javascriptu-aneb__1.jpg' caption='(c) http://www.gratisography.com' %}

Anebo možná ne. Vypadá to, že i nad promises se začínají stahovat
mračna. Standard ES6 totiž obsahuje tzv.
[generátory](https://developer.mozilla.org/cs/docs/Web/JavaScript/Guide/Iterators_and_Generators)
a klíčové slovo *yield*, což umožňuje použít [reaktivní
programování.](https://en.wikipedia.org/wiki/Reactive_programming)
Jeho použitím se dají zjednodušit některé use-cases a vyhnout se použití
promises.

Hynek nám to vysvětlil na příkladu unit testu. Následující kus kódu by
mohl být třeba ze systému na prodej bannerové reklamy:

{% highlight javascript %}
it('should create new banner', function(done) {
    var organization;
    //Inicializace dat
    //Smažu všechny organizace
    Organization.removeAsync().then(function() {
        //Poté vytvořím jednu testovací
        return Organization.createAsync({
            name: 'Fragaria s.r.o.'
        });
    }).then(function(org) {
        organization = org;
        //Smažu všechny kampaně
        return Campaign.removeAsync();
    }).then(function() {
        //Poté vytvořím jednu testovací
        return Campaign.createAsync({
            name: 'Summer flash sale'
        });
    }).then(function(campaign) {
        //Vytvořím nový banner
        server
            .post('/banner')
            .send({
                name: 'Funny kitten #2',
                organization: organization._id.toString(),
                campaign: campaign._id.toString(),
            })
            .set('Authorization', 'Bearer ' + adminAuthToken)
            //A zkontroluju, že se podařilo
            .expect(201)
            .end(done);
    });
});
{% endhighlight %}

I když je kód super jednoduchý a dobře okomentovaný, stejně je tam těch
promises **prostě moc**. Dá se v tom možná vyznat, ale je to spousta
*boilerplate* kódu a čitelnost trpí.

S použitím (zneužitím?) generátorů a
[couroutine](http://bluebirdjs.com/docs/api/promise.coroutine.html) z
knihovny Bluebird se dostaneme k mnohem čitelnějšímu kódu:

{% highlight javascript %}
var co = require('bluebird').coroutine;

it('should create new banner', co(function* (done) {
    //Inicializace dat
    //Smažu všechny organizace
    yield Organization.removeAsync();
    //Poté vytvořím jednu testovací
    var organization = yield Organization.createAsync({
        name: 'Fragaria s.r.o.'
    });
    //Smažu všechny kampaně
    yield Campaign.removeAsync();
    //Poté vytvořím jednu testovací
    var campaign = yield Campaign.createAsync({
        name: 'Summer flash sale'
    });
    //Vytvořím nový banner
    server
        .post('/banner')
        .send({
            name: 'Funny kitten #2',
            organization: organization._id.toString(),
            campaign: campaign._id.toString(),
        })
        .set('Authorization', 'Bearer ' + adminAuthToken)
        //A zkontroluju, že se podařilo
        .expect(201)
        .end(done);
}));
{% endhighlight %}

Jak to funguje? Všimněte si, že celý test je napsán jako [generátorová
funkce](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Statements/function*)
(to je to *function\**). A obalen voláním couroutine (to je to
*co()*).

Tady je potřeba malou odbočku – jak fungují generátory? Generátor je ze
strany konzumenta klasický iterátor. Na každé volání funkce *next()* se
vrátí jedna hodnota. Ze strany producenta se používá klíčové slovo
*yield*, což je takový malý *return*. Vrátí další hodnotu v pořadí a
"uspí" provádění funkce, dokud není zavolán znovu *next()*.

A právě tohle uspání je tady zneužito. Každé volání *next()/yield* vrátí
jednu promise, na kterou se v obalovací funkci počká a pak se zavolá
znovu *next()*. Zajímavé, co?

Samozřejmě, že promises umožňují i jiné hrátky, jako třeba
*Promises.all()*, které generátory nahradit nedokáží. Ale pro popsaný
příklad sekvenčního volání jde o elegantní náhradu.

Takže promises se zatím o své místo na slunci bát nemusí.
