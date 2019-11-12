---
layout: post
title: Magenta - nechte počítače hrát
date: 2019-10-11T09:00:00.000+02:00
author: Michal Martinek
cloudinary_src: posts/synth_eqk1jl
lang: cz
tags:
- magenta
- ai
- machine learning
- music
---

Umělá inteligence je v poslední době oblíbené téma a její využití si pomalu nachází cestu do našich životů, ať už o tom víme či nikoliv. Umožňuje nám automatizovat úlohy, které nejsou úplně triviální na automatizaci, a proto předtím musely být prováděny lidmi. Pomocí ní můžeme analyzovat velká množství dat a na základě nich detekovat/předpovídat věci, které by byly nad lidské síly. V praxi jste se s ní setkali např ve vyhledávači Google, virtuální asistentce Siri, různých chatbotech nebo třeba jako oběť cíleného marketingu. Ne všechno z toho úplně vyvolává váš úžas, možná jste už ale slyšeli o jejím potenciálu ve zdravotnictví, kde by pomáhala doktorům v diagnostice nemocí, nebo autonomních vozidlech. Což zní velmi slibně a věřím, že se obojího dočkáme. Jeden z dalších směrů, kde se umělá inteligence rozvíjí, je umění. Umožňuje tvůrcům hledat nové nápady, používat jiné techniky atd.  Rád bych vám představil jeden projekt, který se zajímá o použití umělé inteligence jako pomocného nástroje v rámci kreativního procesu, a to Magenta.

## Magenta
Magenta je open-sourcový projekt, který vznikl pod vedením lidí z Google Brain. Snaží se využívat strojové učení pro tvorbu hudby, obrazů a jiných materiálů. Také zkoumá, jakým způsobem tvořit aplikace a rozhraní pro umělce, aby jim umožnil obohatit svůj proces umělecké tvorby o použití strojového učení. Vyvíjí jak knihovny a ML modely pro vývojáře, tak tvoří nástroje pro umělce. Pod kapotou využívají TensorFlow, což je další open-source projekt od Google, sloužící jako platforma pro strojové učení. 

Magenta jednak tvoří modely vizuálního umělce, které pokračují v kreslení nebo transformují obraz do jiného stylu. Širší část ale tvoří modely a nástroje pro hudebníky, kterým se budeme věnovat.

### Projekty

#### [NSynth](https://nsynthsuper.withgoogle.com/)
Jeden z nástrojů, které lidi z Magenty tvoří přímo pro hudebníky, je projekt NSynth. Základ tvoří algortimus postavený na neuronové síti, který se učí vlastnosti různých zvuků a na základě nich pak generuje nové zvuky založené na různých vlastnostech. Mimo toho také vyvinuli nástroj nazvaný open-sourcový hudební nástroj NSynth Super, který umožňuje tvořit nový zvuk na základě 4 vstupních zvuků. Slouží jako experiment, jakým způsobem umožnit hudebníkům využívat svět umělé inteligence.

#### [Magenta Studio](https://magenta.tensorflow.org/studio)
Magenta Studio je sada nástrojů, které fungují buď jako samostatné aplikace a generují výstup v podobě not do formátu MIDI, nebo pak také sada pluginů do DAW nástroje Ableton Live pro tvorbu hudby. Tyto nástroje umí například generovat melodie, bicí nebo je kombinovat již na základě existujích notových záznamů. Upravují také rytmické stopy, aby zněly více “lidsky” nebo tvoří bicí přímo k vymyšlené basové lince nebo melodii. Tyto nástroje se opírají o stejné modely, které jsou uvolněny i pro vývojáře, viz níže.

### Modely

#### [MusicRNN](https://tensorflow.github.io/magenta-js/music/classes/_music_rnn_model_.musicrnn.html)
Jedná se o model, který pokračuje v zadaném notovém zápisu. Existují připravené vycvičené modely pro pokračování v melodii, bicích nebo improvizaci na dané akordy.


#### [MusicVAE](https://tensorflow.github.io/magenta-js/music/classes/_music_vae_model_.musicvae.html)
Je to další model, který generuje úplně nové melodie, bicí atd. Taky umí zkombinovat předané notové záznamy do nových. Jsou již předtrénované modely, které tohle umí, rovněž i na základě vstupních akordů.

#### [OnsetsAndFrames](https://tensorflow.github.io/magenta-js/music/classes/_transcription_model_.onsetsandframes.html)
Tento model převádí zvukovou nahrávku piána do notového zápisu. Více taky [zde](https://magenta.tensorflow.org/onsets-frames).


Na těchto modelech jsou pak vytvořený knihovny, stejně jako Tensorflow, který je použitý pro tvorbu modelů, jsou k dispozici pro Python a JavaScript. Tyto knihovny usnadňují používání modelů a generování notových záznamů, importy a exporty z MIDI souborů nebo propojení s MIDI zařízeními, napojení na hudební banky či manipulaci s notovými záznamy. Díky tomu není tak složité začít vyvíjet aplikace, které se o tyto ML modely opírají, jak ukazují tato dema, která jsou všechny vyvinuta pomocí magenta.js.

### Dema

#### [Tenori-off](https://tenori-off.glitch.me/)
Jedná se o jednuchý elektronický sekvencér, který umí generovat vzory pro bicí nebo syntetizér pomocí MusicRNN.

#### [Latent Cycles](https://codepen.io/teropa/full/rdoPbG/)
Umožnuje vrstvit podobné melodie, které vznikly zkombinováním 4 melodií z MusicRNN pomocí MusicVAE. Jde tím docílit zajímavého výsledku plného melodických ozdob.

#### [RUNN](http://vibertthio.com/runn/)  
Jedná se o hudební hru, která se opírá o vygenerovanou melodii pomocí MusicRNN, na které člověk běží a kterou se musí snažit stíhat.

#### [Magenta Composer](https://magenta-composer.mmlab.cz/)
Magenta Composer je jednoduchá aplikace, kterou jsem sám vytvořil. Umožňuje zkombinovat bicí, basovou linku, jednoduché akordy a melodii do jednoduchého beatu. Pro generování bicích a melodie se používá model MusicVAE a pro basu MusicRNN, akordy jsou statické, protože přímo tuhle možnost modely nenabízí a ze zkoumaných řešení tohle bylo to, co neslo nejvíce posluchatelné výsledky. Pro jednotlivé stopy je možné ovlivnit míru náhodnosti generování, výšku a také hraný zvuk díky použité zvukové bance [SGM Plus](https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus).


## Proč se tím vůbec zaobírat
Možná vás ukázky aplikací a to, co umí, úplně nepřesvědčily. Vývoj je pořád dost v plenkách a je dost experimentální. Výsledky nejsou vždy přesvědčivé a ani na 100 % nikdy nebudou. Umělá inteligence dle mého bude vždy sloužit jako pomoc při tvorbě nových nápadů, ale nebude tvořit konečné skladby. Bude nabízet pouze nástroj, jak zvětšit svůj potenciál. A bude čistě na člověku jak dané vzory člověk rozvede a použije. Mimo to nabízí pomoc i v jiných aspektech jako třeba masteringu, polohování při mixu či chytrá náhrada backing tracků. Magenta není jediný projekt, který v této oblasti probíhá, to že to není pouze hračka dosvědčují například komerční projekty [AIVA](https://www.aiva.ai/) nebo [iZotope](https://www.izotope.com/). 





