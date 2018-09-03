---
layout: post
title: Blockchain? Can do!
date: '2018-03-28T13:25:00.001+02:00'
author: Jirka Chadima
lang: cs
tags:
- windingtree
- crypto
- blockchain
- ethereum
- líf
- solidity
modified_time: '2018-03-28T13:25:06.396+02:00'
cloudinary_src: posts/2018-03-28-blockchain-can-do__1.jpg
blogger_id: tag:blogger.com,1999:blog-5328688426183767847.post-9154961035646733437
blogger_orig_url: http://blog.fragaria.cz/2018/03/blockchain-can-do.html
---

Blockchain is the new sexy. Everybody is talking about it, people in
lines in grocery stores are discussing Bitcoin price, big companies are
pouring tons of money in research. Everybody just wants to be a part of
it. And from now on, so are we\! It turns out, it's just another young
technology that we can
handle.

{% include figure.html cloudinary_src="posts/2018-03-28-blockchain-can-do__1.jpg" sizing='wide' %}

## Not that hard

The thing is, that blockchain itself is basically just a distributed
ledger that holds an undeniable and unchangeable history of
transactions. That sounds pretty boring, but you can actually do many
things on top of it. Take for example
[Ethereum](https://www.ethereum.org/). Its prominent feature is a thing
called [smart contracts](https://en.wikipedia.org/wiki/Smart_contract) -
an executable Turing-complete code that runs on top of the distributed
network. And that's where the fun begins.

By using a programming language called
[Solidity](https://solidity.readthedocs.io/en/v0.4.21/), you can create
your own [crypto-tokens](https://eidoo.io/erc20-tokens-list/), [fully
distributed games](https://cryptozombies.io/) and virtually anything you
can imagine. Everything running solely in a distributed network, you
don't have to own any servers. Sounds good? Well, slow down, because
there is a lot, and I mean a **LOT**, of issues.

  - [It is awfully
    slow.](https://ethereum.stackexchange.com/questions/58/why-is-the-average-block-time-17-seconds)
  - [It has a very limited
    throughput.](https://ethereum.stackexchange.com/questions/28666/whats-the-transaction-throughput-on-ethereum-how-fast-the-nodes-can-replicate)
  - [Storage of any data is very
    expensive.](https://ethereum.stackexchange.com/questions/872/what-is-the-cost-to-store-1kb-10kb-100kb-worth-of-data-into-the-ethereum-block)
  - [A small mistake and your money is
    gone.](https://www.coindesk.com/startup-lost-160-million-still-wants-shake-ethereum/)
  - [You have no guarantee that your code will be executed unless you
    actually pay
    more.](https://ethereum.stackexchange.com/questions/6107/what-is-the-default-ordering-of-transactions-during-mining-in-e-g-geth)
  - [You might think your code was executed, but it was actually
    not.](https://www.mycryptopedia.com/orphan-uncle-genesis-blocks-explained/)
  - Finding out what went wrong is not exactly straightforward.
  - The tooling sucks. Big time.
  - The
    [supporting](http://swarm-guide.readthedocs.io/en/latest/introduction.html)
    [technologies](https://github.com/ethereum/wiki/wiki/Whisper) are
    just not there. Yet.
  - Changing your code once it is deployed, is impossible. You need to
    think ahead.

So is it a time to walk away? Definitely not. Every single problem can
be dealt with and many of them are being dealt with as we speak. And
yes, some of them might take a lot of time to get solved, but in the
meantime, we can use what we have or figure out some workaround with
other tools and services.

## Endgame? Web 3 and Dapps

The grand vision that motivates people to solve all of the undeniable
problems the concept has, is called Web 3, for some reason. A fully
distributed and open network of nodes serving everything necessary for a
distributed application (called Dapp for short). Be it an application
code itself or its data. Pretty ambitious, right?

And the solution is based on - wait for it - Javascript. What? How? A
picture is worth a thousand words, they
say:

{% include figure.html cloudinary_src="posts/2018-03-28-blockchain-can-do__2.png" %}

During smart contract compilation and deployment to the blockchain, an
ABI (Application Binary Interface) is produced. And that is nothing else
than a JSON object with method signatures. You can use these signatures
to produce bytecode that can be executed over the
[JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) protocol directly on
any of the network's nodes.

That's why [web3.js](https://github.com/ethereum/web3.js/) (and others
such as [ethers.js](https://github.com/ethers-io/ethers.js/)) was born.
It is a library that contains everything you need to interact with an
Ethereum node from the world of Javascript. And since you can build
client-facing applications with Javascript (using Angular, React, vue.js
or anything else you know), you can build the whole Dapp with
Javascript.

So the idea is to serve application code from a distributed environment
like [IPFS](https://ipfs.io/) or
[Swarm](https://ethereum.stackexchange.com/questions/375/what-is-swarm-and-what-is-it-used-for)
and use blockchain for all client to client interactions, such as
payments or anything else that needs to be tracked. Of course, you are
not limited to Javascript, you can use whatever speaks JSON-RPC. But the
beauty of this solution is that almost every device has a browser that
can interpret Javascript. And therefore, run your Dapp.

## Entering the real world

Apparently, in spite of every problem the technology stack currently
has, it attracts many investors and even big, traditional companies,
such as
[Lufthansa](https://www.tnooz.com/article/lufthansa-invests-blockchain-partners-winding-tree/),
[J. P. Morgan](https://www.jpmorgan.com/global/blockchain) or
[Walmart](https://cointelegraph.com/news/walmart-to-implement-blockchain-based-delivery-system).
So there might be some future here.

That's why we started to work with [Winding
Tree](https://windingtree.com/) on their product that will try to change
the traveling industry forever. The core idea is to cut the middleman
and thus save money. This platform, powered by Ethereum blockchain,
should allow any hotel, airline or car rental company, to simply list
their inventory and accept bookings directly. And it should even
simplify the growth of the middlemen themselves by providing a
well-structured data of every member of the platform.

## This cannot work

Well, we think it can and will. The idea might seem farfetched and there
are a lot of issues along the way, such as the very small throughput of
any blockchain. But there are very smart people already working on these
problems and in the near future, we might actually book hotels and
flights over a decentralized and open network.

Do you like this idea, do you have any questions? Come join us on
[GitHub](https://github.com/windingtree),
[Telegram](https://t.me/windingtree) or [Rocket
Chat](https://windingtree.rocket.chat/home).
