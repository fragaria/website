---
layout: post
title: Alarmy v Androidu
date: '2016-12-09T10:48:00.000+01:00'
author: Milan Slezák
lang: cs
tags:
- alarm
- android
- scheduler
- java
modified_time: '2016-12-09T10:49:12.606+01:00'
cloudinary_src: posts/2016-12-09-alarmy-v-androidu__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-4242630700744006367
blogger_orig_url: http://blog.fragaria.cz/2016/12/alarmy-v-androidu.html
---

Účelem toho příspěvku není vytvořit návod jak si na vašem telefonu se
systémem Android nastavit budík na šestou ráno, ale nahlédnou trochu pod
pokličku mechanizmu, který se postará o spuštění libovolné akce někdy v
budoucnosti. A jak už to tak na Androidu bývá, nejedná se o mechanizmus
jeden, ale hned
několik.

{% include figure.html cloudinary_src='posts/2016-12-09-alarmy-v-androidu__1.jpg' %}

### K čemu alarmy?

Potřebujete vyvolat nějakou akci ve vzdálenější budoucnosti jako třeba
rozeznít uživatelův budík? Rádi byste pravidelně synchronizovali data
mezi apkou a serverem a popřípadě uživatele upozornili notifikací, že se
objevily nějaké novinky, které stojí za to si prohlédnut? Něco vám
našeptává že držet kvůli tomu při životě celou aplikaci není to pravé?
V tom případě je alarm nebo chce-li job, přesně to co potřebujete.

Jedná se totiž o způsob, jak systému Android sdělit, že má za uvedený
časový interval nastartovat vaší aplikaci a nechat ji provést nějakou
akci. Vzbudit jak? No samozřejmě pomocí dobře známého **Intentu**
jakožto standardního prostředku meziaplikační komunikace. Zdá se to být
jednoduché až primitivní, ale přece jenom za tím nějaké to tajemství
je.

### Baterie především

Ždímat baterii je většinou to poslední co uživatel od aplikace očekává a
proto by měla být četnost alarmů co nejmenší. Tedy samozřejmě tak malá,
aby vaše aplikace stále dávala smysl.

Představte si aplikaci která má za úkol varovat vás například před
zvýšenou koncentrací škodlivin a smogu ve vašem okolí. Logické asi
bude pravidelně posílat serveru vaší lokaci (pokud se mění) a jako
odpověd dostávat informaci zda v ní byly překročeny limity či nikoliv.
Je třeba správně vybalancovat nastavenou periodu dotazování na server
tak, aby k dotazům nedocházelo příliš často, ale zároveň aby uživatel
nestihl strávit odpoledne v Bohumíně aniž by se dozvěděl, že riskuje
zdraví.

Jako doplněk ke správnému načasováni však existuje ještě jedna technika
jak nějaké ty miliampérhodiny ušetřit.

### Nepřesné alarmy

Ano vážně, pokud nebudete trvat na spuštění v přesně definovaný čas,
pomůžete tím Androidu ušetřit nemalou část baterie.

Android totiž, když zrovna nemá nic na práci, usne. V tomto stavu má
nejmenší odběr a baterii tím šetří. Každý alarm ho však vzbudí a donutí
provést rozličné rutiny jako například inicializovat spojení do
internetu. Vaše aplikace však v systému není sama a takto ho budí
aplikací hned několik. Pokud však při nastavování alarmu řeknete, že jej
chcete provést například za 10 minut plus mínus jedna minuta, umožníte
tím systému seskupit alarmy různých aplikací a provést tak více
činností v rámci jednoho probuzení.

Tato optimalizace má na životnost baterie nemalý vliv. Navíc dochází k
randomizaci jednotlivých volání což jistě ocení i váš server.

### Alarmující mechanismy

Jak již bylo uvedeno na začátku k nastavování alarmů lze využít hned
několik mechanismů. Jedná se o:

  - Alarm Manager 
  - Firebase Job Dispatcher 
  - Job Scheduler 

### Alarm Manager

