---
layout: post
title: Fulltext česky pomocí Djanga a Elasticsearch
date: '2014-11-14T10:00:00.000+01:00'
author: Filip Vařecha
lang: cs
tags:
- search
- fulltext
- django
- elasticsearch
- python
modified_time: '2014-11-14T10:22:42.664+01:00'
cloudinary_src: posts/2014-11-14-fulltext-cesky-pomoci-djanga__1.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-3491892572665389018
blogger_orig_url: http://blog.fragaria.cz/2014/11/fulltext-cesky-pomoci-djanga.html
---

Fulltextové vyhledávání je k mojí nelibosti celkem často na webu
opomíjená funkce. Klasickým argumentem, proč fulltext nedělat je
zpravidla, že je to složité a hrozně časově náročné udělat. Klient je
často uveden v omyl, že spolehlivé fulltextové vyhledávání je práce na
týden a tak mnohdy vítězí buď varianta ne-fulltextová, nebo (častěji)
[Custom Search](https://developers.google.com/custom-search/) od Google.
Dnes si ukážeme, že opak je pravdou a že dobře fungující fulltext je
dneska spíše **otázkou hodin**.

Fulltextových enginů je tu spousta. V tomhle
"tutoriálu" použijeme [Elasticsearch](http://www.elasticsearch.org/). Je
jednoduchý na použití i instalaci a jeho integrace s Djangem je hračka.
Existuje totiž appka [django-haystack](http://haystacksearch.org/),
kterou použijeme. Haystack je mezivrstva, která vám usnadní vybudování
indexů nad vašimy modely a napojení na vyhledávací backend dle vaší
preference. Mimo Elasticsearch podporuje celou řadu dalších prominentů
na poli fulltextu jako například Solr, Xapian, nebo Whoosh.

### 1\. Instalace Elasticsearch

Jako první pochopitelně musíme Elasticsearch nainstalovat. Instalační
pokyny pro jednotlivé platformy se trochu liší, já zde popíšu pouze
variantu pro Mac OSX. Pro linuxové distribuce lze využít [apt/yum
repozitáře](http://www.elasticsearch.com/guide/en/elasticsearch/reference/current/setup-repositories.html),
jinak lze vždycky stáhnout binárku, jak je to hezky popsáno v [oficiální
dokumentaci](http://www.elasticsearch.com/guide/en/elasticsearch/reference/current/setup.html).

Na Macu je postup za použítí Homebrew snadný jak facka:

{% highlight shell %}
brew install elasticsearch
{% endhighlight %}

Jakmile bude mít Homebrew hotovo, musíme ještě udělat jednu věc.
Elasticsearch totiž pochopitelně out-of-box neumí česky, což ho je
potřeba naučit. Zde jsem vycházel ze skvělého článku na Zdrojáku
[Vyhledáváme hezky
česky](http://www.zdrojak.cz/clanky/elasticsearch-vyhledavame-hezky-cesky-ii-a-taky-slovensky/)
od Lukáše Vlčka. Nebudeme se zde zabývat podrobnostmi (které jsou
detailně rozepsané právě v tomto článku) a pojďme rovnou na věc. Aby nám
Elasticsearch češtinu rozuměl, musíme mu dodat český slovník a také mu
vysvětlit, jak má daný slovník použít.

Jako slovník lze využít modifikovanou verzi slovníku pro Openoffice.org,
jež je k dispozici pod GNU/GPL licencí. Stáhnout si ho můžete
[tady](https://drive.google.com/open?id=0B0PU1esp2HvqX3JSSWdJR2hkYk0&authuser=0).
Poté je nutné stažený archiv rozbalit a zkopírovat ho do konfiguračního
adresáře pro Elasticsearch. Na Macu to je adresář
`/usr/local/Cellar/elasticsearch/[VERZE]/config`. Výsledkem by měla být
následující adresářová struktura:

```
/config
    /hunspell
        /cs_CZ
            cs_CZ.aff           
            cs_CZ.dic
            settings.yml
```

### 2\. Instalace django-haystack

Dalším krokem je instalace **django-haystack** pro vaší aplikaci. Budeme
také potřebovat knihovnu **elasticsearch** s Pythoními bindingy. To
uděláte snadno pomocí **pipu** (přičemž předpokládám, že virtualenv
již máte aktivovaný):

{% highlight shell %}
pip install django-haystack elasticsearch
{% endhighlight %}

Abychom mohli používat češtinu, budeme muset nainstalovat ještě
vylepšený Elasticsearch backend, který nám umožní upravit konfiguraci:

{% highlight shell %}
pip install elasticstack
{% endhighlight %}

Dále musíme tyto Django appky přidat do `INSTALLED_APPS`. Otevřeme
si tedy `settings.py` naší aplikace a upravíme `INSTALLED_APPS` aby
vypadaly cca takto:

{% highlight python %}
INSTALLED_APPS = [
    ...
    'haystack',
    'elasticstack',
    ...
]
{% endhighlight %}

### 3\. Konfigurace

Nyní musíme haystack správně nakonfigurovat. Otevřeme si settings.py
naší aplikace a přidáme následující kus kódu:

{% highlight python %}
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'elasticstack.backends.ConfigurableElasticSearchEngine',
        'URL': '127.0.0.1:9200',
        'INDEX_NAME': 'my_custom_index',
    },
}
{% endhighlight %}

Toto nastavení říká, že pro fulltext se má použít backend z
elasticstacku na adrese `127.0.0.1` a portu `9200` (což je výchozí
nastavení pro Elasticsearch). Náš index se bude jmenovat
`my_custom_index`.

Abychom při vytváření indexu použili speciální konfiguraci pro češtinu a
také náš český slovník, musíme přidat ještě další část, kterou opět
umožňuje elasticstack:

{% highlight python %}
ELASTICSEARCH_INDEX_SETTINGS = {
    'settings': {
        'analysis': {
            'analyzer' : {
                'cs_hunspell': {
                    'type': 'custom',
                    'tokenizer': 'standard',
                    'filter': ['stopwords_CZ', 'lowercase', 'hunspell_CZ', 'asciifolding', 'stopwords_CZ', 'remove_duplicities']
                }
            },
            'filter': {
                'stopwords_CZ': {
                    'type': 'stop',
                    'stopwords': ["právě", "že", "_czech_"],
                    'ignore_case': True
                },
                'hunspell_CZ': {
                    'type': 'hunspell',
                    'locale': 'cs_CZ',
                    'dedup': True,
                    'recursion_level': 0
                },
                'remove_duplicities': {
                    'type': 'unique',
                    'only_on_same_position': True
                }
            }
        }
    }
}

ELASTICSEARCH_DEFAULT_ANALYZER = 'cs_hunspell'
{% endhighlight %}

Tato část si jistě zaslouží podrobnější popis.

Direktiva `ELASTICSEARCH_INDEX_SETTINGS` definuje, jaké nastavení se má
při vytváření indexu použít. V našem případě je hlavním předmětem zájmu
naše vlastní konfigurace analyzátoru, který bude Elasticsearch při
vyhledávání používat. Tento analyzátor se jsme pojmenovali
jako **cs\_hunspell**. Jeho hlavní smysl spočívá ve vlastní definici
filtrů, které se při vyhledávání použijí:

  - Jako první se z hledaného řetězce **odstraní stopwords**
    (vycházející ze základní databáze pro češtinu a rozšířené o slova
    "právě" a "že"), které ve vyhledávání nenesou žádnou velkou
    sémantickou funkci.
  - V dalším kroku se řetězec převede na jeho **lowercase variantu**. Ve
    slovníku, který jsme stáhli jsou všechna česká slova i v lowercase
    verzi, takže nehrozí case-sensitivity problém naznačený ve článku
    Lukáše Vlčka.
  - Poté se použije filtr **hunspell\_CZ**, jehož smyslem není nic
    jiného než porovnání se slovníkem, který jsme do Elasticsearch
    přidali v prvním instalačním kroku.
  - Dále se provede **asciifolding** filtr, který řetězec okleští o
    diakritiku.
  - Načež se ještě jednou provede odstranění stopwords.
  - Nakonec se **odstraní případné duplicity** ve výsledném řetězci.

Pokud vás zajímají detaily této konfigurace (na které zde není prostor),
ještě jednou vás odkáži na [výborný článek Lukáše
Vlčka](http://www.zdrojak.cz/clanky/elasticsearch-vyhledavame-hezky-cesky-ii-a-taky-slovensky/).

Direktiva `ELASTICSEARCH_DEFAULT_ANALYZER` pouze určuje, jaký analyzátor
se má při hledání považovat za výchozí. Zde pochopitelně uvedeme ten náš
vlastní pro češtinu.

### 4\. Vytvoření indexů

Dalším krokem k funkčnímu fulltextu je vytvoření indexů. Indexem se
rozumí textová reprezentace instance modelu, se kterou si vyhledávací
engine poradí. Je tedy nanejvýš důležité mít indexy co nejúplnější a
poctivě promyšlené, jinak celkem jistě vaše vyhledávání nebude fungovat
uspokojivě. django-haystack nabízí cestu jak od modelu k takovému textu
dojít.

Řešením je **vytvoření třídy** (odvozené od `SearchIndex`) pro každý
Django model, nad kterým chceme vyhledávat. Tyto třídy umisťujeme dle
konvence do souboru `search_indexes.py` podobně jako modely umisťujeme
do `models.py`. django-haystack tyto soubory **automaticky hledá v každé
aplikaci**, takže není nutné je někde uvádět, nebo registrovat.
Příkladem jednoduché definice indexu může například následující
třída:

{% highlight python %}
from haystack import indexes
from myproject.app import models

class PageIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title', boost=5)

    def get_model(self):
        return models.Page

    def index_queryset(self, using=None):
        return self.get_model().objects.published()
{% endhighlight %}

Pojďme se blíže podívat na to, co tato definice říká. Jedná se o index
nad modelem `Page`, který reprezentuje jednoduchou CMS stránku. Tento
index bude mít dva atributy.

1.  Jako hlavní je zde použit atribut `text`. To, že je hlavní lze
    poznat podle toho, že má v definici uvedeno `document=True`. U
    tohoto atributu je navíc použita šablona (více o tomto níže), která
    se použije při jeho vytváření. Dle konvence, kterou django-haystack
    používá, bychom měli hlavní atribut indexu vždy nazývat `text`.
2.  Dalším atributem je `title`, který bude odpovídat `title` atributu
    na instanci `Page` modelu (což nám říká `model_attr='title'` použitý
    při definici. Argument `boost` znamená, že shoda na úrovni tohoto
    atributu má být považována za důležitou, což v principu povede k
    tomu, že shoda v titulku získá při vyhodnocení výsledků větší váhu.

Ještě se vrátíme k použití šablony u atributu `text`. Použití šablony
nám umožní do indexu vložit všechny podstatné atributy dané instance,
které chceme při hledání zohlednit. U indexu by tedy klidně stačilo mít
pouze atribut `text` a nic jiného. Ostatní atributy jsou uvedeny jen
kvůli tomu, abychom mohli tyto při shodě zvýhodnit. Šablonu pro
vygenerování textu django-haystack hledá na cestě:

    [TEMPLATE_DIR]/search/indexes/[APP_LABEL]/[MODEL]_[NAZEV_ATRIBUTU].txt

V našem případě by to tedy mohla být cesta:

    templates/search/indexes/app/page_text.txt

V šabloně automaticky dostaneme k dispozici proměnnou `object`, která
odpovídá instanci daného modelu, která se zrovna do indexu přidává.
Obsah této šablony můžeme použít zhruba následující:

    {{ object.title }}
    {{ object.author.get_full_name }}
    {{ object.perex|striptags }}
    {{ object.content|striptags }}

Do indexu tedy přidáváme informaci o titulku, celém jméně autora co
stránku vytvořil, její perex (bez HTML značek) a celý její obsah (opět
bez HTML značek). HTML odstraňujeme, protože nás při hledání nezajímá a
naopak by ho kazilo. Kdybychom měli další informace, podle kterých je
třeba hledat, měli bychom je do šablony přidat také. Příkladem by mohly
být třeba štítky, které ke stránce, nebo článku můžeme přiřazovat.

### 5\. Spuštění Elasticsearch a vybudování prvotního indexu

Pokud jste se dostali až sem, můžeme nyní spustit Elasticsearch a
vybudovat náš první index. Elasticsearch na Macu spustíme následovně a
měl by nás uvítat konzolový výstup podobný tomu zde uvedenému.

{% highlight shell %}
you@computer:~$ elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml

[2014-11-10 10:41:49,409][INFO ][node                     ] [Toad-In-Waiting] version[1.3.4], pid[99851], build[a70f3cc/2014-09-30T09:07:17Z]
[2014-11-10 10:41:49,411][INFO ][node                     ] [Toad-In-Waiting] initializing ...
[2014-11-10 10:41:58,357][INFO ][node                     ] [Toad-In-Waiting] initialized
[2014-11-10 10:41:58,358][INFO ][node                     ] [Toad-In-Waiting] starting ...
[2014-11-10 10:41:58,491][INFO ][transport                ] [Toad-In-Waiting] bound_address {inet[/127.0.0.1:9300]}, publish_address {inet[/127.0.0.1:9300]}
[2014-11-10 10:41:58,511][INFO ][discovery                ] [Toad-In-Waiting] xaralis/oIhw_OW3Trim_30_TOz_Mw
[2014-11-10 10:42:01,527][INFO ][cluster.service          ] [Toad-In-Waiting] new_master [Toad-In-Waiting][oIhw_OW3Trim_30_TOz_Mw][matrix][inet[/127.0.0.1:9300]], reason: zen-disco-join (elected_as_master)
[2014-11-10 10:42:01,558][INFO ][http                     ] [Toad-In-Waiting] bound_address {inet[/127.0.0.1:9200]}, publish_address {inet[/127.0.0.1:9200]}
[2014-11-10 10:42:01,559][INFO ][node                     ] [Toad-In-Waiting] started
{% endhighlight %}

V další konzoli spustíme management commad od haystacku, který zajistí
vybudování indexu:

{% highlight shell %}
you@computer:/projects/myproject$ python manage.py rebuild_index --noinput

Removing all documents from your index because you said so.
All documents removed.
Indexing 164 Stránky
{% endhighlight %}

Jakmile příkaz doběhne, máme vše připraveno k vyhledávání.

### 6\. View pro vyhledávání

Jediné, co nám v tuto chvíli zbývá vytvořit je stránka pro zadání
hledáné fráze a zobrazení výsledků. django-haystack nám jde opět
naproti, protože obsahuje již hotové View třídy, které můžeme rovnou pro
tento účel použít.

Do našeho `urls.py` přidáme:

{% highlight python %}
...
(r'^vyhledavani/', include('haystack.urls')),
...
{% endhighlight %}

A zbývá již pouze vytvořit šablonu (`templates/search/search.html`):

{% highlight html %}
{% raw %}
{% extends 'base.html' %}

{% block content %}
    <h2>Vyhledávání</h2>

    <form method="get" action=".">
        <table>
            {{ form.as_table }}
            <tr>
                <td>&nbsp;</td>
                <td>
                    <input type="submit" value="Hledat">
                </td>
            </tr>
        </table>

        {% if query %}
            <h3>Výsledky</h3>

            {% for result in page.object_list %}
                <p>
                    <a href="{{ result.object.get_absolute_url }}">{{ result.object.title }}</a>
                </p>
            {% empty %}
                <p>Nic nebylo nalezeno.</p>
            {% endfor %}

            {% if page.has_previous or page.has_next %}
                <div>
                    {% if page.has_previous %}<a href="?q={{ query }}&amp;page={{ page.previous_page_number }}">{% endif %}&laquo; Předchozí{% if page.has_previous %}</a>{% endif %}
                    |
                    {% if page.has_next %}<a href="?q={{ query }}&amp;page={{ page.next_page_number }}">{% endif %}Následující &raquo;{% if page.has_next %}</a>{% endif %}
                </div>
            {% endif %}
        {% endif %}
    </form>
{% endblock %}
{% endraw %}
{% endhighlight %}

Když nyní do prohlížeče zadáte adresu /vyhledavani/, dostanete se na
funkční stránku s vyhledáváním\! Elasticsearch bude umět česky a bude
schopen si uvědomit skloňování a mnoho dalších specifik českého jazyka.
Zájemcům o podrobnosti konfigurace Elasticsearch doporučuji již zmíněný
**článek Lukáše Vlčka**, který mi při prvních krocích velice pomohl.
Dále je dobrý nápad si pročíst pořádně i [dokumentaci
django-haystacku](http://django-haystack.readthedocs.org/en/latest/toc.html) a
v neposlední řadě také [dokumentaci
Elasticsearch](http://www.elasticsearch.com/guide/en/elasticsearch/reference/current/index.html).

Elasticsearch v téhle konfiguraci jsme použili pro fulltextové
vyhledávání na webu [CK Adventura](https://www.adventura.cz/),
výsledek může vypadat třeba
takhle:

{% include figure.html cloudinary_src='posts/2014-11-14-fulltext-cesky-pomoci-djanga__1.png' %}
