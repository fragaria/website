---
layout: post
title: GIT - proces vývoja a nasadzovania
date: '2015-09-22T15:28:00.000+02:00'
author: Tibor Kulčár
tags:
- scrum
- verzování
- international
- agile
- git
modified_time: '2015-09-22T15:31:20.331+02:00'
thumbnail: http://3.bp.blogspot.com/-wfyKBaMCdlk/VgFO8LnIvVI/AAAAAAAAA-I/h8kqrlus_1I/s72-c/git-illustration.png
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5589035804181042989
blogger_orig_url: http://blog.fragaria.cz/2015/09/git-proces-vyvoja-nasadzovania.html
---

Rovnako ako pri každom vyvíjaní už existujúcim postupom, aj pri tom
našom sme našli niekoľko možností ako ho vylepšiť.

Na momentálnych projektoch vyvýjame pomocou SCRUM-u a snažíme sa každý
sprint dodať použiteľnú a nasaditeľnú verziu
produktu.

![](http://3.bp.blogspot.com/-wfyKBaMCdlk/VgFO8LnIvVI/AAAAAAAAA-I/h8kqrlus_1I/s320/git-illustration.png)

Aby sme dosiahli požadovaný efekt, navrhli sme systém troch prostredí,
Sandbox, Preproduction a Production.

Na **Sandboxe** možu všetci vidieť v akom sme v stave čiže forma
continous integration.

**Preproduction** je prostredie na ktoré umiestňujeme release candidate
verziu. Slúži pre QA team na otestovanie a prípadný bugfix. Rovnako ako
aj pre riešenie akýchkoľvek možných problémov.

Na **Production** nasadzujeme po vychytaní všetkých bugov, overení
kvality a samozrejem po schválení product ownerom.

Používame GIT. Najvačšou výhodou tohoto šikovného nástroja sú vetvy -
branches.

Dohodli sme sa, že v **master** branchi bude stále tá verzia produktu,
ktorá je nasadená na produkcii a do nej sa priamo commitovat nebude.
Začiatkom každého sprintu sa vytvorí nová **releases/X.X.X** branch z
master branch, a na nej sa bude vyvíjať.

Ak nie je jasné, či sa daná funcionalita stihne dokončit do konca
sprintu, vytvorí sa branch iba pre ňu napr. **features/XYZ** a tá sa po
dokončení zlúči s aktuálnou releases/X.X.X vetvou.

Koncom sprintu sa aktuálna releases branch nasadí na Preproduction
prostredie na otestovanie a bugfix.

Vo chvíli keď je verzia doladená, releases branch zlúčime s master
branch, a otagujeme číslom aktuálnej verzie. Nasadíme na produkčné
prostredie a vychutnávame už doladený final.

Stručným resumém by som teda len dodal že celé vetvenie prechádza cez
**SANDBOX** - aktuálny stav vývoja tzv. Continuous Integration
prostredie.
**PREPRODUCTION** - vždy releases branch z uplynulého sprintu (nasadzuje
sa pred koncom sprintu a testuje sa)
**PRODUCTION** - master branch (nasadzuje sa raz za dva týžne po
otestovaní).