Jedná se o nejstarší a zároveň nejméně efektivní způsob přístupu k
alarmům. Jeho výhodou je, že do standardního Android SDK patří od
začátku a není zde problém s kompatibilitou. Nevýhodou je že
nepodporuje “Nepřesné alarmy” a je tedy nejméně efektivní metodou. Jeho
API je dosti obecné a neposkytuje takový komfort jako následující dva
bratříčci.

### Job Scheduler

Naproti tomu Job Scheduler je nejmodernější způsob jak tuto problematiku
řešit. API je čisté a intuitivní, jeho použití je efektivní. Nevýhodou
je, že byl zařazen do standardního SDK až od verze 21+ a není tedy
příliš použitelný pro aplikace vyžadující zpětnou kompatibilitu.

### Firebase Job Dispatcher

Je knihovna jež přináší zpětnou kompatibilitu už od verze 9+. Má velmi
podobné API jako výše uvedený Job Scheduler, který také pro verze 21+
interně používá. Pro verze \< 21 interně využívá mechanismus GCM (GCM
Task service) a vyžaduje tedy závislost na balíku Play Services. Tato
závislost může být nevýhodou neboť na některých zařízeních nemusí být k
dispozici.

|                         | Kompatibilita | Efektivita | Play services |
| ----------------------- | ------------- | ---------- | ------------- |
| Alarm Manager           | 1+            | nízká      | nevyžaduje    |
| Job Scheduler           | 21+           | vysoká     | nevyžaduje    |
| Firebase Job Dispatcher | 9+            | vysoká     | vyžaduje      |

### Trocha praxe

Na závěr si ukážeme jak vytvořit jednoduchou službu, která bude
pravidelně (co 10 minut) kontrolovat náš server. Zvolenou technologií je
**Firebase Job Dispatcher**, jež je dle mého názoru nejrozumějším
kompromisem. Pro absolutní kompatibilitu by bylo třeba příklad ještě
doplnit o neefektivní mechanizmus založený na Alarm Manageru.

Nejprve přidáme gradle závislost:

{% highlight gradle %}
compile 'com.firebase:firebase-jobdispatcher:0.5.0'
{% endhighlight %}

Vytvoříme vlastní službu:

{% highlight java %}
import com.firebase.jobdispatcher.JobParameters;
import com.firebase.jobdispatcher.JobService;

public class SmogService extends JobService {
	@Override
	public boolean onStartJob(JobParameters job) {
		// Provést komunikaci se serverem a např. vyhodit notifikaci
		return false;
	}

	@Override
	public boolean onStopJob(JobParameters job) {
		return false;
	}
}
{% endhighlight %}

Kterou zaregistrujeme do manifest.xml:

{% highlight xml %}
<service
	android:exported="false"
	android:name=".SmogService">
	<intent-filter>
		<action android:name="com.firebase.jobdispatcher.ACTION_EXECUTE"/>"
	</intent-filter>
</service>
{% endhighlight %}

A nyní už to jen celé spustit:

{% highlight java %}
Int periodInSec = 10 * 60 // 10 minut perioda
int windowStart =periodInSec - 60;
int windowEnd = periodInSec + 60;
Job job = dispatcher.newJobBuilder()
	.setTag(JOB_TAG) // Označení jobu
	.setService(SmogService.class) // Naše služba
	.setRecurring(true) // Opakuj
	.setLifetime(Lifetime.FOREVER) // Donekonečna, dokud není expicitně zastaveno
	.setReplaceCurrent(true) // Přepiš job pokud již existuje
	.setConstraints(Constraint.ON_ANY_NETWORK) // Je třeba připoení k internetu, jinak se nespustí
	.setTrigger(Trigger.executionWindow(windowStart, windowEnd)) //Kdy se má spuštět
	.build();
dispatcher.mustSchedule(myJob); // Konečně spustit
{% endhighlight %}

A pokud bychom to chtěli vypnout:

{% highlight java %}
dispatcher.cancel(JOB_TAG);
{% endhighlight %}

### Závěrem

Ok, ale proč tři způsoby ptáte se? Odpověď je jednoduchá, “Protože
Android”. Tato evolučně velmi živá platforma skýtá mnoho takovýchto
mysteriózních zákoutí.
