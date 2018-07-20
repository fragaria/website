---
layout: post
title: Pondělní střípky z 2.3.2015
date: '2015-03-02T15:18:00.000+01:00'
author: Lukáš Marek
tags:
- stripky
- azure
- python
- mailgun
- microsoft
- epydoc
modified_time: '2015-03-09T13:21:34.557+01:00'
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-7046011230309797584
blogger_orig_url: http://blog.fragaria.cz/2015/03/pondelni-stripky.html
---

Každé pondělí máme ve Fragarii projektovou schůzku, kde si vyměňujeme
informace o stavu jednotlivých projektů. A proč vám to říkám?
Protože v rámci těchto pondělních schůzek si také
děláme **demo**. Demo je krátký čas na začátku schůzky, kdy každý může
ukázat zajímavou věc/službu kterou našel, použil nebo třeba i vyrobil.
Je to prostě taková všehochuť. Jeden týden řešíme databáze a ovládání
GMailu klávesnicí, jindy zase ideální IDE pro Python (podle Robina je to
`vim`) a pluginy pro [Redmine](http://www.redmine.org/).
A mě tak napadá, že by vás to mohlo taky zajímat.

### Mailgun

Tento týden začal Filip službou [Mailgun](http://www.mailgun.com/).
Jasně. Standardem v posílání hromadných mailů je
[Mailchimp](http://mailchimp.com/), který používáme pro většinu
projektů. Mailgun má ale velmi hezké API, takže posílání hromadných
mailů je hračka. Koneckonců si to zkuste sami:

    curl -s —user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
        https://api.mailgun.net/v2/samples.mailgun.org/messages \
        -F from='Čtenář blogu <excited@samples.mailgun.org>' \
        -F to='info@fragaria.cz' \
        -F subject='Ahoj' \
        -F text='Ahoj klucka z Fragarie!'

### Hosting90

Virtuální servery jsou něco, co řešíme pořád dokolečka. Naším favoritem
byl zatím [Digital Ocean](https://www.digitalocean.com/), ale Martin
dneska přinesl tuzemský [Hosting90](https://www.hosting90.cz/).
Když odhlédneme od ne moc hezkého webu, tak virtuální server s
dvoujádrovým CPU a 2GB paměti stojí 200Kč měsíčně. Digital Ocean za
trochu vyšší cenu nabízí poloviční konfiguraci.
Pro tuzemské projekty je to určitě zajímavá volba.

### Microsoft Azure

Pak jsem chtěl já ukázat něco z [Microsoft
Azure](http://azure.microsoft.com/en-us/), ale kluci mě vypískali.
Ne, vážně – byl jsem na přednášce, kde pánové z Microsoftu ukazovali, co
všechno umí cloud Azure a je toho fakt hodně. Od obyčejných
**linuxových** virtuálních serverů přes službu [Notification
Hub](http://azure.microsoft.com/en-us/services/notification-hubs/) pro
posílání notifikací mobilním zařízením až po [strojové
učení](http://azure.microsoft.com/en-us/services/machine-learning/).
No. A to je z Microsoft světa na dlouhou dobu všechno.

### Epydoc

Poslední vstup si připravil Robin.
[Epydoc](http://epydoc.sourceforge.net/) je nástroj pro dokumentaci
Pythoního kódu. Například Pycharm už ho [podporuje docela
dlouho](https://www.jetbrains.com/pycharm/whatsnew/whatsnew_1x.html) a
hlavně podle něj umí napovídat. Takže když svůj Pythoní kód budete
důsledně dokumentovat Epydocem, ušetříte si dost práce při psaní.

PS: Víte, jak se řekne slovensky krajta? No přece Pytón\!
