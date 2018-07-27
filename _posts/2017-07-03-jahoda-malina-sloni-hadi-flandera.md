---
layout: post
title: Jahoda, malina, sloni, hadi, flanděra, angular
date: '2017-07-03T12:56:00.000+02:00'
author: Jirka Chadima
tags:
- sqlite
- javascript
- python
- flask
- angularjs
- socket.io
- eventlet
- postgresql
- raspberry
modified_time: '2017-07-03T12:56:23.496+02:00'
cloudinary_src: posts/2017-07-03-jahoda-malina-sloni-hadi-flandera__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-5818496784390061288
blogger_orig_url: http://blog.fragaria.cz/2017/07/jahoda-malina-sloni-hadi-flandera.html
---

Přijde takhle klient do kanceláře a povídá: "Máme tady takovou velkou
mašinu a k ní si můžeme koupit příšerně drahý ovládací panel. Nesvedli
byste pro nás udělat něco levnějšího?" Technicky zdatný ředitel
společnosti nesměle dí: "To bychom asi svedli." Klientovi se rozzáří
očka a tichým hlasem dodá: "Ale potřebovali bychom, aby to fungovalo ve
skoro reálném čase a máme tu na to nějaká volná Raspberry Pi."

Kromě výkonnosti Raspberry jsme také podle zadání docela omezeni v
technologickém rozletu: nějaký ten webový frontend, kde se budou data
ukazovat a bude je možné měnit, backend ideálně v Pythonu a jako datové
úložiště bychom rádi použili třeba SQLite. Naše vyprávění ale začneme
od uživatelského konce, tedy od
klienta.

{% include figure.html cloudinary_src='posts/2017-07-03-jahoda-malina-sloni-hadi-flandera__1.jpg' %}

## Angular, WebSockets a socket.io

