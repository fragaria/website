---
layout: post
title: Fandíme slušně!
date: '2019-08-30T08:59:00.001+02:00'
author: Michal Maněna
lang: cz
cloudinary_src: posts/football-1350720_1920_eracx5
tags:
- TDD
- BDD
- MDD
- agile
---

Sparta, nebo Slávie? A nebo Bohemka? Každý člověk má určité preference a zaujímá nějaké názory.
Od politiky, přes ženy (muže) po fotbal. My vývojáři jsme trochu odlišní “pacienti”. 
Preferujeme různé technologie a metodiky. A stejně jako u jiných koníčků do toho více či méně dáváme emoce. 
V tomto článku se zamýšlím nad profesním fundamentalismem, se kterým se stále setkávám po 15 let praxe v oboru.

{% include figure.html cloudinary_src='posts/football-1350720_1920_eracx5' sizing='wide' %}

# Multidisciplinární obor 

Z vývoje software se stal rozsáhlý multidisciplinární obor. Když jsem v něm v roce 2004 začal pracovat jako vývojář, ještě nebylo moc rozšířené rozdělovat role programátora a kodéra. 
Javascript bylo sprosté slovo. Všichni na něj nadávali. A již v této době jsem zaznamenával fundamentální názory některých kolegů. 
Zejména hlásáné “jedině Java”, ostatní je … (doplň sprosté slovo). Nedivil jsem se tomu. Java má velký historicky náskok, který byl podporován řadou velkých firem i vzdělávacích institucí. 
Na trhu existovali převážně programátoři v C či Javě. Navíc byl u těchto jazyků nutný překlad do binárního kódu a solidní objektový návrh. 
Poptávka po webových stránkách, resp. aplikací však často neležela v robustních aplikacích, ale často relativně primitivních stránkách s jednotkami formulářů. 
Tyto okolnosti vedly k rozvoji vhodnějších scriptovacích jazyků s minimálními požadavky na objektový návrh, tedy zcela opačné paradigma, než bylo tou dobou u rozšířených jazyků. 
Většina Java vývojářů pak fundamentálně odsuzovala jazyky jako PHP a toto stigma si s sebou stále neoprávněně nese. Je to právě programátor, kdo je vládcem kódu. Dodržuje-li správné návyky v konkrétním jazyce, tak by měl napsat kvalitní kód. 
Určitou paralelu s PHP vidím i v Javascriptu, od kterého paradoxně ostatní jazyky přebraly mnoho konstrukcí. 
Realita je ale taková, že se dnes jedná o jedny z nejpoužívanějších jazků pro webové aplikace. 
Trh technologií se tím diverzifikoval a vývojáři si na základě svých zkušeností vybrali obvykle jeden framework, který byli ochotni do krve bránit a z modernistů se pak stávali fundamentálové neochotni zkoumat výhody konkurenčních technologií. 
Kolegové, přiznejme si to - i my podléháme něčemu, čemu se říká technologický marketing a firmy jsou motivovány podporovat tu či onu technologii v rámci zachování a rozvoje pracovní síly, kterou potřebují. 
A upřímně - kdo z vás dělá v ASP, MooTools, Flash a další? Ohledně Flashe: 
Pamatujete si tu poptávku po ultra moderním hýbajícím se webu ve Flashi a ulpívání na něm?

# Metodiky

Odskočme si mimo samotné programování. Během posledních deseti let vznikly nebo zažily velký pokrok odvětví jako DevOps, UX/UI, testování. Též vznikly různé postupy jak software tvořit, např.
* Test driven development
* Model driven development
* Behavior driven development
* Acceptance test driven development
* Feature driven development

Všechny výše uvedené mají důraz na nějakou doménu ve vývoji software a jakmile se podaří nějaký projekt dokončit s použitím některého z výše uvedeného přístupu, často spadneme do psychologické pasti, že daný způsob je vhodný pro jakýkoliv projekt.
Podobně je to i s volbou technologického stacku.
Náročnost celého oboru pak vede fundamentalismu převážně řídících pracovníků, nicméně specialistů nevyjímaje. 
Nemají ani moc na výběr. Je těžké nespadnout do psychologické pasti, protože nadřízení pracovníci požadují pro svá manažerská rozhodnutí podklady a vývojoví manažeři se musí něčeho chytit, zvláště pokud jsou méně zkušení.
Jakmile se vám nějaké technologie či postupy podařilo použít v jednom projektu, předpokládáte, že stejný postup bude vhodný i na jiném projektu.

Klíčové je též nastavení vhodného způsobu řízení, dnes nejčastěji používané agilní metodiky. I zde jsem se setkal s jistým fundamentalismem, kdy se manažer snaží aplikovat něco, co neodpovídá charakteru projektu. 
Mám na mysli zanedbávání analytické a návrhové fáze iterací. V jedné úspěšné české firmě jsem se setkal s fundamentálním použitím Test driven developmentu.
Až takovém, že zásadně nedokumentovali a všechno bylo popsané unit testy. Vývojáři přicházejí a odcházejí. Pochopit z testů business logiku projektu prostě nejde v únosném čase. 
A přitom v kombinaci s Model driven developmentem či dalšími najednou získáváte nesporné benefity.
Bohužel, v ČR jsem se až na výjímky nesetkal s používám UML v praxi. Nedávno jsem se o tom bavil s kamarádem na pivu a ptal jsem se proč? Jsme jeden z mála inženýrských oborů, který neumí moc používat "dorozumívací řeč".
Podkle kamaráda to prostě moc lidí neumí správně aplikovat. Shledávám zde i další bariery, ale to už bychom moc odbočili a UML věnuji samostatný článek.

# Jak poznat, že se stáváme fundamentální

Vývojový manažer vždy musí vzít v úvahu především:
* rozpočet projektu
* rozsah, charakter a dobu životnosti projektu
* stav pracovního trhu
* již použité technologie ve firmě, resp. projektu
* změny v řízení projektu

Výše uvedené body mu pak předurčují omezenou množinu technologických a řídících možností.
Varovným signálem, kdy je použitý nevhodný technologický set, jsou právě emoce a neochota prozkoumávat nové možnosti, které vedou k profesnímu fundamentalismu.
U nás ve Fragarii to víme. Proto stále zkoumáme nové možnosti, technologie a postupy. Jediné, kde jsme věrní a neměníme kabát, jsou sportovní týmy. Sem emoce patří!