Protože ve Fragarii válíme poslední dobou hlavně v Angularu, tak jsme
použili jeho čtvrtou, poslední verzi a místo tradičního pollingu se jako
komunikační protokol přímo nabízí
[WebSockets](https://en.wikipedia.org/wiki/WebSocket). Kdo by neznal,
představí si otevřený tunel mezi prohlížečem a serverem, kudy
obousměrně tečou data. Oproti tradičnímu HTTP, zásadním způsobem
eliminujeme režii spojenou s každým novým požadavkem a tím zvyšujeme
výkon celé aplikace.

Jenže\! Jak se později ukázalo, v Pythonu je jednodušší použít knihovnu
[socket.io](https://socket.io/), která umí kromě WebSocketů spousta
dalších parádních věcí - zejména se tvářit jako WebSockets i tam, kde
tahle technologie nefunguje a taky jednotlivým datovým zprávám
přiřazovat pojmenovaný typ.

Takže si v Angularu podobně jako v [tomhle
návodu](https://www.npmjs.com/package/ng2-socket-io) napíšeme tupoučký
wrapper a službičku...

{% highlight javascript %}
// .. omit some imports
@Injectable()
export class WebSocketService {
    private sockets: {[name: string]: WrappedSocket} = {};

    public connect(url: string, options?: any): WrappedSocket {
        if (! this.sockets[url]) {
            this.sockets[url] = new WrappedSocket({url: url, options: options});
        }
        return this.sockets[url];
    }
}
{% endhighlight %}

{% highlight javascript %}
// omit import, basically taken from ng2-socket-io
import * as io from 'socket.io-client';

@Injectable()
export class WrappedSocket {
    ioSocket: any;

    constructor(config: SocketIoConfig) {
        const url: string = config.url || '';
        const options: any = config.options || {};
        this.ioSocket = io(url, options);
    }

    on(eventName: string, callback: Function) {
        this.ioSocket.on(eventName, callback);
    }

    once(eventName: string, callback: Function) {
        this.ioSocket.once(eventName, callback);
    }

    connect() {
        return this.ioSocket.connect();
    }

    disconnect(close?: any) {
        console.log('disconnect')
        return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
    }

    emit(eventName: string, data: any, callback?: Function) {
        return this.ioSocket.emit.apply(this.ioSocket, arguments);
    }

    removeListener(eventName: string, callback?: Function) {
        return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
    }

    removeAllListeners(eventName?: string) {
        return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
    }

    /** create an Observable from an event */
    fromEvent<T>(eventName: string): Observable<T> {
        this.subscribersCounter++;
        return Observable.create( (observer: any) => {
             this.ioSocket.on(eventName, (data: T) => {
                 observer.next(data);
             });
             return () => {
                 if (this.subscribersCounter === 1)
                    this.ioSocket.removeListener(eventName);
            };
        }).share();
    }
}
{% endhighlight %}

...a na dalších 20 řádkách si ten tunel ještě pustíme. No, a to je
vlastně všechno. Zbytek aplikace jsou tradiční nezajímavé formulářové
inputy, validace a taky on-screen klávesnice. Třeba trochu upravená
[tahleta](https://github.com/protacon/ng-virtual-keyboard).

{% highlight javascript %}
// omit imports
const   SOCKET_URL = '/* @echo SOCKET_URL */';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})
export class Dashboard implements OnInit, OnDestroy {

    public mainSocket: WrappedSocket;
    socketSubscribe;
    fields = {};

    constructor (
        private socketService: WebSocketService
    ) {
        this.mainSocket = this.socketService
            .connect(SOCKET_URL);
    }

    ngOnInit() {
        // Listen for "data_changed" events from server
        this.socketSubscribe = this.mainSocket
            .fromEvent<any>('data_changed')
            .subscribe((response) => {
                let data = response.data;
                if (this.fields[data.name]) {
                    let field = this.fields[data.name];
                    field.value = field.modify ? field.modify(data.value) : Number.parseInt(data.value, 10);
                }
            });
    }
    // Handle data change from UI and emit "json" event into socket
    onFieldChange(payload: {name: string, value: any}) {
        this.mainSocket.emit('json', {
            data: {
                name: payload.name,
                value: payload.value,
            }
        });
    }

    ngOnDestroy() {
        this.socketSubscribe && this.socketSubscribe.unsubscribe();
    }
}
{% endhighlight %}

## Flask a socket.io

Webových frameworků v Pythonu jsou samozřejmě tuny. Pojďme ale použít
něco jednoduchého, do čeho se dobře integruje socket.io. Volba padla na
[Flask](http://flask.pocoo.org/), pár lidí ho
[používá](https://hotframeworks.com/languages/python) a socket.io to
[taky umí](https://flask-socketio.readthedocs.io/en/latest/). Přijímat
data z klienta je pak přímo odzbrojujícím způsobem jednoduché.

{% highlight python %}
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

CORS(app)
socketio = SocketIO(app)

# Handles messages of type "json"
@socketio.on('json')
def client_data_change(message):
    database.update_value(message['data']['name'], message['data']['value'])
{% endhighlight %}

Jak se data na klienta posílají si ukážeme po krátké odbočce do světa
databází.

## SqLite, PostgreSQL a LISTEN/NOTIFY

Když už se pollingem, tedy periodickou kontrolou dat nezabýváme na ose
prohlížeč-server, byla by škoda dělat polling do databáze. Na scénu tak
vstupují SQLite a PostgreSQL, které umí pomocí
[update\_hook](https://www.sqlite.org/c3ref/update_hook.html) respektive
dvojice
[LISTEN](https://www.postgresql.org/docs/9.4/static/sql-listen.html)/[NOTIFY](https://www.postgresql.org/docs/9.4/static/sql-notify.html) při
nějaké události volat uživatelský kód. Pro SQLite se dá použít například
knihovna [karellen-sqlite](https://github.com/karellen/karellen-sqlite),
my si ukážeme, jak se problém řeší v Postgresu a
[psycopg2](http://initd.org/psycopg/).

V PostgreSQL mějme jednoduchou tabulku, z níž chceme zavolat NOTIFY
pokaždé, když do ní přibude nový řádek. Na to se samozřejme nejlépe
používají triggery.

{% highlight sql %}
-- simple table definition, sequence omitted
CREATE TABLE field_value (
    id integer NOT NULL,
    value character varying(255) NOT NULL,
    field character varying(80)
);

CREATE FUNCTION field_value_notify_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    payload jsonb;
BEGIN
    -- build JSON object, compatible with 9.4 and 9.5
    payload = json_build_object('field', NEW.field, 'value', NEW.value);
    -- this is the magic, that emits the real event
    perform pg_notify('field_value_change', payload::text);
    RETURN NULL;
END
$$;

-- regsiter function as a table trigger
CREATE TRIGGER on_field_value_change AFTER INSERT ON field_value FOR EACH ROW EXECUTE PROCEDURE field_value_notify_change();
{% endhighlight %}

Obsluha v Pythonu je pak dost jednoduchá, ale pro webový server je
blokující smyčka tak, jak je uvedená v dokumentaci, poměrně nevhodná.

{% highlight python %}
# http://initd.org/psycopg/docs/advanced.html#asynchronous-notifications
import select
import psycopg2
import psycopg2.extensions

conn = psycopg2.connect(DSN)
conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

curs = conn.cursor()
cursor.execute("LISTEN field_value_change")

print "Waiting for notifications on channel 'test'"
while 1:
    if select.select([conn],[],[],5) == ([],[],[]):
        print "Timeout"
    else:
        conn.poll()
        while conn.notifies:
            notify = conn.notifies.pop(0)
            print "Got NOTIFY:", notify.pid, notify.channel, notify.payload
{% endhighlight %}

## Lepíme to celé dohromady

Naštěstí máme
[flask-socketio](https://flask-socketio.readthedocs.io/en/latest/) a v
něm zprovozněný [eventlet](http://eventlet.net/), takže se té blokující
smyčky můžeme elegantně zbavit. Použijeme na to dva background tasky (v
podstatě samostatná vlákna) v režii socket.io a asynchronní frontu s
[trampolínou](http://eventlet.net/doc/hubs.html?highlight=trampoline#eventlet.hubs.trampoline)
z arzenálu knihovny eventlet. Celá nádhera tak vypadá následovně:

{% highlight python %}
from eventlet.hubs import trampoline

def start_listening(queue):
    """Connects to PgSQL and listens to notifications, inspired by http://initd.org/psycopg/articles/2010/12/01/postgresql-notifications-psycopg2-eventlet/"""
    if not queue:
        return
    connection = psycopg2.connect(DSN)
    cursor = connection.cursor()
    cursor.execute("LISTEN field_value_change")

    while True:
        trampoline(connection, read=True)
        connection.poll()
        while connection.notifies:
            notify = connection.notifies.pop()
            queue.put(json.loads(notify.payload))

def emitter(queue):
    """Listens to queued events and emits data_changed broadcast event to a socket"""
    while True:
        element = queue.get()
        socketio.emit('data_changed', {'data': {'name': element['field'], 'value': element['value']}}, broadcast=True)

# ...

dbThread = None
qThread = None

@socketio.on('connect')
def connect():
    """On first socket.io connection registers the database listener and value emitter"""
    global dbThread
    global qThread
    q = eventlet.Queue()
    if dbThread is None:
        dbThread = socketio.start_background_task(target=start_listening, queue=q)
        qThread = socketio.start_background_task(target=emitter, queue=q)
{% endhighlight %}

Neumíte si to představit? Podívejte se na následující video, kde je
navíc v provozu i REST API, aby se nemuselo sahat přímo do databáze:

{% include youtube.html id='y8cdWyMp_KE' %}

## Co říci závěrem

Díky menší zoologické zahradě existujících technologií a knihoven jsme
takhle byli schopní během pár dnů dodat firmě na balicí stroje pilotní
ukázku toho, jak by mohl vypadat reálný řídící panel s různými
komponentami. Angular nám pomohl k tomu, že řešení je modulární a z
jednotlivých komponent se dají skládat různé obrazovky. Dostatečně
obecné řešení backendu pomocí PostgreSQL a WebSockets pak umožňuje
snadnou rozšiřitelnost a přizpůsobování podle toho, jaké typy dat
potřebují jednotlivé stroje.

Když už frčí to reaktivní programování na frontendu, tímhle relativně
jednoduchým způsobem můžete postavit reaktivní celou aplikaci odshora
dolů. To samozřejmě šetří zdroje, možná to zlepšuje uživatelský
prožitek, ale hlavně to setsakra dobře vypadá.
